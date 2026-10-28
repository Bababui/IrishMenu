import type { MenuItem } from "../../types";

// Group "Heißgetränke"

export const hot: MenuItem[] = [
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "hot",
    codes: ["B"],
    servings: [{ price: 3.8 }],
  },
  {
    id: "espresso",
    name: "Espresso",
    category: "hot",
    servings: [{ price: 2.9 }],
  },
  {
    id: "heisse-schokolade",
    name: { de: "Heiße Schokolade", en: "Hot chocolate" },
    category: "hot",
    codes: ["A", "B"],
    servings: [{ price: 3.8 }],
  },
  {
    id: "heisse-schokolade-baileys",
    name: {
      de: "Heiße Schokolade mit Bailey's",
      en: "Hot chocolate with Bailey's",
    },
    category: "hot",
    codes: ["B"],
    servings: [{ price: 7.0 }],
  },
  {
    id: "hot-toddy",
    name: "Hot Toddy",
    category: "hot",
    description: {
      de: "2 cl Whisky, Honig, Zitrone, heißes Wasser",
      en: "2 cl whisky, honey, lemon, hot water",
    },
    servings: [{ price: 7.0 }],
  },
  {
    id: "irish-coffee",
    name: "Irish Coffee",
    category: "hot",
    description: { de: "Mit 2 cl Whisky", en: "With 2 cl whisky" },
    codes: ["B"],
    servings: [{ price: 7.0 }],
  },
  {
    id: "kaffee",
    name: { de: "Kaffee", en: "Coffee" },
    category: "hot",
    servings: [{ price: 3.4 }],
  },
  {
    id: "latte-macchiato",
    name: "Latte Macchiato",
    category: "hot",
    codes: ["B"],
    servings: [{ price: 3.8 }],
  },
  {
    id: "tee",
    name: { de: "Tee", en: "Tea" },
    category: "hot",
    description: { de: "Verschiedene Sorten", en: "Various kinds" },
    codes: ["3"],
    servings: [{ price: 2.8 }],
  },
];
