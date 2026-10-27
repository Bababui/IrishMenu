import type { MenuItem, Serving } from "../../types";

// Group "Cider": cider and cider mixes. Copied from the printed menu.

const BOTTLE_033 = { de: "Flasche 0,33 l", en: "Bottle 0,33 l" };
const BOTTLE_05 = { de: "Flasche 0,5 l", en: "Bottle 0,5 l" };

/** Every cider mix has the same three sizes and prices. */
const MIX: Serving[] = [
  { label: "0,2 l", price: 3.0 },
  { label: "0,3 l", price: 3.9 },
  { label: "0,5 l", price: 6.5 },
];

export const cider: MenuItem[] = [
  // --- Cider ---
  {
    id: "stowford",
    name: "Stowford",
    category: "cider",
    codes: ["C"],
    servings: MIX,
  },
  {
    id: "somersby",
    name: "Somersby",
    category: "cider",
    description: { de: "Verschiedene Sorten", en: "Various flavours" },
    servings: [{ label: BOTTLE_033, price: 4.5 }],
  },
  {
    id: "bulmers",
    name: "Bulmers",
    category: "cider",
    description: {
      de: "Apfel, Birne, Red Berry",
      en: "Apple, pear, red berry",
    },
    servings: [{ label: BOTTLE_05, price: 6.5 }],
  },

  // --- Cider-Mix ---
  {
    id: "cider-red",
    name: "Cider Red",
    category: "cider-mix",
    description: { de: "Cider, Himbeersirup", en: "Cider, raspberry syrup" },
    codes: ["3", "C"],
    servings: MIX,
  },
  {
    id: "cider-green",
    name: "Cider Green",
    category: "cider-mix",
    description: {
      de: "Cider, Waldmeistersirup",
      en: "Cider, woodruff syrup",
    },
    codes: ["3", "C"],
    servings: MIX,
  },
  {
    id: "cider-black",
    name: "Cider Black",
    category: "cider-mix",
    description: {
      de: "Cider, Johannisbeer-Nektar",
      en: "Cider, blackcurrant nectar",
    },
    codes: ["C"],
    servings: MIX,
  },
  {
    id: "cider-cherry",
    name: "Cider Cherry",
    category: "cider-mix",
    description: { de: "Cider, Kirschsirup", en: "Cider, cherry syrup" },
    codes: ["C"],
    servings: MIX,
  },
  {
    id: "cider-strawberry",
    name: "Cider Strawberry",
    category: "cider-mix",
    description: {
      de: "Cider, Erdbeersirup",
      en: "Cider, strawberry syrup",
    },
    codes: ["3", "C"],
    servings: MIX,
  },
  {
    id: "snakebite",
    name: "Snakebite",
    category: "cider-mix",
    description: { de: "Cider, Bier", en: "Cider, beer" },
    codes: ["A", "C"],
    servings: MIX,
  },
  {
    id: "snakebite-red",
    name: "Snakebite Red",
    category: "cider-mix",
    description: {
      de: "Cider, Bier, Himbeersirup",
      en: "Cider, beer, raspberry syrup",
    },
    codes: ["3", "A", "C"],
    servings: MIX,
  },
  {
    id: "snakebite-green",
    name: "Snakebite Green",
    category: "cider-mix",
    description: {
      de: "Cider, Bier, Waldmeistersirup",
      en: "Cider, beer, woodruff syrup",
    },
    codes: ["3", "A", "C"],
    servings: MIX,
  },
  {
    id: "snakebite-black",
    name: "Snakebite Black",
    category: "cider-mix",
    description: {
      de: "Cider, Bier, Johannisbeer-Nektar",
      en: "Cider, beer, blackcurrant nectar",
    },
    codes: ["A", "C"],
    servings: MIX,
  },
  {
    id: "snakebite-cherry",
    name: "Snakebite Cherry",
    category: "cider-mix",
    description: {
      de: "Cider, Bier, Kirschsirup",
      en: "Cider, beer, cherry syrup",
    },
    codes: ["A", "C"],
    servings: MIX,
  },
  {
    id: "snakebite-strawberry",
    name: "Snakebite Strawberry",
    category: "cider-mix",
    description: {
      de: "Cider, Bier, Erdbeersirup",
      en: "Cider, beer, strawberry syrup",
    },
    codes: ["3", "A", "C"],
    servings: MIX,
  },
];
