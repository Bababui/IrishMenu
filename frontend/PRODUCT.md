# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Guests sitting in an Irish pub in Heilbronn, Germany. They scan a QR code on the table with their phone, usually in the evening in dim light, often with a drink in the other hand. Mostly German locals, plus English-speaking tourists and expats.

## Product Purpose

A guest page that answers the questions guests otherwise ask at the bar: what drinks there are and what they cost, what today's specials are, what events are coming up, when the pub is open, and where to follow it on Instagram. Ordering and paying stay at the bar and the till; the page only informs.

Success: a guest finds a drink and its price, or today's special, within seconds, and the pub can keep the page current without a developer.

## Operating Context

- Opened from a table QR code on a phone; no app install, no login.
- The pub mixes a cosy traditional pub (Guinness, whiskey, regulars, live music) with a sports pub (matches on screens), and sometimes a party night.
- Today's specials are decided each day by the owner, so they must be editable by non-developers.
- UI in German and English (German default, one-tap switch).

## Capabilities and Constraints

- Sections: today's specials, drinks menu with category filter, upcoming events, opening hours, Instagram, address, contact.
- No ordering, cart, or payment.
- Stack: React + TypeScript + Vite (existing codebase), plain CSS.
- Fonts are self-hosted (no requests to Google Fonts from guests' browsers).
- Open: final pub name, logo, real menu and prices, events, opening hours, Instagram handle, address, phone, links to Impressum and Datenschutz.

## Brand Commitments

- Client brief (binding): Irish style in green, gold/yellow and white, with three-leaf shamrocks and four-leaf clovers.

## Evidence on Hand

- No real content yet. All menu items, prices, specials, events and hours in the code are example content and must be replaced before launch. Never present example prices or events as real.

## Product Principles

1. The answer first: drinks, prices and today's specials are reachable within one scroll.
2. Readable in a dark pub on a phone held at arm's length.
3. Content is easy to keep current; stale specials or past events are worse than none.
4. The page feels like this pub, not a generic restaurant template.
