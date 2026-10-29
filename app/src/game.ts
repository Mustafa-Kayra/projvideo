import {
  questions,
  type CategoryId,
  type Difficulty,
  type Question,
} from "./data/questions";

export type CategorySelection = CategoryId | "mixed";
export type Mode = "classic" | "timed";
export interface Settings {
  category: CategorySelection;
  difficulty: Difficulty;
  mode: Mode;
}
export interface Answer {
  question: Question;
  selectedIndex: number | null;
  correct: boolean;
  points: number;
  speedBonus: number;
  streakBonus: number;
}
export interface Game {
  id: string;
  settings: Settings;
  deck: Question[];
  cursor: number;
  phase: "question" | "feedback" | "finished";
  answers: Answer[];
  score: number;
  streak: number;
  bestStreak: number;
  questionDeadline: number;
  globalDeadline: number | null;
}

export const difficultyLabels: Record<Difficulty, string> = {
  easy: "Kolay",
  medium: "Orta",
  hard: "Zor",
};
export const multipliers: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};
export const modeLabels: Record<Mode, string> = {
  classic: "Klasik",
  timed: "Zamana karşı",
};

export function shuffle<T>(
  items: readonly T[],
  random: () => number = Math.random,
): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleQuestion(
  question: Question,
  random: () => number = Math.random,
): Question {
  const order = shuffle([0, 1, 2, 3], random);
  return {
    ...question,
    options: order.map(
      (index) => question.options[index],
    ) as Question["options"],
    answerIndex: order.indexOf(question.answerIndex),
  };
}

export function calculateScore(
  difficulty: Difficulty,
  remainingSeconds: number,
  streak: number,
) {
  const base = 100 * multipliers[difficulty];
  const speedBonus =
    Math.floor(Math.max(0, Math.min(15, remainingSeconds))) * 5;
  const streakBonus = Math.min(5, Math.max(0, Math.floor(streak) - 2)) * 25;
  return {
    base,
    speedBonus,
    streakBonus,
    total: base + speedBonus + streakBonus,
  };
}

export function createGame(
  settings: Settings,
  now: number,
  bank: readonly Question[] = questions,
): Game {
  const pool = bank.filter(
    (q) =>
      q.difficulty === settings.difficulty &&
      (settings.category === "mixed" || q.category === settings.category),
  );
  if (pool.length < 10)
    throw new Error("Bu seçim için en az 10 soru gerekiyor.");
  const deck = shuffle(pool).map((question) => shuffleQuestion(question));
  return {
    id: `${now}-${Math.random().toString(36).slice(2)}`,
    settings,
    deck,
    cursor: 0,
    phase: "question",
    answers: [],
    score: 0,
    streak: 0,
    bestStreak: 0,
    questionDeadline: now + 15_000,
    globalDeadline: settings.mode === "timed" ? now + 60_000 : null,
  };
}

export function answerGame(
  game: Game,
  selectedIndex: number | null,
  now: number,
): Game {
  if (game.phase !== "question") return game;
  const question = game.deck[game.cursor];
  const deadline = Math.min(
    game.questionDeadline,
    game.globalDeadline ?? Infinity,
  );
  const selection = now >= deadline ? null : selectedIndex;
  if (
    selection !== null &&
    (!Number.isInteger(selection) || selection < 0 || selection > 3)
  )
    return game;
  const correct = selection === question.answerIndex;
  const streak = correct ? game.streak + 1 : 0;
  const points = calculateScore(
    question.difficulty,
    (deadline - now) / 1000,
    streak,
  );
  const answer: Answer = {
    question,
    selectedIndex: selection,
    correct,
    points: correct ? points.total : 0,
    speedBonus: correct ? points.speedBonus : 0,
    streakBonus: correct ? points.streakBonus : 0,
  };
  return {
    ...game,
    phase:
      game.globalDeadline !== null && now >= game.globalDeadline
        ? "finished"
        : "feedback",
    answers: [...game.answers, answer],
    score: game.score + answer.points,
    streak,
    bestStreak: Math.max(game.bestStreak, streak),
  };
}

export function advanceGame(game: Game, now: number): Game {
  if (game.phase !== "feedback") return game;
  if (
    (game.settings.mode === "classic" && game.answers.length >= 10) ||
    (game.globalDeadline !== null && now >= game.globalDeadline)
  ) {
    return { ...game, phase: "finished" };
  }
  let deck = game.deck;
  let cursor = game.cursor + 1;
  if (cursor >= deck.length) {
    deck = shuffle(deck).map((question) => shuffleQuestion(question));
    if (deck[0].id === game.deck[game.cursor].id && deck.length > 1)
      [deck[0], deck[1]] = [deck[1], deck[0]];
    cursor = 0;
  }
  return {
    ...game,
    deck,
    cursor,
    phase: "question",
    questionDeadline: now + 15_000,
  };
}

export function tickGame(game: Game, now: number): Game {
  if (game.phase === "finished") return game;
  if (game.phase === "feedback") {
    return game.globalDeadline !== null && now >= game.globalDeadline
      ? { ...game, phase: "finished" }
      : game;
  }
  if (now >= Math.min(game.questionDeadline, game.globalDeadline ?? Infinity))
    return answerGame(game, null, now);
  return game;
}

export function getStats(game: Game) {
  const correct = game.answers.filter((answer) => answer.correct).length;
  return {
    correct,
    wrong: game.answers.length - correct,
    accuracy: game.answers.length
      ? Math.round((correct / game.answers.length) * 100)
      : 0,
    bestStreak: game.bestStreak,
  };
}
