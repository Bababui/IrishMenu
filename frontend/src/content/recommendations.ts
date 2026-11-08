import type { Category, Localized } from "../types";

// "Unsere Empfehlung": three drinks the pub recommends, shown right under the sign.
// Each one is looked up on the live menu by name and heading, so the price is always
// the current one. If a drink is removed from the menu, its card disappears by itself.
// To change a recommendation, change this list (the boss can use specials for one-off tips).

export type Recommendation = {
  /** Exactly as on the menu */
  name: string;
  category: Category;
  /** Which little illustration to show */
  glass: "stout" | "lager" | "hops";
  note: Localized;
};

export const recommendations: Recommendation[] = [
  {
    name: "Guinness",
    category: "draught",
    glass: "stout",
    note: { de: "Irish Stout vom Fass", en: "Irish stout on draught" },
  },
  {
    name: "Käthchenbier",
    category: "draught",
    glass: "lager",
    note: { de: "Vom Fass", en: "On draught" },
  },
  {
    name: "Hop House 13",
    category: "draught",
    glass: "hops",
    note: { de: "Irish Lager vom Fass", en: "Irish lager on draught" },
  },
];
