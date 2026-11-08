// Shared types for the whole app.
// A `type` only describes the shape of data so TypeScript can check our code.
// It disappears when the code runs (closest thing in Java: an interface).

/** The two languages the page supports. */
export type Lang = "de" | "en";

/** A text in both languages, e.g. { de: "Bier", en: "Beer" }. */
export type Localized = Record<Lang, string>;

/** The buttons at the top of the menu. Add a new one here AND in GROUPS (src/content/menu.ts). */
export type MenuGroup =
  | "beer"
  | "cider"
  | "whisky"
  | "cocktails"
  | "shots"
  | "wine"
  | "soft"
  | "hot"
  | "food";

/** The headings on the menu. Add a new one here AND in CATEGORIES (src/content/menu.ts). */
export type Category =
  // beer
  | "draught"
  | "bottled"
  | "beer-mix"
  | "irish-beer-mix"
  | "pitcher"
  // cider
  | "cider"
  | "cider-mix"
  // whisky
  | "whisky"
  | "single-malt"
  | "scotch"
  | "irish-whiskey"
  | "whisky-mix"
  // cocktails
  | "cocktail"
  | "longdrink"
  // shots
  | "shot"
  | "shooter"
  // wine
  | "wine"
  | "sparkling"
  // soft
  | "soft"
  | "juice"
  | "mocktail"
  // hot
  | "hot"
  // food
  | "pub-grub"
  | "pizza"
  | "flammkuchen"
  | "toast"
  | "salad";

/**
 * A text that is either the same in both languages ("Guinness", "0,5 l")
 * or different per language ({ de: "Apfelsaft", en: "Apple juice" }).
 */
export type Translatable = string | Localized;

/** One price on the menu: "0,5 l", "4 cl", { de: "Klein", en: "Small" } … */
export type Serving = {
  label?: Translatable;
  price: number;
};

/** Codes from the paper menu's legend: numbers = additives, letters = allergens. */
export type Code =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I";

/** Anything on the menu, food or drink. */
export type MenuItem = {
  id: string;
  name: Translatable;
  category: Category;
  /** Optional short line under the name. */
  description?: Localized;
  /** Allergen and additive codes, e.g. ["3", "A"]. */
  codes?: Code[];
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

export type Page = "menu" | "events" | "hours";
