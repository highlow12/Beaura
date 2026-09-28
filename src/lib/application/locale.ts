import { writable } from "svelte/store";

export type Locale = "ko" | "en";

const STORAGE_KEY = "beaura.locale";

let currentLocale: Locale = "ko";
let localeWasSelected = false;

const localeStore = writable<Locale>(currentLocale);

/** Reactive locale store for Svelte components. */
export const locale = {
  subscribe: localeStore.subscribe,
};

function parseLocale(value: string | null | undefined): Locale | null {
  return value === "ko" || value === "en" ? value : null;
}

/** Load the saved choice. Call on the client after mounting. */
export function initializeLocale(storage?: Storage | null): Locale {
  let selected: Locale | null = null;
  try {
    const target =
      storage === undefined
        ? typeof window === "undefined"
          ? null
          : window.localStorage
        : storage;
    selected = parseLocale(target?.getItem(STORAGE_KEY));
  } catch {
    // Fall back to session storage when persistent storage is blocked.
  }
  if (selected === null && storage === undefined && typeof window !== "undefined") {
    try {
      selected = parseLocale(window.sessionStorage.getItem(STORAGE_KEY));
    } catch {
      // Language selection still works for the current page when storage is blocked.
    }
  }

  currentLocale = selected ?? "ko";
  localeWasSelected = selected !== null;
  localeStore.set(currentLocale);
  if (typeof document !== "undefined") document.documentElement.lang = currentLocale;
  return currentLocale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function hasLocaleSelection(): boolean {
  return localeWasSelected;
}

export function setLocale(nextLocale: Locale): boolean {
  currentLocale = nextLocale;
  localeWasSelected = true;
  localeStore.set(nextLocale);
  if (typeof document !== "undefined") document.documentElement.lang = nextLocale;
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    return true;
  } catch {
    // Try session storage so a reload does not reopen first-run setup.
  }
  try {
    window.sessionStorage.setItem(STORAGE_KEY, nextLocale);
    return true;
  } catch {
    // Keep the choice in memory for this page if browser storage is blocked.
    return false;
  }
}

export function subscribeLocale(run: (value: Locale) => void): () => void {
  return locale.subscribe(run);
}

export function t(korean: string, english: string, selectedLocale = currentLocale): string {
  return selectedLocale === "en" ? english : korean;
}
