---
name: Irish Pub Heilbronn – guest page
description: The pub's painted fascia board on a phone. Gold leaf on bottle green around a calm price list.
colors:
  green-950: "#061a11"
  green-900: "#0a2a1c"
  green-800: "#103a29"
  green-700: "#1a5139"
  green-lucky: "#4cbb78"
  gold-300: "#f2d68e"
  gold-400: "#e4bd5f"
  gold-500: "#d2a646"
  gold-600: "#a37b2c"
  gold-700: "#6f5520"
  white: "#f7f4ea"
  mist: "#b5ccbe"
  shade: "#021008"
typography:
  sign-name:
    fontFamily: "Holtwood One SC, Georgia, serif"
    fontSize: "clamp(2.25rem, 11.5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "0.01em"
  section-heading:
    fontFamily: "Holtwood One SC, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.02em"
  body:
    fontFamily: "Figtree Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  item-name:
    fontFamily: "Figtree Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.35
  price:
    fontFamily: "Figtree Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 650
    lineHeight: 1.35
  small:
    fontFamily: "Figtree Variable, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  board: "14px"
  tile: "12px"
  pill: "999px"
spacing:
  gutter: "16px"
  section: "40px"
  row: "12px"
components:
  sign-board:
    backgroundColor: "{colors.green-800}"
    textColor: "{colors.gold-400}"
    rounded: "{rounded.board}"
    padding: "24px 20px 36px"
  filter-option:
    textColor: "{colors.mist}"
    rounded: "{rounded.pill}"
    height: "40px"
    padding: "0 16px"
  filter-option-selected:
    backgroundColor: "{colors.gold-400}"
    textColor: "{colors.green-950}"
    rounded: "{rounded.pill}"
  button-primary:
    backgroundColor: "{colors.gold-500}"
    textColor: "{colors.green-950}"
    rounded: "{rounded.board}"
    padding: "16px 16px 16px 18px"
  button-primary-hover:
    backgroundColor: "{colors.gold-400}"
  button-outline:
    textColor: "{colors.gold-300}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 18px 0 15px"
---

# Design System: Irish Pub Heilbronn – guest page

## Overview

A guest scans the table QR code in a dim pub, phone in one hand. The page is the pub's painted fascia board carried onto that phone: signwritten gold-leaf capitals on bottle green, with a double gold pinstripe. The world owns the frame (masthead, section headings, date tiles); the price list inside stays calm and legible, set like a printed tariff with dotted leaders and tabular numerals.

Dark because of the scene, not the category: a bright white page glares in a dark room.

## Colors

### Primary

- **Gold leaf** (`gold-400`): signwritten type, prices, the selected filter pill. `gold-500` fills the one primary button (Instagram). `gold-300` for active and highlighted text.

### Secondary

- **Clover green** (`green-lucky`): only the four-leaf clover on today's specials and the "open" dot.

### Neutral

- **Bottle green** ground `green-900`, boards `green-800`, sticky bars and plaques `green-950`.
- **Warm white** (`white`) for reading text, **mist** (tinted from the green, never grey) for secondary text.
- **Shade** (`shade`) only as the signwriter's shadow under gold capitals.

### Named Rules

- **The gold-leaf rule:** gold is for signwriting, prices and selection. Never gold body text in paragraphs.
- **The lucky rule:** a four-leaf clover means "special offer". Three-leaf shamrocks are ornament.

## Typography

Holtwood One SC (wood-type small caps, self-hosted) is the sign voice: pub name, section headings, the day number in event tiles. Figtree is everything else.

### Hierarchy

- Pub name: Holtwood, fluid 36–56px, gold with shade.
- Section heading: Holtwood 22px, gold with shade, shamrock left, double rule right.
- Menu group title: Figtree 700, 17px, `gold-300`.
- Item name: Figtree 600, 17px, white. Description: Figtree 15px, mist.
- Prices: Figtree 650, tabular numerals, gold.

### Named Rules

- **Signwriting is short:** Holtwood only for a few words. Never for sentences, labels or buttons.

## Layout

Single column, max 36rem, 16px gutters. Sections are 40px apart, with more space above a heading than below. Sticky section bar (52px) under the masthead; sections offset their anchor by that height.

## Elevation & Depth

Flat painted boards. Depth comes from the pinstripe (inset gold rings) and a soft, offset drop shadow (`0 18px 40px -20px rgb(0 0 0 / .7)`), never from glows.

## Shapes

14px boards, 12px date tiles, full pills for controls, the plaque and badges.

## Components

### Buttons

- Primary (Instagram): full-width gold slab, dark green text, arrow icon; hover lightens, press scales to 0.96.
- Outline (Route, Call): 44px pill with a 1px gold inset ring.

### Navigation

- Sticky section bar: four equal links; the active one turns `gold-300` with a short gold underline.
- Language toggle: DE | EN pill, selected option filled gold.

### Signature components

- **Sign board (masthead):** double pinstripe, shamrock flourish, signwritten name, town line between short rules, tagline. The open/closed plaque hangs over its bottom edge.
- **Category filter:** dark rail with a gold pill that slides to the selected category (250ms, ease-out). Scrolls sideways with faded edges when categories overflow.
- **Tariff row:** name, dotted gold leader, size, price; extra sizes stack under the first.
- **Date tile:** weekday, Holtwood day number, month, in a gold-ringed tile.

## Do's and Don'ts

### Do:

- Keep every price in tabular numerals, right-aligned.
- Let the frame carry the Irish world; keep the list plain.
- Respect reduced motion: the masthead reveal and pill slide switch off.

### Don't:

- Don't add photo cards or a grid of same-size drink tiles.
- Don't use gradient text, glows, or a second display face.
- Don't scatter shamrocks; one per heading, three in the masthead flourish, one in the footer.
