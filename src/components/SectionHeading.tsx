import type { ReactNode } from "react";
import { Shamrock } from "./Icons";

type SectionHeadingProps = {
  id: string;
  children: ReactNode;
};

/** Gold signwritten heading with a shamrock and a Celtic knot band running to the edge. */
function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <h2 className="section-heading" id={id}>
      <Shamrock className="section-heading-shamrock" />
      <span className="section-heading-text">{children}</span>
      <span className="knot-band section-heading-rule" aria-hidden />
    </h2>
  );
}

export default SectionHeading;
