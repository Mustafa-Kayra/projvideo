import { describe, expect, it } from "vitest";
import { createGame } from "./game";
import { readRecords, STORAGE_KEY, updateRecords } from "./records";

const date = "2025-12-31T12:00:00.000Z";
const game = {
  ...createGame(
    { category: "mixed", difficulty: "medium", mode: "classic" },
    0,
  ),
  score: 2500,
  phase: "finished" as const,
};

describe("Yerel rekorlar", () => {
  it("ilk sonucu ekler ve aynı oyunu tekrar kaydetmez", () => {
    const first = updateRecords([], game, date);
    expect(first.isBest).toBe(true);
    expect(first.records).toHaveLength(1);
    expect(updateRecords(first.records, game, date).records).toBe(
      first.records,
    );
  });
  it("düşük veya eşit skor eski rekoru değiştirmez; yüksek skor değiştirir", () => {
    const first = updateRecords([], game, date);
    expect(
      updateRecords(first.records, { ...game, id: "low", score: 100 }, date),
    ).toEqual({ records: first.records, isBest: false });
    expect(
      updateRecords(first.records, { ...game, id: "tie" }, date).isBest,
    ).toBe(false);
    const better = updateRecords(
      first.records,
      { ...game, id: "better", score: 3000 },
      date,
    );
    expect(better.records).toHaveLength(1);
    expect(better.records[0].score).toBe(3000);
  });
  it("kategori, mod ve zorluğu ayrı ayrı tutar", () => {
    let records = updateRecords([], game, date).records;
    records = updateRecords(
      records,
      {
        ...game,
        id: "club",
        settings: { ...game.settings, category: "clubs" },
      },
      date,
    ).records;
    records = updateRecords(
      records,
      { ...game, id: "timed", settings: { ...game.settings, mode: "timed" } },
      date,
    ).records;
    records = updateRecords(
      records,
      {
        ...game,
        id: "hard",
        settings: { ...game.settings, difficulty: "hard" },
      },
      date,
    ).records;
    expect(records).toHaveLength(4);
  });
  it("geçerli kayıtları geri yükler", () => {
    const records = updateRecords([], game, date).records;
    expect(
      readRecords({
        getItem: (key) =>
          key === STORAGE_KEY ? JSON.stringify(records) : null,
      }),
    ).toEqual(records);
  });
  it.each(["bozuk json", "{}", "null", '[null, {}, {"score": -1}]'])(
    "bozuk veriyi güvenle yok sayar: %s",
    (value) => {
      expect(readRecords({ getItem: () => value })).toEqual([]);
    },
  );
  it("depolama erişimi engelliyse çökmez", () => {
    expect(
      readRecords({
        getItem: () => {
          throw new Error("SecurityError");
        },
      }),
    ).toEqual([]);
  });
});
