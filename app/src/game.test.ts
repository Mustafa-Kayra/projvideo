import { describe, expect, it } from "vitest";
import { questions, type Difficulty } from "./data/questions";
import {
  advanceGame,
  answerGame,
  calculateScore,
  createGame,
  getStats,
  shuffle,
  shuffleQuestion,
  tickGame,
  type CategorySelection,
  type Game,
  type Settings,
} from "./game";

const settings: Settings = {
  category: "mixed",
  difficulty: "medium",
  mode: "classic",
};
function correct(game: Game, now = 1000) {
  return answerGame(game, game.deck[game.cursor].answerIndex, now);
}

describe("Puanlama", () => {
  it.each([
    ["easy", 100],
    ["medium", 200],
    ["hard", 300],
  ] as const)("%s zorluğunun temel puanı %i", (difficulty, base) => {
    expect(calculateScore(difficulty, 0, 1)).toEqual({
      base,
      speedBonus: 0,
      streakBonus: 0,
      total: base,
    });
  });
  it("hız bonusunu kalan tam saniye üzerinden hesaplar", () => {
    expect(calculateScore("medium", 12.9, 1)).toEqual({
      base: 200,
      speedBonus: 60,
      streakBonus: 0,
      total: 260,
    });
  });
  it("3. doğrudan itibaren seri bonusu verir ve 125 puanda sınırlar", () => {
    expect(calculateScore("easy", 0, 2).streakBonus).toBe(0);
    expect(calculateScore("easy", 0, 3).streakBonus).toBe(25);
    expect(calculateScore("easy", 0, 4).streakBonus).toBe(50);
    expect(calculateScore("hard", 15, 99).total).toBe(500);
  });
  it("hız bonusunu 0–75 aralığında sınırlar", () => {
    expect(calculateScore("easy", -5, 1).speedBonus).toBe(0);
    expect(calculateScore("easy", 30, 1).speedBonus).toBe(75);
  });
});

describe("Karıştırma", () => {
  it("Fisher–Yates ile kaynak diziyi değiştirmeden karıştırır", () => {
    const source = [1, 2, 3, 4];
    expect(shuffle(source, () => 0)).toEqual([2, 3, 4, 1]);
    expect(source).toEqual([1, 2, 3, 4]);
    expect(shuffle(source, () => 0.999)).toEqual(source);
  });
  it("tüm elemanları, boş diziyi ve tek elemanı korur", () => {
    expect(
      shuffle(questions)
        .map((q) => q.id)
        .sort(),
    ).toEqual(questions.map((q) => q.id).sort());
    expect(shuffle([])).toEqual([]);
    expect(shuffle(["gol"])).toEqual(["gol"]);
  });
  it("şıklar değişse bile doğru cevabın kimliğini korur", () => {
    for (const question of questions) {
      const original = structuredClone(question);
      const next = shuffleQuestion(question, () => 0);
      expect(next.options[next.answerIndex]).toBe(
        question.options[question.answerIndex],
      );
      expect([...next.options].sort()).toEqual([...question.options].sort());
      expect(question).toEqual(original);
      expect(next.options).not.toEqual(question.options);
    }
  });
});

