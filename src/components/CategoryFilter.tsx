import { useEffect, useLayoutEffect, useRef } from "react";

type FilterOption<T extends string> = { id: T; label: string };

type CategoryFilterProps<T extends string> = {
  options: FilterOption<T>[];
  selected: T;
  onSelect: (id: T) => void;
  label: string;
};

/**
 * Segmented control with a gold pill that slides to the selected option.
 * Based on the "Tabs sliding" transition from transitions.dev.
 */
function CategoryFilter<T extends string>({
  options,
  selected,
  onSelect,
  label,
}: CategoryFilterProps<T>) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const hasPainted = useRef(false);

  // Move the pill under the selected button. The first time (and on resize)
  // it jumps there without animation, so it never slides in from the left edge.
  useLayoutEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;

    const place = (animate: boolean) => {
      const button = bar.querySelector<HTMLButtonElement>(
        '[aria-pressed="true"]',
      );
      if (!button) return;
      if (!animate) pill.style.transition = "none";
      pill.style.transform = `translateX(${button.offsetLeft}px)`;
      pill.style.width = `${button.offsetWidth}px`;
      if (!animate) {
        void pill.offsetWidth; // force the browser to apply the jump before re-enabling transitions
        pill.style.transition = "";
        return;
      }
      // Keep the selected option visible when the bar scrolls sideways on small phones.
      // (Only sideways: scrollIntoView would also scroll the whole page.)
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const margin = 32;
      const b = button.getBoundingClientRect();
      const s = scroller.getBoundingClientRect();
      if (b.left - margin < s.left) {
        scroller.scrollBy({
          left: b.left - margin - s.left,
          behavior: "smooth",
        });
      } else if (b.right + margin > s.right) {
        scroller.scrollBy({
          left: b.right + margin - s.right,
          behavior: "smooth",
        });
      }
    };

    place(hasPainted.current);
    hasPainted.current = true;

    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    // Fonts load after the first paint and change the button widths.
    document.fonts?.ready.then(() => place(false));
    return () => window.removeEventListener("resize", onResize);
  }, [selected, options]);

  // Fade the edge of the bar where more options are hidden, so guests see they can swipe.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const update = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      const atStart = scroller.scrollLeft <= 1;
      const atEnd = scroller.scrollLeft >= max - 1;
      scroller.dataset.fade =
        max <= 1 ? "none" : atStart ? "end" : atEnd ? "start" : "both";
    };
    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    document.fonts?.ready.then(update);
    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [options.length]);

  return (
    <div className="filter-scroller" ref={scrollerRef}>
      <div className="filter-bar" ref={barRef} role="group" aria-label={label}>
        <span className="filter-pill" ref={pillRef} aria-hidden />
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="filter-option"
            aria-pressed={option.id === selected}
            onClick={() => onSelect(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
