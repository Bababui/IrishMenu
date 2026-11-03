// Copies the menu and offers from src/content into backend/seed/content.json,
// so the Python seed script can read them (Python can't read TypeScript).
// Run from the pub-menu folder:  npx tsx scripts/export-content.ts
import { mkdirSync, writeFileSync } from "node:fs";
import { CATEGORIES, drinks } from "../src/content/menu";
import { offers } from "../src/content/offers";

const content = { categories: CATEGORIES, items: drinks, offers };

mkdirSync("backend/seed", { recursive: true });
writeFileSync("backend/seed/content.json", JSON.stringify(content, null, 2) + "\n");

console.log(
  `Exported ${CATEGORIES.length} categories, ${drinks.length} items, ${offers.length} offers`,
);
