import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  getLocale,
  hasLocaleSelection,
  initializeLocale,
  setLocale,
  subscribeLocale,
} from "$lib/application/locale";

function memoryStorage(initial: Record<string, string> = {}): Storage {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
    clear: () => values.clear(),
    key: (index) => [...values.keys()][index] ?? null,
    get length() {
      return values.size;
    },
  };
}

let previousWindow: PropertyDescriptor | undefined;

beforeEach(() => {
  previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
});

afterEach(() => {
  if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
  else Reflect.deleteProperty(globalThis, "window");
});

describe("locale preferences", () => {
  it("defaults to Korean without marking first-run setup complete", () => {
    initializeLocale(memoryStorage());

    expect(getLocale()).toBe("ko");
    expect(hasLocaleSelection()).toBe(false);
  });

  it("restores a saved locale and notifies subscribers when it changes", () => {
    const storage = memoryStorage({ "beaura.locale": "en" });
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { localStorage: storage, sessionStorage: memoryStorage() },
    });
    initializeLocale(storage);
    const observed: string[] = [];
    const unsubscribe = subscribeLocale((value) => observed.push(value));

    expect(getLocale()).toBe("en");
    expect(hasLocaleSelection()).toBe(true);
    setLocale("ko");
    unsubscribe();

    expect(observed).toEqual(["en", "ko"]);
    expect(storage.getItem("beaura.locale")).toBe("ko");
  });

  it("falls back to session storage when persistent storage is blocked", () => {
    const sessionStorage = memoryStorage();
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        get localStorage(): Storage {
          throw new Error("blocked");
        },
        sessionStorage,
      },
    });

    expect(setLocale("en")).toBe(true);
    expect(sessionStorage.getItem("beaura.locale")).toBe("en");
    initializeLocale();
    expect(getLocale()).toBe("en");
    expect(hasLocaleSelection()).toBe(true);
  });
});
