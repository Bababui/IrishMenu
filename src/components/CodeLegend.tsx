import { CODE_LEGEND } from "../content/codes";
import type { UiText } from "../i18n";
import type { Lang } from "../types";

type CodeLegendProps = {
  lang: Lang;
  t: UiText;
};

/** Fold-out list that explains the small codes after each name. */
function CodeLegend({ lang, t }: CodeLegendProps) {
  return (
    <details className="code-legend">
      <summary>{t.legendTitle}</summary>
      <p className="code-legend-intro">{t.legendIntro}</p>
      <dl className="code-legend-list">
        {Object.entries(CODE_LEGEND).map(([code, text]) => (
          <div key={code}>
            <dt>{code}</dt>
            <dd>{text[lang]}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

export default CodeLegend;
