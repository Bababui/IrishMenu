// Shared types for the whole app.
// A `type` only describes the shape of data so TypeScript can check our code.
// It disappears when the code runs (closest thing in Java: an interface).

/** The two languages the page supports. */
export type Lang = "de" | "en";

/** A text in both languages, e.g. { de: "Bier", en: "Beer" }. */
export type Localized = Record<Lang, string>;

/** Menu categories. Add a new one here AND in CATEGORIES (src/content/menu.ts). */
export type Category =
  "beer" | "cider" | "whiskey" | "longdrink" | "cocktail" | "soft" | "hot";

/** One size + price, e.g. { size: "0,5 l", price: 6.5 }. */
export type Serving = {
  size?: string;
  price: number;
};

export type Drink = {
  id: string;
  name: string;
  category: Category;
  /** Optional short line under the name. */
  description?: Localized;
  /** One or more sizes. Most drinks have one, draught beer often two. */
  servings: Serving[];
};

/** 0 = Sunday, 1 = Monday ... 6 = Saturday (same numbering as JavaScript's Date). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * A special offer. It shows up on a given date ("2026-10-27"),
 * or every week on the given weekdays, or both.
 */
export type Offer = {
  id: string;
  title: Localized;
  note?: Localized;
  /** Special price, if there is one. */
  price?: number;
  /** Regular price, shown crossed out next to the special price. */
  regularPrice?: number;
  dates?: string[];
  weekdays?: Weekday[];
};

export type PubEvent = {
  id: string;
  /** Date as "YYYY-MM-DD". */
  date: string;
  /** Start time as "HH:MM". */
  time?: string;
  title: Localized;
  description?: Localized;
};

/** Opening hours for one day, e.g. { open: "17:00", close: "01:00" }. Closing after midnight is fine. */
export type DayHours = { open: string; close: string } | null;

/** Opening hours for the week, index = Weekday (0 = Sunday). `null` = closed that day. */
export type WeekHours = [
  DayHours,
  DayHours,
  DayHours,
  DayHours,
  DayHours,
  DayHours,
  DayHours,
];

export type PubInfo = {
  name: string;
  town: string;
  tagline: Localized;
  address: { street: string; city: string };
  /** Link that opens the address in a maps app. */
  mapsUrl: string;
  /** Phone number as people write it, e.g. "07131 123456". */
  phone?: string;
  instagram: string;
  hours: WeekHours;
  legal: { imprintUrl: string; privacyUrl: string };
};
