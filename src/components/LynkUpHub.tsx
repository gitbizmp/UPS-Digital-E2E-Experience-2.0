import { useEffect, useRef, useState } from "react";
import TopBar, { type AppKey } from "./TopBar";
import {
  ChevronRight,
  ChevronDown,
  HelpIcon,
  BellIcon,
  ChatIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  ArrowRightAltIcon,
  LockIcon,
  CloseIcon,
  TrackingIcon,
  ResolutionsIcon,
  ShieldIcon,
  VisaCardIcon,
  MastercardCardIcon,
  AmexCardIcon,
} from "./icons";
import { type CapKey, type PaymentMethod, PP_ADDON_PRICE } from "../data/postPurchase";
import Onboarding from "./Onboarding";
import "./LynkUpHub.css";

/* ============================ Small inline icons ============================ */

const GlobeGlyph = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const PinGlyph = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const GiftGlyph = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3 7.5h18V11H3zM12 7.5V21" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12 7.5C10.5 4 6 4 6 6.2 6 7.5 9 7.5 12 7.5Zm0 0C13.5 4 18 4 18 6.2c0 1.3-3 1.3-6 1.3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const FeedbackGlyph = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 5h16v11H9l-5 4V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M8.5 9.5h7M8.5 12.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const payBrandIcon = (brand: string) => {
  switch (brand) {
    case "visa":
      return <VisaCardIcon size={20} />;
    case "mastercard":
      return <MastercardCardIcon size={20} />;
    case "amex":
      return <AmexCardIcon size={20} />;
    default:
      return <VisaCardIcon size={20} />;
  }
};

const RefreshGlyph = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8M20 4v4h-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16M4 20v-4h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldGlyph = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3l7 2.5v5.5c0 4.6-3 8.3-7 9.5-4-1.2-7-4.9-7-9.5V5.5L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarGlyph = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const ClaimGlyph = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 3h8l4 4v14H6V3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M14 3v4h4M9 12h6M9 15.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Simple stroke glyphs for the sidebar nav */
const navGlyph = (path: React.ReactNode) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {path}
  </svg>
);

