import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  OrdersIcon,
  ShipmentsIcon,
  ClaimsIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CallMadeIcon,
  CheckCircleIcon,
  WarningTriangleIcon,
  PackageIcon,
  AssignmentIcon,
  LightbulbIcon,
  ArrowRightAltIcon,
  OpenInNewIcon,
} from "./icons";
import shopifyImg from "../assets/solutions/shopify.svg";
import happyReturnsImg from "../assets/solutions/happy-returns.svg";
import insureShieldImg from "../assets/solutions/insureshield.svg";
import "./Dashboard.css";
import "./OperateDashboard.css";

/* ============================================================================
   Operate Dashboard
   A clean, at-a-glance overview of Orders, Shipments and Claims, with a
   policy banner, a to-do queue, and an "explore more solutions" section.
   ============================================================================ */

/* ------------------------------- Summary cards ------------------------------ */
type Trend = "up" | "down";
type SummaryCard = {
  key: "orders" | "shipments" | "claims";
  label: string;
  icon: React.ReactNode;
  value: string;
  unit?: string;
  delta: string;
  trend: Trend;
  breakdown: { value: string; label: string }[];
};

const summaries: SummaryCard[] = [
  {
    key: "orders",
    label: "Orders",
    icon: <OrdersIcon size={20} />,
    value: "2,458",
    delta: "12.5%",
    trend: "up",
    breakdown: [
      { value: "312", label: "New" },
      { value: "148", label: "Processing" },
      { value: "1,998", label: "Fulfilled" },
    ],
  },
  {
    key: "shipments",
    label: "Shipments",
    icon: <ShipmentsIcon size={20} />,
    value: "2,000",
    delta: "8.2%",
    trend: "up",
    breakdown: [
      { value: "300", label: "In transit" },
      { value: "1,400", label: "Delivered" },
      { value: "200", label: "Exceptions" },
    ],
  },
  {
    key: "claims",
    label: "Claims",
    icon: <ClaimsIcon size={20} />,
    value: "6",
    unit: "open",
    delta: "3.1%",
    trend: "down",
    breakdown: [
      { value: "312", label: "Approved" },
      { value: "$9,786", label: "Paid out" },
      { value: "2", label: "Pending" },
    ],
  },
];

