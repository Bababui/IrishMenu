import { useState } from "react";
import { CATEGORIES } from "../content/menu";
import type { UiText } from "../i18n";
import type { Category, Drink, Lang } from "../types";
import CategoryFilter from "./CategoryFilter";
import DrinkCard from "./DrinkCard";
import SectionHeading from "./SectionHeading";

type MenuProps = {
  drinks: Drink[];
  lang: Lang;
  t: UiText;
};

type Selection = Category | "all";

function Menu({ drinks, lang, t }: MenuProps) {
  // State: which category the guest picked. Everything else is calculated from it.
  const [selected, setSelected] = useState<Selection>("all");

  // Only categories that actually have drinks get a button and a heading.
  const categories = CATEGORIES.filter((c) =>
    drinks.some((d) => d.category === c.id),
  );
  const visible =
    selected === "all"
      ? categories
      : categories.filter((c) => c.id === selected);

  const options = [
    { id: "all" as const, label: t.all },
    ...categories.map((c) => ({ id: c.id, label: c.label[lang] })),
  ];

  return (
    <section id="karte" className="section" aria-labelledby="karte-title">
      <SectionHeading id="karte-title">{t.menuTitle}</SectionHeading>

      <CategoryFilter<Selection>
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
    </section>
  );
}

export default Menu;
