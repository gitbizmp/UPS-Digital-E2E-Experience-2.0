import {
  ChevronRight,
  TrendingUpIcon,
  TrendingDownIcon,
} from "./icons";
import { useState } from "react";
import trackingPageImg from "../assets/tracking/tracking-page.png";
import iphoneFrameImg from "../assets/tracking/iphone-frame.png";
import "./TrackingPages.css";

const EyeOpenGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const EyeClosedGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M2 12s3.5-7 10-7c2 0 3.8.6 5.3 1.5M22 12s-3.5 7-10 7c-2 0-3.8-.6-5.3-1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ---------------------------------- Stat cards --------------------------------- */
type Stat = {
  label: string;
  value: string;
  delta: string;
  caption: string;
  up: boolean;
};

const stats: Stat[] = [
  {
    label: "Attributed Revenue",
    value: "$55,490",
    delta: "31.6%",
    caption: "from tracking page recs",
    up: true,
  },
  {
    label: "Repurchase Rate",
    value: "22.1%",
    delta: "3.2pp",
    caption: "customers who buy again",
    up: true,
  },
  {
    label: "Bounce Rate",
    value: "24.8%",
    delta: "3.2%",
    caption: "Customers who view > 1 section",
    up: false,
  },
];

/* ------------------------------- Line chart data ------------------------------- */
const chartDays = ["Jun 4", "Jun 6", "Jun 8", "Jun 10", "Jun 12", "Jun 14", "Jun 16"];
const yTicks = [3400, 2550, 1700, 850, 0];
const chartMax = 3400;

const series = [
  {
    name: "Visits",
    color: "var(--ups-blue)",
    values: [1500, 1650, 2100, 2050, 2450, 2600, 3050],
  },
  {
    name: "Self-Service Opens",
    color: "#7b4dff",
    values: [900, 980, 1300, 1250, 1500, 1620, 1900],
  },
  {
    name: "Rec. Clicks",
    color: "var(--success-teal)",
    values: [500, 560, 760, 720, 900, 980, 1150],
  },
];

const PAD = 0.03;

