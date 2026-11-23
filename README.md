# Irish Pub Heilbronn – guest page and admin

The page guests open by scanning the QR code on the table: today's specials, the drinks menu, upcoming events, opening hours, Instagram and contact. German and English.

The project has two halves:

| Folder      | What                                                                                   |
| ----------- | -------------------------------------------------------------------------------------- |
| `frontend/` | React + TypeScript (Vite): the guest page (`index.html`) and the admin panel (`admin.html`) |
| `backend/`  | Python (FastAPI + SQLite): stores the menu, specials and events, and the admin login    |

The guest page reads the menu, specials and events from the backend, so the pub can update them in the admin panel without touching code.

## Run it locally

Two terminals: one for the backend, one for the page.

The first time only, set up the backend:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m app.seed           # creates pub.db with the menu (deletes an existing one!)
python -m app.set_password   # the admin password
```

Then, every time:

```bash
# Terminal 1: backend
cd backend
source .venv/bin/activate
fastapi dev app/main.py

# Terminal 2: frontend
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 for the guest page and http://localhost:5173/admin.html for the admin panel. Vite passes every `/api/...` request on to the backend on port 8000. Without the backend, the guest page still works with the built-in copy from `frontend/src/content`.

## Where the content lives (in `frontend/`)

| What                                                            | File                    |
| --------------------------------------------------------------- | ----------------------- |
| Pub name, address, phone, Instagram, opening hours, legal links | `src/content/pub.ts`    |
| Drinks and prices (live: backend; built-in fallback copy)       | `src/content/items/`    |
| Menu groups and categories                                      | `src/content/menu.ts`   |
| Specials (live: backend; built-in fallback copy)                | `src/content/offers.ts` |
| Regular events like karaoke (one-off events: backend)           | `src/content/events.ts` |
| "Most popular" (Guinness, Käthchenbier, Hop House 13)           | `src/content/recommendations.ts` |
| Additive and allergen codes (1–9, A–I)                          | `src/content/codes.ts`  |
| Interface texts in German and English                           | `src/i18n.ts`           |
| Colours and fonts                                               | top of `src/index.css`  |

Once the boss edits in the admin panel, the database is the real menu. The files in `src/content` are the starting data for `python -m app.seed` and the copy guests see if the backend can't be reached. After changing them, copy them over to the backend with `npx tsx scripts/export-content.ts` (run in `frontend/`).

## Going online

One IONOS server will run both halves under the pub's domain. The steps are in `TODO.md`. `frontend/netlify.toml` is only for the current Netlify demo and can go once the server is live.

## Project notes

- `PRODUCT.md`, `DESIGN.md` and `.impeccable/` hold the product and design decisions for design tools; they are not part of the page.
- Fonts (Holtwood One SC, Figtree) are bundled, so guests' phones make no requests to Google Fonts.
- "Today" and "open now" always use Berlin time.
