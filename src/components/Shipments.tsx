import { useState, useRef, useEffect, useCallback } from "react";
import {
  MoreVertIcon,
  UnfoldMoreIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ChevronRight,
  ChevronLeft,
  AssignmentIcon,
  ConversionPathIcon,
  WarningTriangleIcon,
  ShieldIcon,
  LabelIcon,
  ChatIcon,
} from "./icons";
import isCoverageOn from "../assets/insureshield/is coverage on.png";
import { FileAClaimDrawer } from "./Orders";
import "./Claims.css";
import "./Orders.css";

/* ---------------------------------- Data types --------------------------------- */
type ShipStatus = "delivered" | "transit" | "exception" | "pending";

type TrackingEvent = { label: string; time: string; alert?: boolean };

type Shipment = {
  tracking: string;
  shipDate: string;
  destination: string;
  value: string;
  carrier: string;
  status: ShipStatus;
  protection: {
    insured: string;
    policyNo: string;
    premium: string;
    deductible: string;
    coverage: string;
  };
  history: TrackingEvent[];
};

const statusLabels: Record<ShipStatus, string> = {
  delivered: "Delivered",
  transit: "In-Transit",
  exception: "Exception",
  pending: "Pending",
};

const statusBadge: Record<ShipStatus, string> = {
  delivered: "approved",
  transit: "submitted",
  exception: "denied",
  pending: "review",
};

const defaultHistory: TrackingEvent[] = [
  { label: "Delivery Lost", time: "Dec 21, 11:07 AM EST", alert: true },
  { label: "Ready for Pickup", time: "Dec 21, 10:58 AM EST" },
  { label: "Provider Assigned", time: "Dec 21, 10:32 AM EST" },
  { label: "Assigning Provider", time: "Dec 21, 10:24 AM EST" },
  { label: "Preparing Order", time: "Dec 21, 10:11 AM EST" },
  { label: "Order Confirmed", time: "Dec 21, 10:01 AM EST" },
];

