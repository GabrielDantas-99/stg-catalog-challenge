import Cookies from "js-cookie";

const CACHE_KEYS = {
  THEME: "stg-theme",
  USER_PREFERENCES: "stg-user-prefs",
  CART_CACHE: "stg-cart-cache",
  SEARCH_HISTORY: "stg-search-history",
} as const;

export const themeCache = {
  get: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(CACHE_KEYS.THEME);
    }
    return null;
  },
  set: (theme: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CACHE_KEYS.THEME, theme);
    }
  },
  remove: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(CACHE_KEYS.THEME);
    }
  },
};

export const userPrefsCache = {
  get: () => {
    const prefs = Cookies.get(CACHE_KEYS.USER_PREFERENCES);
    return prefs ? JSON.parse(prefs) : null;
  },
  set: (preferences: any) => {
    Cookies.set(CACHE_KEYS.USER_PREFERENCES, JSON.stringify(preferences), {
      expires: 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },
  remove: () => {
    Cookies.remove(CACHE_KEYS.USER_PREFERENCES);
  },
};

export const searchCache = {
  get: (): string[] => {
    if (typeof window !== "undefined") {
      const history = localStorage.getItem(CACHE_KEYS.SEARCH_HISTORY);
      return history ? JSON.parse(history) : [];
    }
    return [];
  },
  add: (searchTerm: string) => {
    if (typeof window !== "undefined") {
      const history = searchCache.get();
      const updatedHistory = [
        searchTerm,
        ...history.filter((term) => term !== searchTerm),
      ].slice(0, 10);
      localStorage.setItem(
        CACHE_KEYS.SEARCH_HISTORY,
        JSON.stringify(updatedHistory)
      );
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(CACHE_KEYS.SEARCH_HISTORY);
    }
  },
};

export const cartCache = {
  get: () => {
    const cart = Cookies.get(CACHE_KEYS.CART_CACHE);
    return cart ? JSON.parse(cart) : null;
  },
  set: (cartData: any) => {
    Cookies.set(CACHE_KEYS.CART_CACHE, JSON.stringify(cartData), {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },
  remove: () => {
    Cookies.remove(CACHE_KEYS.CART_CACHE);
  },
};
