import type { MenuItem, Serving } from "../../types";

// Group "Alkoholfrei": soft drinks, juices and alcohol-free cocktails.

const BOTTLE_033 = { de: "Flasche 0,33 l", en: "Bottle 0,33 l" };

/** For Small and large glasses. */
function glasses(price02: number, price04: number): Serving[] {
  return [
    { label: "0,2 l", price: price02 },
    { label: "0,4 l", price: price04 },
  ];
}

/** Every juice: 0,4 l for 4,50 €. */
const JUICE: Serving[] = [{ label: "0,4 l", price: 4.5 }];

export const soft: MenuItem[] = [
  // --- Alkoholfreie Getränke ---
  {
    id: "bitter-lemon",
    name: "Bitter Lemon",
    category: "soft",
    codes: ["2", "8"],
    servings: glasses(3.5, 4.5),
  },
  {
    id: "miranda",
    name: "Miranda",
    category: "soft",
    description: { de: "Orangen-Limonade", en: "Orange soda" },
    servings: glasses(2.9, 3.9),
  },
  {
    id: "cola",
    name: "Cola",
    category: "soft",
    codes: ["1", "3", "5", "8"],
    servings: glasses(2.9, 3.9),
  },
  {
    id: "cola-zero",
    name: "Cola Zero",
    category: "soft",
    codes: ["1", "3", "4", "6"],
    servings: glasses(2.9, 3.9),
  },
  {
    id: "red-bull",
    name: "Red Bull",
    category: "soft",
    codes: ["1", "3"],
    servings: [{ label: "0,25 l", price: 4.5 }],
  },
  {
    id: "ginger-ale",
    name: "Ginger Ale",
    category: "soft",
    codes: ["3"],
    servings: glasses(3.5, 4.5),
  },
  {
    id: "spezi",
    name: { de: "Spezi", en: "Spezi (cola & orange soda)" },
    category: "soft",
    codes: ["1", "3", "8"],
    servings: glasses(2.9, 3.9),
  },
  {
    id: "tonic-water",
    name: "Tonic Water",
    category: "soft",
    codes: ["2"],
    servings: glasses(3.5, 4.5),
  },
  {
    id: "zitronen-limonade",
    name: { de: "Zitronen-Limonade", en: "Lemon soda" },
    category: "soft",
    servings: glasses(2.9, 3.9),
  },
  {
    id: "elephant-bay",
    name: { de: "Elephant Bay Eistee", en: "Elephant Bay iced tea" },
    category: "soft",
    description: { de: "Pfirsich, Granatapfel", en: "Peach, pomegranate" },
    servings: [{ label: BOTTLE_033, price: 3.9 }],
  },
  {
    id: "bionade-holunder",
    name: { de: "Bionade Holunder", en: "Bionade elderflower" },
    category: "soft",
    servings: [{ label: BOTTLE_033, price: 3.9 }],
  },
  {
    id: "teinacher",
    name: { de: "Teinacher Mineralwasser", en: "Teinacher mineral water" },
    category: "soft",
    description: {
      de: "Still oder mit Kohlensäure",
      en: "Still or sparkling",
    },
    servings: [
      { label: "0,2 l", price: 2.5 },
      { label: "0,4 l", price: 3.5 },
      { label: { de: "Flasche 1 l", en: "Bottle 1 l" }, price: 6.0 },
    ],
  },
  {
    id: "bundaberg",
    name: "Bundaberg Ginger Brew",
    category: "soft",
    codes: ["6", "8"],
    servings: [{ label: BOTTLE_033, price: 4.0 }],
  },

  // --- Säfte ---
  {
    id: "apfelsaft",
    name: { de: "Apfelsaft", en: "Apple juice" },
    category: "juice",
    servings: JUICE,
  },
  {
    id: "ananassaft",
    name: { de: "Ananassaft", en: "Pineapple juice" },
    category: "juice",
    servings: JUICE,
  },
  {
    id: "bananen-nektar",
    name: { de: "Bananen-Nektar", en: "Banana nectar" },
    category: "juice",
    servings: JUICE,
  },
  {
    id: "cranberry-nektar",
    name: { de: "Cranberry-Nektar", en: "Cranberry nectar" },
    category: "juice",
    codes: ["3"],
    servings: JUICE,
  },
  {
    id: "johannisbeer-nektar",
    name: { de: "Johannisbeer-Nektar", en: "Blackcurrant nectar" },
    category: "juice",
    servings: JUICE,
  },
  {
    id: "kiba",
    name: { de: "Kiba", en: "Kiba (cherry & banana)" },
    category: "juice",
    servings: JUICE,
  },
  {
    id: "kirsch-nektar",
    name: { de: "Kirsch-Nektar", en: "Cherry nectar" },
    category: "juice",
    servings: JUICE,
  },
  {
    id: "mango-nektar",
    name: { de: "Mango-Nektar", en: "Mango nectar" },
    category: "juice",
    servings: JUICE,
  },
  {
    id: "maracuja-nektar",
    name: { de: "Maracuja-Nektar", en: "Passion fruit nectar" },
    category: "juice",
    servings: JUICE,
  },
  {
    id: "orangensaft",
    name: { de: "Orangensaft", en: "Orange juice" },
    category: "juice",
    servings: JUICE,
  },
  {
    id: "saftschorle",
    name: { de: "Saftschorle", en: "Juice spritzer" },
    category: "juice",
    servings: [
      { label: "0,2 l", price: 2.8 },
      { label: "0,4 l", price: 3.9 },
    ],
  },

  // --- Alkoholfreie Cocktails ---
  {
    id: "babouin",
    name: "Babouin",
    category: "mocktail",
    description: {
      de: "Kirsch- & Maracuja-Nektar, Ananas-, Zitronen- & Orangensaft",
      en: "Cherry & passion fruit nectar, pineapple, lemon & orange juice",
    },
    codes: ["8"],
    servings: [{ label: "0,3 l", price: 7.5 }],
  },
  {
    id: "bahamas",
    name: "Bahamas",
    category: "mocktail",
    description: {
      de: "Apfelsaft, Zitronensaft, Grenadine",
      en: "Apple juice, lemon juice, grenadine",
    },
    codes: ["3"],
    servings: [{ label: "0,3 l", price: 7.5 }],
  },
  {
    id: "irish-cooler",
    name: "Irish Cooler",
    category: "mocktail",
    description: {
      de: "Zitronensaft, Ginger Ale, Zuckersirup",
      en: "Lemon juice, ginger ale, sugar syrup",
    },
    codes: ["3"],
    servings: [{ label: "0,3 l", price: 7.5 }],
  },
  {
    id: "surprise-surprise",
    name: "Surprise-Surprise",
    category: "mocktail",
    description: {
      de: "Alkoholfreie Überraschung",
      en: "An alcohol-free surprise",
    },
    servings: [{ label: "0,3 l", price: 7.5 }],
  },
];
