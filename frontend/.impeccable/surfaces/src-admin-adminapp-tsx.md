---
version: 1
slug: "src-admin-adminapp-tsx"
primary_target: "src/admin/AdminApp.tsx"
related_targets: ["admin.html"]
---

# Admin panel (boss)

Scope: `admin.html` / `src/admin/`. Mode: Operate. One user: the pub owner, 60+, on a laptop in daylight, wears glasses and leans close to the screen. English UI.

Job: add today's specials (most often), keep upcoming events current; price changes are rare (menu editing comes later). Repeated specials must not mean retyping: copy a day's specials to another day, or make them weekly.

Constraints: large type (20px base), 56px controls, one task on screen at a time, no confirm dialogs (undo instead), plain English labels, German fields only "if different".

## Direction contract

THESIS: The pub's day, one day at a time: a day page you step through like rewriting the chalkboard each morning. Refuses the generic table-of-records admin.
OWN-WORLD: The guest page's bottle green and gold, turned for daylight: bottle-green header bar with the signwritten gold name, a green-tinted white ground, dark green text, gold slab primary buttons, gold-ringed date tiles; a four-leaf clover marks a day that has specials.
STORY: He opens it and sees today: its specials and events. He adds a special or copies yesterday's, steps to tomorrow, logs out.
FIRST VIEWPORT: Green header (name, log out). Week strip of seven date tiles, today in gold. Big day heading with previous/next day buttons. Specials for that day with "Add a special" and "Same as <previous day>"; events for that day below.
FORM: hybrid of the user's picks "Week board" (#3) and "Step by step" (#7); seed:c23eabff20f24719.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