const shipments: Shipment[] = [
  {
    tracking: "1Z999AA10123456784",
    shipDate: "Feb 22, 2026",
    destination: "Portland, OR 97205",
    value: "$155.00",
    carrier: "UPS Ground",
    status: "exception",
    protection: {
      insured: "$155.00",
      policyNo: "IS-4429013",
      premium: "$2.15",
      deductible: "$0.00",
      coverage: "InsureShield® Connect",
    },
    history: defaultHistory,
  },
  {
    tracking: "1Z999AA10123456785",
    shipDate: "Feb 21, 2026",
    destination: "Seattle, WA 98101",
    value: "$420.00",
    carrier: "UPS 2nd Day Air",
    status: "transit",
    protection: {
      insured: "$420.00",
      policyNo: "IS-4429014",
      premium: "$5.80",
      deductible: "$0.00",
      coverage: "InsureShield® Connect",
    },
    history: [
      { label: "Out for Delivery", time: "Feb 23, 8:14 AM PST" },
      { label: "Arrived at Facility", time: "Feb 22, 9:41 PM PST" },
      { label: "Departed Origin", time: "Feb 21, 6:02 PM EST" },
      { label: "Label Created", time: "Feb 21, 10:20 AM EST" },
      { label: "Order Confirmed", time: "Feb 21, 9:55 AM EST" },
    ],
  },
  {
    tracking: "1Z999AA10123456786",
    shipDate: "Feb 20, 2026",
    destination: "Austin, TX 78701",
    value: "$78.00",
    carrier: "UPS Ground",
    status: "delivered",
    protection: {
      insured: "$78.00",
      policyNo: "IS-4429015",
      premium: "$1.10",
      deductible: "$0.00",
      coverage: "InsureShield® Connect",
    },
    history: [
      { label: "Delivered", time: "Feb 24, 2:33 PM CST" },
      { label: "Out for Delivery", time: "Feb 24, 7:50 AM CST" },
      { label: "Arrived at Facility", time: "Feb 23, 11:12 PM CST" },
      { label: "Departed Origin", time: "Feb 20, 5:44 PM EST" },
      { label: "Order Confirmed", time: "Feb 20, 9:31 AM EST" },
    ],
  },
  {
    tracking: "1Z999AA10123456787",
    shipDate: "Feb 19, 2026",
    destination: "Denver, CO 80202",
    value: "$1,240.00",
    carrier: "UPS Next Day Air",
    status: "pending",
    protection: {
      insured: "$1,240.00",
      policyNo: "IS-4429016",
      premium: "$17.05",
      deductible: "$25.00",
      coverage: "InsureShield® Connect",
    },
    history: [
      { label: "Awaiting Pickup", time: "Feb 19, 4:20 PM EST" },
      { label: "Label Created", time: "Feb 19, 3:58 PM EST" },
      { label: "Order Confirmed", time: "Feb 19, 3:40 PM EST" },
    ],
  },
  {
    tracking: "1Z999AA10123456788",
    shipDate: "Feb 18, 2026",
    destination: "Miami, FL 33101",
    value: "$312.50",
    carrier: "UPS Ground",
    status: "delivered",
    protection: {
      insured: "$312.50",
      policyNo: "IS-4429017",
      premium: "$4.30",
      deductible: "$0.00",
      coverage: "InsureShield® Connect",
    },
    history: [
      { label: "Delivered", time: "Feb 22, 1:05 PM EST" },
      { label: "Out for Delivery", time: "Feb 22, 6:48 AM EST" },
      { label: "Departed Origin", time: "Feb 18, 7:15 PM EST" },
      { label: "Order Confirmed", time: "Feb 18, 10:02 AM EST" },
    ],
  },
  {
    tracking: "1Z999AA10123456789",
    shipDate: "Feb 17, 2026",
    destination: "Boston, MA 02108",
    value: "$96.00",
    carrier: "UPS Ground",
    status: "transit",
    protection: {
      insured: "$96.00",
      policyNo: "IS-4429018",
      premium: "$1.35",
      deductible: "$0.00",
      coverage: "InsureShield® Connect",
    },
    history: [
      { label: "In Transit", time: "Feb 19, 3:22 AM EST" },
      { label: "Departed Origin", time: "Feb 17, 8:30 PM EST" },
      { label: "Order Confirmed", time: "Feb 17, 11:11 AM EST" },
    ],
  },
  {
    tracking: "1Z999AA10123456790",
    shipDate: "Feb 16, 2026",
    destination: "Chicago, IL 60601",
    value: "$540.00",
    carrier: "UPS 2nd Day Air",
    status: "exception",
    protection: {
      insured: "$540.00",
      policyNo: "IS-4429019",
      premium: "$7.45",
      deductible: "$0.00",
      coverage: "InsureShield® Connect",
    },
    history: [
      { label: "Damaged in Transit", time: "Feb 18, 2:14 PM CST", alert: true },
      { label: "Arrived at Facility", time: "Feb 17, 9:03 PM CST" },
      { label: "Departed Origin", time: "Feb 16, 6:20 PM EST" },
      { label: "Order Confirmed", time: "Feb 16, 9:47 AM EST" },
    ],
  },
  {
    tracking: "1Z999AA10123456791",
    shipDate: "Feb 15, 2026",
    destination: "Phoenix, AZ 85004",
    value: "$205.75",
    carrier: "UPS Ground",
    status: "delivered",
    protection: {
      insured: "$205.75",
      policyNo: "IS-4429020",
      premium: "$2.85",
      deductible: "$0.00",
      coverage: "InsureShield® Connect",
    },
    history: [
      { label: "Delivered", time: "Feb 19, 12:44 PM MST" },
      { label: "Out for Delivery", time: "Feb 19, 7:22 AM MST" },
      { label: "Departed Origin", time: "Feb 15, 6:10 PM EST" },
      { label: "Order Confirmed", time: "Feb 15, 8:58 AM EST" },
    ],
  },
  {
    tracking: "1Z999AA10123456792",
    shipDate: "Feb 14, 2026",
    destination: "Nashville, TN 37201",
    value: "$88.40",
    carrier: "UPS 2nd Day Air",
    status: "transit",
    protection: {
      insured: "$88.40",
      policyNo: "IS-4429021",
      premium: "$1.25",
      deductible: "$0.00",
      coverage: "InsureShield® Connect",
    },
    history: [
      { label: "In Transit", time: "Feb 16, 5:03 AM CST" },
      { label: "Departed Origin", time: "Feb 14, 7:48 PM EST" },
      { label: "Order Confirmed", time: "Feb 14, 10:19 AM EST" },
    ],
  },
  {
    tracking: "1Z999AA10123456793",
    shipDate: "Feb 13, 2026",
    destination: "Atlanta, GA 30303",
    value: "$675.00",
    carrier: "UPS Next Day Air",
    status: "delivered",
    protection: {
      insured: "$675.00",
      policyNo: "IS-4429022",
      premium: "$9.30",
      deductible: "$0.00",
      coverage: "InsureShield® Connect",
    },
    history: [
      { label: "Delivered", time: "Feb 14, 10:26 AM EST" },
      { label: "Out for Delivery", time: "Feb 14, 6:35 AM EST" },
      { label: "Departed Origin", time: "Feb 13, 8:05 PM EST" },
      { label: "Order Confirmed", time: "Feb 13, 11:40 AM EST" },
    ],
  },
  {
    tracking: "1Z999AA10123456794",
    shipDate: "Feb 12, 2026",
    destination: "San Diego, CA 92101",
    value: "$1,050.00",
    carrier: "UPS Ground",
    status: "exception",
    protection: {
      insured: "$1,050.00",
      policyNo: "IS-4429023",
      premium: "$14.40",
      deductible: "$25.00",
      coverage: "InsureShield® Connect",
    },
    history: [
      { label: "Delivery Exception", time: "Feb 16, 3:31 PM PST", alert: true },
      { label: "Arrived at Facility", time: "Feb 15, 10:12 PM PST" },
      { label: "Departed Origin", time: "Feb 12, 6:50 PM EST" },
      { label: "Order Confirmed", time: "Feb 12, 9:14 AM EST" },
    ],
  },
  {
    tracking: "1Z999AA10123456795",
    shipDate: "Feb 11, 2026",
    destination: "Minneapolis, MN 55401",
    value: "$134.20",
    carrier: "UPS Ground",
    status: "pending",
    protection: {
      insured: "$134.20",
      policyNo: "IS-4429024",
      premium: "$1.85",
      deductible: "$0.00",
      coverage: "InsureShield® Connect",
    },
    history: [
      { label: "Awaiting Pickup", time: "Feb 11, 4:02 PM EST" },
      { label: "Label Created", time: "Feb 11, 3:41 PM EST" },
      { label: "Order Confirmed", time: "Feb 11, 3:20 PM EST" },
    ],
  },
];

