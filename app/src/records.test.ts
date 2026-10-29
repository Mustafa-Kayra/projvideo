import { describe, expect, it, vi } from "vitest";
import { createGame } from "./game";
import {
  mergeRecords,
  persistRecords,
  readRecords,
  STORAGE_KEY,
  updateRecords,
} from "./records";

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
  it("eski bir sekmenin düşük skoru depodaki yüksek skoru ezmez", () => {
    const high = updateRecords([], game, date).records;
    const stale = updateRecords(
      [],
      { ...game, id: "stale", score: 0 },
      date,
    ).records;
    let serialized = JSON.stringify(high);
    const storage = {
      getItem: () => serialized,
      setItem: vi.fn((_key: string, value: string) => {
        serialized = value;
      }),
    };
    expect(persistRecords(storage, stale)).toEqual(high);
    expect(JSON.parse(serialized)).toEqual(high);
    expect(storage.setItem).not.toHaveBeenCalled();
  });
  it("sekmelerin farklı kategori, mod ve zorluk rekorlarını birleştirir", () => {
    const high = updateRecords([], game, date).records;
    const other = updateRecords(
      [],
      {
        ...game,
        id: "other",
        settings: { category: "clubs", difficulty: "hard", mode: "timed" },
      },
      date,
    ).records;
    let serialized = JSON.stringify(high);
    const storage = {
      getItem: () => serialized,
      setItem: (_key: string, value: string) => {
        serialized = value;
      },
    };
    expect(persistRecords(storage, other)).toEqual([...high, ...other]);
    expect(JSON.parse(serialized)).toHaveLength(2);
    expect(persistRecords(storage, [])).toHaveLength(2);
  });
  it("birleştirme yinelenen kombinasyonlarda en yüksek puanı seçer ve girdileri değiştirmez", () => {
    const high = updateRecords([], game, date).records;
    const low = [{ ...high[0], id: "low", score: 100 }];
    const original = structuredClone([low, high]);
    expect(mergeRecords(low, high, high)).toEqual(high);
    expect([low, high]).toEqual(original);
    expect(mergeRecords(high, [{ ...high[0], id: "tie" }])).toEqual(high);
  });
  it("bozuk depolama verisinin yerine geçerli rekorları kaydeder", () => {
    const high = updateRecords([], game, date).records;
    const setItem = vi.fn();
    expect(persistRecords({ getItem: () => "broken", setItem }, high)).toEqual(
      high,
    );
    expect(setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(high));
  });
  it("depo okunamıyorsa mevcut kayıtları ezmeye çalışmaz", () => {
    const setItem = vi.fn();
    expect(() =>
      persistRecords(
        {
          getItem: () => {
            throw new Error("blocked");
          },
          setItem,
        },
        [],
      ),
    ).toThrow("blocked");
    expect(setItem).not.toHaveBeenCalled();
  });
});
