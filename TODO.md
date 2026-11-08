# To do before launch

Things we decided to deal with later. Tick them off (`[x]`) as they get done.

## Content and legal

- [ ] **Allergen and additive codes:** get the legend from the paper menu (e.g. "3 = mit Farbstoff", "A = glutenhaltiges Getreide").
  - Admin: show the meaning next to each code button ("A · Gluten" instead of just "A").
  - Guest page: explain the codes; in Germany guests must be able to see what they mean.
- [ ] **Impressum and Datenschutzerklärung:** ask the boss for the company details (full name, owner, address, contact) and add both pages.

## Going online

- [ ] **Hosting:** the boss decides how to pay (business account by direct debit, invoice, or company card); then pick a host for the Python backend that accepts it.
- [ ] **Domain:** buy it at IONOS in the pub's name, point it to Netlify.
- [ ] **Netlify:** Base directory `frontend`, forward `/api/*` to the backend, `/admin` to `admin.html`.
- [ ] **Real admin password:** choose it together with the boss (`python -m app.set_password` on the server).
- [ ] **Migrations (Alembic):** so tables can change later without losing the boss's data.
- [ ] **Backups** of `pub.db` on the server.

## Nice to have

- [ ] Undo after "Remove" puts a drink back at its old place, not at the end of its heading.