describe("Oyun akışı", () => {
  it.each([
    "clubs",
    "players",
    "winners",
    "turkish",
    "mixed",
  ] as CategorySelection[])(
    "%s havuzunu seçilen zorlukla filtreler",
    (category) => {
      for (const difficulty of ["easy", "medium", "hard"] as Difficulty[]) {
        const game = createGame({ ...settings, category, difficulty }, 0);
        expect(game.deck.length).toBeGreaterThanOrEqual(10);
        expect(
          game.deck.every(
            (q) =>
              q.difficulty === difficulty &&
              (category === "mixed" || q.category === category),
          ),
        ).toBe(true);
        expect(new Set(game.deck.map((q) => q.id)).size).toBe(game.deck.length);
      }
    },
  );
  it("yetersiz soru havuzunu reddeder", () => {
    expect(() => createGame(settings, 0, [])).toThrow("en az 10 soru");
  });
  it("doğruyu puanlar, çift yanıtı ve geçersiz şıkkı yok sayar", () => {
    const game = createGame(settings, 0);
    expect(answerGame(game, 9, 1000)).toBe(game);
    expect(answerGame(game, 1.5, 1000)).toBe(game);
    const answered = correct(game);
    expect(answered.score).toBe(270);
    expect(answered.streak).toBe(1);
    expect(answered.answers).toHaveLength(1);
    expect(correct(answered)).toBe(answered);
    expect(tickGame(answered, 20000)).toBe(answered);
  });
  it("yanlış cevap seriyi sıfırlar ama puanı azaltmaz", () => {
    const first = correct(createGame(settings, 0));
    const second = advanceGame(first, 2000);
    const wrong = answerGame(
      second,
      (second.deck[second.cursor].answerIndex + 1) % 4,
      3000,
    );
    expect(wrong.streak).toBe(0);
    expect(wrong.bestStreak).toBe(1);
    expect(wrong.score).toBe(first.score);
    expect(getStats(wrong)).toEqual({
      correct: 1,
      wrong: 1,
      accuracy: 50,
      bestStreak: 1,
    });
  });
  it("15 saniyeyi dolduran soru tek bir yanıtsız yanlış olarak kaydedilir", () => {
    const game = createGame(settings, 0);
    expect(tickGame(game, 14999)).toBe(game);
    const timedOut = tickGame(game, 15000);
    expect(timedOut.phase).toBe("feedback");
    expect(timedOut.answers[0]).toMatchObject({
      selectedIndex: null,
      correct: false,
      points: 0,
    });
    expect(tickGame(timedOut, 20000).answers).toHaveLength(1);
    expect(
      answerGame(game, game.deck[0].answerIndex, 15001).answers[0]
        .selectedIndex,
    ).toBeNull();
  });
  it("klasik oyun tam 10 soru sonra biter", () => {
    let game = createGame(settings, 0);
    for (let i = 0; i < 10; i++) {
      game = correct(game, i * 2000 + 1000);
      expect(game.phase).toBe("feedback");
      game = advanceGame(game, i * 2000 + 2000);
    }
    expect(game.phase).toBe("finished");
    expect(game.answers).toHaveLength(10);
    expect(getStats(game)).toEqual({
      correct: 10,
      wrong: 0,
      accuracy: 100,
      bestStreak: 10,
    });
    expect(advanceGame(game, 25000)).toBe(game);
    expect(tickGame(game, 90000)).toBe(game);
  });
  it("60 saniyede bitirir ve son yanıtsız soruyu incelemeye ekler", () => {
    let game = createGame({ ...settings, mode: "timed" }, 0);
    game = advanceGame(correct(game, 59000), 59000);
    game = tickGame(game, 60000);
    expect(game.phase).toBe("finished");
    expect(game.answers.at(-1)?.selectedIndex).toBeNull();
  });
  it("geri bildirim sırasında toplam süre dolarsa hayalet yanlış eklemez", () => {
    const game = correct(createGame({ ...settings, mode: "timed" }, 0), 1000);
    const finished = tickGame(game, 61000);
    expect(finished.phase).toBe("finished");
    expect(finished.answers).toHaveLength(1);
    expect(finished.score).toBe(game.score);
  });
  it("zamana karşı modda havuz bitince tekrar karıştırır ve peş peşe aynı soruyu sormaz", () => {
    let game = createGame({ ...settings, category: "clubs", mode: "timed" }, 0);
    const count = game.deck.length;
    let lastId = "";
    for (let i = 0; i < count; i++) {
      lastId = game.deck[game.cursor].id;
      game = advanceGame(correct(game, i * 200 + 100), i * 200 + 150);
    }
    expect(game.phase).toBe("question");
    expect(game.cursor).toBe(0);
    expect(game.deck[0].id).not.toBe(lastId);
    expect(game.answers).toHaveLength(count);
  });
  it("hiç yanıt yokken doğruluk 0 olur", () => {
    expect(getStats(createGame(settings, 0)).accuracy).toBe(0);
  });
});