/* --------------------------------- Stat cards ---------------------------------- */
type Stat = { label: string; value: string; delta: string; up: boolean };

const stats: Stat[] = [
  { label: "Total Shipments", value: "342", delta: "12.5%", up: true },
  { label: "In-Transit", value: "127", delta: "12.5%", up: false },
  { label: "Exceptions", value: "91", delta: "4.2%", up: false },
  { label: "Coverage Gap", value: "$2.4M", delta: "15.7%", up: true },
];

function StatCards() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCards = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 220), behavior: "smooth" });
  };

  return (
    <div className="claims-stats-wrap">
      <div className="claims-stats" ref={scrollerRef}>
        {stats.map((s) => (
          <div className="claims-stat" key={s.label}>
            <p className="claims-stat__label">{s.label}</p>
            <div className="claims-stat__row">
              <span className="claims-stat__value">{s.value}</span>
              <span className={`claims-stat__delta ${s.up ? "is-up" : "is-down"}`}>
                {s.up ? <TrendingUpIcon size={16} /> : <TrendingDownIcon size={16} />}
                {s.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {canLeft && (
        <button
          className="claims-stats__nav claims-stats__nav--left"
          onClick={() => scrollByCards(-1)}
          aria-label="Show previous stats"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {canRight && (
        <button
          className="claims-stats__nav claims-stats__nav--right"
          onClick={() => scrollByCards(1)}
          aria-label="Show more stats"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

/* ---------------------------------- Table -------------------------------------- */
const columns = ["Tracking No.", "Ship Date", "Destination", "Status"];

function ShipmentsTable({
  selected,
  onSelect,
  onFileClaim,
}: {
  selected: number;
  onSelect: (i: number) => void;
  onFileClaim: (shipment: Shipment) => void;
}) {
  const [menuRow, setMenuRow] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; right: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRow === null) return;
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuRow(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuRow(null);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuRow]);

  return (
    <div className="claims-table" role="table">
      <div className="claims-row claims-row--head" role="row">
        <span className="claims-cell claims-cell--dot" />
        <span className="claims-cell claims-cell--shield" />
        {columns.map((c) => (
          <span className="claims-cell claims-cell--head" role="columnheader" key={c}>
            {c}
            <UnfoldMoreIcon size={14} className="claims-sort" />
          </span>
        ))}
        <span className="claims-cell claims-cell--more" />
      </div>

      {shipments.map((s, i) => (
        <div
          className={`claims-row claims-row--data${i === selected ? " is-selected" : ""}`}
          role="row"
          key={s.tracking}
          onClick={() => onSelect(i)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(i);
            }
          }}
        >
          <span className="claims-cell claims-cell--dot" />
          <span className="claims-cell claims-cell--shield">
            <img src={isCoverageOn} alt="Covered" className="coverage-badge" />
          </span>
          <span className="claims-cell claims-cell--strong">{s.tracking}</span>
          <span className="claims-cell">{s.shipDate}</span>
          <span className="claims-cell">{s.destination}</span>
          <span className="claims-cell claims-cell--status">
            <span className={`status-badge status-badge--${statusBadge[s.status]}`}>
              {statusLabels[s.status]}
            </span>
          </span>
          <span className="claims-cell claims-cell--more">
            <div
              className="orders-menu-anchor"
              ref={menuRow === i ? menuRef : undefined}
            >
              <button
                className="icon-btn"
                aria-label="More actions"
                aria-haspopup="menu"
                aria-expanded={menuRow === i}
                onClick={(e) => {
                  e.stopPropagation();
                  if (menuRow === i) {
                    setMenuRow(null);
                    return;
                  }
                  const rect = e.currentTarget.getBoundingClientRect();
                  setMenuPos({
                    top: rect.bottom + 4,
                    right: window.innerWidth - rect.right,
                  });
                  setMenuRow(i);
                }}
              >
                <MoreVertIcon size={20} />
              </button>

              {menuRow === i && menuPos && (
                <div
                  className="orders-menu"
                  role="menu"
                  style={{ top: menuPos.top, right: menuPos.right }}
                >
                  <button
                    className="orders-menu__item"
                    role="menuitem"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuRow(null);
                    }}
                  >
                    <LabelIcon size={20} />
                    Create Label
                  </button>
                  <button
                    className="orders-menu__item"
                    role="menuitem"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuRow(null);
                      onFileClaim(s);
                    }}
                  >
                    <ShieldIcon size={20} />
                    File A Claim
                  </button>
                  <button
                    className="orders-menu__item"
                    role="menuitem"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuRow(null);
                    }}
                  >
                    <ChatIcon size={20} />
                    Contact Customer
                  </button>
                </div>
              )}
            </div>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Detail panel ----------------------------------- */
function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-kv">
      <span className="detail-kv__key">{label}</span>
      <span className="detail-kv__val">{value}</span>
    </div>
  );
}

function ShipmentDetail({ shipment }: { shipment: Shipment }) {
  return (
    <aside className="claim-detail">
      <div className="claim-detail__body">
        <section className="detail-section">
          <div className="detail-section__head">
            <AssignmentIcon size={16} />
            <span>Shipment Summary</span>
          </div>
          <div className="detail-kvs">
            <KeyValue label="Date" value={shipment.shipDate} />
            <KeyValue label="Value" value={shipment.value} />
            <KeyValue label="Carrier" value={shipment.carrier} />
            <KeyValue label="Tracking No." value={shipment.tracking} />
            <KeyValue label="Destination" value={shipment.destination} />
          </div>
        </section>

        <section className="detail-section">
          <div className="detail-section__head">
            <ConversionPathIcon size={16} />
            <span>Tracking History</span>
          </div>
          <ol className="track-history">
            {shipment.history.map((e, i) => (
              <li className="track-step" key={`${e.label}-${i}`}>
                <div className="track-step__rail">
                  {e.alert ? (
                    <WarningTriangleIcon size={16} className="track-step__lost" />
                  ) : (
                    <span className="track-step__dot" aria-hidden />
                  )}
                  {i < shipment.history.length - 1 && (
                    <span className="track-step__line" aria-hidden />
                  )}
                </div>
                <div className="track-step__body">
                  <p className="track-step__label">{e.label}</p>
                  <p className="track-step__time">{e.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </aside>
  );
}

/* -------------------------------- Shipments page ------------------------------- */
export default function Shipments() {
  const [selected, setSelected] = useState(0);
  const [claimShipment, setClaimShipment] = useState<Shipment | null>(null);

  return (
    <main className="claims">
      <div className="claims-layout">
        <div className="claims-main">
          <div className="claims-header">
            <nav className="claims-breadcrumb">
              <a href="#dashboard" onClick={(e) => e.preventDefault()}>
                Dashboard
              </a>
              <ChevronRight size={14} />
              <a href="#insurance" onClick={(e) => e.preventDefault()}>
                Insurance
              </a>
              <ChevronRight size={14} />
              <span>Shipments</span>
            </nav>

            <div className="claims-head">
              <h1 className="claims-title">Shipments</h1>
            </div>

            <StatCards />

            <div className="claims-toolbar">
              <label className="claims-search">
                <SearchIcon size={16} />
                <input type="text" placeholder="Search" />
              </label>
              <div className="claims-toolbar__actions">
                <button className="tool-btn">
                  <FilterIcon size={16} />
                  Filter
                </button>
                <button className="tool-btn">
                  <DownloadIcon size={16} />
                  Export
                </button>
              </div>
            </div>
          </div>

          <ShipmentsTable
            selected={selected}
            onSelect={setSelected}
            onFileClaim={setClaimShipment}
          />
        </div>

        {!claimShipment && <ShipmentDetail shipment={shipments[selected]} />}
      </div>

      {claimShipment && (
        <FileAClaimDrawer
          claimRef={claimShipment.tracking}
          onClose={() => setClaimShipment(null)}
        />
      )}
    </main>
  );
}