function buildPath(values: number[]) {
  const n = values.length;
  return values
    .map((v, i) => {
      const x = (PAD + (i / (n - 1)) * (1 - 2 * PAD)) * 1000;
      const y = (1 - v / chartMax) * 300;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function areaPath(values: number[]) {
  return `${buildPath(values)} L970,300 L30,300 Z`;
}

function VisitsChart() {
  return (
    <div className="tp-panel">
      <div className="tp-panel__head">
        <h2 className="tp-panel__title">Tracking Page Visits</h2>
        <p className="tp-panel__subtitle">
          Daily visits, self-service opens, and recommendation clicks
        </p>
      </div>

      <div className="tp-linechart">
        <div className="tp-linechart__yaxis">
          {yTicks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="tp-linechart__plot">
          {yTicks.map((_, i) => (
            <span className="tp-linechart__grid" key={i} />
          ))}
          <svg
            className="tp-linechart__svg"
            viewBox="0 0 1000 300"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="tp-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--ups-blue)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--ups-blue)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath(series[0].values)} fill="url(#tp-fill)" />
            {series.map((s) => (
              <path
                key={s.name}
                d={buildPath(s.values)}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="tp-linechart__xaxis">
        {chartDays.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="tp-legend">
        {series.map((s) => (
          <span className="tp-legend__item" key={s.name}>
            <span className="tp-legend__dot" style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Traffic sources -------------------------------- */
const sources = [
  { name: "Email Notification", value: 52, color: "var(--ups-blue)" },
  { name: "SMS Link", value: 24, color: "#7b4dff" },
  { name: "Order Confirmation", value: 14, color: "var(--success-teal)" },
  { name: "Direct / Other", value: 10, color: "#8a97ad" },
];

function TrafficSources() {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="tp-panel">
      <div className="tp-panel__head">
        <h2 className="tp-panel__title">Traffic Sources</h2>
        <p className="tp-panel__subtitle">How customers land on the tracking page</p>
      </div>

      <div className="tp-traffic">
        <svg className="tp-donut" viewBox="0 0 160 160" aria-hidden>
          <g transform="rotate(-90 80 80)">
            {sources.map((s) => {
              const len = (s.value / 100) * circumference;
              const dash = `${len} ${circumference - len}`;
              const circle = (
                <circle
                  key={s.name}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={20}
                  strokeDasharray={dash}
                  strokeDashoffset={-offset}
                />
              );
              offset += len;
              return circle;
            })}
          </g>
        </svg>

        <ul className="tp-traffic__legend">
          {sources.map((s) => (
            <li className="tp-traffic__row" key={s.name}>
              <span className="tp-traffic__dot" style={{ background: s.color }} />
              <span className="tp-traffic__name">{s.name}</span>
              <span className="tp-traffic__pct">{s.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* --------------------------- Recommended products ----------------------------- */
type Trend = "rising" | "stable" | "declining";

const products: {
  name: string;
  category: string;
  impressions: string;
  clicks: string;
  ctr: string;
  conversions: string;
  cvr: string;
  revenue: string;
  trend: Trend;
}[] = [
  { name: "ANC Pro Earbuds", category: "Electronics", impressions: "8,420", clicks: "1,263", ctr: "15.0%", conversions: "189", cvr: "15.0%", revenue: "$28,350", trend: "rising" },
  { name: "Phone Mount Pro", category: "Accessories", impressions: "7,180", clicks: "862", ctr: "12.0%", conversions: "138", cvr: "16.0%", revenue: "$6,900", trend: "rising" },
  { name: "Charging Cable 3-Pack", category: "Accessories", impressions: "9,640", clicks: "1,061", ctr: "11.0%", conversions: "212", cvr: "20.0%", revenue: "$4,240", trend: "rising" },
  { name: "Smart Watch Band", category: "Wearables", impressions: "6,250", clicks: "625", ctr: "10.0%", conversions: "94", cvr: "15.0%", revenue: "$4,700", trend: "stable" },
  { name: 'Laptop Sleeve 15"', category: "Accessories", impressions: "5,820", clicks: "524", ctr: "9.0%", conversions: "73", cvr: "13.9%", revenue: "$3,650", trend: "declining" },
  { name: "USB-C Dock", category: "Electronics", impressions: "4,930", clicks: "395", ctr: "8.0%", conversions: "51", cvr: "12.9%", revenue: "$7,650", trend: "rising" },
];

function TrendBadge({ trend }: { trend: Trend }) {
  if (trend === "rising")
    return (
      <span className="tp-trend tp-trend--up">
        <TrendingUpIcon size={14} />
        Rising
      </span>
    );
  if (trend === "declining")
    return (
      <span className="tp-trend tp-trend--down">
        <TrendingDownIcon size={14} />
        Declining
      </span>
    );
  return (
    <span className="tp-trend tp-trend--flat">
      <span className="tp-trend__dash" />
      Stable
    </span>
  );
}

function ProductPerformance() {
  return (
    <div className="tp-panel tp-panel--section">
      <div className="tp-panel__head">
        <h2 className="tp-panel__title">Recommended Product Performance</h2>
        <p className="tp-panel__subtitle">Products shown in the tracking page recommendations</p>
      </div>
      <div className="tp-table__scroll">
        <table className="tp-table">
          <thead>
            <tr>
              <th className="tp-table__left">Product</th>
              <th className="tp-table__left">Category</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>CTR</th>
              <th>Conversions</th>
              <th>CVR</th>
              <th>Revenue</th>
              <th className="tp-table__left">Trend</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.name}>
                <td className="tp-table__left tp-table__name">{p.name}</td>
                <td className="tp-table__left">
                  <span className="tp-chip">{p.category}</span>
                </td>
                <td>{p.impressions}</td>
                <td>{p.clicks}</td>
                <td>{p.ctr}</td>
                <td>{p.conversions}</td>
                <td>{p.cvr}</td>
                <td className="tp-table__revenue">{p.revenue}</td>
                <td className="tp-table__left">
                  <TrendBadge trend={p.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------ Device breakdown ------------------------------- */
const MobileGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
    <line x1="11" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const DesktopGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const TabletGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
    <line x1="10" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const devices = [
  { name: "Mobile", pct: 68, glyph: <MobileGlyph /> },
  { name: "Desktop", pct: 26, glyph: <DesktopGlyph /> },
  { name: "Tablet", pct: 6, glyph: <TabletGlyph /> },
];

function DeviceBreakdown() {
  return (
    <div className="tp-devices">
      {devices.map((d) => (
        <div className="tp-device" key={d.name}>
          <div className="tp-device__head">
            <span className="tp-device__icon">{d.glyph}</span>
            <span className="tp-device__name">{d.name}</span>
          </div>
          <p className="tp-device__value">{d.pct}%</p>
          <div className="tp-device__bar">
            <span style={{ width: `${d.pct}%` }} />
          </div>
          <p className="tp-device__caption">of all visits</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------- Phone preview --------------------------------- */
function PhonePreview() {
  return (
    <aside className="tp-preview">
      <p className="tp-preview__caption">Your tracking page preview</p>
      <div className="tp-phone">
        <div className="tp-phone__scroll">
          <img className="tp-phone__page" src={trackingPageImg} alt="Tracking page preview" />
        </div>
        <img className="tp-phone__frame" src={iphoneFrameImg} alt="" aria-hidden="true" />
      </div>
    </aside>
  );
}

/* ------------------------------- Tracking Pages -------------------------------- */
export default function TrackingPages() {
  const [previewVisible, setPreviewVisible] = useState(true);

  return (
    <main className="tp">
      <div className="tp-layout">
        <div className="tp-main">
          <nav className="tp-breadcrumb">
            <a href="#home" onClick={(e) => e.preventDefault()}>
              Home
            </a>
            <ChevronRight size={14} />
            <span>Tracking Pages</span>
          </nav>

          <div className="tp-titlerow">
            <h1 className="tp-title">Tracking Pages</h1>
            <button
              type="button"
              className="tp-eye"
              onClick={() => setPreviewVisible((v) => !v)}
              aria-pressed={previewVisible}
              aria-label={previewVisible ? "Hide tracking page preview" : "Show tracking page preview"}
              title={previewVisible ? "Hide preview" : "Show preview"}
            >
              {previewVisible ? <EyeOpenGlyph /> : <EyeClosedGlyph />}
            </button>
          </div>

          <div className="tp-stats">
            {stats.map((s) => (
              <div className="tp-stat" key={s.label}>
                <p className="tp-stat__label">{s.label}</p>
                <p className="tp-stat__value">{s.value}</p>
                <div className="tp-stat__foot">
                  <span className={`tp-stat__delta ${s.up ? "is-up" : "is-down"}`}>
                    {s.up ? <TrendingUpIcon size={16} /> : <TrendingDownIcon size={16} />}
                    {s.up ? "+" : "-"}
                    {s.delta}
                  </span>
                  <span className="tp-stat__caption">{s.caption}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="tp-charts">
            <VisitsChart />
            <TrafficSources />
          </div>

          <ProductPerformance />

          <DeviceBreakdown />
        </div>

        {previewVisible && <PhonePreview />}
      </div>
    </main>
  );
}
