import { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  AccountBoxIcon,
  PaymentIcon,
  ShieldIcon,
  DownloadIcon,
  AssignmentIcon,
  CloseIcon,
  StarIcon,
  GlobeIcon,
  BellIcon,
  TrendingUpIcon,
  ArrowRightAltIcon,
  CheckCircleIcon,
} from "./icons";
import "./Profile.css";
import riskIntelligenceImg from "../assets/solutions/risk-intelligence.svg";
import controlTowerImg from "../assets/solutions/control-tower.svg";
import symphonyImg from "../assets/solutions/symphony.svg";
import insureShieldImg from "../assets/solutions/insureshield.svg";
import {
  paymentMethods,
  postPurchaseCatalog,
  PP_ADDON_PRICE,
  type CapKey,
} from "../data/postPurchase";

type Tab = "settings" | "policy" | "billing" | "products";

const tabs: { key: Tab; label: string }[] = [
  { key: "settings", label: "Settings" },
  { key: "policy", label: "Policy" },
  { key: "billing", label: "Billing" },
  { key: "products", label: "Products" },
];

function Field({
  label,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="profile-field">
      <span className="profile-field__label">{label}</span>
      <input
        className="profile-field__input"
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="profile-field">
      <span className="profile-field__label">{label}</span>
      <div className="profile-select">
        <select className="profile-field__input profile-select__input" defaultValue={options[0]}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={16} className="profile-select__icon" />
      </div>
    </label>
  );
}

function SettingsTab() {
  return (
    <>
      <section className="profile-card">
        <div className="profile-card__head">
          <AccountBoxIcon size={18} />
          <span>Profile Information</span>
        </div>
        <div className="profile-card__body">
          <Field label="Contact Name" defaultValue="Alex Johnson" />
          <Field label="Email" defaultValue="AJ@mywebsite.com" type="email" />

          <label className="profile-field">
            <span className="profile-field__label">Phone Number</span>
            <div className="profile-phone">
              <button type="button" className="profile-phone__country">
                <span className="profile-phone__flag" aria-hidden>
                  <svg width="20" height="14" viewBox="0 0 20 14" role="img" aria-label="US">
                    <rect width="20" height="14" rx="2" fill="#fff" />
                    <g fill="#b22234">
                      <rect width="20" height="1.08" y="0" />
                      <rect width="20" height="1.08" y="2.15" />
                      <rect width="20" height="1.08" y="4.31" />
                      <rect width="20" height="1.08" y="6.46" />
                      <rect width="20" height="1.08" y="8.62" />
                      <rect width="20" height="1.08" y="10.77" />
                      <rect width="20" height="1.08" y="12.92" />
                    </g>
                    <rect width="9" height="7.54" fill="#3c3b6e" />
                  </svg>
                </span>
                +1
                <ChevronDown size={14} />
              </button>
              <input
                className="profile-field__input"
                type="tel"
                defaultValue="(990) 123-456"
              />
            </div>
          </label>

          <button className="profile-save" type="button">
            Save
          </button>
        </div>
      </section>

      <section className="profile-card">
        <div className="profile-card__head">
          <PaymentIcon size={18} />
          <span>Business Information</span>
        </div>
        <div className="profile-card__body">
          <Field label="Business Name" defaultValue="Rockwell Co." />
          <Field label="Website" defaultValue="www.mywebsite.com" />
          <Field label="Business Address" defaultValue="35 Glenlake Pkwy NE" />

          <div className="profile-field-row">
            <Field label="City" defaultValue="Atlanta" />
            <Field label="State" defaultValue="Georgia" />
            <Field label="Zip Code" defaultValue="30328" />
          </div>

          <button className="profile-save" type="button">
            Save
          </button>
        </div>
      </section>
    </>
  );
}

function PolicyTab() {
  return (
    <>
      <section className="profile-card">
        <div className="profile-card__head">
          <ShieldIcon size={18} />
          <span>InsureShield Connect Policy Settings</span>
          <span className="profile-card__accessory">
            <span className="profile-policy-no">Policy #1234-567890</span>
            <span className="profile-badge">Active</span>
          </span>
        </div>
        <div className="profile-card__body">
          <SelectField label="Renewal Frequency" options={["Yearly", "Monthly", "Quarterly"]} />
          <SelectField label="Billing Preference" options={["Automatic", "Manual"]} />
          <button className="profile-save" type="button">
            Save
          </button>
        </div>
      </section>

      <section className="profile-card">
        <div className="profile-card__head">
          <ShieldIcon size={18} />
          <span>Insurance Settings</span>
        </div>
        <div className="profile-card__body">
          <SelectField
            label="Choose your coverage. What type of shipments should be protected?"
            options={[
              "All shipments",
              "Domestic shipments only",
              "International shipments only",
              "High-value shipments only",
            ]}
          />
          <Field label="Coverage Limit per Shipment" defaultValue="$5,000" />
          <button className="profile-save" type="button">
            Save
          </button>
        </div>
      </section>
    </>
  );
}

const upcomingCharges = [
  { date: "June 28", label: "CommerceShield", amount: "$25" },
  { date: "June 28", label: "Post Purchase", amount: "$25" },
  { date: "July 31", label: "InsureShield Connect", amount: "$25" },
  { date: "July 31", label: "InsureShield Connect", amount: "$25" },
  { date: "July 31", label: "InsureShield Connect", amount: "$25" },
];

