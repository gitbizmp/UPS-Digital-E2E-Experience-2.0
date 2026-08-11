import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isLogo from "../assets/insureshield/is logo.png";
import "./InsureShield.css";

/* --------------------------------------------------------------- Icons */
function Chevron({ className = "ism-btn__chev" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 6 10" fill="none" aria-hidden="true">
      <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg width="10" height="5" viewBox="0 0 10 5" fill="none" aria-hidden="true">
      <path d="M1 1l4 3 4-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckCircle() {
  return (
    <svg className="ism-benefit__check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12.2l2.6 2.6L16 9.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg className="ism-menu__search" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.5 11.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function GlyphBox() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function Placeholder({ className }: { className: string }) {
  return (
    <div className={className}>
      <div className="ism-ph">Image</div>
    </div>
  );
}

/* --------------------------------------------------------------- Header */
function Header() {
  return (
    <header className="ism-header">
      <div className="ism-notice">
        <div className="ism-notice__left">
          <span className="ism-notice__count">1 of 1</span>
          <span className="ism-notice__msg">
            Fewer chargebacks. More confidence. <u>Get CommerceShield</u>
          </span>
        </div>
        <span className="ism-notice__close">✕</span>
      </div>
      <div className="ism-menu">
        <div className="ism-menu__auth">
          <span>Log In</span>
          <span className="ism-menu__divider" />
          <span>Get a Quote</span>
          <span className="ism-menu__divider" />
          <span>Contact Us</span>
          <span className="ism-menu__divider" />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            United States - English <ChevronDown />
          </span>
        </div>
        <div className="ism-menu__bar">
          <div className="ism-menu__logo">
            <img className="ism-menu__logo-img" src={isLogo} alt="InsureShield" />
            <nav className="ism-menu__items">
              <span>Solutions</span>
              <span>Industries We Serve</span>
              <span>Partners and Integrations</span>
              <span>Learning Library</span>
              <span>Our Story</span>
            </nav>
          </div>
          <SearchIcon />
        </div>
      </div>
    </header>
  );
}

/* --------------------------------------------------------------- Hero */
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="ism-hero">
      <div className="ism-wrap ism-hero__inner">
        <div className="ism-hero__card">
          <div>
            <h1 className="ism-hero__title">
              Shipping Protection for Lost, Damaged, or Stolen Shipments
            </h1>
            <div className="ism-underline" style={{ marginTop: 16 }} />
          </div>
          <p className="ism-hero__desc">
            InsureShield<span className="ism-sup">®</span> Shipping Insurance helps businesses recover
            faster when deliveries go wrong, minimizing financial exposure and streamlining operations
            across carriers and fulfillment models.
          </p>
          <div className="ism-hero__buttons">
            <button className="ism-btn ism-btn--teal" onClick={() => navigate("/questionnaire")}>
              Get A Quote <Chevron />
            </button>
            <button className="ism-btn ism-btn--outline">
              Find the Right Coverage <Chevron />
            </button>
          </div>
        </div>
        <Placeholder className="ism-hero__media" />
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Stats */
const stats = [
  { num: "62M", label: "Packages Insured In 2025*" },
  { num: "$132M", label: "Claims Paid Out In 2025*" },
  { num: "97%", label: "Claims Processed Within 5 Days" },
];
function Stats() {
  return (
    <section className="ism-section">
      <div className="ism-wrap">
        <div className="ism-head">
          <h2 className="ism-head__title ism-head__title--cap">Delivering Confidence at Every Step</h2>
          <div className="ism-head__underline" />
        </div>
        <div className="ism-stats">
          {stats.map((s) => (
            <div className="ism-stat" key={s.num}>
              <div className="ism-stat__num">{s.num}</div>
              <div className="ism-stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Standout */
const standoutCards = [
  {
    title: "Trusted Insurance Provider",
    body: "As a trusted insurance provider, UPS Capital Insurance Agency, Inc. is backed by AA-rated insurance capacity from one of the world's leading global insurers",
  },
  {
    title: "Multi-carrier, Multi-modal",
    body: "InsureShield shipping insurance gives you peace of mind with coverage across all carriers and modes including UPS®, FedEx®, DHL®, USPS®",
  },
  {
    title: "Flexible Insurance Options",
    body: "Comprehensive protection for shipments that can integrate into your business through an API, webhook, or ecommerce platform",
  },
];
function Standout() {
  return (
    <section className="ism-section ism-section--tealtint">
      <div className="ism-wrap">
        <div className="ism-head">
          <h2 className="ism-head__title ism-head__title--cap">What makes us stand out against competitors</h2>
          <div className="ism-head__underline" />
        </div>
        <div className="ism-cards">
          {standoutCards.map((c) => (
            <div className="ism-card" key={c.title}>
              <div className="ism-card__icon">
                <GlyphBox />
              </div>
              <h3 className="ism-card__title">{c.title}</h3>
              <p className="ism-card__body">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Benefits */
const benefits = [
  { title: "Protection for insured shipments", sub: "Including risks like damage, loss, and porch piracy" },
  { title: "Reimbursement fir the full sales value", sub: "Also covers shipping costs" },
  { title: "Peace of mind enabled", sub: "Apply review or added protection where it matters most." },
  {
    title: "Protect revenue through shipping insurance",
    sub: "When shipping mishaps occur, shipping insurance covers the costs of expedited reshipping",
  },
];
function Benefits() {
  return (
    <section className="ism-section">
      <div className="ism-wrap">
        <div className="ism-head">
          <h2 className="ism-head__title">Benefits of InsureShield Shipping Insurance</h2>
          <div className="ism-head__underline" />
        </div>
        <div className="ism-benefits__grid">
          <Placeholder className="ism-benefits__media" />
          <div className="ism-benefits__list">
            {benefits.map((b) => (
              <div className="ism-benefit" key={b.title}>
                <CheckCircle />
                <div>
                  <p className="ism-benefit__title">{b.title}</p>
                  <p className="ism-benefit__sub">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ism-center-cta">
          <button className="ism-btn ism-btn--teal">
            Explore Coverage Options <Chevron />
          </button>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Estimator */
const fields = [
  { label: "Shipments per month", value: "1-500" },
  { label: "Average order value ($)", value: "$1-100" },
  { label: "Loss rate (%)", value: "5%" },
  { label: "Profit margin (%)", value: "1-25%" },
];
const impacts = [
  { lead: "You lose up to", big: "300", unit: "shipments / year" },
  { lead: "That's up to", big: "$30,000", unit: "in product loss" },
  { lead: "You need up to", big: "$120,000", unit: "in new sales to recover losses" },
];
function Estimator() {
  return (
    <section className="ism-section ism-section--surface">
      <div className="ism-wrap">
        <div className="ism-head">
          <h2 className="ism-head__title ism-head__title--cap">Lost Shipments Cost More Than the Package</h2>
          <div className="ism-head__underline" />
          <p className="ism-head__sub">
            When shipments are lost or damaged, the impact isn’t just the item, it’s the margin and
            future sales required to recover. Estimate your exposure.
          </p>
        </div>
        <div className="ism-calc">
          <div className="ism-calc__left">
            <h3 className="ism-calc__title">Estimate Your Business Impact</h3>
            <p className="ism-calc__desc">
              Tell us about your shipments and profit to see your potential losses and the sales needed
              to recover.
            </p>
            {fields.map((f) => (
              <div className="ism-field" key={f.label}>
                <div className="ism-field__icon">
                  <GlyphBox />
                </div>
                <div className="ism-field__body">
                  <div className="ism-field__label">{f.label}</div>
                  <div className="ism-field__select">
                    {f.value} <ChevronDown />
                  </div>
                </div>
              </div>
            ))}
            <div className="ism-calc__buttons">
              <button className="ism-btn ism-btn--teal">
                Calculate Impact <Chevron />
              </button>
              <button className="ism-btn ism-btn--outline">Clear ✕</button>
            </div>
          </div>
          <div className="ism-calc__right">
            <h3 className="ism-impact__title">Your Business Impact</h3>
            {impacts.map((i) => (
              <div className="ism-impact__row" key={i.big}>
                <div className="ism-impact__icon">
                  <GlyphBox />
                </div>
                <div>
                  <div className="ism-impact__lead">{i.lead}</div>
                  <div className="ism-impact__big">{i.big}</div>
                  <div className="ism-impact__unit">{i.unit}</div>
                </div>
              </div>
            ))}
            <div className="ism-impact__footer">
              <span className="ism-impact__footer-text">Exploring coverage options</span>
              <button className="ism-btn ism-btn--teal">
                Start now <Chevron />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Overview */
function Overview() {
  return (
    <section className="ism-section">
      <div className="ism-wrap">
        <div className="ism-head">
          <h2 className="ism-head__title">
            InsureShield<span className="ism-sup">®</span> Shipping Insurance
          </h2>
          <div className="ism-head__underline" />
          <p className="ism-head__sub" style={{ maxWidth: 840 }}>
            Shipping insurance that helps businesses recover when shipments are lost, damaged, or stolen
            with a claims experience designed to reduce manual effort and recover losses faster.
          </p>
        </div>
        <div className="ism-overview__grid">
          <Placeholder className="ism-overview__media" />
          <div className="ism-overview__content">
            <h3 className="ism-overview__title">
              InsureShield<span className="ism-sup">®</span> Shipping Insurance Overview
            </h3>
            <div className="ism-underline" />
            <p className="ism-overview__desc">
              Protect your bottom line from shipping loss, damage, and theft with coverage that fits how
              you ship, inside UPS-approved workflows, across carriers, or through Shopify checkout.
            </p>
            <div className="ism-overview__buttons">
              <button className="ism-btn ism-btn--teal">
                Start Now <Chevron />
              </button>
              <button className="ism-btn ism-btn--outline">
                See integrations <Chevron />
              </button>
            </div>
          </div>
        </div>
        <div className="ism-dots">
          <span className="ism-dots__arrow">‹</span>
          <span className="ism-dot ism-dot--active" />
          <span className="ism-dot" />
          <span className="ism-dot" />
          <span className="ism-dot" />
          <span className="ism-dot" />
          <span className="ism-dots__arrow">›</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Compare */
const compareRows = [
  {
    label: "Claims Filing Period",
    insure: (
      <p>
        No wait period for filing claims with the ability to file claims through the{" "}
        <a href="#insureshield-portal">InsureShield® Online Portal</a>
      </p>
    ),
    route: (
      <>
        <p>• Must wait 7 days after the last tracking update to file loss claims</p>
        <p>• Must wait 5 days after package is marked delivered to file porch piracy claims</p>
      </>
    ),
    ship: <p>Must wait 20 days domestically &amp; 40 days internationally to file USPS loss claims</p>,
  },
  {
    label: "Claims Filing Window",
    insure: (
      <>
        <p>• 9-month window for extended claims filing for porch piracy, loss &amp; damage</p>
        <p>• 90 days for concealed damage</p>
      </>
    ),
    route: (
      <>
        <p>• 30 day window to report loss coverage after last tracking update</p>
        <p>• 30 day post-delivery window for reporting porch piracy &amp; damage coverage</p>
      </>
    ),
    ship: (
      <>
        <p>• 120 day window for loss &amp; damage claims</p>
        <p>• 15 days to report concealed damage after delivery</p>
      </>
    ),
  },
  {
    label: "Claims Resolution",
    insure: <p>Claims resolved in up to 3 days with proper documentation; average resolution time under 4 days</p>,
    route: <p>Claims resolved within 1 – 2 days</p>,
    ship: <p>Claims resolved within 5 business days</p>,
  },
  {
    label: "Coverage Type",
    insure: (
      <>
        <p>• Customizable merchant coverage</p>
        <p>
          • Consumer-elected coverage through the <a href="#shopify-app">Shopify App</a>
        </p>
      </>
    ),
    route: <p>Consumer-paid coverage only</p>,
    ship: <p>Merchant coverage only</p>,
  },
];
function Compare() {
  return (
    <section className="ism-section ism-section--surface">
      <div className="ism-wrap">
        <div className="ism-head">
          <h2 className="ism-head__title">How Shipping Insurance Options Compare When Things Go Wrong</h2>
          <div className="ism-head__underline" />
          <p className="ism-head__sub" style={{ maxWidth: 560 }}>Not all shipping insurance works the same.</p>
        </div>
        <div className="ism-compare">
          <div className="ism-compare__colhead">
            <div />
            <div>InsureShield®</div>
            <div>Route</div>
            <div>Shipsurance</div>
          </div>
          {compareRows.map((r, idx) => (
            <div className="ism-compare__row" key={r.label}>
              <div className="ism-compare__cell ism-compare__cell--label">{r.label}</div>
              <div className={`ism-compare__cell ${idx % 2 ? "ism-compare__cell--tint" : "ism-compare__cell--white"}`}>
                {r.insure}
              </div>
              <div className={`ism-compare__cell ${idx % 2 ? "ism-compare__cell--tint" : "ism-compare__cell--white"}`}>
                {r.route}
              </div>
              <div
                className={`ism-compare__cell ism-compare__cell--last ${
                  idx % 2 ? "ism-compare__cell--tint" : "ism-compare__cell--white"
                }`}
              >
                {r.ship}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Stories */
function Stories() {
  return (
    <section className="ism-section ism-section--tealtint">
      <div className="ism-wrap">
        <div className="ism-head ism-stories__head">
          <h2 className="ism-head__title">Read More Stories</h2>
          <div className="ism-head__underline" />
          <p className="ism-head__sub">
            Whether you’re a manufacturer, distributor or retailer, we’ve got solutions to support your
            business.
          </p>
        </div>
        <div className="ism-story">
          <Placeholder className="ism-story__media" />
          <div className="ism-story__content">
            <div className="ism-story__eyebrow">
              <span className="ism-story__eyebrow-divider" />
              CUSTOMER SUCCESS STORIES
            </div>
            <h3 className="ism-story__title">Protecting Innovation: Redefining the Specialty Meat Market</h3>
            <p className="ism-story__body">
              For growing businesses like Aussie Select, protecting their bottom line is vital. Discover
              how a policy with InsureShield® shipping insurance reduced losses and streamlined claims.
            </p>
            <button className="ism-btn ism-btn--teal" style={{ alignSelf: "flex-start" }}>
              Behind the Success <Chevron />
            </button>
          </div>
        </div>
        <div className="ism-center-cta">
          <button className="ism-btn ism-btn--outline">
            Meet our customers <Chevron />
          </button>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Banner */
function Banner() {
  return (
    <section className="ism-banner">
      <div className="ism-wrap">
        <h2 className="ism-banner__title">Find the Right Solution for Your Business</h2>
        <div className="ism-banner__underline" />
        <p className="ism-banner__desc">
          Answer a few quick questions to see which shipping protection solution best fits your
          needs-and where you could save.
        </p>
        <p className="ism-banner__sub">
          Receive a customized dashboard highlighting potential savings and coverage options
        </p>
        <div className="ism-banner__cta">
          <button className="ism-btn ism-btn--gold">
            See Coverage Options <Chevron />
          </button>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Footer */
function Footer() {
  return (
    <footer className="ism-footer">
      <div className="ism-wrap">
        <div className="ism-footer__wordmark">InsureShield</div>
        <div className="ism-footer__legal">
          © {new Date().getFullYear()} United Parcel Service of America, Inc. UPS, the UPS brandmark, and
          the color brown are trademarks of United Parcel Service of America, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------- Page */
export default function InsureShield() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="ism">
      <Header />
      <Hero />
      <Stats />
      <Standout />
      <Benefits />
      <Estimator />
      <Overview />
      <Compare />
      <Stories />
      <Banner />
      <Footer />
    </div>
  );
}
