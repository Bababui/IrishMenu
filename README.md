# Irish Pub Heilbronn – guest page

The page guests open by scanning the QR code on the table: today's specials, the drinks menu, upcoming events, opening hours, Instagram and contact. German and English.

Built with React, TypeScript and Vite. Hosted on Netlify. Specials and events can come from a Google Sheet, so the pub can update them without touching code.

## Run it locally

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Where the content lives

| What                                                            | File                    |
| --------------------------------------------------------------- | ----------------------- |
| Pub name, address, phone, Instagram, opening hours, legal links | `src/content/pub.ts`    |
| Drinks and prices, menu categories                              | `src/content/menu.ts`   |
| Specials (fallback if no Google Sheet)                          | `src/content/offers.ts` |
| Events (fallback if no Google Sheet)                            | `src/content/events.ts` |
| Interface texts in German and English                           | `src/i18n.ts`           |
| Colours and fonts                                               | top of `src/index.css`  |

Everything in `src/content` is **example content**. Replace it with the real details, then set `USES_EXAMPLE_CONTENT = false` in `src/content/pub.ts` to remove the note in the footer.

## Daily specials and events from Google Sheets

1. Create a new Google Sheet with two tabs named **Angebote** and **Events**. Import `sheet-template/Angebote.csv` and `sheet-template/Events.csv` (File → Import → Upload → "Replace current sheet") to get the right columns.
2. File → Share → **Publish to web**. Publish the _Angebote_ tab as **CSV** and copy the link. Do the same for _Events_.
3. In Netlify: Site configuration → Environment variables. Add `SHEET_OFFERS_CSV` and `SHEET_EVENTS_CSV` with the two links. Redeploy once.

Changes in the sheet show up on the page within about a minute. If the sheet is missing or unreachable, the page falls back to the files in `src/content`.

### Für den Chef: so pflegst du die Angebote

- **Angebote:** eine Zeile pro Angebot. Entweder ein **Datum** (`27.10.2026`, gilt nur an dem Tag) oder **Wochentage** (`Di` oder `Fr, Sa` oder `täglich`, gilt jede Woche).
- **Titel** und **Info** auf Deutsch, die englischen Spalten sind optional.
- **Preis** ist der Angebotspreis, **Statt** der normale Preis (wird durchgestrichen). Beides kann leer bleiben.
- Bis 5 Uhr morgens zählt noch der Vortag, Freitagnacht um 1 Uhr sieht man also noch die Freitags-Angebote.
- **Events:** Datum, Uhrzeit (`20:00`), Titel, Info. Vergangene Events verschwinden von selbst.
- Zeile löschen = Angebot weg.

## Deploy to Netlify (free plan allows commercial sites)

1. Push this repo to GitHub.
2. On netlify.com: Add new project → Import from GitHub → pick the repo. Netlify reads `netlify.toml` (build `npm run build`, publish `dist`).
3. Add the two sheet variables (above) and deploy.
4. Point the QR code at the Netlify address (or the pub's own domain once connected).

## Project notes

- `PRODUCT.md`, `DESIGN.md` and `.impeccable/` hold the product and design decisions for design tools; they are not part of the page.
- Fonts (Holtwood One SC, Figtree) are bundled, so guests' phones make no requests to Google Fonts.
- "Today" and "open now" always use Berlin time.
