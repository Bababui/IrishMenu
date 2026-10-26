import { useEffect, useState } from "react";

type SectionNavProps = {
  items: { id: string; label: string }[];
  label: string;
};

/** Sticky bar with jump links. Highlights the section currently on screen. */
function SectionNav({ items, label }: SectionNavProps) {
  const active = useActiveSection(items.map((item) => item.id));

  return (
    <nav className="section-nav" aria-label={label}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Returns the id of the section that is currently in the upper part of the screen. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // A section counts as "active" while it crosses a line ~30% from the top of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

export default SectionNav;
