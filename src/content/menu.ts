import type { Category, Localized, MenuGroup, MenuItem } from "../types";
import { beer } from "./items/beer";
import { cider } from "./items/cider";
import { cocktails } from "./items/cocktails";
import { food } from "./items/food";
import { hot } from "./items/hot";
import { shots } from "./items/shots";
import { soft } from "./items/soft";
import { whisky } from "./items/whisky";
import { wine } from "./items/wine";

/** Group order and labels for the buttons. The big names on the real menu */
export const GROUPS: { id: MenuGroup; label: Localized }[] = [
  { id: "beer", label: { de: "Bier", en: "Beer" } },
  { id: "cider", label: { de: "Cider", en: "Cider" } },
  { id: "whisky", label: { de: "Whisky", en: "Whisky" } },
  { id: "cocktails", label: { de: "Cocktails", en: "Cocktails" } },
  { id: "shots", label: { de: "Shots", en: "Shots" } },
  { id: "wine", label: { de: "Wein", en: "Wine" } },
  { id: "soft", label: { de: "Alkoholfrei", en: "Soft drinks" } },
  { id: "hot", label: { de: "Heißgetränke", en: "Hot drinks" } },
  { id: "food", label: { de: "Essen", en: "Food" } },
];

/** Category order, headings, and which group button each one sits under. */
export const CATEGORIES: {
  id: Category;
  group: MenuGroup;
  label: Localized;
}[] = [
  {
    id: "draught",
    group: "beer",
    label: { de: "Bier vom Fass", en: "Draught beer" },
  },
  {
    id: "bottled",
    group: "beer",
    label: { de: "Flaschenbiere", en: "Bottled beer" },
  },
  {
    id: "beer-mix",
    group: "beer",
    label: { de: "Bier-Mix", en: "Beer mixes" },
  },
  {
    id: "irish-beer-mix",
    group: "beer",
    label: { de: "Irish Bier-Mix", en: "Irish beer mixes" },
  },
  {
    id: "pitcher",
    group: "beer",
    label: { de: "Maß, Pitcher & Säulen", en: "Steins, pitchers & towers" },
  },
  { id: "cider", group: "cider", label: { de: "Cider", en: "Cider" } },
  {
    id: "cider-mix",
    group: "cider",
    label: { de: "Cider-Mix", en: "Cider mixes" },
  },
  { id: "whisky", group: "whisky", label: { de: "Whiskys", en: "Whiskies" } },
  {
    id: "single-malt",
    group: "whisky",
    label: { de: "Single Malt Whiskys", en: "Single malt whiskies" },
  },
  {
    id: "scotch",
    group: "whisky",
    label: { de: "Scotch Whiskys", en: "Scotch whiskies" },
  },
  {
    id: "irish-whiskey",
    group: "whisky",
    label: { de: "Irish Whiskeys", en: "Irish whiskeys" },
  },
  {
    id: "whisky-mix",
    group: "whisky",
    label: { de: "Whisky-Mix", en: "Whisky mixes" },
  },
  {
    id: "cocktail",
    group: "cocktails",
    label: { de: "Cocktails", en: "Cocktails" },
  },
  {
    id: "longdrink",
    group: "cocktails",
    label: { de: "Longdrinks", en: "Long drinks" },
  },
  { id: "shot", group: "shots", label: { de: "Shots", en: "Shots" } },
  { id: "shooter", group: "shots", label: { de: "Shooters", en: "Shooters" } },
  {
    id: "wine",
    group: "wine",
    label: { de: "Deutsche Qualitätsweine", en: "German quality wines" },
  },
  {
    id: "sparkling",
    group: "wine",
    label: { de: "Schaum- & Perlweine", en: "Sparkling wine" },
  },
  {
    id: "soft",
    group: "soft",
    label: { de: "Alkoholfreie Getränke", en: "Soft drinks" },
  },
  { id: "juice", group: "soft", label: { de: "Säfte", en: "Juices" } },
  {
    id: "mocktail",
    group: "soft",
    label: { de: "Alkoholfreie Cocktails", en: "Alcohol-free cocktails" },
  },
  { id: "hot", group: "hot", label: { de: "Heißgetränke", en: "Hot drinks" } },
  { id: "pub-grub", group: "food", label: { de: "Pub Grub", en: "Pub grub" } },
  { id: "pizza", group: "food", label: { de: "Pizza", en: "Pizza" } },
  {
    id: "flammkuchen",
    group: "food",
    label: { de: "Flammkuchen", en: "Tarte flambée" },
  },
  {
    id: "toast",
    group: "food",
    label: { de: "Baguettes & Toasts", en: "Baguettes & toasts" },
  },
  { id: "salad", group: "food", label: { de: "Salate", en: "Salads" } },
];

/**
 * Everything on the menu, food and drinks.
 * Each file in ./items holds one group; the order inside a heading
 * is the order in that file.
 */
export const drinks: MenuItem[] = [
  ...beer,
  ...cider,
  ...whisky,
  ...cocktails,
  ...shots,
  ...wine,
  ...soft,
  ...hot,
  ...food,
];
