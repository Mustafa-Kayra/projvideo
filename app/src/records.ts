import { type Game, type Settings, getStats } from "./game";

export interface ScoreRecord extends Settings {
  id: string;
  score: number;
  accuracy: number;
  bestStreak: number;
  date: string;
}
export const STORAGE_KEY = "golbilgi.records.v1";

export function readRecords(storage: Pick<Storage, "getItem">): ScoreRecord[] {
  try {
    const value: unknown = JSON.parse(storage.getItem(STORAGE_KEY) ?? "[]");
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
