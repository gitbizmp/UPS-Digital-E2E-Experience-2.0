import {
  ChevronDown,
  ChevronRight,
  OrdersIcon,
  ClaimsIcon,
  ShieldCheckIcon,
  CallMadeIcon,
  CheckCircleIcon,
  WarningTriangleIcon,
  PackageIcon,
  PaymentIcon,
  AssignmentIcon,
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
type SummaryCard = {
  key: "orders" | "shipments" | "claims";
  label: string;
  icon: React.ReactNode;
  value: string;
  sub: string;
};

const summaries: SummaryCard[] = [
  {
    key: "shipments",
    label: "Total shipments insured",
    icon: <ShieldCheckIcon size={20} />,
    value: "0",
    sub: "Shopify order sync active",
  },
  {
    key: "claims",
    label: "Active claims",
    icon: <ClaimsIcon size={20} />,
    value: "1",
    sub: "Claims filed via portal",
  },
  {
    key: "claims",
    label: "Claims approved",
    icon: <CheckCircleIcon size={20} />,
    value: "1",
    sub: "Payout rate 100%",
  },
  {
    key: "orders",
    label: "Total coverage",
    icon: <PaymentIcon size={20} />,
    value: "$150.00",
    sub: "Insurance policy limits",
  },
];

function SummaryCards() {
  return (
    <section className="opd-summary">
      {summaries.map((c) => (
        <article className={`opd-sum opd-sum--${c.key}`} key={c.label}>
          <div className="opd-sum__top">
            <span className="opd-sum__label">{c.label}</span>
            <span className="opd-sum__icon">{c.icon}</span>
          </div>

          <p className="opd-sum__value">{c.value}</p>

          <p className="opd-sum__sub">{c.sub}</p>
        </article>
      ))}
    </section>
  );
}

/* --------------------------------- Shipment volume chart -------------------------------- */
const volMonths = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const volValues = [1500, 1700, 1600, 1850, 1900, 2000];
const volTicks = [2000, 1500, 1000, 500, 0];
const VOL_PAD = 0.04;
const VOL_W = 700;
const VOL_H = 220;

function ShipmentVolumeChart() {
  const max = volTicks[0];
  const n = volValues.length;

  const pts = volValues.map((v, i) => {
    const xPct = VOL_PAD + (i / (n - 1)) * (1 - 2 * VOL_PAD);
    const yPct = 1 - v / max;
    return { xPct, yPct, x: xPct * VOL_W, y: yPct * VOL_H };
  });

  const line = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${pts[0].x.toFixed(1)},${VOL_H} ${line} ${pts[n - 1].x.toFixed(1)},${VOL_H}`;

  return (
    <div className="opd-panel">
      <div className="opd-panel__head">
        <div>
          <h3 className="opd-panel__title">Shipment volume</h3>
          <p className="opd-panel__subtitle">Shipments created · Last 6 months</p>
        </div>
      </div>

      <div className="opd-chart">
        <div className="opd-chart__yaxis">
          {volTicks.map((t) => (
            <span key={t}>{t >= 1000 ? `${(t / 1000).toFixed(1)}k` : t}</span>
          ))}
        </div>
        <div className="opd-chart__plot">
          <div className="opd-chart__grid">
            {volTicks.map((t) => (
              <span key={t} />
            ))}
          </div>
          <svg
            className="opd-chart__svg"
            viewBox={`0 0 ${VOL_W} ${VOL_H}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="opd-vol-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={area} fill="url(#opd-vol-fill)" />
            <polyline
              points={line}
              fill="none"
              stroke="var(--teal)"
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
                border: "2.5px solid var(--teal)",
              }}
            />
          ))}
        </div>
      </div>
      <div className="opd-chart__xaxis">
        {volMonths.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- Breakdown donuts -------------------------------- */
type Segment = { label: string; value: number; display: string; color: string };
type BreakdownGroup = {
  key: "orders" | "shipments" | "claims";
  title: string;
  total: string;
  totalLabel: string;
  segments: Segment[];
};

const breakdowns: BreakdownGroup[] = [
  {
    key: "orders",
    title: "Orders",
    total: "2,458",
    totalLabel: "Total",
    segments: [
      { label: "New", value: 312, display: "312", color: "#1e40af" },
      { label: "Processing", value: 148, display: "148", color: "#3b82f6" },
      { label: "Fulfilled", value: 1998, display: "1,998", color: "#93c5fd" },
    ],
  },
  {
    key: "shipments",
    title: "Shipments",
    total: "2,000",
    totalLabel: "Total",
    segments: [
      { label: "In transit", value: 300, display: "300", color: "#0f766e" },
      { label: "Delivered", value: 1400, display: "1,400", color: "#14b8a6" },
      { label: "Exceptions", value: 200, display: "200", color: "#5eead4" },
    ],
  },
];

const DONUT = 100;
const R = 42;
const C = 2 * Math.PI * R;

function Donut({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  let offset = 0;
  return (
    <svg
      className="opd-donut__svg"
      viewBox={`0 0 ${DONUT} ${DONUT}`}
      aria-hidden
    >
      <circle
        cx={DONUT / 2}
        cy={DONUT / 2}
        r={R}
        fill="none"
        stroke="var(--gray-100)"
        strokeWidth={12}
      />
      {segments.map((s) => {
        const frac = total ? s.value / total : 0;
        const dash = frac * C;
        const el = (
          <circle
            key={s.label}
            cx={DONUT / 2}
            cy={DONUT / 2}
            r={R}
            fill="none"
            stroke={s.color}
            strokeWidth={12}
            strokeDasharray={`${dash} ${C - dash}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${DONUT / 2} ${DONUT / 2})`}
          />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

function BreakdownCharts() {
  return (
    <section className="opd-breakdowns">
      {breakdowns.map((g) => (
        <div className="opd-panel opd-donut" key={g.key}>
          <h3 className="opd-panel__title">{g.title}</h3>
          <div className="opd-donut__chart">
            <Donut segments={g.segments} />
            <div className="opd-donut__center">
              <span className="opd-donut__total">{g.total}</span>
              <span className="opd-donut__total-label">{g.totalLabel}</span>
            </div>
          </div>
          <ul className="opd-donut__legend">
            {g.segments.map((s) => (
              <li className="opd-donut__row" key={s.label}>
                <span
                  className="opd-donut__dot"
                  style={{ background: s.color }}
                />
                <span className="opd-donut__leg-label">{s.label}</span>
                <span className="opd-donut__leg-value">{s.display}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
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

/* ------------------------------- Claims overview ------------------------------ */
type ClaimStat = { label: string; value: number; display: string; color: string };
const claimStats: ClaimStat[] = [
  { label: "Approved", value: 312, display: "312", color: "#16a34a" },
  { label: "Open", value: 6, display: "6", color: "#2563eb" },
  { label: "Pending", value: 2, display: "2", color: "#f59e0b" },
  { label: "Denied", value: 1, display: "1", color: "#dc2626" },
];

const draftsCount = 3;

function ClaimsOverview({ onOpenDrafts }: { onOpenDrafts?: () => void }) {
  const total = claimStats.reduce((s, c) => s + c.value, 0);
  const max = Math.max(...claimStats.map((c) => c.value));
  return (
    <div className="opd-panel">
      <div className="opd-panel__head">
        <h3 className="opd-panel__title">Claims overview</h3>
        <span className="opd-claims__count">{total} total</span>
      </div>
      <ul className="opd-claims__list">
        {claimStats.map((c) => (
          <li className="opd-claims__row" key={c.label}>
            <div className="opd-claims__top">
              <span className="opd-claims__label">{c.label}</span>
              <span className="opd-claims__value">{c.display}</span>
            </div>
            <div className="opd-claims__track">
              <div
                className="opd-claims__fill"
                style={{
                  width: `${max ? (c.value / max) * 100 : 0}%`,
                  background: c.color,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <button className="opd-claims__drafts" onClick={onOpenDrafts}>
        <span className="opd-claims__drafts-label">
          <AssignmentIcon size={16} />
          Drafts
          <span className="opd-claims__drafts-count">{draftsCount}</span>
        </span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

/* ------------------------------- Policy card ------------------------------ */
function PolicyCard() {
  return (
    <div className="opd-polcard">
      <div className="opd-polcard__head">
        <ShieldCheckIcon size={18} className="opd-polcard__icon" />
        <span className="opd-polcard__title">Insurance policy</span>
      </div>
      <p className="opd-polcard__name">
        InsureShield Connect
        <span className="opd-polcard__status">
          <span className="opd-polcard__dot" />
          Active
        </span>
      </p>
      <p className="opd-polcard__num">Policy #1234-567890</p>
      <div className="opd-polcard__facts">
        <div className="opd-polcard__fact">
          <span className="opd-polcard__fact-label">Coverage limit</span>
          <span className="opd-polcard__fact-value">$50,000</span>
        </div>
        <div className="opd-polcard__fact">
          <span className="opd-polcard__fact-label">Renews</span>
          <span className="opd-polcard__fact-value">Jan 1, 2027</span>
        </div>
      </div>
      <div className="opd-polcard__actions">
        <button className="opd-polcard__cta opd-polcard__cta--primary">
          <ClaimsIcon size={16} />
          File a claim
        </button>
        <button className="opd-polcard__cta">
          Manage policy
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
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
export default function Dashboard({ onOpenDrafts }: { onOpenDrafts?: () => void }) {
  return (
    <main className="opd">
      <div className="opd__inner">
        <header className="opd-head">
          <div>
            <h1 className="opd-head__title">Welcome, Alex</h1>
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

        <SummaryCards />

        <div className="opd-layout">
          <div className="opd-col">
            <ShipmentVolumeChart />
            <ClaimsOverview onOpenDrafts={onOpenDrafts} />
            <BreakdownCharts />
          </div>
          <aside className="opd-rail">
            <PolicyCard />
            <RecentActivity />
          </aside>
        </div>

        <ExploreSolutions />
      </div>
    </main>
  );
}
