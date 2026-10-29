import { type Game, type Settings, getStats } from "./game";

export interface ScoreRecord extends Settings {
  id: string;
  score: number;
  accuracy: number;
  bestStreak: number;
  date: string;
}
export const STORAGE_KEY = "golbilgi.records.v1";

function parseRecords(serialized: string | null): ScoreRecord[] {
  try {
    const value: unknown = JSON.parse(serialized ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is ScoreRecord => {
      if (!item || typeof item !== "object") return false;
      const record = item as Record<string, unknown>;
      return (
        typeof record.id === "string" &&
        ["clubs", "players", "winners", "turkish", "mixed"].includes(
          String(record.category),
        ) &&
        ["easy", "medium", "hard"].includes(String(record.difficulty)) &&
        ["classic", "timed"].includes(String(record.mode)) &&
        typeof record.score === "number" &&
        Number.isFinite(record.score) &&
        record.score >= 0 &&
        typeof record.accuracy === "number" &&
        record.accuracy >= 0 &&
        record.accuracy <= 100 &&
        typeof record.bestStreak === "number" &&
        Number.isInteger(record.bestStreak) &&
        record.bestStreak >= 0 &&
        typeof record.date === "string" &&
        !Number.isNaN(Date.parse(record.date))
      );
    });
  } catch {
    return [];
  }
}

export function readRecords(storage: Pick<Storage, "getItem">): ScoreRecord[] {
  try {
    return parseRecords(storage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function mergeRecords(
  ...groups: (readonly ScoreRecord[])[]
): ScoreRecord[] {
  const best = new Map<string, ScoreRecord>();
  for (const records of groups) {
    for (const record of records) {
      const key = `${record.category}:${record.mode}:${record.difficulty}`;
      const previous = best.get(key);
      if (!previous || record.score > previous.score) best.set(key, record);
    }
  }
  return [...best.values()];
}

export function persistRecords(
  storage: Pick<Storage, "getItem" | "setItem">,
  records: readonly ScoreRecord[],
): ScoreRecord[] {
  const serialized = storage.getItem(STORAGE_KEY);
  const merged = mergeRecords(parseRecords(serialized), records);
  const next = JSON.stringify(merged);
  if (serialized !== next) storage.setItem(STORAGE_KEY, next);
  return merged;
}

export function updateRecords(
  records: ScoreRecord[],
  game: Game,
  date: string,
): { records: ScoreRecord[]; isBest: boolean } {
  const matches = (record: ScoreRecord) =>
    record.category === game.settings.category &&
    record.mode === game.settings.mode &&
    record.difficulty === game.settings.difficulty;
  const previous = records.find(matches);
  if (previous && previous.score >= game.score)
    return { records, isBest: previous.id === game.id };
  const stats = getStats(game);
  const next: ScoreRecord = {
    ...game.settings,
    id: game.id,
    score: game.score,
    accuracy: stats.accuracy,
    bestStreak: stats.bestStreak,
    date,
  };
  return {
    records: [...records.filter((record) => !matches(record)), next],
    isBest: true,
  };
}
