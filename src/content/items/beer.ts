import type { MenuItem } from "../../types";

// Group "Bier": draught, bottled, beer mixes, Irish beer mixes,
// and the big sizes (Maß, pitcher, 3-litre tower).
// Copied from the printed menu. "TODO(check)" = could not be read for sure.

const STEIN = { de: "Maß 1 l", en: "Stein 1 l" };
const PITCHER = "Pitcher 1,5 l";
const TOWER = { de: "Säule 3 l", en: "Tower 3 l" };
const SEE_SOFT_DRINKS = {
  de: "Zusatzstoffe: siehe Alkoholfreie Getränke",
  en: "Additives: see soft drinks",
};

export const beer: MenuItem[] = [
  // --- Bier vom Fass ---
  {
    id: "guinness",
    name: "Guinness",
    category: "draught",
    description: { de: "Irish Stout", en: "Irish stout" },
    codes: ["A"],
    servings: [
      { label: "0,2 l", price: 3.0 },
      { label: "0,3 l", price: 3.9 },
      { label: "0,5 l", price: 6.5 },
    ],
  },
  {
    id: "kilkenny",
    name: "Kilkenny",
    category: "draught",
    description: { de: "Irish Red Ale", en: "Irish red ale" },
    codes: ["A"],
    servings: [
      { label: "0,2 l", price: 3.0 },
      { label: "0,3 l", price: 3.9 },
      { label: "0,5 l", price: 6.5 },
    ],
  },
  {
    id: "hop-house-13",
    name: "Hop House 13",
    category: "draught",
    description: { de: "Irish Lager", en: "Irish lager" },
    servings: [
      { label: "0,2 l", price: 3.0 },
      { label: "0,3 l", price: 3.9 },
      { label: "0,5 l", price: 6.5 },
    ],
  },
  {
    id: "stuttgarter-export",
    name: "Stuttgarter Hofbräu Export",
    category: "draught",
    codes: ["A"],
    servings: [
      { label: "0,3 l", price: 3.0 },
      { label: "0,5 l", price: 4.6 },
    ],
  },
  {
    id: "malteser-hefeweizen",
    name: "Malteser Hefeweizen",
    category: "draught",
    codes: ["A"],
    servings: [
      { label: "0,3 l", price: 3.0 },
      { label: "0,5 l", price: 4.6 },
    ],
  },
  {
    // TODO(check): the paper shows 0,2 l and 0,5 l for Kölsch. Is 0,5 l right?
    id: "koelsch",
    name: "Kölsch",
    category: "draught",
    codes: ["A"],
    servings: [
      { label: "0,2 l", price: 2.5 },
      { label: "0,5 l", price: 4.8 },
    ],
  },
  {
    id: "jever",
    name: "Jever Pilsner",
    category: "draught",
    codes: ["A"],
    servings: [
      { label: "0,3 l", price: 3.2 },
      { label: "0,5 l", price: 4.8 },
    ],
  },
  {
    id: "kaethchenbier",
    name: "Käthchenbier",
    category: "draught",
    servings: [
      { label: "0,3 l", price: 3.2 },
      { label: "0,5 l", price: 4.8 },
    ],
  },

  // --- Flaschenbiere ---
  {
    id: "augustiner-hell",
    name: "Augustiner Lager Hell",
    category: "bottled",
    servings: [{ label: "0,5 l", price: 4.2 }],
  },
  {
    id: "augustiner-edelstoff",
    name: "Augustiner Edelstoff",
    category: "bottled",
    servings: [{ label: "0,5 l", price: 4.2 }],
  },
  {
    id: "becks",
    name: "Beck's",
    category: "bottled",
    servings: [{ label: "0,33 l", price: 3.9 }],
  },
  {
    id: "clausthaler",
    name: { de: "Clausthaler alkoholfrei", en: "Clausthaler alcohol-free" },
    category: "bottled",
    servings: [{ label: "0,33 l", price: 3.5 }],
  },
  {
    id: "corona",
    name: "Corona",
    category: "bottled",
    servings: [{ label: "0,33 l", price: 4.1 }],
  },
  {
    id: "hefeweizen-bottle",
    name: "Hefeweizen",
    category: "bottled",
    servings: [{ label: "0,5 l", price: 4.2 }],
  },
  {
    id: "weizen-kristall-dunkel",
    name: {
      de: "Weizen Kristall oder Dunkel",
      en: "Wheat beer, crystal or dark",
    },
    category: "bottled",
    servings: [{ label: "0,5 l", price: 4.2 }],
  },
  {
    id: "desperados",
    name: "Desperados",
    category: "bottled",
    servings: [{ label: "0,33 l", price: 4.1 }],
  },
  {
    id: "cluss-keller-pils",
    name: "Cluss Keller Pils",
    category: "bottled",
    servings: [{ label: "0,33 l", price: 3.5 }],
  },
  {
    id: "kaepsele",
    name: "Stuttgarter Hofbräu Käpsele",
    category: "bottled",
    servings: [{ label: "0,33 l", price: 3.5 }],
  },
  {
    id: "hefeweizen-alkoholfrei",
    name: { de: "Hefeweizen alkoholfrei", en: "Hefeweizen alcohol-free" },
    category: "bottled",
    servings: [{ label: "0,5 l", price: 4.2 }],
  },
  {
    id: "wulle",
    name: "Wulle",
    category: "bottled",
    description: { de: "Vollbier", en: "Vollbier (lager)" },
    servings: [{ label: "0,33 l", price: 3.5 }],
  },
  {
    id: "heineken",
    name: "Heineken",
    category: "bottled",
    servings: [{ label: "0,4 l", price: 3.9 }],
  },
  {
    id: "rothaus-pils",
    name: "Rothaus Pils",
    category: "bottled",
    servings: [{ label: "0,33 l", price: 3.5 }],
  },

  // --- Bier-Mix ---
  {
    id: "bananen-weizen",
    name: "Bananen-Weizen",
    category: "beer-mix",
    codes: ["A"],
    servings: [
      { label: "0,3 l", price: 3.0 },
      { label: "0,5 l", price: 4.6 },
      { label: PITCHER, price: 12.2 },
    ],
  },
  {
    id: "cola-weizen",
    name: "Cola-Weizen",
    category: "beer-mix",
    codes: ["1", "3", "5", "8", "A"],
    servings: [
      { label: "0,3 l", price: 3.0 },
      { label: "0,5 l", price: 4.6 },
      { label: PITCHER, price: 12.2 },
    ],
  },
  {
    id: "diesel",
    name: "Diesel",
    category: "beer-mix",
    description: { de: "Bier, Cola", en: "Beer, cola" },
    codes: ["1", "3", "5", "8", "A"],
    servings: [
      { label: "0,3 l", price: 3.0 },
      { label: "0,5 l", price: 4.6 },
      { label: PITCHER, price: 12.2 },
    ],
  },
  {
    id: "hannes-weizen",
    name: "„Hannes“-Weizen",
    category: "beer-mix",
    codes: ["A"],
    servings: [
      { label: "0,3 l", price: 3.0 },
      { label: "0,5 l", price: 4.6 },
      { label: PITCHER, price: 12.2 },
    ],
  },
  {
    id: "kirsch-weizen",
    name: "Kirsch-Weizen",
    category: "beer-mix",
    codes: ["A"],
    servings: [
      { label: "0,3 l", price: 3.0 },
      { label: "0,5 l", price: 4.6 },
      { label: PITCHER, price: 12.2 },
    ],
  },
  {
    id: "russ",
    name: "Russ",
    category: "beer-mix",
    description: { de: "Weizen, Limo", en: "Wheat beer, lemonade" },
    codes: ["A"],
    servings: [
      { label: "0,3 l", price: 3.0 },
      { label: "0,5 l", price: 4.6 },
      { label: PITCHER, price: 12.2 },
    ],
  },
  {
    id: "radler",
    name: "Radler",
    category: "beer-mix",
    description: { de: "Bier, Limo", en: "Beer, lemonade" },
    codes: ["A"],
    servings: [
      { label: "0,3 l", price: 3.0 },
      { label: "0,5 l", price: 4.6 },
      { label: PITCHER, price: 12.2 },
    ],
  },
  {
    id: "radler-alkoholfrei",
    name: { de: "Radler alkoholfrei", en: "Radler alcohol-free" },
    category: "beer-mix",
    description: { de: "Bier, Limo", en: "Beer, lemonade" },
    codes: ["A"],
    servings: [
      { label: "0,5 l", price: 4.6 },
      { label: PITCHER, price: 12.2 },
    ],
  },

  // --- Irish Bier-Mix ---
  {
    id: "black-and-tan",
    name: "Black & Tan",
    category: "irish-beer-mix",
    description: { de: "Guinness, Kilkenny", en: "Guinness, Kilkenny" },
    codes: ["A"],
    servings: [
      { label: "0,2 l", price: 3.0 },
      { label: "0,3 l", price: 3.9 },
      { label: "0,5 l", price: 6.5 },
    ],
  },
  {
    id: "black-velvet",
    name: "Black Velvet",
    category: "irish-beer-mix",
    description: { de: "Guinness, Cider", en: "Guinness, cider" },
    codes: ["A", "C"],
    servings: [
      { label: "0,2 l", price: 3.0 },
      { label: "0,3 l", price: 3.9 },
      { label: "0,5 l", price: 6.5 },
    ],
  },
  {
    id: "black-hannes",
    name: "Black Hannes",
    category: "irish-beer-mix",
    description: {
      de: "Guinness, Johannisbeer",
      en: "Guinness, blackcurrant",
    },
    servings: [
      { label: "0,2 l", price: 3.0 },
      { label: "0,3 l", price: 3.9 },
      { label: "0,5 l", price: 6.5 },
    ],
  },

  // --- Maß, Pitcher & Säulen (on the paper menu: "Specials") ---
  {
    id: "export-hefe-xl",
    name: "Export / Hefe",
    category: "pitcher",
    codes: ["A"],
    servings: [
      { label: STEIN, price: 8.0 },
      { label: PITCHER, price: 12.2 },
      { label: TOWER, price: 23.0 },
    ],
  },
  {
    id: "kaethchenbier-xl",
    name: "Käthchenbier",
    category: "pitcher",
    servings: [
      { label: STEIN, price: 9.0 },
      { label: PITCHER, price: 13.2 },
      { label: TOWER, price: 24.5 },
    ],
  },
  {
    id: "jever-koelsch-xl",
    name: "Jever / Kölsch",
    category: "pitcher",
    codes: ["A"],
    servings: [
      { label: STEIN, price: 9.0 },
      { label: PITCHER, price: 13.2 },
      { label: TOWER, price: 24.5 },
    ],
  },
  {
    id: "guinness-cider-xl",
    name: "Guinness / Cider",
    category: "pitcher",
    servings: [
      { label: STEIN, price: 10.5 },
      { label: PITCHER, price: 17.0 },
      { label: TOWER, price: 32.5 },
    ],
  },
  {
    id: "kilkenny-hop-house-xl",
    name: "Kilkenny / Hop House 13",
    category: "pitcher",
    codes: ["A"],
    servings: [
      { label: STEIN, price: 10.5 },
      { label: PITCHER, price: 17.0 },
      { label: TOWER, price: 32.5 },
    ],
  },
  {
    id: "snakebite-xl",
    name: "Snakebite",
    category: "pitcher",
    description: { de: "Cider, Bier", en: "Cider, beer" },
    servings: [
      { label: STEIN, price: 10.5 },
      { label: PITCHER, price: 17.0 },
      { label: TOWER, price: 32.5 },
    ],
  },
  {
    id: "rum-vodka-soft-xl",
    name: { de: "Rum / Wodka & Softdrink", en: "Rum / vodka & soft drink" },
    category: "pitcher",
    description: SEE_SOFT_DRINKS,
    servings: [
      { label: PITCHER, price: 28.0 },
      { label: TOWER, price: 50.0 },
    ],
  },
  {
    id: "vodka-energy-lemon-xl",
    name: { de: "Wodka & Energy / Lemon", en: "Vodka & energy / lemon" },
    category: "pitcher",
    description: SEE_SOFT_DRINKS,
    servings: [
      { label: PITCHER, price: 33.0 },
      { label: TOWER, price: 60.0 },
    ],
  },
  {
    id: "havana-captain-soft-xl",
    name: {
      de: "Havana / Captain Morgan & Softdrink",
      en: "Havana / Captain Morgan & soft drink",
    },
    category: "pitcher",
    description: SEE_SOFT_DRINKS,
    servings: [
      { label: PITCHER, price: 33.0 },
      { label: TOWER, price: 60.0 },
    ],
  },
  {
    id: "whisky-cola-xl",
    name: "Whisky Cola",
    category: "pitcher",
    codes: ["1", "3", "5", "8"],
    servings: [
      { label: PITCHER, price: 32.0 },
      { label: TOWER, price: 58.0 },
    ],
  },
  {
    id: "jacky-cola-xl",
    name: "Jacky Cola",
    category: "pitcher",
    codes: ["1", "3", "5", "8"],
    servings: [
      { label: PITCHER, price: 37.0 },
      { label: TOWER, price: 68.0 },
    ],
  },
  {
    id: "kranz-koelsch",
    name: "Kranz Kölsch",
    category: "pitcher",
    description: {
      de: "Kölsch im Kranz, zum Teilen",
      en: "A ring of Kölsch glasses to share",
    },
    servings: [{ price: 22.0 }],
  },
  {
    id: "tasting-board",
    name: { de: "Tasting-Brett", en: "Tasting board" },
    category: "pitcher",
    description: {
      de: "Guinness, Kilkenny & Hop House 13",
      en: "Guinness, Kilkenny & Hop House 13",
    },
    servings: [{ label: "3 × 0,2 l", price: 7.5 }],
  },
];
