import { useState } from "react";
import { CATEGORIES, GROUPS } from "../content/menu";
import type { UiText } from "../i18n";
import type { Lang, MenuGroup, MenuItem } from "../types";
import CategoryFilter from "./CategoryFilter";
import CodeLegend from "./CodeLegend";
import DrinkCard from "./DrinkCard";
import SectionHeading from "./SectionHeading";

type MenuProps = {
  drinks: MenuItem[];
  lang: Lang;
  t: UiText;
};

function Menu({ drinks, lang, t }: MenuProps) {
  // State: which group button the guest picked. The menu opens on beer.
  const [selected, setSelected] = useState<MenuGroup>("beer");

  // Only categories that have items, and only groups that have such categories.
  const categories = CATEGORIES.filter((c) =>
    drinks.some((d) => d.category === c.id),
  );
  const groups = GROUPS.filter((g) => categories.some((c) => c.group === g.id));
  const visible = categories.filter((c) => c.group === selected);

  const options = groups.map((g) => ({ id: g.id, label: g.label[lang] }));

  return (
    <section id="karte" className="section" aria-labelledby="karte-title">
      <SectionHeading id="karte-title">{t.menuTitle}</SectionHeading>

      <CategoryFilter<MenuGroup>
        options={options}
        selected={selected}
        onSelect={setSelected}
        label={t.filterLabel}
      />

      <div className="menu-groups">
        {visible.map((category) => (
          <div key={category.id} className="menu-group">
            <h3 className="menu-group-title">{category.label[lang]}</h3>
            <ul className="drink-list">
              {drinks
                .filter((d) => d.category === category.id)
                .map((drink) => (
                  <DrinkCard key={drink.id} drink={drink} lang={lang} />
                ))}
            </ul>
          </div>
        ))}
      </div>

      <CodeLegend lang={lang} t={t} />
    </section>
  );
}

export default Menu;
