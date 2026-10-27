import type { UiText } from "../i18n";
import type { PubInfo } from "../types";
import { ArrowUpRight, MapPin, Phone, Shamrock } from "./Icons";
import SectionHeading from "./SectionHeading";

type VisitProps = {
  pub: PubInfo;
  t: UiText;
  showExampleNote: boolean;
};

/** Instagram, address, phone and the legal links at the end of the page. */
function Visit({ pub, t, showExampleNote }: VisitProps) {
  const instagramUrl = `https://www.instagram.com/${pub.instagram}/`;

  return (
    <section
      id="besuch"
      className="section section--last"
      aria-labelledby="besuch-title"
    >
      <SectionHeading id="besuch-title">{t.visitTitle}</SectionHeading>

      <a
        className="instagram-link"
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="instagram-text">
          <span className="instagram-cta">{t.instagramCta}</span>
          <span className="instagram-handle">@{pub.instagram}</span>
        </span>
        <ArrowUpRight className="instagram-arrow" />
      </a>

      <address className="visit-address">
        <p>
          {pub.name} {pub.town}
          <br />
          {pub.address.street}
          <br />
          {pub.address.city}
        </p>
        <div className="visit-actions">
          <a
            className="visit-action"
            href={pub.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin /> {t.directions}
          </a>
          {pub.phone && (
            <a
              className="visit-action"
              href={`tel:${pub.phone.replace(/[^\d+]/g, "")}`}
            >
              <Phone /> {t.call}
            </a>
          )}
        </div>
      </address>

      <footer className="page-footer">
        <span className="knot-band footer-knot" aria-hidden />
        <Shamrock className="footer-shamrock" />
        <p>{t.orderAtBar}</p>
        <p className="footer-cash">{t.cashOnly}</p>
        <p className="footer-links">
          <a href={pub.legal.imprintUrl}>{t.imprint}</a>
          <span aria-hidden>·</span>
          <a href={pub.legal.privacyUrl}>{t.privacy}</a>
        </p>
        {showExampleNote && <p className="footer-example">{t.exampleNote}</p>}
      </footer>
    </section>
  );
}

export default Visit;
