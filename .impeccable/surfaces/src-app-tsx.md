---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Guest page (index)

Mode: Read. The guest came to look something up: a drink and its price, today's special, what's on, when it's open. Code-led build (no image generation available). Direction pinned by the client brief: Irish style, green, gold/yellow, white, shamrocks and four-leaf clovers.

Audience and job: guests at a pub table, phone in one hand, dim evening light. Find a drink and price or today's special within seconds; secondary: events, hours, Instagram.

Constraints: German + English UI; specials change daily; example content until the client delivers real content; self-hosted fonts.

## Direction contract

THESIS: The pub's painted fascia board carried onto the phone. A gold-leaf-on-bottle-green signwriter's frame around a calm, legible tariff. Refuses the category default: white page, stock hero photo, a grid of same-size drink cards.

OWN-WORLD: Bottle-green ground for a dark room; gold-leaf signwritten caps (Holtwood One SC) with a dark shade; warm white Figtree for reading; gold double pinstripe framing the masthead board; three-leaf shamrock as section ornament; four-leaf clover marks today's specials (luck = a deal). Prices set like a printed tariff: dotted leaders, tabular numerals.

STORY: The guest sees which pub this is and whether it's open, sees today's specials, finds their drink and price, sees what's on this week, checks hours, follows the Instagram.

FIRST VIEWPORT: Language toggle top-right. Masthead board at the top: shamrock flourish, pub name in large gold caps, town line, open/closed plaque with closing time. Directly under it the "Heute" specials board starts in view, clover-marked. A compact sticky section bar (Heute, Karte, Events, Zeiten) takes over once the masthead scrolls away.

FORM: Brief-pinned Irish pub signwriting world, applied to the frame only; the menu column stays calm. Signature interaction: the category filter as a brass-rail segmented control whose gold pill slides between categories (transitions-dev tabs sliding). Motion grammar: one gold-leaf reveal of the masthead on first load, 150-250 ms state transitions elsewhere, all disabled under reduced motion.
seed: none (brief-pinned direction, no roll)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
