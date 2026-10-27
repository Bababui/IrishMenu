import type { MenuItem } from "../../types";

// Group "Wein": German wines and sparkling wine. Copied from the printed menu.

const GLASS_025 = { de: "Glas 0,25 l", en: "Glass 0,25 l" };
const GLASS_02 = { de: "Glas 0,2 l", en: "Glass 0,2 l" };
const BOTTLE_1 = { de: "Flasche 1 l", en: "Bottle 1 l" };

export const wine: MenuItem[] = [
  // --- Deutsche Qualitätsweine ---
  {
    id: "rotwein",
    name: { de: "Rotwein", en: "Red wine" },
    category: "wine",
    description: {
      de: "Württ. Trollinger mit Lemberger",
      en: "Württemberg Trollinger with Lemberger",
    },
    codes: ["C"],
    servings: [
      { label: GLASS_025, price: 4.9 },
      { label: BOTTLE_1, price: 16.9 },
    ],
  },
  {
    id: "weisswein",
    name: { de: "Weißwein", en: "White wine" },
    category: "wine",
    description: { de: "Württ. Riesling", en: "Württemberg Riesling" },
    codes: ["C"],
    servings: [
      { label: GLASS_025, price: 4.9 },
      { label: BOTTLE_1, price: 16.9 },
    ],
  },
  {
    id: "rose",
    name: "Rosé",
    category: "wine",
    description: { de: "Württ. Weißherbst", en: "Württemberg Weißherbst" },
    codes: ["C"],
    servings: [
      { label: GLASS_025, price: 4.9 },
      { label: BOTTLE_1, price: 16.9 },
    ],
  },
  {
    id: "weinschorle",
    name: { de: "Weinschorle", en: "Wine spritzer" },
    category: "wine",
    description: { de: "Nach Wunsch", en: "As you like it" },
    codes: ["C"],
    servings: [{ label: GLASS_025, price: 3.9 }],
  },
  {
    id: "weinschorle-bottle",
    name: {
      de: "Weinschorle Ice Lemon / Energy",
      en: "Wine spritzer Ice Lemon / Energy",
    },
    category: "wine",
    servings: [
      { label: { de: "Flasche 0,275 l", en: "Bottle 0,275 l" }, price: 4.2 },
    ],
  },

  // --- Schaum- & Perlweine ---
  {
    id: "sekt-rotkaeppchen",
    name: { de: "Sekt „Rotkäppchen“", en: "Rotkäppchen sparkling wine" },
    category: "sparkling",
    codes: ["C"],
    servings: [
      { label: GLASS_02, price: 4.0 },
      { label: { de: "Flasche 0,75 l", en: "Bottle 0,75 l" }, price: 17.9 },
    ],
  },
  {
    id: "prosecco",
    name: "Prosecco",
    category: "sparkling",
    servings: [{ label: GLASS_02, price: 3.5 }],
  },
];
