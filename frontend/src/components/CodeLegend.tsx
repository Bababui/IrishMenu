import { forwardRef } from "react";
import { ADDITIVES, ALLERGENS, meaningOf, type CodeMeaning } from "../content/codes";
import type { UiText } from "../i18n";
import type { Lang } from "../types";

type CodeLegendProps = { lang: Lang; t: UiText };

/** The two lists inside the "Zusatzstoffe & Allergene" drawer at the end of the menu. */
const CodeLegend = forwardRef<HTMLDivElement, CodeLegendProps>(function CodeLegend({ lang, t }, ref) {
  const list = (title: string, entries: CodeMeaning[]) => {
    const filled = entries.filter((entry) => meaningOf(entry.code, "de"));
    if (filled.length === 0) return null;
    return (
      <div className="legend-block">
        <p className="legend-title">{title}</p>
        <dl className="legend-list">
          {filled.map((entry) => (
            <div key={entry.code} className="legend-row">
              <dt className="legend-code">{entry.code}</dt>
              <dd>{meaningOf(entry.code, lang)}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  };

  return (
    <div ref={ref} className="legend">
      {list(t.additives, ADDITIVES)}
      {list(t.allergens, ALLERGENS)}
    </div>
  );
});

export default CodeLegend;
