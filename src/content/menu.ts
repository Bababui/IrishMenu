import type { Category, Drink, Localized } from "../types";

/** Category order and labels for the filter buttons and headings. */
export const CATEGORIES: { id: Category; label: Localized }[] = [
  { id: "beer", label: { de: "Bier", en: "Beer" } },
  { id: "cider", label: { de: "Cider", en: "Cider" } },
  { id: "whiskey", label: { de: "Whiskey", en: "Whiskey" } },
  { id: "longdrink", label: { de: "Longdrinks", en: "Long drinks" } },
  { id: "cocktail", label: { de: "Cocktails", en: "Cocktails" } },
  { id: "soft", label: { de: "Alkoholfrei", en: "Soft drinks" } },
  { id: "hot", label: { de: "Heißgetränke", en: "Hot drinks" } },
];

// ⚠️ EXAMPLE CONTENT: replace with the pub's real menu and prices before launch.
export const drinks: Drink[] = [
  {
    id: "guinness",
    name: "Guinness",
    category: "beer",
    description: { de: "Irish Stout vom Fass", en: "Irish stout on draught" },
    servings: [
      { size: "0,3 l", price: 4.2 },
      { size: "0,5 l", price: 6.5 },
    ],
  },
  {
    id: "kilkenny",
    name: "Kilkenny",
    category: "beer",
    description: {
      de: "Irish Red Ale vom Fass",
      en: "Irish red ale on draught",
    },
    servings: [
      { size: "0,3 l", price: 4.0 },
      { size: "0,5 l", price: 6.2 },
    ],
  },
  {
    id: "harp",
    name: "Harp Lager",
    category: "beer",
    servings: [
      { size: "0,3 l", price: 3.8 },
      { size: "0,5 l", price: 5.6 },
    ],
  },
  {
    id: "export",
    name: "Export",
    category: "beer",
    description: { de: "Aus der Region", en: "Local brew" },
    servings: [{ size: "0,5 l", price: 4.6 }],
  },
  {
    id: "magners",
    name: "Magners Original",
    category: "cider",
    servings: [{ size: "0,568 l", price: 6.4 }],
  },
  {
    id: "jameson",
    name: "Jameson",
    category: "whiskey",
    description: { de: "Irish Whiskey, Blend", en: "Irish whiskey, blend" },
    servings: [{ size: "4 cl", price: 6.0 }],
  },
  {
    id: "redbreast",
    name: "Redbreast 12",
    category: "whiskey",
    description: { de: "Single Pot Still", en: "Single pot still" },
    servings: [{ size: "4 cl", price: 9.5 }],
  },
  {
    id: "teeling",
    name: "Teeling Small Batch",
    category: "whiskey",
    servings: [{ size: "4 cl", price: 7.5 }],
  },
  {
    id: "gin-tonic",
    name: "Gin Tonic",
    category: "longdrink",
    servings: [{ size: "4 cl", price: 8.5 }],
  },
  {
    id: "whiskey-cola",
    name: "Whiskey Cola",
    category: "longdrink",
    servings: [{ size: "4 cl", price: 8.0 }],
  },
  {
    id: "irish-mule",
    name: "Irish Mule",
    category: "cocktail",
    description: {
      de: "Irish Whiskey, Ginger Beer, Limette",
      en: "Irish whiskey, ginger beer, lime",
    },
    servings: [{ price: 9.5 }],
  },
  {
    id: "mojito",
    name: "Mojito",
    category: "cocktail",
    servings: [{ price: 9.0 }],
  },
  {
    id: "cola",
    name: "Cola",
    category: "soft",
    servings: [{ size: "0,4 l", price: 3.9 }],
  },
  {
    id: "apfelschorle",
    name: "Apfelschorle",
    category: "soft",
    servings: [{ size: "0,4 l", price: 3.8 }],
  },
  {
    id: "guinness-00",
    name: "Guinness 0.0",
    category: "soft",
    description: { de: "Alkoholfrei", en: "Alcohol-free" },
    servings: [{ size: "0,44 l", price: 4.9 }],
  },
  {
    id: "irish-coffee",
    name: "Irish Coffee",
    category: "hot",
    description: {
      de: "Kaffee, Irish Whiskey, Sahne",
      en: "Coffee, Irish whiskey, cream",
    },
    servings: [{ price: 7.5 }],
  },
  {
    id: "tea",
    name: "Tee",
    category: "hot",
    servings: [{ price: 2.8 }],
  },
];
