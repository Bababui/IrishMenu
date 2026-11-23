import { useLayoutEffect, useRef, useState } from "react";
import { legendIsComplete } from "../content/codes";
import { CATEGORIES, GROUPS } from "../content/menu";
import type { UiText } from "../i18n";
import type { Category, Lang, MenuGroup, MenuItem } from "../types";
import CategoryFilter from "./CategoryFilter";
import CodeLegend from "./CodeLegend";
import DrinkCard from "./DrinkCard";
import { ChevronDown } from "./Icons";
import SectionHeading from "./SectionHeading";

type MenuProps = {
  drinks: MenuItem[];
  lang: Lang;
  t: UiText;
};

/** A drawer on the menu: one of the headings, or the legend at the end. */
type Drawer = Category | "legend";

function Menu({ drinks, lang, t }: MenuProps) {
  // State: which group button the guest picked. The menu opens on beer.
  const [selected, setSelected] = useState<MenuGroup>("beer");
  // State: which heading is folded open. Only one at a time, null = all closed.
  // "legend" is the "Zusatzstoffe & Allergene" drawer at the end of the menu.
  const [open, setOpen] = useState<Drawer | null>(null);
  // A drawer above the tapped heading closes without sliding (see toggle below).
  const [closingAbove, setClosingAbove] = useState<Drawer | null>(null);
  // The legend heading, so a tap on a drink's codes can scroll to it.
  const legendHeading = useRef<HTMLButtonElement>(null);
  const scrollToLegend = useRef(false);
  // The tapped heading and where it was on screen, so we can put it back there.
  const anchor = useRef<{ heading: HTMLElement; top: number } | null>(null);

  // Switching group (Bier -> Whisky) closes the open drawer.
  function selectGroup(group: MenuGroup) {
    setSelected(group);
    setOpen(null);
  }

  // Tap a closed heading to open it (the other one closes), tap it again to close it.
  //
  // When the open drawer sits ABOVE the tapped heading, closing it pulls the heading
  // upwards. Instead of sliding it shut and scrolling along every frame (which judders
  // on phones), that drawer snaps shut and the page scrolls back once, before the
  // screen is drawn: the heading stays exactly under the guest's finger.
  function toggle(id: Drawer, heading: HTMLElement) {
    const opening = open !== id;
    const openIsAbove = opening && open !== null && order.indexOf(open) < order.indexOf(id);
    setClosingAbove(openIsAbove ? open : null);
    anchor.current = openIsAbove ? { heading, top: heading.getBoundingClientRect().top } : null;
    setOpen(opening ? id : null);
  }

  // Runs after React changed the page but before the browser draws it.
  useLayoutEffect(() => {
    if (!anchor.current) return;
    const { heading, top } = anchor.current;
    anchor.current = null;
    const drift = heading.getBoundingClientRect().top - top;
    if (drift !== 0) window.scrollBy({ top: drift, behavior: "instant" });
  }, [open]);

  // A tap on a drink's codes: open the legend and bring it into view.
  function showLegend() {
    setClosingAbove(open); // whatever is open sits above the legend: let it snap shut
    scrollToLegend.current = true;
    setOpen("legend");
  }

  useLayoutEffect(() => {
    if (!scrollToLegend.current || open !== "legend") return;
    scrollToLegend.current = false;
    legendHeading.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [open]);

  // Only categories that have items, and only groups that have such categories.
  const categories = CATEGORIES.filter((c) =>
    drinks.some((d) => d.category === c.id),
  );
  const groups = GROUPS.filter((g) => categories.some((c) => c.group === g.id));
  const visible = categories.filter((c) => c.group === selected);
  // The legend is shown only once every code on the menu has its meaning (see content/codes.ts).
  const hasLegend = legendIsComplete(drinks);
  // Top-to-bottom order of the drawers on screen
  const order: Drawer[] = [...visible.map((c) => c.id), ...(hasLegend ? ["legend" as const] : [])];

  const options = groups.map((g) => ({ id: g.id, label: g.label[lang] }));

  return (
    <section id="karte" className="section" aria-labelledby="karte-title">
      <SectionHeading id="karte-title">{t.menuTitle}</SectionHeading>

      <CategoryFilter<MenuGroup>
        options={options}
        selected={selected}
        onSelect={selectGroup}
        label={t.filterLabel}
      />

      <div className="menu-groups">
        {visible.map((category) => {
          const items = drinks.filter((d) => d.category === category.id);
          const isOpen = open === category.id;
          const panelId = `menu-panel-${category.id}`;
          return (
            <div key={category.id} className="menu-group">
              <h3 className="menu-group-title">
                <button
                  type="button"
                  className="menu-group-toggle"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={(e) => toggle(category.id, e.currentTarget)}
                >
                  <span>
                    {category.label[lang]}
                    <span className="menu-group-count">{items.length}</span>
                  </span>
                  <ChevronDown className="menu-group-chevron" />
                </button>
              </h3>
              {/* Always rendered so it can slide open; `inert` hides it from taps and screen readers while closed. */}
              <div
                id={panelId}
                className={`menu-group-panel${isOpen ? " is-open" : ""}${closingAbove === category.id ? " snap" : ""}`}
                inert={!isOpen}
              >
                <div className="menu-group-inner">
                  <ul className="drink-list">
                    {items.map((drink) => (
                      <DrinkCard
                        key={drink.id}
                        drink={drink}
                        lang={lang}
                        onShowCodes={hasLegend ? showLegend : undefined}
                        showCodesLabel={t.showCodes}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}

        {hasLegend && (
          <div className="menu-group menu-group--legend">
            <h3 className="menu-group-title">
              <button
                ref={legendHeading}
                type="button"
                className="menu-group-toggle"
                aria-expanded={open === "legend"}
                aria-controls="menu-panel-legend"
                onClick={(e) => toggle("legend", e.currentTarget)}
              >
                <span>{t.legendTitle}</span>
                <ChevronDown className="menu-group-chevron" />
              </button>
            </h3>
            <div
              id="menu-panel-legend"
              className={`menu-group-panel${open === "legend" ? " is-open" : ""}`}
              inert={open !== "legend"}
            >
              <div className="menu-group-inner">
                <CodeLegend lang={lang} t={t} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;
