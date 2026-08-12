import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InsureShield.css";
import "./CommerceShield.css";

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
function ShieldGlyph() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
  const navigate = useNavigate();
  return (
    <header className="ism-header">
      <div className="ism-notice">
        <div className="ism-notice__left">
          <span className="ism-notice__count">1 of 1</span>
          <span className="ism-notice__msg">
            Real-time fraud scoring on every order. <u>See how it works</u>
          </span>
        </div>
        <span className="ism-notice__close">✕</span>
      </div>
      <div className="ism-menu">
        <div className="ism-menu__auth">
          <span onClick={() => navigate("/login")}>Log In</span>
          <span className="ism-menu__divider" />
          <span>Contact Sales</span>
          <span className="ism-menu__divider" />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            United States - English <ChevronDown />
          </span>
        </div>
        <div className="ism-menu__bar">
          <div className="ism-menu__logo">
            <span className="cs-wordmark">CommerceShield</span>
            <nav className="ism-menu__items">
              <span>How It Works</span>
              <span>Fraud Protection</span>
              <span>Chargeback Coverage</span>
              <span>Integrations</span>
              <span>Pricing</span>
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
              Stop Fraud Before It Ships
            </h1>
            <div className="ism-underline" style={{ marginTop: 16 }} />
          </div>
          <p className="ism-hero__desc">
            CommerceShield<span className="ism-sup">™</span> scores every order in real time, blocking
            risky transactions before fulfillment and protecting your revenue from fraudulent
            chargebacks, without slowing down good customers.
          </p>
          <div className="ism-hero__buttons">
            <button
              className="ism-btn ism-btn--teal"
              onClick={() => navigate("/login", { state: { newAccount: true } })}
            >
              UPS Digital Solutions Portal <Chevron />
            </button>
            <button className="ism-btn ism-btn--outline">
              Talk to an Expert <Chevron />
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
  { num: "94%", label: "Of Fraudulent Orders Blocked" },
  { num: "<0.3%", label: "False Positive Rate" },
  { num: "80ms", label: "Average Decision Time" },
];
function Stats() {
  return (
    <section className="ism-section">
      <div className="ism-wrap">
        <div className="ism-head">
          <h2 className="ism-head__title ism-head__title--cap">Protection That Pays for Itself</h2>
          <div className="ism-head__underline" />
        </div>
        <div className="ism-stats">
          {stats.map((s) => (
            <div className="ism-stat" key={s.label}>
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
    title: "Real-Time ML Scoring",
    body: "Every order is analyzed against 40+ signals — device, velocity, proxy detection, address mismatches — and scored 0–1000 in under 80ms.",
  },
  {
    title: "Chargeback Protection",
    body: "Approve with confidence. Enhanced Order Scoring reimburses you for fraudulent chargebacks on orders CommerceShield cleared.",
  },
  {
    title: "No-Code Integration",
    body: "Connect through the Checkout Cart API or your ecommerce platform. Scoring turns on for new orders with zero engineering lift.",
  },
];
function Standout() {
  return (
    <section className="ism-section ism-section--tealtint">
      <div className="ism-wrap">
        <div className="ism-head">
          <h2 className="ism-head__title ism-head__title--cap">Why Merchants Choose CommerceShield</h2>
          <div className="ism-head__underline" />
        </div>
        <div className="ism-cards">
          {standoutCards.map((c) => (
            <div className="ism-card" key={c.title}>
              <div className="ism-card__icon">
                <ShieldGlyph />
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

/* --------------------------------------------------------------- How it works */
const steps = [
  { num: "1", title: "Integrate via Checkout Cart API", body: "No code required — connect your store in minutes." },
  { num: "2", title: "Every order is analyzed at checkout", body: "The ML model reviews 40+ signals: network, velocity patterns, proxy detection, address mismatches, and more." },
  { num: "3", title: "A risk score is generated (0–1000)", body: "Decisions land in under 80ms, blocking 94% of fraudulent orders with a <0.3% false positive rate." },
  { num: "4", title: "Safe orders pass, risky orders are held", body: "Set thresholds and orchestration rules to auto-resolve, review, or block." },
];
function HowItWorks() {
  return (
    <section className="ism-section">
      <div className="ism-wrap">
        <div className="ism-head">
          <h2 className="ism-head__title">How CommerceShield Works</h2>
          <div className="ism-head__underline" />
        </div>
        <div className="ism-benefits__grid">
          <div className="ism-benefits__list">
            {steps.map((s) => (
              <div className="ism-benefit" key={s.num}>
                <span className="cs-step__num">{s.num}</span>
                <div>
                  <p className="ism-benefit__title">{s.title}</p>
                  <p className="ism-benefit__sub">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Placeholder className="ism-benefits__media" />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Plans */
const plans = [
  {
    name: "Order Scoring",
    tag: "Fraud detection",
    price: "$0.30",
    per: "/order",
    features: [
      "ML risk scoring on 40+ signals",
      "Risk score (0–1000) on every order",
      "Manual review holds & email alerts",
      "Scoring filters & orchestration rules",
      "Decisions in under 80ms",
    ],
  },
  {
    name: "Enhanced Order Scoring",
    tag: "Fraud detection + chargeback protection",
    price: "$0.30",
    per: "/order",
    sub: "+ 0.6% of order value",
    featured: true,
    features: [
      "Everything in Order Scoring",
      "Chargeback protection on approved orders",
      "Reimbursement for fraudulent chargebacks",
      "Priority risk orchestration rules",
      "Peace of mind on every approved sale",
    ],
  },
];
function Plans() {
  const navigate = useNavigate();
  return (
    <section className="ism-section ism-section--surface">
      <div className="ism-wrap">
        <div className="ism-head">
          <h2 className="ism-head__title ism-head__title--cap">Simple, Pay-As-You-Go Pricing</h2>
          <div className="ism-head__underline" />
          <p className="ism-head__sub">
            Only pay for the orders you score. No setup fees, no minimums, cancel anytime.
          </p>
        </div>
        <div className="cs-plans">
          {plans.map((p) => (
            <div className={`cs-plan${p.featured ? " cs-plan--featured" : ""}`} key={p.name}>
              {p.featured && <span className="cs-plan__badge">Most protection</span>}
              <h3 className="cs-plan__name">{p.name}</h3>
              <p className="cs-plan__tag">{p.tag}</p>
              <div className="cs-plan__price">
                <span className="cs-plan__amount">{p.price}</span>
                <span className="cs-plan__per">{p.per}</span>
              </div>
              {p.sub && <p className="cs-plan__sub">{p.sub}</p>}
              <ul className="cs-plan__features">
                {p.features.map((f) => (
                  <li key={f}>
                    <CheckCircle />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`ism-btn ${p.featured ? "ism-btn--teal" : "ism-btn--outline"} cs-plan__cta`}
                onClick={() => navigate("/login", { state: { newAccount: true } })}
              >
                Get Started <Chevron />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Story */
function Story() {
  return (
    <section className="ism-section ism-section--tealtint">
      <div className="ism-wrap">
        <div className="ism-story">
          <Placeholder className="ism-story__media" />
          <div className="ism-story__content">
            <div className="ism-story__eyebrow">
              <span className="ism-story__eyebrow-divider" />
              CUSTOMER SUCCESS STORY
            </div>
            <h3 className="ism-story__title">From $2,800 in monthly fraud losses to $2,300 in savings</h3>
            <p className="ism-story__body">
              “We were losing $2,800 a month to fraud. CommerceShield caught 94% of it in the first
              month — now we’re saving $2,300 a month after the service cost.”
            </p>
            <p className="ism-benefit__sub">Derrick Laing, Operations Manager, StyleBox</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Banner */
function Banner() {
  const navigate = useNavigate();
  return (
    <section className="ism-banner">
      <div className="ism-wrap">
        <h2 className="ism-banner__title">Ready to Protect Every Order?</h2>
        <div className="ism-banner__underline" />
        <p className="ism-banner__desc">
          Create your UPS Digital Solutions account and turn on real-time fraud scoring in minutes.
        </p>
        <p className="ism-banner__sub">
          No setup fees. Pay only for the orders you score.
        </p>
        <div className="ism-banner__cta">
          <button
            className="ism-btn ism-btn--gold"
            onClick={() => navigate("/login", { state: { newAccount: true } })}
          >
            UPS Digital Solutions Portal <Chevron />
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
        <div className="ism-footer__wordmark">CommerceShield</div>
        <div className="ism-footer__legal">
          © {new Date().getFullYear()} United Parcel Service of America, Inc. UPS, the UPS brandmark, and
          the color brown are trademarks of United Parcel Service of America, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------- Page */
export default function CommerceShield() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="ism cs-market">
      <Header />
      <Hero />
      <Stats />
      <Standout />
      <HowItWorks />
      <Plans />
      <Story />
      <Banner />
      <Footer />
    </div>
  );
}
