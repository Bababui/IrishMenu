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
| Interface texts in German and English                           | `src/i18n.ts`           |
| Colours and fonts                                               | top of `src/index.css`  |

Everything in `src/content` is **example content**. Replace it with the real details, then set `USES_EXAMPLE_CONTENT = false` in `src/content/pub.ts` to remove the note in the footer.

## Deploy to Netlify (free plan allows commercial sites)

1. Push this repo to GitHub.
2. On netlify.com: Add new project → Import from GitHub → pick the repo. Set **Base directory** to `frontend`. Netlify then reads `frontend/netlify.toml` (build `npm run build`, publish `dist`).
3. Deploy. (The backend needs its own host; see `backend/`.)
4. Point the QR code at the Netlify address (or the pub's own domain once connected).

## Project notes

- `PRODUCT.md`, `DESIGN.md` and `.impeccable/` hold the product and design decisions for design tools; they are not part of the page.
- Fonts (Holtwood One SC, Figtree) are bundled, so guests' phones make no requests to Google Fonts.
- "Today" and "open now" always use Berlin time.