const paymentHistory = [
  { date: "Oct 14, 2024", invoice: "QWE123456-012", price: "$50.00" },
  { date: "Oct 10, 2024", invoice: "ERTY345697-011", price: "$40.00" },
  { date: "Oct 8, 2024", invoice: "TYUI345678-010", price: "$390.00" },
  { date: "Oct 1, 2024", invoice: "WERT234566-09", price: "$25.00" },
];

function BillingHistory({ title, rows }: { title: string; rows: typeof paymentHistory }) {
  return (
    <section className="billing-panel">
      <div className="billing-panel__head">
        <AssignmentIcon size={16} />
        <span>{title}</span>
      </div>
      <div className="billing-table">
        <div className="billing-row billing-row--head">
          <span>Billing Date</span>
          <span>Invoice ID</span>
          <span>Status</span>
          <span>Price</span>
          <span />
        </div>
        {rows.map((r, i) => (
          <div className="billing-row" key={i}>
            <span>{r.date}</span>
            <span className="billing-cell--muted">{r.invoice}</span>
            <span>
              <span className="profile-badge">Paid</span>
            </span>
            <span>{r.price}</span>
            <span className="billing-cell--dl">
              <button className="billing-dl" aria-label="Download invoice">
                <DownloadIcon size={18} />
              </button>
            </span>
          </div>
        ))}
      </div>
      <div className="billing-pager">
        <button className="billing-pager__nav" aria-label="Previous">
          <ChevronLeft size={16} />
        </button>
        <span>1-5 of 1</span>
        <button className="billing-pager__nav" aria-label="Next">
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}

function BillingTab({
  postPurchaseActive,
  subs,
}: {
  postPurchaseActive: boolean;
  subs: Record<CapKey, boolean>;
}) {
  const defaultCard = paymentMethods.find((m) => m.isDefault) ?? paymentMethods[0];
  const activeAddons = postPurchaseCatalog.filter((f) => f.paid && subs[f.key]);
  const monthlyTotal = activeAddons.length * PP_ADDON_PRICE;
  return (
    <div className="billing">
      <div className="billing-top">
        <section className="profile-card billing-summary">
          <div className="billing-summary__body">
            <p className="billing-summary__title">Outstanding Balance</p>
            <p className="billing-summary__amount">$2,340.58</p>
            <p className="billing-summary__due">Due May 30</p>
          </div>
          <button className="billing-cta" type="button">
            Pay Now
            <ChevronRight size={16} />
          </button>
        </section>

        <section className="profile-card billing-summary">
          <div className="billing-summary__body">
            <p className="billing-summary__title">Payment Methods</p>
            <div className="billing-cards" style={{ ["--count" as string]: paymentMethods.length }}>
              {[...paymentMethods]
                .sort((a, b) => Number(a.isDefault) - Number(b.isDefault))
                .map((m, i) => (
                  <div
                    className={`billing-card billing-card--${m.brand}`}
                    style={{ ["--i" as string]: i }}
                    key={m.last4}
                  >
                    <div className="billing-card__top">
                      <span className="billing-card__brand">{m.label}</span>
                      {m.isDefault && <span className="billing-card__badge">Default</span>}
                    </div>
                    <span className="billing-card__chip" />
                    <div className="billing-card__foot">
                      <span className="billing-card__num">&bull;&bull;&bull;&bull; {m.last4}</span>
                      <span className="billing-card__exp">Exp {m.exp}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <button className="billing-cta" type="button">
            Manage
            <ChevronRight size={16} />
          </button>
        </section>

        <section className="profile-card billing-summary">
          <div className="billing-summary__body">
            <p className="billing-summary__title">Upcoming Charges</p>
            <ul className="billing-charges">
              {upcomingCharges.map((c, i) => (
                <li className="billing-charge" key={i}>
                  <span className="billing-charge__date">{c.date}</span>
                  <span className="billing-charge__label">{c.label}</span>
                  <span className="billing-charge__amount">{c.amount}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="billing-pager billing-pager--inline">
            <span>1-5 of 8</span>
            <button className="billing-pager__nav" aria-label="Next charges">
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>

      {postPurchaseActive && (
        <section className="billing-panel">
          <div className="billing-panel__head">
            <AssignmentIcon size={16} />
            <span>Post Purchase subscription</span>
          </div>
          <div className="pp-bill">
            <div className="pp-bill__row">
              <div className="pp-bill__text">
                <span className="pp-bill__title">Post Purchase base</span>
                <span className="pp-bill__sub">Notifications, feedback, and resolutions</span>
              </div>
              <span className="pp-bill__price pp-bill__price--free">Included</span>
            </div>
            {activeAddons.map((a) => (
              <div className="pp-bill__row" key={a.key}>
                <div className="pp-bill__text">
                  <span className="pp-bill__title">{a.title}</span>
                  <span className="pp-bill__sub">Premium add-on</span>
                </div>
                <span className="pp-bill__price">${PP_ADDON_PRICE}/mo</span>
              </div>
            ))}
            <div className="pp-bill__total">
              <span>Total monthly</span>
              <span>${monthlyTotal}/mo</span>
            </div>
            <p className="pp-bill__note">
              Billed monthly to {defaultCard.label} &bull;&bull;&bull;&bull; {defaultCard.last4}.
            </p>
          </div>
        </section>
      )}

      <BillingHistory title="Payment History" rows={paymentHistory} />
      <BillingHistory title="Invoice History" rows={paymentHistory} />
    </div>
  );
}

type ProductEducation = {
  tagline: string;
  intro: string;
  steps: { title: string; body?: string }[];
  testimonial: { quote: string; name: string; role: string };
};

type ProductId =
  | "insureshield-shipping"
  | "commerceshield"
  | "control-tower"
  | "post-purchase";

type Product = {
  id: ProductId;
  name: string;
  image: string;
  desc: string;
  education: ProductEducation;
};

const products: Product[] = [
  {
    id: "insureshield-shipping",
    name: "InsureShield Shipping Insurance",
    image: insureShieldImg,
    desc: "Protect every shipment with insurance coverage tuned to your store's risk profile.",
    education: {
      tagline: "Coverage your customers can count on.",
      intro: "InsureShield protects high-value orders and helps you resolve shipping issues with less manual overhead.",
      steps: [
        { title: "Choose coverage defaults by order type" },
        { title: "Automatically flag claims-ready events" },
        { title: "Track payouts and customer outcomes in one view" },
      ],
      testimonial: {
        quote:
          "\"InsureShield reduced claim friction and gave our support team confidence when shipments went wrong.\"",
        name: "Maya Torres",
        role: "CX Lead, Rivet Supply",
      },
    },
  },
  {
    id: "commerceshield",
    name: "CommerceShield",
    image: riskIntelligenceImg,
    desc: "Predict and prevent shipment risks with AI-driven insights across your network.",
    education: {
      tagline: "Stop fraud before you ship.",
      intro: "Prevent fraud in real time and save revenue on every transaction",
      steps: [
        { title: "Integrate via Checkout Cart API", body: "No code required!" },
        {
          title: "Customer order is analyzed at checkout",
          body: "ML model analyzes 40+ signals: Wifi network, velocity patterns, proxy detection, address mismatches, and more.",
        },
        {
          title: "Risk score generated (0-1000)",
          body: "Decision made in under 80ms. Blocks 94% of fraudulent orders with <0.3% false positive rate.",
        },
        { title: "Safe orders pass, risky orders are blocked" },
      ],
      testimonial: {
        quote:
          "\"We were losing $2,800/month to fraud. CommerceShield caught 94% of it in the first month—now we're saving $2,300/month after the service cost.\"",
        name: "Derrick Laing",
        role: "Operations Manager, StyleBox",
      },
    },
  },
  {
    id: "control-tower",
    name: "Control Tower",
    image: controlTowerImg,
    desc: "Gain end-to-end visibility and orchestrate exceptions from a single command center.",
    education: {
      tagline: "See everything. Act on anything.",
      intro: "Track every shipment and resolve exceptions before they become problems",
      steps: [
        { title: "Connect your carriers and systems", body: "One-click integrations for 50+ carriers and platforms." },
        { title: "Live tracking across your network", body: "Every shipment, updated in real time on a single map." },
        {
          title: "Exceptions surface automatically",
          body: "Delays, misroutes, and stuck packages are flagged the moment they happen.",
        },
        { title: "Resolve from one command center" },
      ],
      testimonial: {
        quote:
          "\"We cut our exception resolution time in half. Control Tower shows us problems before customers even notice them.\"",
        name: "Priya Nair",
        role: "Head of Logistics, Northwind",
      },
    },
  },
  {
    id: "post-purchase",
    name: "Post Purchase",
    image: symphonyImg,
    desc: "Run a branded, policy-driven post-purchase workflow for returns, refunds, repairs, and exchanges.",
    education: {
      tagline: "Recover trust after every exception.",
      intro: "Post Purchase centralizes returns, refunds, repairs, and claim updates so your team can move faster and keep customers informed.",
      steps: [
        { title: "Route each issue to the right resolution workflow", body: "Returns, repairs, refunds, and replacements are managed from one queue." },
        { title: "Keep customers updated automatically", body: "Use consistent status updates and SLAs across channels." },
        { title: "Reduce support effort and leakage", body: "Standardized decisions improve margin and reduce one-off handling." },
        { title: "Unlock advanced rules in LynkUp Suite" },
      ],
      testimonial: {
        quote:
          "\"Post Purchase helped us cut exception handling time by 38% while giving shoppers a more consistent experience.\"",
        name: "Alyssa Dean",
        role: "Director of Operations, Willow Goods",
      },
    },
  },
];

function ProductEducationDrawer({
  product,
  postPurchasePurchased,
  commerceShieldPurchased,
  insureShieldPurchased,
  onConfigureInLynkUp,
  onConfigureCommerceShieldInLynkUp,
  onConfigureInsureShieldInLynkUp,
  onClose,
}: {
  product: Product;
  postPurchasePurchased: boolean;
  commerceShieldPurchased: boolean;
  insureShieldPurchased: boolean;
  onConfigureInLynkUp: () => void;
  onConfigureCommerceShieldInLynkUp: () => void;
  onConfigureInsureShieldInLynkUp: () => void;
  onClose: () => void;
}) {
  const edu = product.education;
  const isPostPurchase = product.id === "post-purchase";
  const isCommerceShield = product.id === "commerceshield";
  const isInsureShield = product.id === "insureshield-shipping";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <aside
      className="prodedu"
      role="region"
      aria-label={`${product.name} product education`}
    >
      <div className="prodedu__head">
          <div className="prodedu__titles">
            <p className="prodedu__title">{product.name}</p>
          </div>
          <button className="icon-btn prodedu__close" aria-label="Close" onClick={onClose}>
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="prodedu__body">
          {isCommerceShield ? (
            <section className="prodedu-section prodedu-overview">
              <p className="prodedu-overview__lede">
                Stop fraud before you ship. CommerceShield scores every order in real time and
                helps you block risky transactions, cut chargebacks, and protect revenue.
              </p>

              <div className="prodedu-valueband">
                <div className="prodedu-value">
                  <span className="prodedu-value__icon"><ShieldIcon size={16} /></span>
                  <div className="prodedu-value__text">
                    <p className="prodedu-value__title">Stop fraud before it ships</p>
                    <p className="prodedu-value__body">ML scoring on 40+ signals decides in under 80ms at checkout.</p>
                  </div>
                </div>
                <div className="prodedu-value">
                  <span className="prodedu-value__icon"><TrendingUpIcon size={16} /></span>
                  <div className="prodedu-value__text">
                    <p className="prodedu-value__title">Fewer chargebacks</p>
                    <p className="prodedu-value__body">Block 94% of fraudulent orders with a &lt;0.3% false positive rate.</p>
                  </div>
                </div>
                <div className="prodedu-value">
                  <span className="prodedu-value__icon"><GlobeIcon size={16} /></span>
                  <div className="prodedu-value__text">
                    <p className="prodedu-value__title">Protect your revenue</p>
                    <p className="prodedu-value__body">Safe orders pass, risky orders are held, so you save on every transaction.</p>
                  </div>
                </div>
              </div>

              <div className="prodedu-includes">
                <p className="prodedu-includes__label">What you can set up</p>
                <ul className="prodedu-includes__list">
                  <li className="prodedu-includes__item"><span className="prodedu-includes__dot" /><span className="prodedu-includes__name">Risk scoring &amp; thresholds</span></li>
                  <li className="prodedu-includes__item"><span className="prodedu-includes__dot" /><span className="prodedu-includes__name">Risk mitigation tools</span></li>
                  <li className="prodedu-includes__item"><span className="prodedu-includes__dot" /><span className="prodedu-includes__name">Chargeback protection</span></li>
                  <li className="prodedu-includes__item"><span className="prodedu-includes__dot" /><span className="prodedu-includes__name">Shipping protection</span></li>
                </ul>
              </div>
            </section>
          ) : isInsureShield ? (
            <section className="prodedu-section prodedu-overview">
              <p className="prodedu-overview__lede">
                Coverage your customers can count on. InsureShield&reg; protects high-value
                shipments across every carrier, so a lost, damaged, or stolen package never
                becomes a lost customer.
              </p>

              <div className="prodedu-valueband">
                <div className="prodedu-value">
                  <span className="prodedu-value__icon"><ShieldIcon size={16} /></span>
                  <div className="prodedu-value__text">
                    <p className="prodedu-value__title">Protect every shipment</p>
                    <p className="prodedu-value__body">Coverage across all carriers and modes &mdash; UPS&reg;, FedEx&reg;, DHL&reg;, and USPS&reg;.</p>
                  </div>
                </div>
                <div className="prodedu-value">
                  <span className="prodedu-value__icon"><TrendingUpIcon size={16} /></span>
                  <div className="prodedu-value__text">
                    <p className="prodedu-value__title">Recover revenue faster</p>
                    <p className="prodedu-value__body">Most approved claims are paid within days, not weeks, so cash flow keeps moving.</p>
                  </div>
                </div>
                <div className="prodedu-value">
                  <span className="prodedu-value__icon"><CheckCircleIcon size={16} /></span>
                  <div className="prodedu-value__text">
                    <p className="prodedu-value__title">Less claim friction</p>
                    <p className="prodedu-value__body">Auto-flag claims-ready events and file in a few clicks &mdash; no paperwork pileup.</p>
                  </div>
                </div>
                <div className="prodedu-value">
                  <span className="prodedu-value__icon"><GlobeIcon size={16} /></span>
                  <div className="prodedu-value__text">
                    <p className="prodedu-value__title">Coverage tuned to your store</p>
                    <p className="prodedu-value__body">Set coverage defaults by order type and value to match your risk profile.</p>
                  </div>
                </div>
              </div>

              <div className="prodedu-includes">
                <p className="prodedu-includes__label">What you can set up</p>
                <ul className="prodedu-includes__list">
                  <li className="prodedu-includes__item"><span className="prodedu-includes__dot" /><span className="prodedu-includes__name">Coverage defaults by order type</span></li>
                  <li className="prodedu-includes__item"><span className="prodedu-includes__dot" /><span className="prodedu-includes__name">Automatic claims-ready flagging</span></li>
                  <li className="prodedu-includes__item"><span className="prodedu-includes__dot" /><span className="prodedu-includes__name">Payout &amp; outcome tracking</span></li>
                  <li className="prodedu-includes__item"><span className="prodedu-includes__dot" /><span className="prodedu-includes__name">All-carrier shipment protection</span></li>
                </ul>
              </div>

              <figure className="prodedu-quote">
                <div className="prodedu-quote__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} size={18} />
                  ))}
                </div>
                <blockquote className="prodedu-quote__text">{edu.testimonial.quote}</blockquote>
                <figcaption className="prodedu-quote__cite">
                  <span className="prodedu-quote__name">{edu.testimonial.name}</span>
                  <span className="prodedu-quote__role">{edu.testimonial.role}</span>
                </figcaption>
              </figure>
            </section>
          ) : !isPostPurchase ? (
            <>
              <p className="prodedu__intro">{edu.intro}</p>
              <ol className="prodedu__steps">
                {edu.steps.map((s, i) => (
                  <li className="prodedu-step" key={i}>
                    <span className="prodedu-step__num">{i + 1}</span>
                    <div className="prodedu-step__text">
                      <p className="prodedu-step__title">{s.title}</p>
                      {s.body && <p className="prodedu-step__body">{s.body}</p>}
                    </div>
                  </li>
                ))}
              </ol>
              <figure className="prodedu-quote">
                <div className="prodedu-quote__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} size={18} />
                  ))}
                </div>
                <blockquote className="prodedu-quote__text">{edu.testimonial.quote}</blockquote>
                <figcaption className="prodedu-quote__cite">
                  <span className="prodedu-quote__name">{edu.testimonial.name}</span>
                  <span className="prodedu-quote__role">{edu.testimonial.role}</span>
                </figcaption>
              </figure>
            </>
          ) : (
            <>
              <div className="prodedu__tabs" role="tablist" aria-label="Post Purchase tabs">
                <button
                  type="button"
                  role="tab"
                  aria-selected
                  className="prodedu-tab prodedu-tab--active"
                >
                  Overview
                </button>
              </div>

              <section className="prodedu-section prodedu-overview">
                <p className="prodedu-overview__lede">
                  Give customers a branded experience after they buy, with real time tracking,
                  proactive notifications, feedback, and self serve resolutions in one place.
                </p>

                <div className="prodedu-valueband">
                  <div className="prodedu-value">
                    <span className="prodedu-value__icon"><BellIcon size={16} /></span>
                    <div className="prodedu-value__text">
                      <p className="prodedu-value__title">Reduce &ldquo;Where is my order?&rdquo; inquiries</p>
                      <p className="prodedu-value__body">Give customers real-time visibility into order and delivery status.</p>
                    </div>
                  </div>
                  <div className="prodedu-value">
                    <span className="prodedu-value__icon"><GlobeIcon size={16} /></span>
                    <div className="prodedu-value__text">
                      <p className="prodedu-value__title">Automate returns and refunds</p>
                      <p className="prodedu-value__body">Allow customers to self-serve common post-purchase requests without manual intervention.</p>
                    </div>
                  </div>
                  <div className="prodedu-value">
                    <span className="prodedu-value__icon"><TrendingUpIcon size={16} /></span>
                    <div className="prodedu-value__text">
                      <p className="prodedu-value__title">Deliver a branded experience</p>
                      <p className="prodedu-value__body">Customize tracking pages, notifications, and customer touchpoints with your brand.</p>
                    </div>
                  </div>
                </div>

                <div className="prodedu-includes">
                  <p className="prodedu-includes__label">What you can set up</p>
                  <ul className="prodedu-includes__list">
                    {postPurchaseCatalog.map((f) => (
                      <li className="prodedu-includes__item" key={f.key}>
                        <span className="prodedu-includes__dot" />
                        <span className="prodedu-includes__name">{f.title}</span>
                        {f.paid && <span className="prodedu-includes__tag">Premium</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </>
          )}
        </div>

        {(isPostPurchase || isCommerceShield || isInsureShield) && (
          <div className="prodedu__footer">
            <button type="button" className="prodedu__footer-ghost" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="prodedu__footer-primary"
              onClick={() => {
                onClose();
                if (isCommerceShield) onConfigureCommerceShieldInLynkUp();
                else if (isInsureShield) onConfigureInsureShieldInLynkUp();
                else onConfigureInLynkUp();
              }}
            >
              {isCommerceShield
                ? commerceShieldPurchased
                  ? "Manage in Integrate"
                  : "Configure in Integrate"
                : isInsureShield
                  ? insureShieldPurchased
                    ? "Manage in Integrate"
                    : "Configure in Integrate"
                  : postPurchasePurchased
                    ? "Manage in Integrate"
                    : "Configure in Integrate"}
              <ArrowRightAltIcon size={18} />
            </button>
          </div>
        )}
    </aside>
  );
}

function ManageSubscriptionDrawer({
  subs,
  onConfigureCapability,
  onConfigureInLynkUp,
  onCancelAddon,
  onClose,
}: {
  subs: Record<CapKey, boolean>;
  onConfigureCapability: (k: CapKey) => void;
  onConfigureInLynkUp: () => void;
  onCancelAddon: (k: CapKey) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const defaultCard = paymentMethods.find((m) => m.isDefault) ?? paymentMethods[0];
  const activeAddons = postPurchaseCatalog.filter((f) => f.paid && subs[f.key]);
  const monthlyTotal = activeAddons.length * PP_ADDON_PRICE;

  return (
    <aside className="prodedu" role="region" aria-label="Manage Post Purchase subscription">
      <div className="prodedu__head">
        <div className="prodedu__titles">
          <p className="prodedu__title">Manage Post Purchase</p>
        </div>
        <button className="icon-btn prodedu__close" aria-label="Close" onClick={onClose}>
          <CloseIcon size={20} />
        </button>
      </div>

      <div className="prodedu__body">
        <p className="prodedu__intro">
          Post Purchase gives your customers a branded experience after they order, with tracking,
          notifications, feedback, and self serve resolutions.
        </p>

        <section className="ppmanage">
          <p className="ppmanage__group">What you're paying</p>
          <div className="ppmanage-bill">
            <span className="ppmanage-bill__amount">
              ${monthlyTotal}
              <span className="ppmanage-bill__per">/mo</span>
            </span>
            <span className="ppmanage-bill__note">
              {monthlyTotal > 0
                ? `Billed monthly to ${defaultCard.label} \u2022\u2022\u2022\u2022 ${defaultCard.last4}`
                : "Included at no cost. Premium add-ons are billed monthly when you add them."}
            </span>
          </div>
        </section>

        <section className="ppmanage">
          <p className="ppmanage__group">Premium add-ons</p>
          {activeAddons.length > 0 ? (
            activeAddons.map((f) => (
              <div className="ppmanage-row" key={f.key}>
                <div className="ppmanage-row__text">
                  <p className="ppmanage-row__title">{f.title}</p>
                  <p className="ppmanage-row__blurb">${PP_ADDON_PRICE}/mo</p>
                </div>
                <div className="ppmanage-row__actions">
                  <button
                    type="button"
                    className="ppmanage-row__link"
                    onClick={() => {
                      onClose();
                      onConfigureCapability(f.key);
                    }}
                  >
                    Configure
                  </button>
                  <button
                    type="button"
                    className="ppmanage-row__link ppmanage-row__link--danger"
                    onClick={() => onCancelAddon(f.key)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="ppmanage-row__muted">No add-ons active. Add them anytime from LynkUp.</p>
          )}
        </section>
      </div>

      <div className="prodedu__footer">
        <button type="button" className="prodedu__footer-ghost" onClick={onClose}>
          Close
        </button>
        <button
          type="button"
          className="prodedu__footer-primary"
          onClick={() => {
            onClose();
            onConfigureInLynkUp();
          }}
        >
          Manage in Integrate
          <ArrowRightAltIcon size={18} />
        </button>
      </div>
    </aside>
  );
}

function InsureShieldManageDrawer({
  onRenew,
  onCancel,
  onClose,
}: {
  onRenew: () => void;
  onCancel: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const defaultCard = paymentMethods.find((m) => m.isDefault) ?? paymentMethods[0];

  return (
    <aside className="prodedu" role="region" aria-label="Manage InsureShield policy">
      <div className="prodedu__head">
        <div className="prodedu__titles">
          <p className="prodedu__title">Manage InsureShield</p>
        </div>
        <button className="icon-btn prodedu__close" aria-label="Close" onClick={onClose}>
          <CloseIcon size={20} />
        </button>
      </div>

      <div className="prodedu__body">
        <p className="prodedu__intro">
          Your InsureShield Shipping Insurance policy protects eligible shipments. Renew to keep
          coverage active, or cancel your policy at any time.
        </p>

        <section className="ppmanage">
          <p className="ppmanage__group">What you're paying</p>
          <div className="ppmanage-bill">
            <span className="ppmanage-bill__amount">
              $25
              <span className="ppmanage-bill__per">/mo</span>
            </span>
            <span className="ppmanage-bill__note">
              Billed monthly to {defaultCard.label} &bull;&bull;&bull;&bull; {defaultCard.last4}
            </span>
          </div>
        </section>

        <section className="ppmanage">
          <p className="ppmanage__group">Policy</p>
          <div className="ppmanage-row">
            <div className="ppmanage-row__text">
              <p className="ppmanage-row__title">InsureShield Connect</p>
              <p className="ppmanage-row__blurb">Renews Aug 31, 2026</p>
            </div>
            <span className="profile-badge">Active</span>
          </div>
        </section>
      </div>

      <div className="prodedu__footer prodedu__footer--split">
        <button type="button" className="prodedu__footer-danger" onClick={onCancel}>
          Cancel policy
        </button>
        <button type="button" className="prodedu__footer-primary" onClick={onRenew}>
          Renew policy
          <ArrowRightAltIcon size={18} />
        </button>
      </div>
    </aside>
  );
}

function CommerceShieldManageDrawer({
  onCancel,
  onConfigure,
  onClose,
}: {
  onCancel: () => void;
  onConfigure: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const defaultCard = paymentMethods.find((m) => m.isDefault) ?? paymentMethods[0];

  return (
    <aside className="prodedu" role="region" aria-label="Manage CommerceShield">
      <div className="prodedu__head">
        <div className="prodedu__titles">
          <p className="prodedu__title">Manage CommerceShield</p>
        </div>
        <button className="icon-btn prodedu__close" aria-label="Close" onClick={onClose}>
          <CloseIcon size={20} />
        </button>
      </div>

      <div className="prodedu__body">
        <p className="prodedu__intro">
          CommerceShield scores every order for fraud in real time and adds coverage to your
          UPS Digital Solutions orders. Adjust your settings in LynkUp, or cancel anytime.
        </p>

        <section className="ppmanage">
          <p className="ppmanage__group">What you're paying</p>
          <div className="ppmanage-bill">
            <span className="ppmanage-bill__amount">
              $0.30
              <span className="ppmanage-bill__per">/order</span>
            </span>
            <span className="ppmanage-bill__note">
              Pay as you go &mdash; billed monthly to {defaultCard.label} &bull;&bull;&bull;&bull; {defaultCard.last4}
            </span>
          </div>
        </section>

        <section className="ppmanage">
          <p className="ppmanage__group">Subscription</p>
          <div className="ppmanage-row">
            <div className="ppmanage-row__text">
              <p className="ppmanage-row__title">CommerceShield</p>
              <p className="ppmanage-row__blurb">Order scoring &amp; chargeback protection</p>
            </div>
            <div className="ppmanage-row__actions">
              <button
                type="button"
                className="ppmanage-row__link"
                onClick={() => {
                  onClose();
                  onConfigure();
                }}
              >
                Configure
              </button>
              <button
                type="button"
                className="ppmanage-row__link ppmanage-row__link--danger"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="prodedu__footer">
        <button type="button" className="prodedu__footer-ghost" onClick={onClose}>
          Close
        </button>
        <button
          type="button"
          className="prodedu__footer-primary"
          onClick={() => {
            onClose();
            onConfigure();
          }}
        >
          Manage in Integrate
          <ArrowRightAltIcon size={18} />
        </button>
      </div>
    </aside>
  );
}

function ProductsTab({
  onDrawerChange,
  postPurchasePurchased,
  postPurchaseSubs,
  commerceShieldPurchased,
  insureShieldPurchased,
  onConfigureInLynkUp,
  onConfigureCommerceShieldInLynkUp,
  onConfigureInsureShieldInLynkUp,
  onConfigureCapability,
  onCancelAddon,
  onCancelCommerceShield,
  onToast,
}: {
  onDrawerChange: (open: boolean) => void;
  postPurchasePurchased: boolean;
  postPurchaseSubs: Record<CapKey, boolean>;
  commerceShieldPurchased: boolean;
  insureShieldPurchased: boolean;
  onConfigureInLynkUp: () => void;
  onConfigureCommerceShieldInLynkUp: () => void;
  onConfigureInsureShieldInLynkUp: () => void;
  onConfigureCapability: (k: CapKey) => void;
  onCancelAddon: (k: CapKey) => void;
  onCancelCommerceShield: () => void;
  onToast: (msg: string) => void;
}) {
  const [active, setActive] = useState<Product | null>(null);
  const [managing, setManaging] = useState(false);
  const [managingInsure, setManagingInsure] = useState(false);
  const [managingCs, setManagingCs] = useState(false);
  const activeProductIds: ProductId[] = [
    ...(insureShieldPurchased ? (["insureshield-shipping"] as ProductId[]) : []),
    ...(commerceShieldPurchased ? (["commerceshield"] as ProductId[]) : []),
    ...(postPurchasePurchased ? (["post-purchase"] as ProductId[]) : []),
  ];
  const activeProducts = products.filter((p) => activeProductIds.includes(p.id));
  const availableProducts = products.filter((p) => !activeProductIds.includes(p.id));

  const anyDrawer = !!active || managing || managingInsure || managingCs;

  useEffect(() => {
    onDrawerChange(anyDrawer);
    return () => onDrawerChange(false);
  }, [anyDrawer, onDrawerChange]);

  const closeAll = () => {
    setActive(null);
    setManaging(false);
    setManagingInsure(false);
    setManagingCs(false);
  };

  const openManage = (p: Product) => {
    closeAll();
    if (p.id === "post-purchase") setManaging(true);
    else if (p.id === "insureshield-shipping") setManagingInsure(true);
    else if (p.id === "commerceshield") setManagingCs(true);
    else setActive(p);
  };

  return (
    <div className={`profile-products${anyDrawer ? " profile-products--open" : ""}`}>
      <div className="profile-products__main">
        <section className="profile-products__section">
          <h2 className="profile-products__title">Active Products</h2>
          <div className="profile-products__grid">
            {activeProducts.map((p) => (
              <article className="profile-product" key={p.id}>
                <div className="profile-product__media">
                  <img className="profile-product__image" src={p.image} alt={`${p.name} logo`} />
                </div>
                <h3 className="profile-product__name">{p.name}</h3>
                <p className="profile-product__desc">{p.desc}</p>
                <button
                  className="profile-product__cta profile-product__cta--secondary"
                  type="button"
                  onClick={() => openManage(p)}
                >
                  Manage
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-products__section">
          <h2 className="profile-products__title">Available Products</h2>
          <div className="profile-products__grid">
            {availableProducts.map((p) => (
              <article className="profile-product" key={p.id}>
                <div className="profile-product__media">
                  <img className="profile-product__image" src={p.image} alt={`${p.name} logo`} />
                </div>
                <h3 className="profile-product__name">{p.name}</h3>
                <p className="profile-product__desc">{p.desc}</p>
                <button className="profile-product__cta" type="button" onClick={() => setActive(p)}>
                  Learn More
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
      {active && (
        <ProductEducationDrawer
          product={active}
          postPurchasePurchased={postPurchasePurchased}
          commerceShieldPurchased={commerceShieldPurchased}
          insureShieldPurchased={insureShieldPurchased}
          onConfigureInLynkUp={onConfigureInLynkUp}
          onConfigureCommerceShieldInLynkUp={onConfigureCommerceShieldInLynkUp}
          onConfigureInsureShieldInLynkUp={onConfigureInsureShieldInLynkUp}
          onClose={() => setActive(null)}
        />
      )}
      {managing && (
        <ManageSubscriptionDrawer
          subs={postPurchaseSubs}
          onConfigureCapability={onConfigureCapability}
          onConfigureInLynkUp={onConfigureInLynkUp}
          onCancelAddon={(k) => {
            onCancelAddon(k);
            onToast(`${postPurchaseCatalog.find((f) => f.key === k)?.title ?? "Add-on"} canceled.`);
          }}
          onClose={() => setManaging(false)}
        />
      )}
      {managingInsure && (
        <InsureShieldManageDrawer
          onRenew={() => {
            setManagingInsure(false);
            onToast("InsureShield policy renewed.");
          }}
          onCancel={() => {
            setManagingInsure(false);
            onToast("InsureShield policy canceled.");
          }}
          onClose={() => setManagingInsure(false)}
        />
      )}
      {managingCs && (
        <CommerceShieldManageDrawer
          onConfigure={onConfigureCommerceShieldInLynkUp}
          onCancel={() => {
            setManagingCs(false);
            onCancelCommerceShield();
            onToast("CommerceShield canceled.");
          }}
          onClose={() => setManagingCs(false)}
        />
      )}
    </div>
  );
}

function PlaceholderTab({ label }: { label: string }) {
  return (
    <section className="profile-card">
      <div className="profile-card__body">
        <p className="profile-empty">
          {label} settings are not available in this demo yet.
        </p>
      </div>
    </section>
  );
}

export default function Profile({
  postPurchasePurchased,
  postPurchaseSubs,
  commerceShieldPurchased,
  insureShieldPurchased,
  onConfigureInLynkUp,
  onConfigureCommerceShieldInLynkUp,
  onConfigureInsureShieldInLynkUp,
  onConfigureCapability,
  onCancelAddon,
  onCancelCommerceShield,
  onBack,
}: {
  postPurchasePurchased: boolean;
  postPurchaseSubs: Record<CapKey, boolean>;
  commerceShieldPurchased: boolean;
  insureShieldPurchased: boolean;
  onConfigureInLynkUp: () => void;
  onConfigureCommerceShieldInLynkUp: () => void;
  onConfigureInsureShieldInLynkUp: () => void;
  onConfigureCapability: (k: CapKey) => void;
  onCancelAddon: (k: CapKey) => void;
  onCancelCommerceShield: () => void;
  onBack?: () => void;
}) {
  const [tab, setTab] = useState<Tab>("settings");
  const [productDrawerOpen, setProductDrawerOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const compact = tab === "products" && productDrawerOpen;
  // The Policy tab only applies once an InsureShield policy is active.
  const visibleTabs = insureShieldPurchased ? tabs : tabs.filter((t) => t.key !== "policy");

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <main className="profile">
      <div className={`profile-page${compact ? " profile-page--drawer" : ""}`}>
        <div className="profile-title-row">
          <h1 className="profile-title">Profile</h1>
          {onBack && (
            <button type="button" className="profile-back" onClick={onBack}>
              <ChevronLeft size={16} />
              Back
            </button>
          )}
        </div>

        <div className="profile-tabs">
          {visibleTabs.map((t) => (
            <button
              key={t.key}
              className={`profile-tab${tab === t.key ? " is-active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={`profile-content${tab === "billing" || tab === "products" ? " profile-content--wide" : ""}`}>
          {tab === "settings" ? (
            <SettingsTab />
          ) : tab === "policy" ? (
            insureShieldPurchased ? <PolicyTab /> : <SettingsTab />
          ) : tab === "billing" ? (
            <BillingTab postPurchaseActive={postPurchasePurchased} subs={postPurchaseSubs} />
          ) : tab === "products" ? (
            <ProductsTab
              onDrawerChange={setProductDrawerOpen}
              postPurchasePurchased={postPurchasePurchased}
              postPurchaseSubs={postPurchaseSubs}
              commerceShieldPurchased={commerceShieldPurchased}
              insureShieldPurchased={insureShieldPurchased}
              onConfigureInLynkUp={onConfigureInLynkUp}
              onConfigureCommerceShieldInLynkUp={onConfigureCommerceShieldInLynkUp}
              onConfigureInsureShieldInLynkUp={onConfigureInsureShieldInLynkUp}
              onConfigureCapability={onConfigureCapability}
              onCancelAddon={onCancelAddon}
              onCancelCommerceShield={onCancelCommerceShield}
              onToast={setToast}
            />
          ) : (
            <PlaceholderTab label={tabs.find((t) => t.key === tab)?.label ?? ""} />
          )}
        </div>
      </div>

      {toast && (
        <div className="profile-toast" role="status">
          <CheckCircleIcon size={18} />
          {toast}
        </div>
      )}
    </main>
  );
}