const Nav = {
  home: navGlyph(<><path d="M4 11 12 4l8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></>),
  organization: navGlyph(<><rect x="4" y="4" width="7" height="16" rx="1" stroke="currentColor" strokeWidth="1.6" /><rect x="13" y="9" width="7" height="11" rx="1" stroke="currentColor" strokeWidth="1.6" /><path d="M6.5 8h2M6.5 11h2M6.5 14h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></>),
  solutions: navGlyph(<><rect x="4" y="4" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" /><rect x="13" y="4" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" /><rect x="4" y="13" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" /><rect x="13" y="13" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" /></>),
  lynks: navGlyph(<><circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" /><circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="1.6" /><circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.6" /><path d="M8 7l8 4M8 17l8-4" stroke="currentColor" strokeWidth="1.5" /></>),
  service: navGlyph(<><path d="M12 3a9 9 0 0 0-9 9v3a2 2 0 0 0 2 2h1v-6H5a7 7 0 0 1 14 0h-1v6h1a2 2 0 0 0 2-2v-3a9 9 0 0 0-9-9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>),
  analytics: navGlyph(<><path d="M12 3a9 9 0 1 0 9 9h-9V3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M14 3.5a7.5 7.5 0 0 1 6.5 6.5H14V3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></>),
  postpurchase: navGlyph(<><path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="m4 8.5 8 4.5 8-4.5M12 20v-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></>),
  risk: navGlyph(<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />),
  admin: navGlyph(<><circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" /><path d="M4 20c0-3.3 2.7-5 6-5 1.2 0 2.3.2 3.2.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="18" cy="17" r="3" stroke="currentColor" strokeWidth="1.6" /><path d="M18 14.5v-1M18 20.5v-1M20.5 17h-1M16.5 17h-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></>),
  advanced: navGlyph(<><path d="M5 20V10M12 20V4M19 20v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>),
  updates: navGlyph(<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />),
  users: navGlyph(<><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" /><path d="M3.5 19c.7-3 3-4.5 5.5-4.5S13.8 16 14.5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="17" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.5" /><path d="M16 14.5c2 .2 3.6 1.6 4.2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>),
  api: navGlyph(<><path d="M8 7 3.5 12 8 17M16 7l4.5 5-4.5 5M13.5 5l-3 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></>),
  shield: navGlyph(<><path d="M12 3l7 2.5v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9v-5L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="m9 12 2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></>),
  config: navGlyph(<><path d="M5 7h9M5 12h14M5 17h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.6" /><circle cx="9" cy="17" r="2" stroke="currentColor" strokeWidth="1.6" /></>),
};

/* ================================ Sidebar ================================= */

type SideSub = { label: string; nav?: LynView };
type SideItem = { label: string; glyph: React.ReactNode; expandable?: boolean; nav?: LynView; subtabs?: SideSub[] };

const sideItems: SideItem[] = [
  { label: "Home", glyph: Nav.home, nav: "home" },
  { label: "Organization", glyph: Nav.organization, expandable: true },
  { label: "Users & Permissions", glyph: Nav.users },
  { label: "LynkUp Admin", glyph: Nav.admin, expandable: true },
  { label: "Solutions", glyph: Nav.solutions },
  { label: "Product Updates", glyph: Nav.updates },
  { label: "APIs & Integrations", glyph: Nav.api },
  { label: "Links", glyph: Nav.lynks, expandable: true },
  { label: "Service Consumption", glyph: Nav.service },
  { label: "Analytics", glyph: Nav.analytics, expandable: true },
  { label: "Advanced Analytics", glyph: Nav.advanced },
  {
    label: "Configurations",
    glyph: Nav.config,
    subtabs: [
      { label: "Post Purchase", nav: "landing" },
      { label: "CommerceShield", nav: "commerceshield" },
      { label: "InsureShield" },
    ],
  },
];

function LynkUpSidebar({ view, onNavigate, collapsed = false }: { view: LynView; onNavigate: (v: LynView) => void; collapsed?: boolean }) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ Configurations: true });

  const isActive = (nav?: LynView) => {
    if (!nav) return false;
    if (nav === "home") return view === "home";
    if (nav === "commerceshield") return view === "commerceshield";
    // "Post Purchase" covers the landing and every capability config view.
    return view !== "home" && view !== "commerceshield";
  };
  return (
    <aside className={`lyn-side${collapsed ? " lyn-side--collapsed" : ""}`}>
      <nav className="lyn-side__nav">
        {sideItems.map((item) =>
          item.subtabs ? (
            <div className="lyn-side__group" key={item.label}>
              <button
                type="button"
                className="lyn-nav"
                aria-expanded={!!openGroups[item.label]}
                onClick={() => setOpenGroups((g) => ({ ...g, [item.label]: !g[item.label] }))}
              >
                <span className="lyn-nav__icon">{item.glyph}</span>
                <span className="lyn-nav__label">{item.label}</span>
                <ChevronDown
                  size={15}
                  className={`lyn-nav__chev${openGroups[item.label] ? " lyn-nav__chev--open" : ""}`}
                />
              </button>
              {openGroups[item.label] && (
                <div className="lyn-side__subnav">
                  {item.subtabs.map((sub) => (
                    <button
                      key={sub.label}
                      type="button"
                      className={`lyn-subnav${isActive(sub.nav) ? " lyn-subnav--active" : ""}`}
                      onClick={sub.nav ? () => onNavigate(sub.nav as LynView) : undefined}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              key={item.label}
              type="button"
              className={`lyn-nav${isActive(item.nav) ? " lyn-nav--active" : ""}`}
              onClick={item.nav ? () => onNavigate(item.nav as LynView) : undefined}
            >
              <span className="lyn-nav__icon">{item.glyph}</span>
              <span className="lyn-nav__label">{item.label}</span>
              {item.expandable && <ChevronDown size={15} className="lyn-nav__chev" />}
            </button>
          )
        )}
      </nav>

      <div className="lyn-side__bottom">
        <button type="button" className="lyn-nav">
          <span className="lyn-nav__icon"><HelpIcon size={17} /></span>
          <span className="lyn-nav__label">Help</span>
          <ChevronDown size={15} className="lyn-nav__chev" />
        </button>
      </div>
    </aside>
  );
}

/* ============================== Value banner ============================== */

const valueProps = [
  {
    icon: <BellIcon size={20} />,
    title: 'Reduce "Where is my order?" inquiries',
    body: "Give customers live visibility into order and delivery status.",
  },
  {
    icon: <GlobeGlyph size={20} />,
    title: "Automate returns and refunds",
    body: "Let customers handle common requests on their own, no manual work.",
  },
  {
    icon: <TrendingUpIcon size={20} />,
    title: "Deliver a branded experience",
    body: "Customize tracking pages, notifications, and customer touchpoints with your brand.",
  },
];

function ValueBanner() {
  return (
    <div className="lyn-value">
      {valueProps.map((v) => (
        <div className="lyn-value__item" key={v.title}>
          <span className="lyn-value__icon">{v.icon}</span>
          <p className="lyn-value__title">{v.title}</p>
          <p className="lyn-value__body">{v.body}</p>
        </div>
      ))}
    </div>
  );
}

/* ============================ Capability model ============================ */

type Capability = {
  key: CapKey;
  title: string;
  desc: string;
  glyph: React.ReactNode;
  paid: boolean;
};

const capabilities: Capability[] = [
  {
    key: "notifications",
    title: "Customer Notifications",
    desc: "Design and manage SMS and email based notifications to customers.",
    glyph: <ChatIcon size={18} />,
    paid: false,
  },
  {
    key: "feedback",
    title: "Hosted Feedback Page",
    desc: "Design and configure the hosted feedback page.",
    glyph: <FeedbackGlyph size={18} />,
    paid: false,
  },
  {
    key: "sameday",
    title: "Same Day Live Tracking Page",
    desc: "Design and configure the live order tracking page for same-day delivery tracking.",
    glyph: <GiftGlyph size={18} />,
    paid: true,
  },
  {
    key: "hosted-tracking",
    title: "Hosted Order Tracking Page",
    desc: "Design and configure the hosted tracking page for multi-fulfilment order tracking.",
    glyph: <PinGlyph size={18} />,
    paid: true,
  },
];

/* ============================== Landing page ============================== */

const navFor: Record<CapKey, string> = {
  notifications: "Tracking Pages",
  feedback: "Tracking Pages",
  resolutions: "Resolutions",
  sameday: "Tracking Pages",
  "hosted-tracking": "Tracking Pages",
};

function StoreOpsPreview({ highlight }: { highlight: string }) {
  const items = [
    { label: "Tracking Pages", icon: <TrackingIcon size={14} /> },
    { label: "Resolutions", icon: <ResolutionsIcon size={14} /> },
  ];
  return (
    <div className="lyn-preview" aria-hidden="true">
      <div className="lyn-preview__head">
        <span className="lyn-preview__dot" />
        <span className="lyn-preview__skel-line" style={{ width: 54 }} />
      </div>
      <span className="lyn-preview__skel-line" style={{ width: "70%" }} />
      <span className="lyn-preview__skel-line" style={{ width: "55%" }} />
      <p className="lyn-preview__group">Post-fulfillment</p>
      {items.map((it) => {
        const on = it.label === highlight;
        return (
          <div key={it.label} className={`lyn-preview__item${on ? " is-new" : ""}`}>
            <span className="lyn-preview__icon">{it.icon}</span>
            <span className="lyn-preview__label">{it.label}</span>
            {on && <span className="lyn-preview__new">New</span>}
          </div>
        );
      })}
      <span className="lyn-preview__skel-line" style={{ width: "60%" }} />
    </div>
  );
}

function CapabilityCard({
  cap,
  subscribed,
  configured,
  onConfigure,
  onSubscribe,
  onUnsubscribe,
}: {
  cap: Capability;
  subscribed: boolean;
  configured: boolean;
  onConfigure: () => void;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
}) {
  const locked = cap.paid && !subscribed;

  return (
    <div className={`lyn-cap${cap.paid ? " lyn-cap--premium" : ""}${locked ? " lyn-cap--locked" : ""}`}>
      <div className="lyn-cap__top">
        <span className="lyn-cap__glyph">{cap.glyph}</span>
        <div className="lyn-cap__heading">
          <div className="lyn-cap__title-row">
            <h4 className="lyn-cap__title">{cap.title}</h4>
            {cap.paid && <span className="lyn-cap__badge">Premium</span>}
          </div>
          <p className="lyn-cap__desc">{cap.desc}</p>
        </div>
      </div>

      <div className="lyn-cap__foot">
        <span className={`lyn-status lyn-status--${configured ? "active" : locked ? "locked" : "todo"}`}>
          {configured ? (
            <><CheckCircleIcon size={14} /> Active</>
          ) : locked ? (
            <><LockIcon size={13} /> Subscribe to unlock</>
          ) : (
            "Not configured"
          )}
        </span>

        {locked ? (
          <button type="button" className="lyn-cap__cta lyn-cap__cta--subscribe" onClick={onSubscribe}>
            Subscribe
          </button>
        ) : (
          <button type="button" className="lyn-cap__cta" onClick={onConfigure}>
            {configured ? "Edit configuration" : "Configure"}
            <ArrowRightAltIcon size={16} />
          </button>
        )}
      </div>

      {cap.paid && subscribed && (
        <div className="lyn-cap__unsub-row">
          <button type="button" className="lyn-cap__unsub" onClick={onUnsubscribe}>
            Unsubscribe
          </button>
        </div>
      )}
    </div>
  );
}

function Landing({
  subs,
  configured,
  onConfigure,
  onSubscribe,
  onUnsubscribe,
  justDone,
  onGoToStoreOps,
  locked,
  onDeactivate,
}: {
  subs: Record<CapKey, boolean>;
  configured: Record<CapKey, boolean>;
  onConfigure: (k: CapKey) => void;
  onSubscribe: (k: CapKey) => void;
  onUnsubscribe: (k: CapKey) => void;
  justDone: CapKey | null;
  onGoToStoreOps: () => void;
  locked: boolean;
  onDeactivate: () => void;
}) {
  const included = capabilities.filter((c) => !c.paid);
  const premium = capabilities.filter((c) => c.paid);

  return (
    <>
      <ValueBanner />

      {justDone && (
        <div className="lyn-return" role="status">
          <StoreOpsPreview highlight={navFor[justDone]} />
          <div className="lyn-return__text">
            <p className="lyn-return__title">
              <span className="lyn-return__icon"><CheckCircleIcon size={18} /></span>
              {titleFor[justDone]} is live
            </p>
            <p className="lyn-return__body">
              You can see how its performing and handle customer resolutions from Operate
            </p>
          </div>
          <button type="button" className="lyn-return__cta" onClick={onGoToStoreOps}>
            Go to Operate
            <ArrowRightAltIcon size={16} />
          </button>
        </div>
      )}

      <section className="lyn-panel">
        <div className="lyn-panel__intro">
          <div className="lyn-panel__intro-head">
            <h2 className="lyn-gate__title">Post Purchase</h2>
            <div className="lyn-panel__switch">
              <span className="lyn-toggle-label">
                {locked ? "Cancel premium add-ons to deactivate" : "Deactivate"}
              </span>
              <Toggle
                checked
                disabled={locked}
                onChange={(v) => {
                  if (!v) onDeactivate();
                }}
              />
            </div>
          </div>
          <p className="lyn-gate__lede">
            Post Purchase gives your customers a branded experience after they order, with tracking,
            notifications, feedback, and self serve resolutions. Turn it on to add it to Commerce Hub and
            start configuring each piece.
          </p>
        </div>

        <div className="lyn-group">
          <div className="lyn-group__head">
            <h3 className="lyn-group__title">Included</h3>
            <span className="lyn-group__note">No extra cost</span>
          </div>
          <div className="lyn-cap-grid">
            {included.map((c) => (
              <CapabilityCard
                key={c.key}
                cap={c}
                subscribed
                configured={configured[c.key]}
                onConfigure={() => onConfigure(c.key)}
                onSubscribe={() => onSubscribe(c.key)}
                onUnsubscribe={() => onUnsubscribe(c.key)}
              />
            ))}
          </div>
        </div>

        <div className="lyn-group">
          <div className="lyn-group__head">
            <h3 className="lyn-group__title">Premium add-ons</h3>
            <span className="lyn-group__note">Subscribe to unlock</span>
          </div>
          <div className="lyn-cap-grid">
            {premium.map((c) => (
              <CapabilityCard
                key={c.key}
                cap={c}
                subscribed={subs[c.key]}
                configured={configured[c.key]}
                onConfigure={() => onConfigure(c.key)}
                onSubscribe={() => onSubscribe(c.key)}
                onUnsubscribe={() => onUnsubscribe(c.key)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================ Config primitives =========================== */

function Toggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className={`lyn-toggle${disabled ? " lyn-toggle--disabled" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="lyn-toggle__track" />
    </label>
  );
}

function Section({
  title,
  toggle,
  open,
  onToggleOpen,
  onToggleEnable,
  enabled = true,
  children,
}: {
  title: string;
  toggle?: boolean;
  open?: boolean;
  onToggleOpen?: () => void;
  onToggleEnable?: (v: boolean) => void;
  enabled?: boolean;
  children?: React.ReactNode;
}) {
  const collapsible = onToggleOpen !== undefined;
  return (
    <div className={`lyn-sec${open === false ? " lyn-sec--collapsed" : ""}`}>
      <div className="lyn-sec__head">
        <button
          type="button"
          className="lyn-sec__title-btn"
          onClick={onToggleOpen}
          disabled={!collapsible}
        >
          {collapsible && (
            <ChevronDown size={18} className={`lyn-sec__chev${open ? " is-open" : ""}`} />
          )}
          <span className="lyn-sec__title">{title}</span>
        </button>
        {toggle && onToggleEnable && <Toggle checked={enabled} onChange={onToggleEnable} />}
      </div>
      {open !== false && children && <div className="lyn-sec__body">{children}</div>}
    </div>
  );
}

function TextField({
  label,
  required,
  placeholder,
  value,
  onChange,
  hint,
}: {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label className="lyn-field">
      <span className="lyn-field__label">
        {label} {required && <em>*</em>}
      </span>
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="lyn-field__hint">{hint}</span>}
    </label>
  );
}

/* Inline-editable text used inside the live preview. Two-way bound without
   caret jumps: only writes DOM from state when the node isn't focused. */
/* ==================== Hosted Order Tracking config ==================== */

type FlowKey = "return" | "refund" | "repair" | "replace";
type HtpSection =
  | "branding"
  | "navigation"
  | "subscribe"
  | "order"
  | "resolutions"
  | "help"
  | "marketing"
  | "recommended"
  | "feedback"
  | "claims"
  | "analytics"
  | "domain";

function HostedTrackingConfig({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) {
  /* Branding */
  const [brandName, setBrandName] = useState("asurion");
  const [logoAlign, setLogoAlign] = useState<"left" | "center" | "right">("left");
  const [accentColor, setAccentColor] = useState("#8223D2");
  const [headerBg, setHeaderBg] = useState("#FFFFFF");
  const [headingFont, setHeadingFont] = useState("Inter");
  const [bodyFont, setBodyFont] = useState("Inter");

  /* Navigation */
  const [navItems, setNavItems] = useState<string[]>(["Shop", "Store Locator"]);

  /* Subscribe */
  const [subscribeOn, setSubscribeOn] = useState(true);
  const [subscribeLabel, setSubscribeLabel] = useState("Subscribe to Updates");

  /* Order header content (sample tracking data) */
  const [orderId, setOrderId] = useState("Order #WZ1234567890");
  const [orderDate, setOrderDate] = useState("Ordered on Jun 27, 2026");
  const [statusLabel, setStatusLabel] = useState("Out for Delivery");
  const [statusEta, setStatusEta] = useState("Arriving by 5:00 PM on Jul 02");
  const [carrierText, setCarrierText] = useState("UPS: #1ZV5R83A03928471");

  /* Order items */
  const itemDetailOptions = ["Image", "Name", "Price", "Quantity"];
  const [itemDetails, setItemDetails] = useState<Record<string, boolean>>({
    Image: true, Name: true, Price: true, Quantity: true,
  });

  /* Resolutions: return / refund / repair / replace */
  const [flows, setFlows] = useState<Record<FlowKey, boolean>>({
    return: true, refund: true, repair: true, replace: true,
  });
  const [resTab, setResTab] = useState<FlowKey>("refund");

  /* Refunds */
  const [refundDeadline, setRefundDeadline] = useState("30");
  const [refundProcessing, setRefundProcessing] = useState<"immediate" | "manual" | "price">("immediate");

  /* Returns */
  const [returnRefundWindow, setReturnRefundWindow] = useState<"immediate" | "qr" | "receipt">("immediate");
  const [returnProcessTime, setReturnProcessTime] = useState("24");
  const [returnDeadline, setReturnDeadline] = useState("30");
  const [returnReasons, setReturnReasons] = useState<Record<string, boolean>>({
    "Defective or not working properly": true,
    "Dead on arrival": true,
    "Damaged in transit": true,
    "Wrong or missing item": true,
    "Package never arrived": true,
  });
  const [returnFee, setReturnFee] = useState<"none" | "percentage">("percentage");
  const [returnFeePct, setReturnFeePct] = useState("7");

  /* Repairs */
  const [repairCost, setRepairCost] = useState<"free" | "warranty" | "paid">("free");
  const [repairNotify, setRepairNotify] = useState<"auto" | "none">("auto");
  const [repairNotifyDays, setRepairNotifyDays] = useState("7");
  const [repairTimeMin, setRepairTimeMin] = useState("7");
  const [repairTimeMax, setRepairTimeMax] = useState("10");
  const [repairPhotos, setRepairPhotos] = useState<"required" | "optional" | "none">("required");
  const [repairShipping, setRepairShipping] = useState<Record<string, boolean>>({
    "UPS Store Drop-Off": true,
    "Scheduled Pickup": true,
    "USPS Drop-Off": false,
  });

  /* Replacements */
  const [replacementType, setReplacementType] = useState<"standard" | "fast" | "paid">("standard");
  const [fastReplacement, setFastReplacement] = useState<"standard" | "expedited">("standard");

  /* Need Help card */
  const [helpOn, setHelpOn] = useState(true);
  const [helpTitle, setHelpTitle] = useState("Need Help?");
  const [helpSub, setHelpSub] = useState("Explore resources and support to assist you at every step.");
  const [faqLabel, setFaqLabel] = useState("FAQs");
  const [supportLabel, setSupportLabel] = useState("Message Support");

  /* Marketing tile */
  const [marketingOn, setMarketingOn] = useState(true);
  const [marketingTitle, setMarketingTitle] = useState("Handled with care");
  const [marketingSub, setMarketingSub] = useState("");

  /* Recommended products */
  const [recommendOn, setRecommendOn] = useState(true);
  const [recoHeading, setRecoHeading] = useState("Recommended Products");

  /* Feedback */
  const [feedbackOn, setFeedbackOn] = useState(true);
  const [feedbackTitle, setFeedbackTitle] = useState("How'd We Do?");
  const [feedbackSub, setFeedbackSub] = useState("Rate your experience");

  /* InsureShield claims */
  const [claimsOn, setClaimsOn] = useState(true);
  const [claimsText, setClaimsText] = useState("Coverage for eligible lost, damaged, or stolen items.");
  const [claimsCta, setClaimsCta] = useState("File a Claim");

  /* Analytics / domain */
  const [gaId, setGaId] = useState("");
  const [cleverTap, setCleverTap] = useState("");
  const [domain, setDomain] = useState("");

  /* Accordion / focus wiring */
  const [openSection, setOpenSection] = useState<HtpSection | null>("branding");
  const [pulse, setPulse] = useState<HtpSection | null>(null);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const focusSection = (id: HtpSection, tab?: FlowKey) => {
    setOpenSection(id);
    if (tab) setResTab(tab);
    setPulse(id);
    requestAnimationFrame(() => {
      refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    window.setTimeout(() => setPulse((p) => (p === id ? null : p)), 1400);
  };

  const flowMeta: Record<FlowKey, { label: string; blurb: string }> = {
    refund: { label: "Refunds", blurb: "Issue money back" },
    return: { label: "Returns", blurb: "Send an item back" },
    repair: { label: "Repairs", blurb: "Fix a damaged item" },
    replace: { label: "Replacements", blurb: "Swap for a new one" },
  };

  const historyRows = [
    { label: "Out for Delivery", place: "New York, NY", time: "Jul 02, 11:07 AM EST", active: true },
    { label: "Departed UPS Facility", place: "New York, NY", time: "Jul 01, 8:53 AM EST", active: false },
    { label: "Arrived at UPS Facility", place: "New York, NY", time: "Jul 01, 4:28 PM EST", active: false },
  ];
  const demoItems = [
    { name: "ZAGG Glass Screen Protector for Apple iPhone 17 Pro Clear", price: "$34.99", qty: 3 },
    { name: "Anker PowerCore 326 2 Port Power Bank 20W 20,000 mAh Black", price: "$49.99", qty: 1 },
  ];
  const recoItems = [
    "Pitaka MagEZ Case Pro 4 MagSafe Case for Apple iPhone…",
    "AMPD 0.33 Hardened Tempered Glass Screen Protector…",
    "Gadget Guard Plus Liquid Screen Protection Clear",
  ];

  const acc = (id: HtpSection, title: string, subtitle: string, body: React.ReactNode) => (
    <div
      ref={(el) => { refs.current[id] = el; }}
      className={`htp-acc${openSection === id ? " is-open" : ""}${pulse === id ? " is-pulse" : ""}`}
    >
      <button type="button" className="htp-acc__head" onClick={() => setOpenSection((cur) => (cur === id ? null : id))}>
        <span className="htp-acc__titles">
          <span className="htp-acc__title">{title}</span>
          <span className="htp-acc__sub">{subtitle}</span>
        </span>
        <ChevronDown size={18} className={`htp-acc__chev${openSection === id ? " is-open" : ""}`} />
      </button>
      {openSection === id && <div className="htp-acc__body">{body}</div>}
    </div>
  );

  const previewStyle = {
    ["--htp-accent" as string]: accentColor,
    fontFamily: bodyFont,
  } as React.CSSProperties;

  return (
    <div className="htp-studio">
      {/* ------------------------- Live preview ------------------------- */}
      <div className="htp-preview-pane">
        <div className="htp-preview-bar">
          <span className="htp-preview-bar__dot" /><span className="htp-preview-bar__dot" /><span className="htp-preview-bar__dot" />
          <span className="htp-preview-bar__url">tracking.asurion.com</span>
        </div>
        <div className="htp-page" style={previewStyle}>
          {/* Header */}
          <header className="htp-hd" style={{ background: headerBg }}>
            <button
              type="button"
              className="htp-hotspot htp-logo-btn"
              style={{ justifySelf: logoAlign === "center" ? "center" : logoAlign === "right" ? "end" : "start" }}
              onClick={() => focusSection("branding")}
            >
              <span className="htp-logo" style={{ fontFamily: headingFont }}>{brandName}</span>
              <span className="htp-edit-badge">Edit logo</span>
            </button>
            <nav className="htp-nav">
              {navItems.map((n, i) => (
                <button key={i} type="button" className="htp-hotspot htp-nav__item" onClick={() => focusSection("navigation")}>{n}</button>
              ))}
            </nav>
          </header>

          {/* Title row */}
          <div className="htp-titlerow">
            <div className="htp-titlerow__left">
              <h1 className="htp-h1" style={{ fontFamily: headingFont }}>Track Your Order</h1>
              <p className="htp-ordermeta">
                <span>{orderId}</span>
                <span className="htp-ordermeta__dot">•</span>
                <span>{orderDate}</span>
              </p>
            </div>
            {subscribeOn && (
              <button type="button" className="htp-hotspot htp-subscribe" style={{ background: accentColor }} onClick={() => focusSection("subscribe")}>
                <BellIcon size={15} />
                <span>{subscribeLabel}</span>
              </button>
            )}
          </div>

          {/* Package tabs */}
          <div className="htp-pkgtabs">
            {["Package 1", "Package 2", "Package 3", "Package 4"].map((p, i) => (
              <span key={p} className={`htp-pkgtab${i === 0 ? " is-active" : ""}`}>{p}</span>
            ))}
          </div>

          {/* Two-column grid */}
          <div className="htp-grid">
            <div className="htp-col htp-col--main">
              {/* Black status card */}
              <button type="button" className="htp-hotspot htp-status" onClick={() => focusSection("order")}>
                <div className="htp-status__top">
                  <div className="htp-status__head">
                    <span className="htp-status__title" style={{ fontFamily: headingFont }}>{statusLabel}</span>
                    <span className="htp-status__eta">{statusEta}</span>
                  </div>
                  <span className="htp-carrier"><span className="htp-carrier__dot" />{carrierText}</span>
                </div>
                <div className="htp-progress"><span className="htp-progress__fill" /></div>
                <div className="htp-progress__labels"><span>Confirmed</span><span>Delivered</span></div>
              </button>

              {/* Tracking history */}
              <div className="htp-card htp-history">
                <h3 className="htp-card__h" style={{ fontFamily: headingFont }}>Tracking History</h3>
                <div className="htp-timeline">
                  {historyRows.map((r, i) => (
                    <div key={i} className={`htp-tl${r.active ? " is-active" : ""}${i === historyRows.length - 1 ? " is-last" : ""}`}>
                      <span className="htp-tl__dot" style={r.active ? { background: accentColor, borderColor: accentColor } : undefined} />
                      <div className="htp-tl__body">
                        <span className="htp-tl__label">{r.label}</span>
                        <span className="htp-tl__meta">{r.place}</span>
                        <span className="htp-tl__meta">{r.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="htp-link" style={{ color: accentColor }}>+ See 7 more updates</button>
              </div>

              {/* Delivery address */}
              <div className="htp-card htp-address">
                <span className="htp-address__icon"><PinGlyph size={18} /></span>
                <div>
                  <span className="htp-card__h" style={{ fontFamily: headingFont }}>Delivery Address</span>
                  <p className="htp-address__lines">Ashton Davis<br />3424 Adventure Way Ln<br />New York, NY 10010</p>
                </div>
              </div>

              {/* Items in order */}
              <div className="htp-card htp-items">
                <div className="htp-items__head">
                  <button type="button" className="htp-hotspot htp-items__title" onClick={() => focusSection("order")}>
                    <h3 className="htp-card__h" style={{ fontFamily: headingFont }}>Items in This Order ({demoItems.length})</h3>
                  </button>
                  <button type="button" className="htp-hotspot htp-return-btn" onClick={() => focusSection("resolutions")}>
                    <RefreshGlyph size={14} /> Return or Exchange
                  </button>
                </div>
                {demoItems.map((it, i) => (
                  <div key={i} className="htp-item">
                    {itemDetails.Image && <span className="htp-item__img" />}
                    <span className="htp-item__meta">
                      {itemDetails.Name && <span className="htp-item__name">{it.name}</span>}
                      {itemDetails.Price && <span className="htp-item__price">{it.price}</span>}
                      {itemDetails.Quantity && <span className="htp-item__qty">Qty: {it.qty}</span>}
                    </span>
                  </div>
                ))}
              </div>

              {/* InsureShield */}
              {claimsOn && (
                <button type="button" className="htp-hotspot htp-insure" onClick={() => focusSection("claims")}>
                  <span className="htp-insure__icon"><ShieldGlyph size={20} /></span>
                  <span className="htp-insure__body">
                    <span className="htp-insure__title">Protected by InsureShield®</span>
                    <span className="htp-insure__sub">{claimsText}</span>
                  </span>
                  <span className="htp-insure__cta"><ClaimGlyph size={14} /> {claimsCta}</span>
                </button>
              )}
            </div>

            <div className="htp-col htp-col--side">
              {/* Need help */}
              {helpOn && (
                <button type="button" className="htp-card htp-help htp-hotspot" onClick={() => focusSection("help")}>
                  <span className="htp-card__h" style={{ fontFamily: headingFont }}>{helpTitle}</span>
                  <span className="htp-help__sub">{helpSub}</span>
                  <span className="htp-help__row"><HelpIcon size={16} />{faqLabel}<ChevronRight size={15} /></span>
                  <span className="htp-help__row"><ChatIcon size={16} />{supportLabel}<ChevronRight size={15} /></span>
                </button>
              )}

              {/* Marketing tile (editable placeholder) */}
              {marketingOn && (
                <button type="button" className="htp-hotspot htp-marketing" style={{ background: accentColor }} onClick={() => focusSection("marketing")}>
                  <span className="htp-marketing__badge">Marketing image</span>
                  <span className="htp-marketing__title">{marketingTitle}</span>
                  {marketingSub && <span className="htp-marketing__sub">{marketingSub}</span>}
                  <span className="htp-edit-badge htp-edit-badge--ondark">Click to edit</span>
                </button>
              )}

              {/* Recommended */}
              {recommendOn && (
                <button type="button" className="htp-card htp-reco htp-hotspot" onClick={() => focusSection("recommended")}>
                  <span className="htp-card__h" style={{ fontFamily: headingFont }}>{recoHeading}</span>
                  <span className="htp-reco__sub">Based on your order</span>
                  {recoItems.map((name, i) => (
                    <span key={i} className="htp-reco__row">
                      <span className="htp-reco__img" />
                      <span className="htp-reco__name">{name}</span>
                      <ChevronRight size={16} />
                    </span>
                  ))}
                  <span className="htp-reco__more" style={{ color: accentColor }}>View More Recommendations <ChevronRight size={14} /></span>
                </button>
              )}

              {/* How'd we do */}
              {feedbackOn && (
                <button type="button" className="htp-card htp-rate htp-hotspot" onClick={() => focusSection("feedback")}>
                  <span className="htp-card__h" style={{ fontFamily: headingFont }}>{feedbackTitle}</span>
                  <span className="htp-rate__sub">{feedbackSub}</span>
                  <span className="htp-rate__stars">{[0, 1, 2, 3, 4].map((s) => <StarGlyph key={s} size={22} />)}</span>
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="htp-ft">
            <span className="htp-ft__powered">Powered by Delivery Solutions</span>
            <button type="button" className="htp-hotspot htp-ft__policy" onClick={() => focusSection("domain")}>Privacy Policy</button>
          </footer>
        </div>
      </div>

      {/* ------------------------ Config panel -------------------------- */}
      <div className="htp-config-pane">
        <div className="htp-config-head">
          <h3 className="htp-config-head__title">Customize your tracking page</h3>
          <p className="htp-config-head__sub">Click any element in the preview, or open a section below. Every change applies instantly.</p>
        </div>

        {acc("branding", "Branding", "Logo, colors & fonts", (
          <>
            <TextField label="Logo text" value={brandName} onChange={setBrandName} hint="Shown as the header logo. Upload an image to replace it." />
            <button type="button" className="htp-upload">⬆ Upload logo image</button>
            <div className="lyn-field">
              <span className="lyn-field__label">Logo alignment</span>
              <div className="lyn-radio-row">
                {(["left", "center", "right"] as const).map((a) => (
                  <label key={a} className="lyn-radio">
                    <input type="radio" checked={logoAlign === a} onChange={() => setLogoAlign(a)} />
                    <span>{a[0].toUpperCase() + a.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="lyn-row">
              <div className="lyn-field">
                <span className="lyn-field__label">Brand accent color</span>
                <div className="lyn-color">
                  <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                  <input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                </div>
              </div>
              <div className="lyn-field">
                <span className="lyn-field__label">Header background</span>
                <div className="lyn-color">
                  <input type="color" value={headerBg} onChange={(e) => setHeaderBg(e.target.value)} />
                  <input value={headerBg} onChange={(e) => setHeaderBg(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="lyn-row">
              <label className="lyn-field">
                <span className="lyn-field__label">Heading font</span>
                <div className="lyn-select"><select value={headingFont} onChange={(e) => setHeadingFont(e.target.value)}><option>Inter</option><option>Arial</option><option>Roboto</option><option>Georgia</option></select><ChevronDown size={16} /></div>
              </label>
              <label className="lyn-field">
                <span className="lyn-field__label">Body font</span>
                <div className="lyn-select"><select value={bodyFont} onChange={(e) => setBodyFont(e.target.value)}><option>Inter</option><option>Open Sans</option><option>Lato</option><option>Roboto</option></select><ChevronDown size={16} /></div>
              </label>
            </div>
          </>
        ))}

        {acc("navigation", "Header navigation", "Menu links", (
          <>
            {navItems.map((n, i) => (
              <div key={i} className="htp-nav-edit">
                <input value={n} onChange={(e) => setNavItems((a) => a.map((x, j) => (j === i ? e.target.value : x)))} />
                <button type="button" className="htp-nav-edit__rm" aria-label="Remove link" onClick={() => setNavItems((a) => a.filter((_, j) => j !== i))}>✕</button>
              </div>
            ))}
            <button type="button" className="lyn-logo__add htp-add-link" onClick={() => setNavItems((a) => [...a, "New link"])}>＋ Add link</button>
          </>
        ))}

        {acc("subscribe", "Subscribe to updates", "Proactive opt-in button", (
          <>
            <div className="lyn-inline-toggle lyn-inline-toggle--bordered">
              <span><span className="lyn-inline-toggle__label">Show subscribe button</span><span className="lyn-inline-toggle__sub">Let shoppers opt in to SMS &amp; email updates</span></span>
              <Toggle checked={subscribeOn} onChange={setSubscribeOn} />
            </div>
            {subscribeOn && <TextField label="Button label" value={subscribeLabel} onChange={setSubscribeLabel} />}
          </>
        ))}

        {acc("order", "Order & items", "Sample data & item fields", (
          <>
            <div className="lyn-subcard">
              <p className="lyn-subcard__title">Preview sample data</p>
              <TextField label="Order number" value={orderId} onChange={setOrderId} />
              <TextField label="Order date" value={orderDate} onChange={setOrderDate} />
              <div className="lyn-row">
                <TextField label="Status" value={statusLabel} onChange={setStatusLabel} />
                <TextField label="Carrier / tracking" value={carrierText} onChange={setCarrierText} />
              </div>
              <TextField label="Estimated arrival" value={statusEta} onChange={setStatusEta} />
            </div>
            <div className="lyn-subcard">
              <p className="lyn-subcard__title">Item details shown</p>
              <div className="lyn-check-grid">
                {itemDetailOptions.map((opt) => (
                  <label key={opt} className="lyn-check">
                    <input type="checkbox" checked={!!itemDetails[opt]} onChange={(e) => setItemDetails((s) => ({ ...s, [opt]: e.target.checked }))} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        ))}

        {acc("resolutions", "Return · Refund · Repair · Replace", "Self-service resolution flows", (
          <>
            <div className="htp-restabs">
              {(Object.keys(flowMeta) as FlowKey[]).map((k) => (
                <button key={k} type="button" className={`htp-restab${resTab === k ? " is-active" : ""}${flows[k] ? " is-on" : ""}`} onClick={() => setResTab(k)}>
                  {flowMeta[k].label}
                </button>
              ))}
            </div>

            <div className="lyn-inline-toggle lyn-inline-toggle--bordered">
              <span><span className="lyn-inline-toggle__label">Enable {flowMeta[resTab].label}</span><span className="lyn-inline-toggle__sub">{flowMeta[resTab].blurb} from the tracking page</span></span>
              <Toggle checked={flows[resTab]} onChange={(v) => setFlows((f) => ({ ...f, [resTab]: v }))} />
            </div>

            {flows[resTab] && resTab === "refund" && (
              <>
                <div className="lyn-field">
                  <span className="lyn-field__label">Deadline to report dissatisfaction before no refund can be requested</span>
                  <div className="htp-num">
                    <input value={refundDeadline} onChange={(e) => setRefundDeadline(e.target.value)} />
                    <span className="htp-num__suffix">days from the date of refund request</span>
                  </div>
                </div>
                <div className="lyn-field">
                  <span className="lyn-field__label">Refund Processing</span>
                  <div className="lyn-radio-col">
                    <label className="lyn-radio"><input type="radio" checked={refundProcessing === "immediate"} onChange={() => setRefundProcessing("immediate")} /><span>Immediate — Process refund immediately</span></label>
                    <label className="lyn-radio"><input type="radio" checked={refundProcessing === "manual"} onChange={() => setRefundProcessing("manual")} /><span>Manual Review — Manage all refund requests manually from my resolutions page</span></label>
                    <label className="lyn-radio"><input type="radio" checked={refundProcessing === "price"} onChange={() => setRefundProcessing("price")} /><span>Price Dependent — Orders under a certain value can be immediately refunded if requested within the required window</span></label>
                  </div>
                </div>
              </>
            )}

            {flows[resTab] && resTab === "return" && (
              <>
                <div className="lyn-field">
                  <span className="lyn-field__label">Refund Window</span>
                  <div className="lyn-radio-col">
                    <label className="lyn-radio"><input type="radio" checked={returnRefundWindow === "immediate"} onChange={() => setReturnRefundWindow("immediate")} /><span>Immediate — Process refund immediately and allow customer to return merchandise by a certain date</span></label>
                    <label className="lyn-radio"><input type="radio" checked={returnRefundWindow === "qr"} onChange={() => setReturnRefundWindow("qr")} /><span>QR Scan — Process refund upon drop off confirmation</span></label>
                    <label className="lyn-radio"><input type="radio" checked={returnRefundWindow === "receipt"} onChange={() => setReturnRefundWindow("receipt")} /><span>Upon Receipt — Process refund after receiving and inspecting the item</span></label>
                  </div>
                </div>
                <div className="lyn-field">
                  <span className="lyn-field__label">Estimated Refund Processing Time</span>
                  <div className="htp-num">
                    <input value={returnProcessTime} onChange={(e) => setReturnProcessTime(e.target.value)} />
                    <span className="htp-num__suffix">hours after refund request</span>
                  </div>
                </div>
                <div className="lyn-field">
                  <span className="lyn-field__label">Deadline to return merchandise before customer refund is rescinded</span>
                  <div className="htp-num">
                    <input value={returnDeadline} onChange={(e) => setReturnDeadline(e.target.value)} />
                    <span className="htp-num__suffix">days from the date of refund request</span>
                  </div>
                </div>
                <div className="lyn-field">
                  <span className="lyn-field__label">Return Reasons</span>
                  <div className="lyn-radio-col">
                    {Object.keys(returnReasons).map((r) => (
                      <label key={r} className="lyn-check"><input type="checkbox" checked={returnReasons[r]} onChange={(e) => setReturnReasons((s) => ({ ...s, [r]: e.target.checked }))} /><span>{r}</span></label>
                    ))}
                  </div>
                </div>
                <div className="lyn-field">
                  <span className="lyn-field__label">Return Fees</span>
                  <div className="lyn-radio-col">
                    <label className="lyn-radio"><input type="radio" checked={returnFee === "none"} onChange={() => setReturnFee("none")} /><span>Do not charge a restock fee to deduct from refund amount</span></label>
                    <label className="lyn-radio"><input type="radio" checked={returnFee === "percentage"} onChange={() => setReturnFee("percentage")} /><span>Charge a percentage of the item price as a restock fee to deduct from refund amount</span></label>
                  </div>
                </div>
                {returnFee === "percentage" && (
                  <div className="lyn-field">
                    <span className="lyn-field__label">Return Fee Percentage</span>
                    <div className="htp-num">
                      <input value={returnFeePct} onChange={(e) => setReturnFeePct(e.target.value)} />
                      <span className="htp-num__suffix">% of item price</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {flows[resTab] && resTab === "repair" && (
              <>
                <div className="lyn-field">
                  <span className="lyn-field__label">Repair Cost</span>
                  <div className="lyn-radio-col">
                    <label className="lyn-radio"><input type="radio" checked={repairCost === "free"} onChange={() => setRepairCost("free")} /><span>Free — No charge for repairs</span></label>
                    <label className="lyn-radio"><input type="radio" checked={repairCost === "warranty"} onChange={() => setRepairCost("warranty")} /><span>Warranty Based — Free if under warranty, paid otherwise</span></label>
                    <label className="lyn-radio"><input type="radio" checked={repairCost === "paid"} onChange={() => setRepairCost("paid")} /><span>Paid — Customer pays for all repairs</span></label>
                  </div>
                </div>
                <div className="lyn-field">
                  <span className="lyn-field__label">Customer Notifications</span>
                  <div className="lyn-radio-col">
                    <label className="lyn-radio"><input type="radio" checked={repairNotify === "auto"} onChange={() => setRepairNotify("auto")} /><span>Automatically notify customers about repair status</span></label>
                    <label className="lyn-radio"><input type="radio" checked={repairNotify === "none"} onChange={() => setRepairNotify("none")} /><span>Do not send notifications to customers about repair status</span></label>
                  </div>
                </div>
                <div className="lyn-field">
                  <span className="lyn-field__label">How often customers receive repair progress notifications</span>
                  <div className="htp-num">
                    <input value={repairNotifyDays} onChange={(e) => setRepairNotifyDays(e.target.value)} />
                    <span className="htp-num__suffix">days between updates</span>
                  </div>
                </div>
                <div className="lyn-field">
                  <span className="lyn-field__label">Estimated Repair Time Range</span>
                  <div className="htp-num">
                    <input value={repairTimeMin} onChange={(e) => setRepairTimeMin(e.target.value)} />
                    <span className="htp-num__suffix">to</span>
                    <input value={repairTimeMax} onChange={(e) => setRepairTimeMax(e.target.value)} />
                    <span className="htp-num__suffix">days</span>
                  </div>
                </div>
                <div className="lyn-field">
                  <span className="lyn-field__label">Photo Requirements</span>
                  <div className="lyn-radio-col">
                    <label className="lyn-radio"><input type="radio" checked={repairPhotos === "required"} onChange={() => setRepairPhotos("required")} /><span>Required — Customer must upload photos</span></label>
                    <label className="lyn-radio"><input type="radio" checked={repairPhotos === "optional"} onChange={() => setRepairPhotos("optional")} /><span>Optional — Photos are requested but not required</span></label>
                    <label className="lyn-radio"><input type="radio" checked={repairPhotos === "none"} onChange={() => setRepairPhotos("none")} /><span>None — Don't request photos</span></label>
                  </div>
                </div>
                <div className="lyn-field">
                  <span className="lyn-field__label">Shipping Methods</span>
                  <div className="lyn-radio-col">
                    {Object.keys(repairShipping).map((m) => (
                      <label key={m} className="lyn-check"><input type="checkbox" checked={repairShipping[m]} onChange={(e) => setRepairShipping((s) => ({ ...s, [m]: e.target.checked }))} /><span>{m}</span></label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {flows[resTab] && resTab === "replace" && (
              <>
                <div className="lyn-field">
                  <span className="lyn-field__label">Replacement Type</span>
                  <div className="lyn-radio-col">
                    <label className="lyn-radio"><input type="radio" checked={replacementType === "standard"} onChange={() => setReplacementType("standard")} /><span>Standard Replacement — Ship after receiving the return</span></label>
                    <label className="lyn-radio"><input type="radio" checked={replacementType === "fast"} onChange={() => setReplacementType("fast")} /><span>Fast Replacement — Ship immediately; before receiving the return</span></label>
                    <label className="lyn-radio"><input type="radio" checked={replacementType === "paid"} onChange={() => setReplacementType("paid")} /><span>Paid — Customer pays for all replacements</span></label>
                  </div>
                </div>
                {replacementType === "fast" && (
                  <div className="lyn-field">
                    <span className="lyn-field__label">Fast Replacement</span>
                    <div className="lyn-radio-col">
                      <label className="lyn-radio"><input type="radio" checked={fastReplacement === "standard"} onChange={() => setFastReplacement("standard")} /><span>Standard (5–7 Business Days)</span></label>
                      <label className="lyn-radio"><input type="radio" checked={fastReplacement === "expedited"} onChange={() => setFastReplacement("expedited")} /><span>Expedited (2–3 Business Days)</span></label>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ))}

        {acc("help", "Need Help card", "Support links & copy", (
          <>
            <div className="lyn-inline-toggle lyn-inline-toggle--bordered">
              <span><span className="lyn-inline-toggle__label">Show Need Help card</span><span className="lyn-inline-toggle__sub">FAQs and support entry points</span></span>
              <Toggle checked={helpOn} onChange={setHelpOn} />
            </div>
            {helpOn && (
              <>
                <TextField label="Card title" value={helpTitle} onChange={setHelpTitle} />
                <TextField label="Description" value={helpSub} onChange={setHelpSub} />
                <div className="lyn-row">
                  <TextField label="Link 1 label" value={faqLabel} onChange={setFaqLabel} />
                  <TextField label="Link 2 label" value={supportLabel} onChange={setSupportLabel} />
                </div>
              </>
            )}
          </>
        ))}

        {acc("marketing", "Marketing image", "Sidebar promo tile", (
          <>
            <div className="lyn-inline-toggle lyn-inline-toggle--bordered">
              <span><span className="lyn-inline-toggle__label">Show marketing tile</span><span className="lyn-inline-toggle__sub">A branded image block in the sidebar</span></span>
              <Toggle checked={marketingOn} onChange={setMarketingOn} />
            </div>
            {marketingOn && (
              <>
                <button type="button" className="htp-upload">⬆ Upload image</button>
                <TextField label="Overlay title" value={marketingTitle} onChange={setMarketingTitle} />
                <TextField label="Overlay subtitle" value={marketingSub} onChange={setMarketingSub} placeholder="Optional" />
              </>
            )}
          </>
        ))}

        {acc("recommended", "Recommended products", "Cross-sell list", (
          <>
            <div className="lyn-inline-toggle lyn-inline-toggle--bordered">
              <span><span className="lyn-inline-toggle__label">Show recommended products</span><span className="lyn-inline-toggle__sub">Personalized product suggestions</span></span>
              <Toggle checked={recommendOn} onChange={setRecommendOn} />
            </div>
            {recommendOn && <TextField label="Section heading" value={recoHeading} onChange={setRecoHeading} />}
          </>
        ))}

        {acc("feedback", "Rating & feedback", "\u201CHow'd We Do?\u201D card", (
          <>
            <div className="lyn-inline-toggle lyn-inline-toggle--bordered">
              <span><span className="lyn-inline-toggle__label">Show rating card</span><span className="lyn-inline-toggle__sub">Collect a star rating after delivery</span></span>
              <Toggle checked={feedbackOn} onChange={setFeedbackOn} />
            </div>
            {feedbackOn && (
              <div className="lyn-row">
                <TextField label="Card title" value={feedbackTitle} onChange={setFeedbackTitle} />
                <TextField label="Prompt" value={feedbackSub} onChange={setFeedbackSub} />
              </div>
            )}
          </>
        ))}

        {acc("claims", "InsureShield® protection", "Claims banner", (
          <>
            <div className="lyn-inline-toggle lyn-inline-toggle--bordered">
              <span><span className="lyn-inline-toggle__label">Show protection banner</span><span className="lyn-inline-toggle__sub">Let customers file a claim from the page</span></span>
              <Toggle checked={claimsOn} onChange={setClaimsOn} />
            </div>
            {claimsOn && (
              <div className="lyn-row">
                <TextField label="Coverage text" value={claimsText} onChange={setClaimsText} />
                <TextField label="Button label" value={claimsCta} onChange={setClaimsCta} />
              </div>
            )}
          </>
        ))}

        {acc("analytics", "Analytics", "Tracking integrations", (
          <div className="lyn-row">
            <TextField label="Google Analytics ID" value={gaId} onChange={setGaId} placeholder="UA / G-XXXXXX" />
            <TextField label="CleverTap account ID" value={cleverTap} onChange={setCleverTap} placeholder="Account ID" />
          </div>
        ))}

        {acc("domain", "Custom domain", "Serve on your own URL", (
          <label className="lyn-field">
            <span className="lyn-field__label">Associate domain</span>
            <div className="lyn-domain__row">
              <div className="lyn-select"><select value={domain} onChange={(e) => setDomain(e.target.value)}><option value="">Select</option><option>tracking.asurion.com</option><option>track.yourbrand.com</option></select><ChevronDown size={16} /></div>
              <button type="button" className="lyn-domain__refresh" aria-label="Refresh domains">↻</button>
            </div>
          </label>
        ))}

        <div className="lyn-config__footer">
          <button type="button" className="lyn-btn lyn-btn--ghost" onClick={onCancel}>Cancel</button>
          <button type="button" className="lyn-btn lyn-btn--primary" onClick={onSave}>Save &amp; publish</button>
        </div>
      </div>
    </div>
  );
}

/* ==================== Customer Notifications config ==================== */

function NotificationsConfig({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [triggers, setTriggers] = useState<Record<string, boolean>>({
    "Order confirmed": true,
    "Order shipped": true,
    "Out for delivery": true,
    "Delivered": true,
    "Return received": false,
    "Refund issued": false,
  });
  const [senderName, setSenderName] = useState("Rockwell Co.");
  const [replyTo, setReplyTo] = useState("support@rockwell.co");

  return (
    <div className="lyn-config">
      <Section title="Channels">
        <div className="lyn-inline-toggle lyn-inline-toggle--bordered">
          <div>
            <span className="lyn-inline-toggle__label">Email</span>
            <span className="lyn-inline-toggle__sub">Send branded email updates for every milestone.</span>
          </div>
          <Toggle checked={email} onChange={setEmail} />
        </div>
        <div className="lyn-inline-toggle lyn-inline-toggle--bordered">
          <div>
            <span className="lyn-inline-toggle__label">SMS</span>
            <span className="lyn-inline-toggle__sub">Text customers concise delivery updates in real time.</span>
          </div>
          <Toggle checked={sms} onChange={setSms} />
        </div>
      </Section>

      <Section title="Sender details">
        <div className="lyn-row">
          <TextField label="Sender name" value={senderName} onChange={setSenderName} />
          <TextField label="Reply-to email" value={replyTo} onChange={setReplyTo} />
        </div>
      </Section>

      <Section title="Send a notification when…">
        <div className="lyn-check-grid lyn-check-grid--wide">
          {Object.keys(triggers).map((t) => (
            <label key={t} className="lyn-check">
              <input
                type="checkbox"
                checked={triggers[t]}
                onChange={(e) => setTriggers((s) => ({ ...s, [t]: e.target.checked }))}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </Section>

      <div className="lyn-config__footer">
        <button type="button" className="lyn-btn lyn-btn--ghost" onClick={onCancel}>Cancel</button>
        <button type="button" className="lyn-btn lyn-btn--primary" onClick={onSave}>Save &amp; publish</button>
      </div>
    </div>
  );
}

/* ==================== Simple config (feedback / sameday) ==================== */

function SimpleConfig({
  intro,
  onSave,
  onCancel,
}: {
  intro: string;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [headline, setHeadline] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#2078E5");
  const [thanks, setThanks] = useState("");

  return (
    <div className="lyn-config">
      <p className="lyn-config__intro">{intro}</p>
      <Section title="Branding">
        <div className="lyn-row">
          <TextField label="Page headline" value={headline} onChange={setHeadline} placeholder="Enter" />
          <div className="lyn-field">
            <span className="lyn-field__label">Primary Color</span>
            <div className="lyn-color">
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
              <input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
            </div>
          </div>
        </div>
      </Section>
      <Section title="Message">
        <TextField label="Confirmation message" value={thanks} onChange={setThanks} placeholder="Thanks for your feedback!" />
      </Section>
      <div className="lyn-config__footer">
        <button type="button" className="lyn-btn lyn-btn--ghost" onClick={onCancel}>Cancel</button>
        <button type="button" className="lyn-btn lyn-btn--primary" onClick={onSave}>Save &amp; publish</button>
      </div>
    </div>
  );
}

/* ================================ Shell ================================== */

type LynView = "home" | "landing" | "commerceshield" | CapKey;

function LynkUpHome({ onGoToOperate }: { onGoToOperate?: () => void }) {
  return <Onboarding onGoToOperate={onGoToOperate} />;
}

function PostPurchaseGate({ onTurnOn }: { onTurnOn: () => void }) {
  const points = [
    { icon: <BellIcon size={18} />, text: "Real time order and delivery updates" },
    { icon: <ResolutionsIcon size={18} />, text: "Self serve returns, refunds, and replacements" },
    { icon: <TrackingIcon size={18} />, text: "Branded tracking and feedback pages" },
  ];
  return (
    <>
      <ValueBanner />
      <section className="lyn-panel lyn-gate">
        <div className="lyn-gate__head">
          <h2 className="lyn-gate__title">Post Purchase</h2>
          <div className="lyn-panel__switch">
            <span className="lyn-toggle-label">Activate</span>
            <Toggle checked={false} onChange={() => onTurnOn()} />
          </div>
        </div>
        <p className="lyn-gate__lede">
          Post Purchase gives your customers a branded experience after they order, with tracking,
          notifications, feedback, and self serve resolutions. Turn it on to add it to Commerce Hub and
          start configuring each piece.
        </p>
        <ul className="lyn-gate__list">
          {points.map((p) => (
            <li className="lyn-gate__item" key={p.text}>
              <span className="lyn-gate__icon">{p.icon}</span>
              {p.text}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}


const titleFor: Record<CapKey, string> = {
  notifications: "Customer Notifications",
  feedback: "Hosted Feedback Page",
  resolutions: "Customer Resolutions",
  sameday: "Same Day Live Tracking Page",
  "hosted-tracking": "Hosted Order Tracking Page",
};

/* ============================ CommerceShield ============================= */

const csValueProps = [
  {
    icon: <ShieldIcon size={20} />,
    title: "Stop fraud before it ships",
    body: "ML scoring on 40+ signals decides in real time at checkout.",
  },
  {
    icon: <TrendingUpIcon size={20} />,
    title: "Fewer chargebacks",
    body: "Block fraudulent orders with a <0.3% false-positive rate.",
  },
  {
    icon: <GlobeGlyph size={20} />,
    title: "Protect your revenue",
    body: "Safe orders pass, risky orders are held — you save on every sale.",
  },
];

function CommerceShieldValueBand() {
  return (
    <div className="lyn-cshero">
      <div className="lyn-cshero__items">
        {csValueProps.map((v) => (
          <div className="lyn-cshero__item" key={v.title}>
            <span className="lyn-cshero__icon">{v.icon}</span>
            <div className="lyn-cshero__text">
              <p className="lyn-cshero__title">{v.title}</p>
              <p className="lyn-cshero__body">{v.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommerceShieldPreview() {
  const rows = [
    { score: 812, covered: true },
    { score: 774, covered: true },
    { score: 542, covered: false },
  ];
  return (
    <div className="lyn-preview lyn-preview--orders" aria-hidden="true">
      <div className="lyn-preview__head">
        <span className="lyn-preview__dot" />
        <span className="lyn-preview__skel-line" style={{ width: 54 }} />
      </div>
      <p className="lyn-preview__group">Orders</p>
      <div className="lyn-csprev__row lyn-csprev__row--head">
        <span className="lyn-csprev__order">Order</span>
        <span className="lyn-csprev__new">Score</span>
        <span className="lyn-csprev__new">Coverage</span>
      </div>
      {rows.map((r, i) => (
        <div className="lyn-csprev__row" key={i}>
          <span className="lyn-preview__skel-line" style={{ width: 44 }} />
          <span className="lyn-csprev__score">{r.score}</span>
          <span className={`lyn-csprev__cov${r.covered ? "" : " is-off"}`}>
            {r.covered ? "Covered" : "Not covered"}
          </span>
        </div>
      ))}
    </div>
  );
}

const CS_PLANS = {
  os: {
    name: "Order Scoring",
    tag: "Fraud detection",
    amount: "$0.30",
    per: "/order",
    priceSub: null as string | null,
    desc: "Real-time machine-learning fraud scoring flags risky orders before they ship.",
    features: [
      "ML risk scoring on 40+ signals",
      "Risk score (0\u20131000) on every order",
      "Manual review holds & email alerts",
      "Scoring filters & orchestration rules",
      "Decisions in under 80ms",
    ],
  },
  eos: {
    name: "Enhanced Order Scoring",
    tag: "Fraud detection + chargeback protection",
    amount: "$0.30",
    per: "/order",
    priceSub: "+ 0.6% of order value" as string | null,
    desc: "Everything in Order Scoring, plus financial protection against fraudulent chargebacks.",
    features: [
      "Everything in Order Scoring",
      "Chargeback protection on approved orders",
      "Reimbursement for fraudulent chargebacks",
      "Priority risk orchestration rules",
      "Peace of mind on every approved sale",
    ],
  },
} as const;

function CommerceShieldConfig({
  active,
  plan,
  onPlanChange,
  onActivate,
  onDeactivate,
  onSaveChanges,
  onGoToStoreOps,
  onCancel,
}: {
  active: boolean;
  plan: "os" | "eos";
  onPlanChange: (p: "os" | "eos") => void;
  onActivate: () => void;
  onDeactivate: () => void;
  onSaveChanges: () => void;
  onGoToStoreOps: () => void;
  onCancel: () => void;
}) {
  const [manualReview, setManualReview] = useState(true);
  const [manualScore, setManualScore] = useState("400");
  const [emailNotify, setEmailNotify] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState("lillian.smith@gmail.com");
  const [scoringFilters, setScoringFilters] = useState(true);
  const [orchestration, setOrchestration] = useState(true);
  const [medOpen, setMedOpen] = useState(true);
  const [medRules, setMedRules] = useState<Record<string, boolean>>({
    "Display UPS Access Point in checkout cart": false,
    "UPS Access Point recommendation for fulfillment": false,
    "Require signature upon delivery": false,
  });
  const [shipProtection, setShipProtection] = useState(true);
  const [coverGoods, setCoverGoods] = useState("certain");

  const activePlan = CS_PLANS[plan];

  return (
    <div className="lyn-cs">
      <div className="lyn-cs__scroll">
        <CommerceShieldValueBand />

        {active ? (
          <>
            <div className="lyn-return" role="status">
              <CommerceShieldPreview />
              <div className="lyn-return__text">
                <p className="lyn-return__title">
                  <span className="lyn-return__icon"><CheckCircleIcon size={18} /></span>
                  CommerceShield is live
                </p>
                <p className="lyn-return__body">
                  Order scoring and coverage now appear in your Commerce Hub orders table.
                </p>
                <div className="lyn-return__actions">
                  <button type="button" className="lyn-return__cta" onClick={onGoToStoreOps}>
                    Go to Operate
                    <ArrowRightAltIcon size={16} />
                  </button>
                  <button type="button" className="lyn-return__deactivate" onClick={onDeactivate}>
                    Deactivate
                  </button>
                </div>
              </div>
            </div>

            <div className="lyn-cs-planbar">
              <div className="lyn-cs-planbar__text">
                <span className="lyn-cs-planbar__eyebrow">Your plan</span>
                <span className="lyn-cs-planbar__name">{activePlan.name}</span>
              </div>
              <span className="lyn-cs-planbar__price">
                {activePlan.amount}<small>{activePlan.per}</small>
                {activePlan.priceSub && <em>{activePlan.priceSub}</em>}
              </span>
            </div>

            <div className="lyn-config">
              <Section title="Risk mitigation tools">
                <p className="lyn-sec__desc">Fine-tune how flagged orders are reviewed and resolved.</p>
                <div className="lyn-cs-sets">
                  <div className="lyn-cs-set">
                    <div className="lyn-inline-toggle">
                      <div>
                        <span className="lyn-inline-toggle__label">Manual Review</span>
                        <span className="lyn-inline-toggle__sub">Automatically hold high-risk orders so you can review them. Orders at or below the chosen score (100&ndash;1,000) are placed on hold.</span>
                      </div>
                      <Toggle checked={manualReview} onChange={setManualReview} />
                    </div>
                    {manualReview && (
                      <div className="lyn-cs-set__field">
                        <TextField label="Hold orders at or below score" value={manualScore} onChange={setManualScore} />
                      </div>
                    )}
                  </div>

                  <div className="lyn-cs-set">
                    <div className="lyn-inline-toggle">
                      <div>
                        <span className="lyn-inline-toggle__label">Email Notification</span>
                        <span className="lyn-inline-toggle__sub">Get notified whenever an order is flagged as high-risk.</span>
                      </div>
                      <Toggle checked={emailNotify} onChange={setEmailNotify} />
                    </div>
                    {emailNotify && (
                      <div className="lyn-cs-set__field">
                        <TextField label="Notification email" value={notifyEmail} onChange={setNotifyEmail} />
                      </div>
                    )}
                  </div>

                  <div className="lyn-cs-set">
                    <div className="lyn-inline-toggle">
                      <div>
                        <span className="lyn-inline-toggle__label">Order Scoring Filters</span>
                        <span className="lyn-inline-toggle__sub">Excluded orders are not scored, not charged, and not eligible for the guarantee.</span>
                      </div>
                      <Toggle checked={scoringFilters} onChange={setScoringFilters} />
                    </div>
                    {scoringFilters && (
                      <div className="lyn-cs-set__field lyn-cs-filters">
                        {["Excluded Customer Emails", "Excluded Payment Type", "Order Value Threshold"].map((f) => (
                          <button type="button" className="lyn-cs-filter" key={f}>
                            <span>{f}</span>
                            <ChevronDown size={16} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="lyn-cs-set">
                    <div className="lyn-inline-toggle">
                      <div>
                        <span className="lyn-inline-toggle__label">Risk Orchestration Rules</span>
                        <span className="lyn-inline-toggle__sub">Automatically resolve orders based on risk score and other criteria.</span>
                      </div>
                      <Toggle checked={orchestration} onChange={setOrchestration} />
                    </div>
                    {orchestration && (
                      <div className="lyn-cs-set__field lyn-cs-rules">
                        <div className="lyn-cs-rule">
                          <button type="button" className="lyn-cs-rule__head" onClick={() => setMedOpen((v) => !v)}>
                            <span className="lyn-cs-rule__dot lyn-cs-rule__dot--med" />
                            <span className="lyn-cs-rule__label">Medium Risk Orders (400&ndash;699)</span>
                            <ChevronDown size={16} className={`lyn-cs-rule__chev${medOpen ? " is-open" : ""}`} />
                          </button>
                          {medOpen && (
                            <div className="lyn-cs-rule__body">
                              {Object.keys(medRules).map((r) => (
                                <label key={r} className="lyn-check">
                                  <input
                                    type="checkbox"
                                    checked={medRules[r]}
                                    onChange={(e) => setMedRules((s) => ({ ...s, [r]: e.target.checked }))}
                                  />
                                  <span>{r}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="lyn-cs-rule">
                          <button type="button" className="lyn-cs-rule__head" disabled>
                            <span className="lyn-cs-rule__dot lyn-cs-rule__dot--high" />
                            <span className="lyn-cs-rule__label">High Risk Orders (0&ndash;399)</span>
                            <ChevronDown size={16} className="lyn-cs-rule__chev" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Section>

              <Section
                title="Shipping Protection"
                toggle
                enabled={shipProtection}
                onToggleEnable={setShipProtection}
              >
                <p className="lyn-sec__desc">
                  Orders with UPS/FedEx/DHL are charged $0.80 per $100 package value. Consumer/Other
                  carriers are charged $0.95 per $100 package value.
                </p>
                <div className="lyn-field">
                  <span className="lyn-field__label">How would you like to cover your goods?</span>
                  <div className="lyn-select">
                    <select value={coverGoods} onChange={(e) => setCoverGoods(e.target.value)}>
                      <option value="all">Protect all orders</option>
                      <option value="certain">Protect certain orders</option>
                      <option value="none">Do not purchase protection</option>
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>
                {coverGoods === "certain" && (
                  <p className="lyn-field__hint">Insure based on order value &mdash; $2,000.00 (Domestic).</p>
                )}
              </Section>
            </div>
          </>
        ) : (
          <div className="lyn-cs-plans">
            <div className="lyn-cs-plans__intro">
              <h2 className="lyn-cs-plans__title">Choose your CommerceShield Plan</h2>
              <p className="lyn-cs-plans__sub">
                Pick how CommerceShield scores and protects your orders. You can change this anytime.
              </p>
            </div>
            <div className="lyn-cs-plangrid">
              {(["os", "eos"] as const).map((key) => {
                const p = CS_PLANS[key];
                const selected = plan === key;
                return (
                  <button
                    type="button"
                    key={key}
                    className={`lyn-plan${selected ? " is-selected" : ""}`}
                    onClick={() => onPlanChange(key)}
                    aria-pressed={selected}
                  >
                    {key === "eos" && <span className="lyn-plan__badge">Most protection</span>}
                    <div className="lyn-plan__head">
                      <span className="lyn-plan__radio" aria-hidden="true" />
                      <div className="lyn-plan__titles">
                        <span className="lyn-plan__name">{p.name}</span>
                        <span className="lyn-plan__tag">{p.tag}</span>
                      </div>
                      <div className="lyn-plan__price">
                        <span className="lyn-plan__amount">{p.amount}</span>
                        <span className="lyn-plan__per">{p.per}</span>
                        {p.priceSub && <span className="lyn-plan__pricesub">{p.priceSub}</span>}
                      </div>
                    </div>
                    <p className="lyn-plan__desc">{p.desc}</p>
                    <ul className="lyn-plan__features">
                      {p.features.map((f) => (
                        <li className="lyn-plan__feature" key={f}>
                          <CheckCircleIcon size={16} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            <div className="lyn-cs-plans__foot">
              <div className="lyn-cs-plans__foot-info">
                <span className="lyn-cs__footer-amount">
                  {activePlan.amount}<small>{activePlan.per}</small>
                </span>
                <span className="lyn-cs__footer-plan">
                  {activePlan.name}{activePlan.priceSub ? ` \u00b7 ${activePlan.priceSub}` : ""}
                </span>
              </div>
              <div className="lyn-cs__footer-actions">
                <button type="button" className="lyn-btn lyn-btn--primary" onClick={onActivate}>Activate CommerceShield</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {active && (
        <div className="lyn-cs__footer">
          <div className="lyn-cs__footer-info">
            <span className="lyn-cs__footer-hint">Changes apply to newly scored orders.</span>
          </div>
          <div className="lyn-cs__footer-actions">
            <button type="button" className="lyn-btn lyn-btn--ghost" onClick={onCancel}>Cancel</button>
            <button type="button" className="lyn-btn lyn-btn--primary" onClick={onSaveChanges}>Save changes</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LynkUpHub({
  activeApp,
  onAppChange,
  onProfile,
  onConfigured,
  onStoreOpsEnabled,
  onDeactivate,
  onCommerceShieldConfigured,
  onGoToStoreOpsOrders,
  postPurchaseActive,
  subs,
  onSubscribe,
  onUnsubscribe,
  paymentMethods,
  initialView,
  navToken,
}: {
  activeApp: AppKey;
  onAppChange: (app: AppKey) => void;
  onProfile: () => void;
  onConfigured: () => void;
  onStoreOpsEnabled: () => void;
  onDeactivate: () => void;
  onCommerceShieldConfigured: (active: boolean) => void;
  onGoToStoreOpsOrders: () => void;
  postPurchaseActive: boolean;
  subs: Record<CapKey, boolean>;
  onSubscribe: (k: CapKey) => void;
  onUnsubscribe: (k: CapKey) => void;
  paymentMethods: PaymentMethod[];
  initialView: LynView;
  navToken: number;
}) {
  const [view, setView] = useState<LynView>(initialView);
  const [configured, setConfigured] = useState<Record<CapKey, boolean>>({
    notifications: false,
    feedback: false,
    resolutions: false,
    sameday: false,
    "hosted-tracking": false,
  });
  const [justDone, setJustDone] = useState<CapKey | null>(null);
  const [subscribeTarget, setSubscribeTarget] = useState<Capability | null>(null);
  const [csActive, setCsActive] = useState(false);
  const [csPayOpen, setCsPayOpen] = useState(false);
  const [csPlan, setCsPlan] = useState<"os" | "eos">("eos");
  const [selectedPay, setSelectedPay] = useState(
    () => (paymentMethods.find((m) => m.isDefault) ?? paymentMethods[0]).last4
  );
  const [toast, setToast] = useState<string | null>(null);
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleUnsubscribe = (k: CapKey) => {
    onUnsubscribe(k);
    setToast(`${titleFor[k]} add-on unsubscribed.`);
  };

  // Deep-link: when the parent asks for a specific view (e.g. Configure from Profile).
  useEffect(() => {
    setView(initialView);
  }, [navToken, initialView]);

  const goConfigure = (k: CapKey) => {
    setView(k);
    setJustDone(null);
  };

  const handleSave = (k: CapKey) => {
    setConfigured((s) => ({ ...s, [k]: true }));
    setJustDone(k);
    onStoreOpsEnabled();
    setView("landing");
    requestAnimationFrame(() => mainRef.current?.scrollTo({ top: 0, behavior: "auto" }));
  };

  const confirmSubscribe = () => {
    if (!subscribeTarget) return;
    const { key, title } = subscribeTarget;
    onSubscribe(key);
    setSubscribeTarget(null);
    // Show the confirmation toast after the slide-out panel finishes closing.
    setTimeout(() => setToast(`${title} add-on subscribed.`), 360);
  };

  const confirmCsActivate = () => {
    setCsActive(true);
    onCommerceShieldConfigured(true);
    setCsPayOpen(false);
    setToast("CommerceShield activated.");
  };

  const deactivateCs = () => {
    setCsActive(false);
    onCommerceShieldConfigured(false);
    setToast("CommerceShield deactivated.");
  };

  const saveCsChanges = () => {
    setToast("CommerceShield settings saved.");
  };

  const paidSubscribed = subs.sameday || subs["hosted-tracking"];

  return (
    <div className="lyn-shell">
      <TopBar
        activeApp={activeApp}
        onAppChange={onAppChange}
        onProfile={onProfile}
        onToggleSidebar={() => setSideCollapsed((c) => !c)}
        sidebarCollapsed={sideCollapsed}
      />
      <div className="lyn-body">
        <LynkUpSidebar view={view} onNavigate={setView} collapsed={sideCollapsed} />
        <div className="lyn-content">

        <main ref={mainRef} className={`lyn-main${view === "home" ? " lyn-main--home" : ""}${view === "hosted-tracking" ? " lyn-main--studio" : ""}${view === "commerceshield" ? " lyn-main--cs" : ""}${subscribeTarget && view !== "hosted-tracking" && view !== "commerceshield" ? " lyn-main--split" : ""}`}>
          {view === "home" ? (
            <LynkUpHome onGoToOperate={onGoToStoreOpsOrders} />
          ) : view === "commerceshield" ? (
            <>
              <nav className="lyn-crumbs" aria-label="Breadcrumb">
                <button type="button" onClick={() => setView("home")}>Home</button>
                <ChevronRight size={14} />
                <button type="button" onClick={() => setView("landing")}>Product Configurations</button>
                <ChevronRight size={14} />
                <span>CommerceShield</span>
              </nav>
              <h1 className="lyn-title">CommerceShield</h1>
              <div className={`lyn-main__body lyn-main__body--cs${csPayOpen ? " is-split" : ""}`}>
                <div className="lyn-main__page">
                  <CommerceShieldConfig
                    active={csActive}
                    plan={csPlan}
                    onPlanChange={setCsPlan}
                    onActivate={() => setCsPayOpen(true)}
                    onDeactivate={deactivateCs}
                    onSaveChanges={saveCsChanges}
                    onGoToStoreOps={onGoToStoreOpsOrders}
                    onCancel={() => setView("home")}
                  />
                </div>

                {csPayOpen && (
                  <aside className="lyn-flyout" role="dialog" aria-label="Activate CommerceShield">
                    <header className="lyn-flyout__head">
                      <div>
                        <h3 className="lyn-flyout__title">Activate CommerceShield</h3>
                      </div>
                      <button
                        type="button"
                        className="lyn-flyout__close"
                        aria-label="Close"
                        onClick={() => setCsPayOpen(false)}
                      >
                        <CloseIcon size={18} />
                      </button>
                    </header>

                    <div className="lyn-flyout__body">
                      <p className="lyn-flyout__desc">
                        Turn on real-time fraud scoring and chargeback protection for your Commerce Hub orders.
                      </p>

                      <div className="lyn-flyout__price">
                        <span className="lyn-flyout__price-amount">
                          $0.30
                          <small>/order</small>
                        </span>
                        <span className="lyn-flyout__price-label">
                          {csPlan === "eos"
                            ? "Enhanced Order Scoring \u2014 + 0.6% of order value"
                            : "Order Scoring \u2014 pay as you go"}
                        </span>
                      </div>

                      <div className="lyn-flyout__section">
                        <p className="lyn-flyout__section-title">Payment method</p>
                        {paymentMethods.map((m) => (
                          <label className={`lyn-pay${selectedPay === m.last4 ? " is-selected" : ""}`} key={m.last4}>
                            <input
                              type="radio"
                              name="lyn-cs-pay"
                              checked={selectedPay === m.last4}
                              onChange={() => setSelectedPay(m.last4)}
                            />
                            <span className="lyn-pay__icon">{payBrandIcon(m.brand)}</span>
                            <span className="lyn-pay__brand">{m.label}</span>
                            <span className="lyn-pay__num">•••• {m.last4}</span>
                            {m.isDefault && <span className="lyn-pay__default">Default</span>}
                          </label>
                        ))}
                        <p className="lyn-flyout__note">
                          You will be billed monthly on this card for orders scored by CommerceShield.
                        </p>
                      </div>
                    </div>

                    <footer className="lyn-flyout__foot">
                      <button type="button" className="lyn-btn lyn-btn--primary" onClick={confirmCsActivate}>
                        Activate &amp; pay
                      </button>
                      <button type="button" className="lyn-btn lyn-btn--ghost" onClick={() => setCsPayOpen(false)}>
                        Cancel
                      </button>
                    </footer>
                  </aside>
                )}
              </div>
            </>
          ) : (
          <>
          <nav className="lyn-crumbs" aria-label="Breadcrumb">
            <button type="button" onClick={() => setView("home")}>Home</button>
            <ChevronRight size={14} />
            <button type="button" onClick={() => setView("landing")}>Product Configurations</button>
            <ChevronRight size={14} />
            {view === "landing" ? (
              <span>Post Purchase</span>
            ) : (
              <>
                <button type="button" onClick={() => setView("landing")}>Post Purchase</button>
                <ChevronRight size={14} />
                <span>{titleFor[view as CapKey]}</span>
              </>
            )}
          </nav>

          <h1 className="lyn-title">
            {view === "landing" ? "Post Purchase" : titleFor[view as CapKey]}
          </h1>

          <div className={`lyn-main__body${subscribeTarget ? " is-split" : ""}${view === "hosted-tracking" ? " lyn-main__body--studio" : ""}`}>
            <div className="lyn-main__page">
              {!postPurchaseActive ? (
                <PostPurchaseGate onTurnOn={onStoreOpsEnabled} />
              ) : view === "landing" ? (
                <Landing
                  subs={subs}
                  configured={configured}
                  onConfigure={goConfigure}
                  onSubscribe={(k) => setSubscribeTarget(capabilities.find((c) => c.key === k) ?? null)}
                  onUnsubscribe={handleUnsubscribe}
                  justDone={justDone}
                  onGoToStoreOps={onConfigured}
                  locked={paidSubscribed}
                  onDeactivate={onDeactivate}
                />
              ) : view === "hosted-tracking" ? (
                <HostedTrackingConfig onSave={() => handleSave("hosted-tracking")} onCancel={() => setView("landing")} />
              ) : view === "notifications" ? (
                <NotificationsConfig onSave={() => handleSave("notifications")} onCancel={() => setView("landing")} />
              ) : view === "resolutions" ? (
                <SimpleConfig
                  intro="Let customers start returns, refunds, and replacements on their own, then track each request to done."
                  onSave={() => handleSave("resolutions")}
                  onCancel={() => setView("landing")}
                />
              ) : view === "sameday" ? (
                <SimpleConfig
                  intro="Give same day shoppers a live map and ETA from dispatch to doorstep."
                  onSave={() => handleSave("sameday")}
                  onCancel={() => setView("landing")}
                />
              ) : (
                <SimpleConfig
                  intro="Collect post delivery ratings and comments on a branded, hosted page."
                  onSave={() => handleSave("feedback")}
                  onCancel={() => setView("landing")}
                />
              )}
            </div>

            {subscribeTarget && (
              <aside className="lyn-flyout" role="dialog" aria-label={`Add ${subscribeTarget.title}`}>
                <header className="lyn-flyout__head">
                  <div>
                    <h3 className="lyn-flyout__title">{subscribeTarget.title}</h3>
                  </div>
                  <button
                    type="button"
                    className="lyn-flyout__close"
                    aria-label="Close"
                    onClick={() => setSubscribeTarget(null)}
                  >
                    <CloseIcon size={18} />
                  </button>
                </header>

                <div className="lyn-flyout__body">
                  <p className="lyn-flyout__desc">
                    Add {subscribeTarget.title.toLowerCase()} to your Post Purchase experience.
                  </p>

                  <div className="lyn-flyout__price">
                    <span className="lyn-flyout__price-amount">
                      ${PP_ADDON_PRICE}
                      <small>/month</small>
                    </span>
                    <span className="lyn-flyout__price-label">Monthly add-on</span>
                  </div>

                  <div className="lyn-flyout__section">
                    <p className="lyn-flyout__section-title">Payment method</p>
                    {paymentMethods.map((m) => (
                      <label className={`lyn-pay${selectedPay === m.last4 ? " is-selected" : ""}`} key={m.last4}>
                        <input
                          type="radio"
                          name="lyn-pay"
                          checked={selectedPay === m.last4}
                          onChange={() => setSelectedPay(m.last4)}
                        />
                        <span className="lyn-pay__icon">{payBrandIcon(m.brand)}</span>
                        <span className="lyn-pay__brand">{m.label}</span>
                        <span className="lyn-pay__num">•••• {m.last4}</span>
                        {m.isDefault && <span className="lyn-pay__default">Default</span>}
                      </label>
                    ))}
                    <p className="lyn-flyout__note">
                      You will be billed monthly on this card alongside your other Post Purchase charges.
                    </p>
                  </div>
                </div>

                <footer className="lyn-flyout__foot">
                  <button type="button" className="lyn-btn lyn-btn--primary" onClick={confirmSubscribe}>
                    Add for ${PP_ADDON_PRICE}/month
                  </button>
                  <button type="button" className="lyn-btn lyn-btn--ghost" onClick={() => setSubscribeTarget(null)}>
                    Cancel
                  </button>
                </footer>
              </aside>
            )}
          </div>
          </>
          )}
        </main>
      </div>
      </div>

      {toast && (
        <div className="lyn-toast" role="status">
          <CheckCircleIcon size={18} />
          {toast}
        </div>
      )}
    </div>
  );
}
