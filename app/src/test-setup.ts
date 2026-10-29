import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

window.matchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: query === "(prefers-reduced-motion)",
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));
window.scrollTo = vi.fn();
HTMLElement.prototype.scrollIntoView = vi.fn();

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  window.localStorage.clear();
  vi.restoreAllMocks();
});
