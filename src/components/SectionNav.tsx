import type { Page } from "../types";

type SectionNavProps = {
  items: { id: Page; label: string }[]; // the tabs to show
  active: Page;                         // which tab is selected (Value from App)
  onSelect: (page: Page) => void;       // what to do on a tap (A function from App)
  label: string;
};

/** Tabs that switch between the pages. */
function SectionNav({items, active, onSelect, label}: SectionNavProps) {
  return (
    <nav className="section-nav" aria-label={label}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              aria-current={active === item.id ? "page" : undefined}
              onClick={() => onSelect(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SectionNav;
