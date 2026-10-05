import { describe, expect, it, vi } from "vitest";
import {
  createThemeRuntimeChange,
  emitThemeChange,
  readThemeChoice,
  resolveTheme,
  setThemePreference,
  subscribeThemeChanges,
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  writeThemeChoice,
} from "$lib/application/theme";

function storage(initial?: string): Storage {
  let value = initial ?? null;
  return {
    getItem: (key) => key === THEME_STORAGE_KEY ? value : null,
    setItem: (key, next) => { if (key === THEME_STORAGE_KEY) value = next; },
    removeItem: (key) => { if (key === THEME_STORAGE_KEY) value = null; },
    clear: () => { value = null; },
    key: () => null,
    get length() { return value === null ? 0 : 1; },
  };
}

describe("theme preference", () => {
  it("uses system when no explicit preference exists", () => {
    expect(readThemeChoice(storage())).toBe("system");
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
  });

  it("persists explicit choices and clears them for system", () => {
    const target = storage();
    writeThemeChoice(target, "dark");
    expect(readThemeChoice(target)).toBe("dark");
    expect(resolveTheme(readThemeChoice(target), false)).toBe("dark");
    writeThemeChoice(target, "system");
    expect(readThemeChoice(target)).toBe("system");
  });

  it("ignores malformed values", () => {
    expect(readThemeChoice(storage("midnight"))).toBe("system");
  });

  it("keeps runtime theme controls synchronized through one event", () => {
    const target = new EventTarget();
    vi.stubGlobal("window", target);
    try {
      const changes: ReturnType<typeof createThemeRuntimeChange>[] = [];
      const unsubscribe = subscribeThemeChanges((change) => changes.push(change));

      emitThemeChange(createThemeRuntimeChange("system", true));
      expect(changes).toEqual([{ choice: "system", theme: "dark" }]);

      target.dispatchEvent(
        new CustomEvent(THEME_CHANGE_EVENT, {
          detail: { choice: "midnight", theme: "dark" },
        }),
      );
      expect(changes).toEqual([{ choice: "system", theme: "dark" }]);

      unsubscribe();
      emitThemeChange(createThemeRuntimeChange("light", true));
      expect(changes).toEqual([{ choice: "system", theme: "dark" }]);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it.each(["getter", "setItem"] as const)(
    "applies and broadcasts a theme when localStorage %s fails",
    (failure) => {
      const target = new EventTarget();
      Object.defineProperty(target, "matchMedia", {
        value: () => ({ matches: false }),
      });
      if (failure === "getter") {
        Object.defineProperty(target, "localStorage", {
          get: () => {
            throw new Error("storage is blocked");
          },
        });
      } else {
        const blockedStorage = storage();
        blockedStorage.setItem = () => {
          throw new Error("storage is blocked");
        };
        Object.defineProperty(target, "localStorage", {
          value: blockedStorage,
        });
      }

      const meta = { setAttribute: vi.fn() };
      const documentMock = {
        documentElement: {
          dataset: {} as Record<string, string>,
          style: { colorScheme: "" },
        },
        querySelector: vi.fn(() => meta),
      };
      vi.stubGlobal("window", target);
      vi.stubGlobal("document", documentMock);
      try {
        const changes: ReturnType<typeof createThemeRuntimeChange>[] = [];
        const unsubscribe = subscribeThemeChanges((change) =>
          changes.push(change),
        );

        expect(setThemePreference("dark")).toBe("dark");
        expect(documentMock.documentElement.dataset.theme).toBe("dark");
        expect(documentMock.documentElement.style.colorScheme).toBe("dark");
        expect(meta.setAttribute).toHaveBeenCalledWith("content", "#111714");
        expect(changes).toEqual([{ choice: "dark", theme: "dark" }]);

        unsubscribe();
      } finally {
        vi.unstubAllGlobals();
      }
    },
  );
});
