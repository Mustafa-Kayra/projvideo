import { describe, expect, it } from "vitest";
import { questions, type CategoryId, type Difficulty } from "./questions";

describe("Soru bankası bütünlüğü", () => {
  it("en az 150 soru ve benzersiz kimlikler içerir", () => {
    expect(questions.length).toBeGreaterThanOrEqual(150);
    expect(new Set(questions.map((question) => question.id)).size).toBe(
      questions.length,
    );
  });
  it.each(questions)(
    "$id: dört benzersiz şık, geçerli cevap ve açıklama",
    (question) => {
      expect(question.id.trim().length).toBeGreaterThan(0);
      expect(question.question.trim().length).toBeGreaterThan(10);
      expect(question.explanation.trim().length).toBeGreaterThan(15);
      expect(question.options).toHaveLength(4);
      expect(
        new Set(
          question.options.map((option) =>
            option.trim().toLocaleLowerCase("tr-TR"),
          ),
        ).size,
      ).toBe(4);
      expect(question.options.every((option) => option.trim().length > 0)).toBe(
        true,
      );
      expect(Number.isInteger(question.answerIndex)).toBe(true);
      expect(question.answerIndex).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex).toBeLessThan(4);
      expect(["clubs", "players", "winners", "turkish"]).toContain(
        question.category,
      );
      expect(["easy", "medium", "hard"]).toContain(question.difficulty);
    },
  );
  it.each(["clubs", "players", "winners", "turkish"] as CategoryId[])(
    "%s kategorisi en az 30 soru ve her zorlukta en az 10 soru içerir",
    (category) => {
      const pool = questions.filter(
        (question) => question.category === category,
      );
      expect(pool.length).toBeGreaterThanOrEqual(30);
      for (const difficulty of ["easy", "medium", "hard"] as Difficulty[]) {
        expect(
          pool.filter((question) => question.difficulty === difficulty).length,
        ).toBeGreaterThanOrEqual(10);
      }
    },
  );
});
