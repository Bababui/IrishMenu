# Irish Pub Heilbronn – guest page

The page guests open by scanning the QR code on the table: today's specials, the drinks menu, upcoming events, opening hours, Instagram and contact. German and English.

Built with React, TypeScript and Vite, hosted on Netlify. The menu, specials and events come from the Python backend in `backend/` (FastAPI + SQLite), so the pub can update them in the admin panel without touching code.

## Run it locally

Two terminals: one for the backend, one for the page.

```bash
# Terminal 1: backend (see backend/ for setup)
cd backend
source .venv/bin/activate
fastapi dev app/main.py

# Terminal 2: page
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173). Vite passes every `/api/...` request on to the backend on port 8000. Without the backend, the page still works with the built-in copy from `src/content`.

## Where the content lives

| What                                                            | File                    |
| --------------------------------------------------------------- | ----------------------- |
| Pub name, address, phone, Instagram, opening hours, legal links | `src/content/pub.ts`    |
| Drinks and prices (live: backend; built-in fallback copy)       | `src/content/items/`    |
| Menu groups and categories                                      | `src/content/menu.ts`   |
| Specials (live: backend; built-in fallback copy)                | `src/content/offers.ts` |
| Regular events like karaoke (one-off events: backend)           | `src/content/events.ts` |
| Interface texts in German and English                           | `src/i18n.ts`           |
| Colours and fonts                                               | top of `src/index.css`  |

Everything in `src/content` is **example content**. Replace it with the real details, then set `USES_EXAMPLE_CONTENT = false` in `src/content/pub.ts` to remove the note in the footer.

## Deploy to Netlify (free plan allows commercial sites)

1. Push this repo to GitHub.
2. On netlify.com: Add new project → Import from GitHub → pick the repo. Netlify reads `netlify.toml` (build `npm run build`, publish `dist`).
3. Deploy. (The backend needs its own host; see `backend/`.)
4. Point the QR code at the Netlify address (or the pub's own domain once connected).

## Project notes

- `PRODUCT.md`, `DESIGN.md` and `.impeccable/` hold the product and design decisions for design tools; they are not part of the page.
- Fonts (Holtwood One SC, Figtree) are bundled, so guests' phones make no requests to Google Fonts.
- "Today" and "open now" always use Berlin time.
