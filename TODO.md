# To do before launch

Things we decided to deal with later. Tick them off (`[x]`) as they get done.

## Content and legal

- [x] **Allergen and additive codes:** legend from the paper menu is in `frontend/src/content/codes.ts`; guests can open it from the menu, the admin shows the meanings.
- [ ] **Impressum and Datenschutzerklärung:** get the answers to the question list from the boss, then add both pages.

## Going online (IONOS)

- [ ] **IONOS account** in the boss's name, with his payment details.
- [ ] **Domain** (.de) and **VPS XS** (Linux) at IONOS. Check the minimum term and the price after the offer.
- [ ] **Data processing agreement (AVV)** with IONOS: accept it in the IONOS account.
- [ ] **Server setup:** Python, the backend running on its own and restarting after a reboot, HTTPS, firewall, automatic security updates.
- [ ] **Real admin password:** choose it together with the boss (`python -m app.set_password` on the server).
- [ ] **Backups** of `pub.db`, every night, kept off the server too.
- [ ] **Migrations (Alembic):** so tables can change later without losing the boss's data.
- [ ] **Handover note** for the boss: logins, and how to restart the server.
- [ ] Remove `frontend/netlify.toml` once the server is live.

## Nice to have

- [ ] Undo after "Remove" puts a drink back at its old place, not at the end of its heading.