function SummaryCards() {
  return (
    <section className="opd-summary">
      {summaries.map((c) => (
        <article className={`opd-sum opd-sum--${c.key}`} key={c.key}>
          <div className="opd-sum__top">
            <span className="opd-sum__chip">
              <span className="opd-sum__icon">{c.icon}</span>
              {c.label}
            </span>
            <span className={`opd-delta opd-delta--${c.trend}`}>
              {c.trend === "up" ? (
                <TrendingUpIcon size={14} />
              ) : (
                <TrendingDownIcon size={14} />
              )}
              {c.delta}
            </span>
          </div>

          <p className="opd-sum__value">
            {c.value} {c.unit && <small>{c.unit}</small>}
          </p>

          <div className="opd-sum__breakdown">
            {c.breakdown.map((b) => (
              <div key={b.label}>
                <p className="opd-sum__cell-value">{b.value}</p>
                <p className="opd-sum__cell-label">{b.label}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

/* --------------------------------- Area chart -------------------------------- */
type SeriesKey = "orders" | "shipments" | "claims";

const chartMonths = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

const series: Record<
  SeriesKey,
  { label: string; color: string; values: number[]; ticks: number[] }
> = {
  orders: {
    label: "Orders placed",
    color: "var(--ups-blue)",
    values: [1800, 2100, 1950, 2300, 2200, 2458],
    ticks: [2500, 1875, 1250, 625, 0],
  },
  shipments: {
    label: "Shipments created",
    color: "var(--teal)",
    values: [1500, 1700, 1600, 1850, 1900, 2000],
    ticks: [2000, 1500, 1000, 500, 0],
  },
  claims: {
    label: "Claims filed",
    color: "var(--gold-500)",
    values: [8, 5, 7, 4, 6, 6],
    ticks: [8, 6, 4, 2, 0],
  },
};

const PAD = 0.04;
const CH_W = 700;
const CH_H = 220;

function ActivityChart() {
  const [tab, setTab] = useState<SeriesKey>("shipments");
  const s = series[tab];
  const max = s.ticks[0];
  const n = s.values.length;

  const pts = s.values.map((v, i) => {
    const xPct = PAD + (i / (n - 1)) * (1 - 2 * PAD);
    const yPct = 1 - v / max;
    return { xPct, yPct, x: xPct * CH_W, y: yPct * CH_H };
  });

  const line = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${pts[0].x.toFixed(1)},${CH_H} ${line} ${pts[n - 1].x.toFixed(
    1,
  )},${CH_H}`;

  return (
    <div className="opd-panel">
      <div className="opd-panel__head">
        <div>
          <h3 className="opd-panel__title">Activity overview</h3>
          <p className="opd-panel__subtitle">Last 6 months · {s.label}</p>
        </div>
        <div className="opd-seg" role="tablist" aria-label="Activity metric">
          {(Object.keys(series) as SeriesKey[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              className={`opd-seg__btn${tab === k ? " opd-seg__btn--active" : ""}`}
              onClick={() => setTab(k)}
            >
              {k[0].toUpperCase() + k.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="opd-chart">
        <div className="opd-chart__yaxis">
          {s.ticks.map((t) => (
            <span key={t}>{t >= 1000 ? `${(t / 1000).toFixed(1)}k` : t}</span>
          ))}
        </div>
        <div className="opd-chart__plot">
          <div className="opd-chart__grid">
            {s.ticks.map((t) => (
              <span key={t} />
            ))}
          </div>
          <svg
            className="opd-chart__svg"
            viewBox={`0 0 ${CH_W} ${CH_H}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id={`opd-fill-${tab}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={area} fill={`url(#opd-fill-${tab})`} />
            <polyline
              points={line}
              fill="none"
              stroke={s.color}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {pts.map((p, i) => (
            <span
              key={i}
              className="opd-chart__dot"
              style={{
                left: `${p.xPct * 100}%`,
                top: `${p.yPct * 100}%`,
                border: `2.5px solid ${s.color}`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="opd-chart__xaxis">
        {chartMonths.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- Recent activity ----------------------------- */
type FeedItem = {
  icon: React.ReactNode;
  tone: "blue" | "teal" | "gold" | "red";
  title: string;
  meta: string;
  tag: string;
  tagTone: "green" | "blue" | "gold" | "red" | "gray";
};

const feed: FeedItem[] = [
  {
    icon: <CheckCircleIcon size={18} />,
    tone: "teal",
    title: "Shipment #1Z-8842 delivered",
    meta: "Chicago, IL · 2 hours ago",
    tag: "Delivered",
    tagTone: "green",
  },
  {
    icon: <OrdersIcon size={18} />,
    tone: "blue",
    title: "Order #10482 fulfilled",
    meta: "3 items · 3 hours ago",
    tag: "Fulfilled",
    tagTone: "blue",
  },
  {
    icon: <WarningTriangleIcon size={18} />,
    tone: "red",
    title: "Exception on shipment #1Z-8830",
    meta: "Incorrect address · 5 hours ago",
    tag: "Action needed",
    tagTone: "red",
  },
  {
    icon: <ClaimsIcon size={18} />,
    tone: "gold",
    title: "Claim #C-2043 approved",
    meta: "$420.00 payout · Yesterday",
    tag: "Approved",
    tagTone: "green",
  },
  {
    icon: <PackageIcon size={18} />,
    tone: "teal",
    title: "Shipment #1Z-8871 in transit",
    meta: "Departed Louisville, KY · Yesterday",
    tag: "In transit",
    tagTone: "gray",
  },
];

function RecentActivity() {
  return (
    <div className="opd-panel">
      <div className="opd-panel__head">
        <h3 className="opd-panel__title">Recent activity</h3>
        <button className="opd-link">
          View all
          <CallMadeIcon size={14} />
        </button>
      </div>
      <div className="opd-feed">
        {feed.map((f) => (
          <div className="opd-feed__row" key={f.title}>
            <span className={`opd-feed__icon opd-feed__icon--${f.tone}`}>{f.icon}</span>
            <div className="opd-feed__body">
              <p className="opd-feed__title">{f.title}</p>
              <p className="opd-feed__meta">{f.meta}</p>
            </div>
            <span className={`opd-tag opd-tag--${f.tagTone}`}>{f.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- To-Do ----------------------------------- */
type Todo = {
  icon: React.ReactNode;
  tone: "urgent" | "info" | "warn";
  label: string;
  meta: string;
};

const todos: Todo[] = [
  {
    icon: <ClaimsIcon size={16} />,
    tone: "urgent",
    label: "Approve 2 pending claims",
    meta: "$1,240 total value",
  },
  {
    icon: <WarningTriangleIcon size={16} />,
    tone: "warn",
    label: "Review 3 shipment exceptions",
    meta: "Delivery at risk",
  },
  {
    icon: <ShieldCheckIcon size={16} />,
    tone: "info",
    label: "Complete insurance preferences",
    meta: "Unlock full coverage",
  },
];

function TodoCard() {
  return (
    <div className="opd-todo">
      <div className="opd-todo__head">
        <AssignmentIcon size={18} />
        <span className="opd-todo__title">To-Do</span>
        <span className="opd-todo__count">{todos.length}</span>
      </div>
      <ul className="opd-todo__list">
        {todos.map((t) => (
          <li key={t.label}>
            <button className="opd-todo__item">
              <span className={`opd-todo__mark opd-todo__mark--${t.tone}`}>{t.icon}</span>
              <span className="opd-todo__text">
                <span className="opd-todo__label">{t.label}</span>
                <span className="opd-todo__meta">{t.meta}</span>
              </span>
              <ChevronRight size={18} className="opd-todo__chev" />
            </button>
          </li>
        ))}
      </ul>
      <div className="opd-todo__foot">
        <button className="opd-todo__all">View all tasks</button>
      </div>
    </div>
  );
}

/* ------------------------------- Need a boost ------------------------------- */
const boostLinks = [
  { label: "Policy recap", external: false },
  { label: "Claims FAQs", external: false },
  { label: "Insurance glossary", external: true },
];

function BoostCard() {
  return (
    <div className="opd-boost">
      <div className="opd-boost__head">
        <LightbulbIcon size={18} />
        Need a boost?
      </div>
      <ul className="opd-boost__list">
        {boostLinks.map((l) => (
          <li key={l.label}>
            <button className="opd-boost__item">
              {l.label}
              {l.external ? <OpenInNewIcon size={16} /> : <ArrowRightAltIcon size={16} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------- Policy banner ------------------------------ */
function PolicyBanner() {
  return (
    <section className="opd-policy">
      <div className="opd-policy__main">
        <span className="opd-policy__badge">
          <ShieldCheckIcon size={28} />
        </span>
        <div>
          <p className="opd-policy__label">Insurance policy</p>
          <p className="opd-policy__name">
            InsureShield Connect
            <span className="opd-policy__status">
              <span className="opd-policy__dot" />
              Active
            </span>
          </p>
          <p className="opd-policy__num">Policy #1234-567890</p>
        </div>
      </div>

      <div className="opd-policy__facts">
        <div>
          <p className="opd-policy__fact-label">Coverage limit</p>
          <p className="opd-policy__fact-value">$50,000</p>
        </div>
        <span className="opd-policy__divider" />
        <div>
          <p className="opd-policy__fact-label">Renews</p>
          <p className="opd-policy__fact-value">Jan 1, 2027</p>
        </div>
        <span className="opd-policy__divider" />
        <button className="opd-policy__cta">
          Manage policy
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}

/* ----------------------------- Explore solutions ---------------------------- */
type Solution = {
  name: string;
  image: string;
  desc: string;
  cta: string;
  featured?: boolean;
};

const solutions: Solution[] = [
  {
    name: "Shopify",
    image: shopifyImg,
    desc: "Build, brand, and scale your online store with a connected app ecosystem.",
    cta: "Configure",
  },
  {
    name: "Happy Returns",
    image: happyReturnsImg,
    desc: "Streamline product returns with reverse logistics that delight shoppers.",
    cta: "Learn more",
    featured: true,
  },
  {
    name: "InsureShield",
    image: insureShieldImg,
    desc: "Multi-carrier, multi-modal coverage that protects your goods in transit.",
    cta: "Learn more",
    featured: true,
  },
];

function ExploreSolutions() {
  return (
    <section className="opd-solutions">
      <div className="opd-solutions__head">
        <div>
          <h2 className="opd-solutions__title">Explore more solutions</h2>
          <p className="opd-solutions__subtitle">
            Tools that connect to your workflow and grow with your business.
          </p>
        </div>
      </div>
      <div className="opd-solutions__grid">
        {solutions.map((s) => (
          <article className="opd-sol" key={s.name}>
            <div className="opd-sol__media">
              <img className="opd-sol__logo" src={s.image} alt={`${s.name} logo`} />
              {s.featured && <span className="opd-sol__badge">Featured</span>}
            </div>
            <div className="opd-sol__body">
              <h3 className="opd-sol__name">{s.name}</h3>
              <p className="opd-sol__desc">{s.desc}</p>
              <button className="opd-sol__cta">
                {s.cta}
                <ChevronRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------- Page ------------------------------------ */
export default function Dashboard() {
  return (
    <main className="opd">
      <div className="opd__inner">
        <header className="opd-head">
          <div>
            <p className="opd-head__eyebrow">Operate</p>
            <h1 className="opd-head__title">Welcome back, Alex</h1>
            <p className="opd-head__subtitle">
              Here’s what’s happening across your orders, shipments, and claims today.
            </p>
          </div>
          <div className="opd-head__actions">
            <button className="opd-range">
              Last 30 days
              <ChevronDown size={18} />
            </button>
            <button className="opd-btn opd-btn--ghost">
              Export
              <CallMadeIcon size={16} />
            </button>
          </div>
        </header>

        <PolicyBanner />

        <SummaryCards />

        <div className="opd-layout">
          <div className="opd-col">
            <ActivityChart />
            <RecentActivity />
          </div>
          <aside className="opd-rail">
            <TodoCard />
            <BoostCard />
          </aside>
        </div>

        <ExploreSolutions />
      </div>
    </main>
  );
}
