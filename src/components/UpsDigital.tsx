import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpsDigital.css";

import heroRoad from "../assets/insureshield/hero-road.png";
import protectImg from "../assets/insureshield/protect.png";
import predictImg from "../assets/insureshield/predict.png";
import pluginImg from "../assets/insureshield/plugin.png";
import partnerImg from "../assets/insureshield/partner.png";
import powerImg from "../assets/insureshield/power.png";

import shopifyLogo from "../assets/logos/shopify.svg";
import etsyLogo from "../assets/logos/etsy.svg";
import wooLogo from "../assets/logos/woocommerce.svg";
import upsLogo from "../assets/logos/ups-logo.png";

import heroRestore from "../assets/insureshield/hero-restore.mp4";
import sceneClarity from "../assets/insureshield/scene-clarity.png";
import sceneReassurance from "../assets/insureshield/scene-reassurance.png";

/* Hero video + scene stills (local); protection scene uses the restore video */
const HERO_VIDEO =
  "https://storage.googleapis.com/insureshield-hero-assets-2026/OminousToOptimisticRestoration_04062026.mp4";
const SCENE_PROTECTION_VIDEO = heroRestore;
const SCENE_VISIBILITY = sceneClarity;
const SCENE_RESOLUTION = sceneReassurance;

/* ------------------------------------------------------------------ Chevron */
function Chevron() {
  return (
    <svg
      className="isd-btn__chevron"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ Nav */
const productsMenu = [
  { group: "Prevent", items: ["CommerceShield"] },
  { group: "Predict", items: ["Control Tower", "Source Scan"] },
  {
    group: "Protect",
    items: [
      "InsureShield Shipping Insurance",
      "InsureShield Checkout Protection",
    ],
  },
];

const solutionsMenu = [
  {
    group: "Plug In",
    items: ["Ecommerce Integrations", "LynkUp"],
  },
  {
    group: "Power",
    items: [
      "Post-Purchase Solutions",
      "Resolutions",
      "Analytics & Orchestration",
    ],
  },
];

function NavDropdown({
  label,
  href,
  columns,
}: {
  label: string;
  href: string;
  columns: { group: string; items: string[] }[];
}) {
  const navigate = useNavigate();
  const routeFor: Record<string, string> = {
    CommerceShield: "/commerceshield",
    "InsureShield Shipping Insurance": "/insureshield",
  };
  return (
    <div className="isd-nav__item">
      <a href={href} className="isd-nav__trigger">
        {label}
        <svg
          className="isd-nav__caret"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <div className="isd-nav__menu">
        <div className="isd-nav__menu-inner">
          {columns.map((col) => (
            <div className="isd-nav__col" key={col.group}>
              <p className="isd-nav__col-label">{col.group}</p>
              <ul>
                {col.items.map((item) =>
                  routeFor[item] ? (
                    <li key={item}>
                      <a
                        href={routeFor[item]}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(routeFor[item]);
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ) : (
                    <li key={item}>
                      <a href={href}>{item}</a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="isd-nav">
      <div className="isd-nav__inner">
        <div className="isd-nav__brand">
          <img src={upsLogo} alt="UPS" className="isd-nav__logo" />
          <span className="isd-nav__brand-divider">|</span>
          <span className="isd-nav__brand-name">UPS Digital</span>
        </div>
        <div className="isd-nav__links">
          <NavDropdown label="Products" href="#products" columns={productsMenu} />
          <NavDropdown
            label="Solutions"
            href="#solutions"
            columns={solutionsMenu}
          />
          <a href="#resources" className="isd-nav__trigger">
            Resources
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ Hero */
const rotatingWords = [
  "confidence.",
  "control.",
  "clarity.",
  "trust.",
  "margin.",
  "momentum.",
  "happiness.",
];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="isd-hero__rotate" key={index}>
      {rotatingWords[index]}
    </span>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="isd-hero">
      <div className="isd-hero__media">
        <video
          className="isd-hero__video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={heroRoad}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="isd-hero__grad-v" />
        <div className="isd-hero__grad-h" />
        <div className="isd-hero__scrim" />
      </div>

      <div className="isd-hero__content">
        <p className="isd-hero__eyebrow">For multi-carrier, multi-modal shippers</p>
        <h1 className="isd-hero__title">
          <span>When delivery fails,</span>
          <span>
            one system restores <RotatingWord />
          </span>
        </h1>
        <p className="isd-hero__subhead">
          Protect shipments. Reduce claims labor. Prevent avoidable loss.
        </p>
        <div className="isd-hero__ctas">
          <button className="isd-btn isd-btn--white" onClick={() => navigate("/login", { state: { newAccount: true } })}>
            UPS Digital Solutions Portal
            <Chevron />
          </button>
          <button className="isd-btn isd-btn--ghost isd-btn--hero-white">
            Talk to an expert
            <Chevron />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Immersion scene */
function Scene({
  image,
  video,
  eyebrow,
  lines,
}: {
  image?: string;
  video?: string;
  eyebrow: string;
  lines: [string, string];
}) {
  return (
    <section className="isd-scene">
      <div className="isd-scene__pin">
        {video ? (
          <video
            className="isd-scene__bg isd-scene__bg--video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <div
            className="isd-scene__bg"
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
        <div className="isd-scene__overlay" />
      </div>
      <div className="isd-scene__text">
        {eyebrow && <p className="isd-scene__eyebrow">{eyebrow}</p>}
        <div className="isd-scene__headline">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Router accordion */
const routerCards = [
  {
    id: "protect",
    label: "PROTECT",
    color: "rgba(63, 162, 157, 0.95)",
    title: "Shipping Insurance",
    value:
      "Protect shipments across carriers with predictable coverage and clear claims.",
    cta: "Explore coverage",
    anchor: true,
    image: protectImg,
  },
  {
    id: "predict",
    label: "PREDICT",
    color: "rgba(99, 102, 241, 0.95)",
    title: "Supply Chain Visibility",
    value:
      "See delays and sourcing risk coming, so nothing catches your orders off guard.",
    cta: "Explore visibility",
    image: partnerImg,
  },
  {
    id: "prevent",
    label: "PREVENT",
    color: "rgba(71, 85, 105, 0.95)",
    title: "Loss Prevention",
    value: "Spot high-risk orders before you ship, so you can head off avoidable loss.",
    cta: "Explore prevention",
    route: "/commerceshield",
    image: predictImg,
  },
  {
    id: "plug-in",
    label: "PLUG IN",
    color: "rgba(168, 85, 247, 0.95)",
    title: "Ecommerce & Platform Integrations",
    value:
      "Connect your store and systems to add protection and streamlined claims, from checkout to custom workflows.",
    cta: "Explore integrations",
    image: pluginImg,
  },
  {
    id: "power",
    label: "POWER",
    color: "rgba(251, 146, 60, 0.95)",
    title: "Post-Purchase Solutions",
    value:
      "Unify post-purchase experiences that reduce support burden and protect trust.",
    cta: "Explore solutions",
    image: powerImg,
  },
];

function RouterSection() {
  const [active, setActive] = useState<string>("protect");
  const navigate = useNavigate();

  return (
    <section className="isd-router" id="coverage">
      <div className="isd-router__inner">
        <h2 className="isd-router__title">We&rsquo;ve got you covered.</h2>
        <div className="isd-router__deck">
          {routerCards.map((c) => {
            const isActive = active === c.id;
            return (
              <div
                key={c.id}
                className={`isd-card${isActive ? " isd-card--active" : ""}`}
                onMouseEnter={() => setActive(c.id)}
                onMouseLeave={() => setActive("protect")}
                onClick={() => setActive(c.id)}
              >
                <div
                  className="isd-card__bg"
                  style={{ backgroundImage: `url(${c.image})` }}
                />
                <div className="isd-card__grad" />
                <span
                  className="isd-card__label"
                  style={{ backgroundColor: c.color }}
                >
                  {c.label}
                </span>
                <h3 className="isd-card__title">{c.title}</h3>
                <div className="isd-card__body">
                  <p className="isd-card__value">{c.value}</p>
                  <button
                    className="isd-card__cta"
                    style={{ color: c.anchor ? "#3FA29D" : "#101828" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (c.route) navigate(c.route);
                    }}
                  >
                    {c.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Cost of fragmentation */
const costStats = [
  {
    stat: "1 in 10",
    label: "deliveries go wrong",
    context:
      "Orders arrive late, show up damaged, or never reach the doorstep at all.",
  },
  {
    stat: "119M",
    label: "packages stolen a year",
    context:
      "Porch theft is now routine, and customers still expect you to make it right.",
  },
  {
    stat: "60 days",
    label: "the industry claim standard",
    context:
      "A typical carrier claim can take up to two months to resolve while your customer waits.",
  },
  {
    stat: "84%",
    label: "of shoppers leave",
    context:
      "One bad delivery is all it takes for most customers to stop buying from you.",
  },
];

function CostSection() {
  return (
    <section className="isd-cost">
      <div className="isd-wrap">
        <h2 className="isd-h2">The cost of fragmented resolution</h2>
        <p className="isd-sub isd-cost__intro">
          One bad delivery is a problem. One hundred bad deliveries, each handled
          differently, erode your margin and your customers' trust.
        </p>
        <div className="isd-cost__grid">
          {costStats.map((s) => (
            <div className="isd-cost__card" key={s.stat}>
              <p className="isd-cost__stat">{s.stat}</p>
              <p className="isd-cost__label">{s.label}</p>
              <p className="isd-cost__context">{s.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Two futures */
const withoutList = [
  "Shipment data, returns, claims, and customer inquiries live in different systems.",
  "Teams spend time switching between portals to find the information they need.",
  "Customers wait longer while issues are researched and routed.",
  "New workflows often mean more vendors, integrations, and complexity.",
  "Visibility is limited across the post purchase journey.",
];
const withList = [
  "Manage shipments, orders, claims, returns, notifications, and customer resolutions in one place.",
  "Connect carriers, systems, and workflows through APIs and integrations.",
  "Give teams a shared view of the customer journey from order to delivery and beyond.",
  "Resolve issues faster with the right information at your fingertips.",
  "Create more consistent experiences for customers at every touchpoint.",
];

function FuturesSection() {
  return (
    <section className="isd-futures">
      <div className="isd-wrap">
        <h2 className="isd-h2">Two ways to manage the customer journey after purchase</h2>
        <p className="isd-sub isd-futures__intro">
          The customer journey does not end at checkout. The difference is
          whether your teams manage it across multiple tools or through one
          connected experience.
        </p>
        <div className="isd-futures__grid">
          <div className="isd-futures__col isd-futures__col--bad">
            <span className="isd-futures__tag">Without UPS Digital Solutions</span>
            <h3>Disconnected tools. Disconnected experiences.</h3>
            <ul>
              {withoutList.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="isd-futures__end">
              How it ends: More manual work. Slower resolutions. Frustrated
              customers.
            </p>
          </div>
          <div className="isd-futures__col isd-futures__col--good">
            <span className="isd-futures__tag">With UPS Digital Solutions</span>
            <h3>One suite. One connected experience.</h3>
            <ul>
              {withList.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="isd-futures__end">
              How it ends: Less complexity. Better visibility. Stronger customer
              experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Protection icons */
function ShieldCheckGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m8.5 11.6 2.4 2.4 4.6-4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartShieldGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.5 3.5H5l2.2 11a1.3 1.3 0 0 0 1.3 1h8.1a1.3 1.3 0 0 0 1.3-1L20.5 7H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ Protection products */
const protectionProducts = [
  {
    id: "shipping",
    stage: "When a shipment is lost, damaged, or stolen",
    name: "InsureShield\u00ae Shipping Insurance",
    tagline: "For the shipments you can\u2019t afford to lose.",
    pain: "\u201cIt\u2019s gone, the carrier won\u2019t cover it, and somehow I\u2019m the one eating the cost.\u201d",
    body: "We cover your packages across every carrier, even when they\u2019re stolen off a porch. File a claim in minutes, get paid fast, and reship without the stress.",
    icon: <ShieldCheckGlyph />,
    cta: "Explore",
  },
  {
    id: "checkout",
    stage: "At the moment of purchase",
    name: "InsureShield\u00ae Checkout Protection",
    tagline: "Peace of mind your customer can add to the cart.",
    pain: "\u201cIf this shows up broken, they\u2019ll blame my brand, not the carrier.\u201d",
    body: "Let customers protect their own orders right at checkout. If something goes wrong, the claim goes straight to a dedicated resolution team. So a mishap stays a quick fix, and never turns into a bad review or a refund you have to cover.",
    icon: <CartShieldGlyph />,
    cta: "Explore",
  },
];

function ProtectionSection() {
  const navigate = useNavigate();
  return (
    <section className="isd-protection" id="protection">
      <div className="isd-wrap">
        <h2 className="isd-h2">
          Loss happens. Losing the customer doesn&rsquo;t have to.
        </h2>
        <p className="isd-sub">
          A package that never showed is an upset customer and a refund you
          never saw coming. Every lost order costs you twice, and we take that
          off your plate and out of their experience.
        </p>

        <div className="isd-protection__grid">
          {protectionProducts.map((p) => (
            <article className="isd-protection__card" key={p.id}>
              <span className="isd-protection__icon">{p.icon}</span>
              <h3 className="isd-protection__name">{p.name}</h3>
              <p className="isd-protection__tag">{p.tagline}</p>
              <span className="isd-protection__stage">{p.stage}</span>
              <p className="isd-protection__pain">{p.pain}</p>
              <p className="isd-protection__body">{p.body}</p>
              <button
                className="isd-link isd-protection__cta"
                onClick={() => {
                  if (p.id === "shipping") navigate("/insureshield");
                }}
              >
                {p.cta} <Chevron />
              </button>
            </article>
          ))}
        </div>

        <p className="isd-protection__close">
          Either way, your customer sees one thing: a brand that makes it right.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Claims timeline */
const claimSteps = [
  {
    num: "01",
    title: "Submit",
    desc: "File online, 24/7.",
    need: "Tracking number, shipment details, proof of value",
  },
  {
    num: "02",
    title: "Review",
    desc: "We check your claim and only reach out if something is missing.",
    need: "Photos of damage, a short description of the issue",
  },
  {
    num: "03",
    title: "Decision",
    desc: "You get a clear answer, and can track your claim the whole way.",
    need: "Anything we requested, your claim reference",
  },
  {
    num: "04",
    title: "Payment",
    desc: "Approved claims are paid out fast, so you can reship and move on.",
    need: "Payment details on file",
  },
];

const claimPromises = [
  "File online any time, no hold music or paperwork",
  "One process across every carrier",
  "Get paid in days, not weeks",
];

function ClaimsSection() {
  const navigate = useNavigate();

  return (
    <section className="isd-claims" id="claims">
      <div className="isd-wrap isd-claims__grid">
        <div className="isd-claims__intro">
          <h2 className="isd-h2">
            A claims process your team can run consistently
          </h2>
          <p className="isd-sub">
            The same clear path every time, so you always know what happens
            next.
          </p>
          <ul className="isd-claims__promises">
            {claimPromises.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <button
            type="button"
            className="isd-btn isd-btn--dark isd-claims__cta"
            onClick={() => navigate("/portal")}
          >
            View the full claims checklist <Chevron />
          </button>
          <p className="isd-claims__note">
            Payout timing varies based on claim complexity.
          </p>
        </div>

        <ol className="isd-claims__steps">
          {claimSteps.map((s) => (
            <li className="isd-claims__step" key={s.num}>
              <span className="isd-claims__step-num">{s.num}</span>
              <div className="isd-claims__step-body">
                <p className="isd-claims__step-title">{s.title}</p>
                <p className="isd-claims__step-desc">{s.desc}</p>
                <p className="isd-claims__step-need">
                  <span>You&rsquo;ll need</span> {s.need}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Comparison */
const compareRows = [
  ["Type of coverage", "Licensed insurance", "Carrier liability limit"],
  ["Porch piracy / theft after delivery", "Covered*", "Not covered"],
  ["Multi-carrier flexibility", "All carriers", "Single carrier only"],
  ["Claims filing", "24/7 online portal", "Carrier-specific process"],
  ["Claims window", "Extended timeframe", "Strict carrier limits"],
];

function CompareSection() {
  return (
    <section className="isd-compare">
      <div className="isd-wrap">
        <h2 className="isd-h2">InsureShield vs. carrier declared value</h2>
        <div className="isd-table">
          <div className="isd-table__head">
            <span />
            <span className="isd-table__is">InsureShield</span>
            <span>Carrier Declared Value</span>
          </div>
          {compareRows.map((r) => (
            <div className="isd-table__row" key={r[0]}>
              <span className="isd-table__label">{r[0]}</span>
              <span className="isd-table__is">{r[1]}</span>
              <span>{r[2]}</span>
            </div>
          ))}
        </div>
        <p className="isd-compare__foot">
          * Coverage details and exclusions apply. See full policy terms for
          complete information.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Product groups */
const productGroups = [
  {
    group: "Prevent",
    items: [
      {
        name: "CommerceShield",
        desc: "Prevent risk before it disrupts growth with CommerceShield.",
        cta: "Explore",
      },
    ],
  },
  {
    group: "Predict",
    items: [
      {
        name: "Control Tower",
        desc: "Predict disruptions with end-to-end visibility across every shipment.",
        cta: "Explore",
      },
      {
        name: "Source Scan",
        desc: "Model tariff and sourcing costs before they hit your orders.",
        cta: "Explore",
      },
    ],
  },
  {
    group: "Plug In",
    items: [
      {
        name: "Ecommerce Integrations",
        desc: "Connect your store to add protection and streamlined claims at checkout.",
        cta: "Explore",
        logos: [
          { src: shopifyLogo, alt: "Shopify" },
          { src: etsyLogo, alt: "Etsy" },
          { src: wooLogo, alt: "WooCommerce" },
        ],
      },
      {
        name: "LynkUp",
        desc: "Connect your systems and custom workflows to protection and claims through a flexible API.",
        cta: "Explore",
      },
    ],
  },
  {
    group: "Protect",
    items: [
      {
        name: "InsureShield\u00ae Shipping Insurance",
        desc: "We make shipping protection simple, fast, and whole.",
        cta: "Explore",
      },
      {
        name: "InsureShield Checkout Protection",
        desc: "Protect revenue and trust when issues occur at checkout.",
        cta: "Explore",
      },
    ],
  },
  {
    group: "Power",
    items: [
      {
        name: "Post-Purchase Solutions",
        desc: "Branded tracking, alert communications, and customer resolutions for refunds, repairs, and returns, all in one place.",
        cta: "Explore",
      },
      {
        name: "Analytics & Orchestration",
        desc: "Manage orders, shipments, claims, billing, and store operations in one unified portal.",
        cta: "Get Started in UPS Digital Solutions",
      },
    ],
  },
];

function ProductsSection() {
  const navigate = useNavigate();
  return (
    <section className="isd-products" id="resources">
      <div className="isd-wrap">
        <h2 className="isd-h2">Explore products by outcome</h2>
        <p className="isd-sub">
          UPS Digital solutions help businesses prevent risk before it disrupts
          growth, protect revenue and trust when issues occur, and power smarter
          commerce across the customer journey.
        </p>
        {productGroups.map((g) => (
          <div className="isd-products__group" key={g.group}>
            <p className="isd-products__label">{g.group}</p>
            <div className="isd-products__grid">
              {g.items.map((it) => (
                <div
                  className="isd-product"
                  key={it.name}
                  onClick={() => {
                    if (it.name.includes("Shipping Insurance")) navigate("/insureshield");
                    else if (it.name === "CommerceShield") navigate("/commerceshield");
                  }}
                >
                  <h4>{it.name}</h4>
                  <p>{it.desc}</p>
                  {"logos" in it && it.logos && (
                    <div className="isd-product__logos">
                      {it.logos.map((logo) => (
                        <span className="isd-logo-tile" key={logo.alt}>
                          <img src={logo.src} alt={logo.alt} />
                        </span>
                      ))}
                    </div>
                  )}
                  <button className="isd-link">
                    {it.cta} &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Shopify */
function CheckoutMock() {
  const items = [0, 1];
  return (
    <div className="isd-checkout" aria-hidden="true">
      <div className="isd-checkout__bar">
        <span className="isd-checkout__dot" />
        <span className="isd-checkout__dot" />
        <span className="isd-checkout__dot" />
        <div className="isd-checkout__url" />
      </div>
      <div className="isd-checkout__body">
        <div className="isd-checkout__head" />
        <div className="isd-checkout__items">
          {items.map((i) => (
            <div className="isd-checkout__item" key={i}>
              <span className="isd-checkout__thumb" />
              <span className="isd-checkout__lines">
                <span className="isd-checkout__line isd-checkout__line--wide" />
                <span className="isd-checkout__line" />
              </span>
              <span className="isd-checkout__price" />
            </div>
          ))}
        </div>
        <div className="isd-checkout__protect">
          <span className="isd-checkout__shield">
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path
                d="M9 1l7 2.5v6C16 14 13 17.5 9 19 5 17.5 2 14 2 9.5v-6L9 1z"
                fill="currentColor"
                opacity="0.18"
              />
              <path
                d="M9 1l7 2.5v6C16 14 13 17.5 9 19 5 17.5 2 14 2 9.5v-6L9 1z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M6 9.8l2.2 2.2L12 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="isd-checkout__protect-text">
            <span className="isd-checkout__line isd-checkout__line--wide" />
            <span className="isd-checkout__line" />
          </span>
          <span className="isd-checkout__toggle isd-checkout__toggle--on">
            <span className="isd-checkout__knob" />
          </span>
        </div>
        <div className="isd-checkout__summary">
          <div className="isd-checkout__row">
            <span className="isd-checkout__line" />
            <span className="isd-checkout__price" />
          </div>
          <div className="isd-checkout__row">
            <span className="isd-checkout__line" />
            <span className="isd-checkout__price" />
          </div>
          <div className="isd-checkout__row isd-checkout__row--total">
            <span className="isd-checkout__line isd-checkout__line--wide" />
            <span className="isd-checkout__price isd-checkout__price--total" />
          </div>
        </div>
        <div className="isd-checkout__cta" />
      </div>
    </div>
  );
}

function ShopifySection() {
  return (
    <section className="isd-shopify" id="shopify">
      <div className="isd-wrap isd-shopify__inner">
        <div className="isd-shopify__copy">
          <p className="isd-eyebrow-dark">For Shopify merchants</p>
          <h2 className="isd-h2">Add shipping protection at checkout</h2>
          <p className="isd-sub">
            Offer checkout protection to reduce support burden. Give customers a
            branded claims portal and keep them in your ecosystem.
          </p>
          <div className="isd-shopify__ctas">
            <button className="isd-btn isd-btn--dark">
              Connect My Store
              <Chevron />
            </button>
            <button className="isd-btn isd-btn--outline">
              See How It Works
              <Chevron />
            </button>
          </div>
        </div>
        <div className="isd-shopify__art">
          <CheckoutMock />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Checklist capture */
function ChecklistSection() {
  return (
    <section className="isd-checklist">
      <div className="isd-wrap isd-checklist__inner">
        <h2 className="isd-h2">Get the Claim Readiness Checklist</h2>
        <p className="isd-sub">
          What to document, what to save, and how to reduce delays when something
          goes wrong.
        </p>
        <form className="isd-checklist__form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your work email" aria-label="Your work email" />
          <button className="isd-btn isd-btn--dark" type="submit">
            Send the Checklist
            <Chevron />
          </button>
        </form>
        <p className="isd-checklist__note">
          We respect your privacy. You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */
const faqData = [
  {
    q: "Is this real insurance vs. protection?",
    a: 'InsureShield is licensed, underwritten insurance\u2014regulated and backed by UPS Capital Insurance Agency. "Shipping protection" from other providers may be self-insured programs with unclear claims standards. Licensed insurance provides clearer coverage boundaries and regulatory oversight.',
  },
  {
    q: "What's covered / not covered?",
    a: "Covered: Lost or missing packages, damaged shipments, porch piracy/theft after delivery, and multi-carrier incidents. Not covered: Prohibited items, insufficient packaging (if proven), and claims filed beyond policy window. See full terms for complete details.",
  },
  {
    q: "What documents are required?",
    a: "For all claims: Tracking number, carrier details, and proof of value (invoice/receipt). For loss/theft: Proof of non-delivery and customer statement. For damage: Photos of damaged item and packaging. Download the full claims checklist for complete requirements.",
  },
  {
    q: "Which carriers are supported?",
    a: "Multi-carrier plans cover UPS, FedEx, USPS, DHL, and major regional carriers. Carrier-specific plans (like UPS-only coverage) are also available. Your quote will show which carriers are included.",
  },
  {
    q: "Shopify path vs. sales-assisted path?",
    a: "Shopify merchants can install the app to add checkout protection\u2014customers opt in, and claims are handled through a co-branded portal. Sales-assisted path is for businesses shipping via their own systems or multi-channel operations. Both use the same licensed insurance.",
  },
  {
    q: "Where do I manage claims?",
    a: "All claims are filed and tracked through the online portal. Log in 24/7 to submit new claims, upload documentation, check status, and view history. No phone call required to file.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="isd-faq">
      <div className="isd-wrap">
        <h2 className="isd-h2">Common questions</h2>
        <div className="isd-faq__list">
          {faqData.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`isd-faq__item${isOpen ? " isd-faq__item--open" : ""}`} key={f.q}>
                <button
                  className="isd-faq__q"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <span className="isd-faq__chevron">⌄</span>
                </button>
                <div className="isd-faq__a">
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Final CTA + footer */
const footerCols = [
  {
    title: "Coverage",
    links: ["Multi-Carrier Insurance", "Shopify Protection", "UPS Shipments", "Compare Plans"],
  },
  {
    title: "Resources",
    links: ["Coverage Guide", "How to File a Claim", "Support"],
  },
  {
    title: "Company",
    links: ["About InsureShield", "UPS Digital Suite", "Partners", "Contact Sales"],
  },
  {
    title: "Existing Customers",
    links: ["Log In", "File a Claim", "Check Claim Status", "Customer Support"],
  },
];

function RiskPortalMock() {
  const bars = [42, 58, 35, 70, 50, 64, 48, 78];
  const rows = [
    { risk: "high" },
    { risk: "med" },
    { risk: "low" },
    { risk: "med" },
  ];
  return (
    <div className="isd-mock" aria-hidden="true">
      <div className="isd-mock__bar">
        <span className="isd-mock__dot" />
        <span className="isd-mock__dot" />
        <span className="isd-mock__dot" />
        <div className="isd-mock__search" />
      </div>
      <div className="isd-mock__body">
        <div className="isd-mock__side">
          <div className="isd-mock__logo" />
          <div className="isd-mock__nav" />
          <div className="isd-mock__nav isd-mock__nav--active" />
          <div className="isd-mock__nav" />
          <div className="isd-mock__nav" />
          <div className="isd-mock__nav" />
        </div>
        <div className="isd-mock__main">
          <div className="isd-mock__stats">
            <div className="isd-mock__stat">
              <span className="isd-mock__stat-label" />
              <span className="isd-mock__stat-value" />
            </div>
            <div className="isd-mock__stat">
              <span className="isd-mock__stat-label" />
              <span className="isd-mock__stat-value" />
            </div>
            <div className="isd-mock__stat">
              <span className="isd-mock__stat-label" />
              <span className="isd-mock__stat-value" />
            </div>
          </div>
          <div className="isd-mock__chart">
            <div className="isd-mock__chart-head" />
            <div className="isd-mock__bars">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="isd-mock__bar-col"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="isd-mock__rows">
            {rows.map((r, i) => (
              <div className="isd-mock__row" key={i}>
                <span className={`isd-mock__risk isd-mock__risk--${r.risk}`} />
                <span className="isd-mock__line isd-mock__line--wide" />
                <span className="isd-mock__line" />
                <span className="isd-mock__chip" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalCta() {
  return (
    <section className="isd-final" id="login">
      <div className="isd-wrap isd-final__inner">
        <div className="isd-final__art">
          <RiskPortalMock />
        </div>
        <div className="isd-final__copy">
          <h2 className="isd-final__title">Make shipping risk predictable</h2>
          <p className="isd-final__sub">
            See risk before it ships, protect the orders that matter, and give
            your team one clear view of what to watch next.
          </p>
          <div className="isd-final__ctas">
            <button className="isd-btn isd-btn--dark">
              Talk to an Expert
              <Chevron />
            </button>
            <button className="isd-btn isd-btn--outline">
              Start Coverage Setup
              <Chevron />
            </button>
          </div>
          <p className="isd-final__note">
            Availability varies by jurisdiction. Terms and conditions apply.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="isd-footer">
      <div className="isd-wrap">
        <div className="isd-footer__cols">
          <div className="isd-footer__brand">
            <span className="isd-footer__logo">InsureShield</span>
          </div>
          {footerCols.map((c) => (
            <div className="isd-footer__col" key={c.title}>
              <p className="isd-footer__title">{c.title}</p>
              <ul>
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#footer">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="isd-footer__legal">
          InsureShield is a service of UPS Capital Insurance Agency, Inc. and
          affiliates. Licensed and regulated. Not available in all states. See
          policy for full terms, conditions, and exclusions.
        </p>
        <div className="isd-footer__meta">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Licensing Information</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ Page */
export default function UpsDigital() {
  return (
    <div className="isd">
      <Nav />

      {/* Hero */}
      <div className="isd-hero-stage">
        <div className="isd-hero-pin">
          <Hero />
        </div>
      </div>

      <section className="isd-hero-transition">
        <div className="isd-hero-transition__content">
          <h2 className="isd-hero-transition__title">
            Customers want immediate resolution when delivery fails.
          </h2>
          <div className="isd-hero-transition__divider" />
          <p className="isd-hero-transition__lead">
            UPS Digital brings protection, visibility, and resolution into one
            consolidated system.
          </p>
          <p className="isd-hero-transition__lead">
            So you can protect shipments across carriers, run a predictable
            claims process, and treat immediate resolution as part of the deal.
          </p>
        </div>
      </section>

      <CostSection />
      <FuturesSection />

      <RouterSection />

      <Scene
        video={SCENE_PROTECTION_VIDEO}
        eyebrow=""
        lines={["What can go wrong,", "will be made right."]}
      />

      <ProtectionSection />

      <Scene
        image={SCENE_VISIBILITY}
        eyebrow=""
        lines={["Welcome to the", "threshold of clarity."]}
      />

      <ClaimsSection />

      <Scene
        image={SCENE_RESOLUTION}
        eyebrow=""
        lines={["A touch of", "reassurance."]}
      />

      <CompareSection />

      <ProductsSection />
      <ShopifySection />
      <FinalCta />
      <ChecklistSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
