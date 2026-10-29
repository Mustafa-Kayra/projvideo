import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { STORAGE_KEY, type ScoreRecord } from "./records";
import type { HTMLAttributes, ReactNode } from "react";

vi.mock("framer-motion", async () => {
  const { createElement, forwardRef } = await import("react");
  const Div = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & Record<string, unknown>
  >((props, ref) => {
    const attributes = { ...props };
    for (const key of [
      "initial",
      "animate",
      "exit",
      "transition",
      "onAnimationComplete",
    ])
      delete attributes[key];
    return createElement("div", { ...attributes, ref });
  });
  const Wrapper = ({ children }: { children: ReactNode }) => children;
  return {
    motion: { div: Div },
    AnimatePresence: Wrapper,
    MotionConfig: Wrapper,
  };
});

const record: ScoreRecord = {
  id: "other-tab",
  category: "clubs",
  difficulty: "medium",
  mode: "classic",
  score: 4000,
  accuracy: 100,
  bestStreak: 10,
  date: "2025-12-31T12:00:00.000Z",
};

describe("Sekmeler arası rekorlar", () => {
  it("uygulama açıldığında depoya eski bir kayıt dizisi yazmaz", () => {
    const write = vi.spyOn(Storage.prototype, "setItem");
    render(<App />);
    expect(write).not.toHaveBeenCalled();
  });

  it("storage olaylarını dinler ve daha düşük eşzamanlı yazmayı en iyi rekorla onarır", () => {
    render(<App />);
    const high = JSON.stringify([record]);
    act(() => {
      localStorage.setItem(STORAGE_KEY, high);
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: STORAGE_KEY,
          newValue: high,
          storageArea: localStorage,
        }),
      );
    });
    expect(screen.getByText("4.000 puan")).toBeTruthy();
    const low = JSON.stringify([{ ...record, id: "stale", score: 0 }]);
    act(() => {
      localStorage.setItem(STORAGE_KEY, low);
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: STORAGE_KEY,
          oldValue: high,
          newValue: low,
          storageArea: localStorage,
        }),
      );
    });
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual([record]);
    expect(screen.getByText("4.000 puan")).toBeTruthy();
    act(() => {
      localStorage.clear();
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: null,
          newValue: null,
          storageArea: localStorage,
        }),
      );
    });
    expect(screen.getByText("İlk rekorunu yaz.")).toBeTruthy();
  });
});

describe.each([
  ["yardım", "Nasıl oynanır?"],
  ["ayrılma", "Maçtan ayrıl"],
])("%s penceresi", (_name, trigger) => {
  it("soru süresi dolduğunda odağı içeride tutar ve kapanınca geri verir", async () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(
      screen.getByRole("button", { name: "Hemen oyna" }),
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Başlama vuruşu" }),
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(300);
    });
    const opener = screen.getByRole("button", { name: trigger });
    opener.focus();
    fireEvent.click(opener);
    const dialog = screen.getByRole("dialog");
    expect(document.querySelector(".main-wrap")?.hasAttribute("inert")).toBe(
      true,
    );
    expect(document.querySelector(".sidebar")?.hasAttribute("inert")).toBe(
      true,
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(15_100);
    });
    expect(document.querySelector(".answer-feedback")).not.toBeNull();
    expect(dialog.contains(document.activeElement)).toBe(true);
    document.querySelector<HTMLElement>("#question-title")?.focus();
    expect(dialog.contains(document.activeElement)).toBe(true);
    (document.activeElement as HTMLElement).blur();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(dialog.contains(document.activeElement)).toBe(true);
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(dialog.contains(document.activeElement)).toBe(true);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.querySelector(".main-wrap")?.hasAttribute("inert")).toBe(
      false,
    );
    expect(document.activeElement).toBe(opener);
  });
});
