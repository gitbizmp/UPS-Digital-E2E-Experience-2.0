import { useState, useRef, useEffect, useCallback } from "react";
import {
  ShieldIcon,
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
  AccountBoxIcon,
  LabelIcon,
  ChatIcon,
  PackageIcon,
  BrokenPackageIcon,
  CloseIcon,
  ArrowRightAltIcon,
  AccountCircleIcon,
  AccountBalanceIcon,
  CheckbookIcon,
  DeleteIcon,
  InfoIcon,
  UploadIcon,
  PaymentArrowDownIcon,
  PhotoIcon,
  ChevronDown,
  CheckIcon,
  PlusIcon,
  HelpIcon,
} from "./icons";
import isCoverageOn from "../assets/insureshield/is coverage on.png";
import isCoverageOff from "../assets/insureshield/is coverage off.png";
import "./Claims.css";
import "./Orders.css";

/* ---------------------------------- Data types --------------------------------- */
type OrderStatus = "complete" | "rejected";

type OrderItem = {
  name: string;
  sku: string;
  qty: number;
  price: string;
};

type Order = {
  date: string;
  orderId: string;
  value: string;
  customer: string;
  score: number;
  status: OrderStatus;
  detail: {
    orderRef: string;
    placedDate: string;
    value: string;
    customerName: string;
    customerEmail: string;
    tracking: string;
    carrier: string;
    riskLevel: "Low" | "Medium" | "High";
    riskScore: number;
    riskNote: string;
    items: OrderItem[];
  };
};

const statusLabels: Record<OrderStatus, string> = {
  complete: "Complete",
  rejected: "Rejected",
};

type OrderSeed = {
  date: string;
  orderId: string;
  value: string;
  customer: string;
  customerName: string;
  score: number;
  status: OrderStatus;
  placedDate: string;
  tracking: string;
  carrier: string;
  items: OrderItem[];
};

function makeDetail(o: OrderSeed): Order["detail"] {
  return {
    orderRef: `#0${o.orderId}`,
    placedDate: o.placedDate,
    value: o.value,
    customerName: o.customerName,
    customerEmail: o.customer,
    tracking: o.tracking,
    carrier: o.carrier,
    riskLevel: o.status === "rejected" ? "High" : o.score < 600 ? "Medium" : "Low",
    riskScore: o.score,
    riskNote:
      o.status === "rejected"
        ? "Address verification failed and the billing country does not match the shipping country."
        : o.score < 600
          ? "Elevated velocity from this device in the last 24 hours. Manual review recommended."
          : "No fraud signals detected. Address and payment verified.",
    items: o.items,
  };
}

const thumbPalette = [
  "linear-gradient(135deg, #6a8dff, #4b64d6)",
  "linear-gradient(135deg, #33c1a4, #1f9c86)",
  "linear-gradient(135deg, #ff9a62, #f06f3c)",
  "linear-gradient(135deg, #b98bff, #8a5cf0)",
  "linear-gradient(135deg, #ff7fa8, #e8558a)",
  "linear-gradient(135deg, #59c0f5, #2f92d6)",
];

function thumbColor(sku: string): string {
  let hash = 0;
  for (let i = 0; i < sku.length; i++) {
    hash = (hash * 31 + sku.charCodeAt(i)) >>> 0;
  }
  return thumbPalette[hash % thumbPalette.length];
}

const rawOrders: OrderSeed[] = [
  {
    date: "07/21/26", orderId: "504218", value: "$142.49", customer: "michael.r@email.com",
    customerName: "Michael Rossi", score: 812, status: "complete", placedDate: "Jul 21, 2026",
    tracking: "1Z999AA10123456784", carrier: "UPS Ground",
    items: [
      { name: "Wireless Noise-Cancelling Headphones", sku: "SKU-88213", qty: 1, price: "$89.99" },
      { name: "USB-C Charging Cable (2m)", sku: "SKU-40122", qty: 2, price: "$12.50" },
      { name: "Portable Power Bank 20000mAh", sku: "SKU-70931", qty: 1, price: "$38.99" },
    ],
  },
  {
    date: "07/20/26", orderId: "504197", value: "$318.75", customer: "sara.k@email.com",
    customerName: "Sara Kim", score: 774, status: "complete", placedDate: "Jul 20, 2026",
    tracking: "1Z999AA10198765432", carrier: "UPS 2nd Day Air",
    items: [
      { name: "Mechanical Keyboard (RGB)", sku: "SKU-55190", qty: 1, price: "$129.00" },
      { name: "LED Desk Lamp", sku: "SKU-48226", qty: 2, price: "$52.00" },
    ],
  },
  {
    date: "07/19/26", orderId: "504165", value: "$74.95", customer: "d.chen@email.com",
    customerName: "David Chen", score: 689, status: "complete", placedDate: "Jul 19, 2026",
    tracking: "1Z999AA10155512347", carrier: "UPS Ground",
    items: [
      { name: "Stainless Steel Water Bottle", sku: "SKU-21044", qty: 1, price: "$24.95" },
      { name: "Yoga Mat (6mm)", sku: "SKU-63801", qty: 1, price: "$39.99" },
    ],
  },
  {
    date: "07/18/26", orderId: "504112", value: "$489.00", customer: "emily.watson@email.com",
    customerName: "Emily Watson", score: 542, status: "rejected", placedDate: "Jul 18, 2026",
    tracking: "1Z999AA10166678901", carrier: "UPS Next Day Air",
    items: [
      { name: "Running Shoes (Size 10)", sku: "SKU-58604", qty: 2, price: "$95.00" },
      { name: "Bluetooth Fitness Tracker", sku: "SKU-90455", qty: 1, price: "$59.99" },
    ],
  },
  {
    date: "07/17/26", orderId: "504088", value: "$56.50", customer: "james.patel@email.com",
    customerName: "James Patel", score: 831, status: "complete", placedDate: "Jul 17, 2026",
    tracking: "1Z999AA10133345678", carrier: "UPS Ground",
    items: [
      { name: "Ceramic Coffee Mug Set", sku: "SKU-11298", qty: 1, price: "$34.50" },
      { name: "Organic Cotton T-Shirt (M)", sku: "SKU-77320", qty: 1, price: "$28.00" },
    ],
  },
  {
    date: "07/16/26", orderId: "504041", value: "$203.98", customer: "olivia.n@email.com",
    customerName: "Olivia Nguyen", score: 705, status: "complete", placedDate: "Jul 16, 2026",
    tracking: "1Z999AA10144456789", carrier: "UPS 2nd Day Air",
    items: [
      { name: "Leather Wallet (Bifold)", sku: "SKU-33712", qty: 2, price: "$45.00" },
      { name: "Portable Power Bank 20000mAh", sku: "SKU-70931", qty: 3, price: "$38.99" },
    ],
  },
  {
    date: "07/15/26", orderId: "503998", value: "$127.49", customer: "r.diaz@email.com",
    customerName: "Robert Diaz", score: 588, status: "rejected", placedDate: "Jul 15, 2026",
    tracking: "1Z999AA10177789012", carrier: "UPS Ground",
    items: [
      { name: "Bluetooth Fitness Tracker", sku: "SKU-90455", qty: 1, price: "$59.99" },
      { name: "USB-C Charging Cable (2m)", sku: "SKU-40122", qty: 1, price: "$12.50" },
    ],
  },
  {
    date: "07/14/26", orderId: "503954", value: "$342.00", customer: "ava.t@email.com",
    customerName: "Ava Thompson", score: 796, status: "complete", placedDate: "Jul 14, 2026",
    tracking: "1Z999AA10188890123", carrier: "UPS Next Day Air",
    items: [
      { name: "Mechanical Keyboard (RGB)", sku: "SKU-55190", qty: 2, price: "$129.00" },
      { name: "Ceramic Coffee Mug Set", sku: "SKU-11298", qty: 1, price: "$34.50" },
    ],
  },
  {
    date: "07/13/26", orderId: "503921", value: "$68.99", customer: "liam.murphy@email.com",
    customerName: "Liam Murphy", score: 742, status: "complete", placedDate: "Jul 13, 2026",
    tracking: "1Z999AA10199901234", carrier: "UPS Ground",
    items: [
      { name: "Portable Power Bank 20000mAh", sku: "SKU-70931", qty: 1, price: "$38.99" },
      { name: "Organic Cotton T-Shirt (M)", sku: "SKU-77320", qty: 1, price: "$28.00" },
    ],
  },
  {
    date: "07/12/26", orderId: "503877", value: "$156.45", customer: "sophia.lee@email.com",
    customerName: "Sophia Lee", score: 668, status: "complete", placedDate: "Jul 12, 2026",
    tracking: "1Z999AA10111112345", carrier: "UPS 2nd Day Air",
    items: [
      { name: "LED Desk Lamp", sku: "SKU-48226", qty: 1, price: "$52.00" },
      { name: "Stainless Steel Water Bottle", sku: "SKU-21044", qty: 2, price: "$24.95" },
      { name: "Yoga Mat (6mm)", sku: "SKU-63801", qty: 1, price: "$39.99" },
    ],
  },
];

const orders: Order[] = rawOrders.map((o) => ({ ...o, detail: makeDetail(o) }));

/* --------------------------------- Stat cards ---------------------------------- */
type Stat = { label: string; value: string; delta: string; up: boolean };

const stats: Stat[] = [
  { label: "Orders Pending", value: "127", delta: "12.5%", up: false },
  { label: "Ready to Ship", value: "91", delta: "4.2%", up: false },
  { label: "Product Sales", value: "$2.4K", delta: "4.2%", up: true },
  { label: "Volume of Products", value: "$2.4M", delta: "15.7%", up: true },
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
/* CommerceShield is an add-on product. The shipment coverage badge and the
   customer risk score are only surfaced when it is an active product. */

function OrdersTable({
  selected,
  onSelect,
  onFileClaim,
  commerceShieldActive,
}: {
  selected: number;
  onSelect: (i: number) => void;
  onFileClaim: (order: Order) => void;
  commerceShieldActive: boolean;
}) {
  const columns = commerceShieldActive
    ? ["Date", "Order ID", "Value", "Customer", "Score", "Status"]
    : ["Date", "Order ID", "Value", "Customer", "Status"];
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
    <div className={`claims-table${commerceShieldActive ? "" : " claims-table--no-risk"}`} role="table">
      <div className="claims-row claims-row--head" role="row">
        <span className="claims-cell claims-cell--dot" />
        {commerceShieldActive && <span className="claims-cell claims-cell--shield" />}
        {columns.map((c) => (
          <span className="claims-cell claims-cell--head" role="columnheader" key={c}>
            {c}
            <UnfoldMoreIcon size={14} className="claims-sort" />
          </span>
        ))}
        <span className="claims-cell claims-cell--more" />
      </div>

      {orders.map((order, i) => (
        <div
          className={`claims-row claims-row--data${i === selected ? " is-selected" : ""}`}
          role="row"
          key={i}
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
          {commerceShieldActive && (
            <span className="claims-cell claims-cell--shield">
              {order.status === "rejected" ? (
                <img src={isCoverageOff} alt="Not covered" className="coverage-badge" />
              ) : (
                <img src={isCoverageOn} alt="Covered" className="coverage-badge" />
              )}
            </span>
          )}
          <span className="claims-cell">{order.date}</span>
          <span className="claims-cell claims-cell--strong">{order.orderId}</span>
          <span className="claims-cell">{order.value}</span>
          <span className="claims-cell orders-cell--link">{order.customer}</span>
          {commerceShieldActive && <span className="claims-cell">{order.score}</span>}
          <span className="claims-cell claims-cell--status">
            <span className={`status-badge status-badge--${order.status}`}>
              {statusLabels[order.status]}
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
                      onFileClaim(order);
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

function OrderDetail({ order }: { order: Order }) {
  const d = order.detail;

  return (
    <aside className="claim-detail">
      <div className="claim-detail__body">
          <section className="detail-section">
            <div className="detail-section__head">
              <AssignmentIcon size={16} />
              <span>Order Details</span>
            </div>
            <div className="detail-kvs">
              <KeyValue label="Order No." value={d.orderRef} />
              <KeyValue label="Date" value={d.placedDate} />
              <KeyValue label="Value" value={d.value} />
              <KeyValue label="Customer Name" value={d.customerName} />
              <KeyValue label="Customer Email" value={d.customerEmail} />
            </div>
          </section>

          <section className="detail-section">
            <div className="detail-section__head">
              <AccountBoxIcon size={16} />
              <span>Items</span>
            </div>
            <div className="orders-items">
              {d.items.map((it) => (
                <div className="orders-item" key={it.sku}>
                  <span
                    className="orders-item__thumb"
                    style={{ background: thumbColor(it.sku) }}
                    aria-hidden="true"
                  >
                    {it.name.charAt(0)}
                  </span>
                  <div className="orders-item__body">
                    <span className="orders-item__name">{it.name}</span>
                    <span className="orders-item__meta">
                      {it.sku} &middot; Qty {it.qty}
                    </span>
                  </div>
                  <span className="orders-item__price">{it.price}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
    </aside>
  );
}

/* ------------------------------ File A Claim drawer ---------------------------- */
type ClaimReason = "lost" | "damage" | "missing";

const reasonOptions: {
  id: ClaimReason;
  label: string;
  Icon: typeof SearchIcon;
}[] = [
  { id: "lost", label: "Lost Package", Icon: SearchIcon },
  { id: "damage", label: "Damage", Icon: BrokenPackageIcon },
  { id: "missing", label: "Missing Contents", Icon: PackageIcon },
];

type PayMethod = "deposit" | "zelle" | "check";

const methodOptions: {
  id: PayMethod;
  label: string;
  Icon: typeof SearchIcon;
}[] = [
  { id: "deposit", label: "Direct Deposit", Icon: AccountBalanceIcon },
  { id: "zelle", label: "Zelle", Icon: PaymentArrowDownIcon },
  { id: "check", label: "Check", Icon: CheckbookIcon },
];

type Recipient = {
  id: string;
  name: string;
  email: string;
  address: string;
  isDefault?: boolean;
};

const recipients: Recipient[] = [
  {
    id: "sarah",
    name: "Sarah Parker",
    email: "sarah@kinkos.com",
    address: "123 Fairy Lane Rd, Atlanta, GA, 30001",
    isDefault: true,
  },
  {
    id: "james",
    name: "James Larson",
    email: "TheJL@kinkos.com",
    address: "321 Cool Way, Atlanta, GA, 30001",
  },
  {
    id: "maria",
    name: "Maria Gonzalez",
    email: "MariaG@example.com",
    address: "456 Sunny St, Miami, FL, 33101",
  },
  {
    id: "samuel",
    name: "Samuel Lee",
    email: "Samuel.Lee@email.com",
    address: "789 Cloud Ave, San Francisco, CA, 94101",
  },
];

const categoryOptions = [
  "Apparel",
  "Electronics",
  "Home Goods",
  "Health & Beauty",
  "Other",
];

const TOTAL_STEPS = 6;

const stepSubtitles: Record<number, string> = {
  1: "Tell us what happened.",
  2: "If approved, who should receive this claim payment?",
  3: "If approved, how should we pay the recipient?",
  4: "Who should receive notifications and updates?",
  5: "Tell us about the merchandise.",
  6: "Upload documentation to support your claim.",
};

export function FileAClaimDrawer({
  claimRef,
  onClose,
  initialStep = 1,
}: {
  claimRef: string;
  onClose: () => void;
  initialStep?: number;
}) {
  const [step, setStep] = useState(initialStep);
  const [reason, setReason] = useState<ClaimReason | null>("lost");
  const [recipientId, setRecipientId] = useState("sarah");
  const [showMoreRecipients, setShowMoreRecipients] = useState(false);
  const [method, setMethod] = useState<PayMethod | null>("deposit");
  const [sameRecipient, setSameRecipient] = useState(true);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [moreDocs, setMoreDocs] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const canContinue =
    (step === 1 && !!reason) ||
    (step === 2 && !!recipientId) ||
    (step === 3 && !!method) ||
    step === 4 ||
    (step === 5 && category.trim() !== "" && description.trim() !== "") ||
    step === 6;

  const defaultRecipient = recipients.find((r) => r.isDefault)!;
  const otherRecipients = recipients.filter((r) => !r.isDefault);

  const renderRecipient = (r: Recipient, row = false) => (
    <button
      key={r.id}
      type="button"
      className={`faclaim__recipient${row ? " faclaim__recipient--row" : ""}${
        recipientId === r.id ? " is-selected" : ""
      }`}
      onClick={() => setRecipientId(r.id)}
      aria-pressed={recipientId === r.id}
    >
      <span className="faclaim__recipient-check">
        {recipientId === r.id && <CheckIcon size={14} />}
      </span>
      <span className="faclaim__recipient-body">
        <span className="faclaim__recipient-name">
          <AccountCircleIcon size={20} />
          {r.name}
          {r.isDefault && <span className="faclaim__badge">Default</span>}
        </span>
        <span className="faclaim__recipient-line">{r.email}</span>
        <span className="faclaim__recipient-line">{r.address}</span>
      </span>
      {row && (
        <span className="faclaim__recipient-del" aria-hidden="true">
          <DeleteIcon size={20} />
        </span>
      )}
    </button>
  );

  return (
    <aside className="faclaim" role="region" aria-label="File a claim">
      <header className="faclaim__head">
        <div className="faclaim__titles">
          <h2 className="faclaim__title">{submitted ? "Claim Submitted!" : "File A Claim"}</h2>
          <p className="faclaim__subtitle">
            {submitted ? "You’ll get a confirmation email." : stepSubtitles[step]}
          </p>
        </div>
        <button className="icon-btn faclaim__close" aria-label="Close" onClick={onClose}>
          <CloseIcon size={22} />
        </button>
      </header>

      {!submitted && (
        <div className="faclaim__progress" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span key={i} className={`faclaim__bar${i < step ? " is-active" : ""}`} />
          ))}
        </div>
      )}

      <div className="faclaim__body">
        {submitted ? (
          <ClaimSummary claimRef={claimRef} reason={reason} category={category} />
        ) : step === 1 ? (
          <div className="faclaim__reasons">
            {reasonOptions.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className={`faclaim__reason${reason === id ? " is-selected" : ""}`}
                onClick={() => setReason(id)}
                aria-pressed={reason === id}
              >
                <Icon size={24} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        ) : step === 2 ? (
          <div className="faclaim__recipients">
            {renderRecipient(defaultRecipient)}
            <button
              type="button"
              className="faclaim__link"
              onClick={() => setShowMoreRecipients((v) => !v)}
            >
              {showMoreRecipients ? "Hide Payment Recipients" : "View More Payment Recipients"}
              <ChevronDown
                size={16}
                style={{ transform: showMoreRecipients ? "rotate(180deg)" : "none" }}
              />
            </button>
            {showMoreRecipients && (
              <div className="faclaim__recipient-list">
                {otherRecipients.map((r) => renderRecipient(r, true))}
                <button type="button" className="faclaim__addrow">
                  <PlusIcon size={18} />
                  Add New
                </button>
              </div>
            )}
          </div>
        ) : step === 3 ? (
          <div className="faclaim__fields">
            <div className="faclaim__methods">
              {methodOptions.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className={`faclaim__reason${method === id ? " is-selected" : ""}`}
                  onClick={() => setMethod(id)}
                  aria-pressed={method === id}
                >
                  <Icon size={24} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            {method === "deposit" && (
              <div className="faclaim__bankform">
                <span className="faclaim__bankform-req">All fields required</span>
                <div className="faclaim__uline">
                  <input className="faclaim__uline-input" placeholder="Name on Account" />
                </div>
                <div className="faclaim__uline">
                  <input className="faclaim__uline-input" placeholder="Routing Number" />
                  <HelpIcon size={16} />
                </div>
                <div className="faclaim__uline">
                  <input className="faclaim__uline-input" placeholder="Account Number" />
                  <HelpIcon size={16} />
                </div>
                <div className="faclaim__uline faclaim__uline--select">
                  <select className="faclaim__uline-input" defaultValue="">
                    <option value="" disabled>
                      Type
                    </option>
                    <option>Checking</option>
                    <option>Savings</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
                <div className="faclaim__uline faclaim__uline--select">
                  <select className="faclaim__uline-input" defaultValue="">
                    <option value="" disabled>
                      Category
                    </option>
                    <option>Personal</option>
                    <option>Business</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>
            )}
          </div>
        ) : step === 4 ? (
          <button
            type="button"
            className={`faclaim__checkrow${sameRecipient ? " is-checked" : ""}`}
            onClick={() => setSameRecipient((v) => !v)}
            aria-pressed={sameRecipient}
          >
            <span className="faclaim__checkbox">{sameRecipient && <CheckIcon size={14} />}</span>
            <span>Same as claim payment recipient</span>
          </button>
        ) : step === 5 ? (
          <div className="faclaim__fields">
            <label className="faclaim__field">
              <span className="faclaim__label">
                Merchandise Category <span className="faclaim__req">*</span>
                <InfoIcon size={14} />
              </span>
              <span className="faclaim__select">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="" disabled>
                    Category
                  </option>
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} />
              </span>
            </label>
            <label className="faclaim__field">
              <span className="faclaim__label">
                Merchandise Description <span className="faclaim__req">*</span>
                <InfoIcon size={14} />
              </span>
              <textarea
                className="faclaim__textarea"
                rows={4}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
        ) : (
          <div className="faclaim__fields">
            <div className="faclaim__amount">
              <span className="faclaim__amount-label">Total Claim Amount</span>
              <span className="faclaim__amount-value">$127.50</span>
              <span className="faclaim__amount-note">
                Total Claim Amount = Merchandise Amount + Shipping Amount
              </span>
            </div>
            <div className="faclaim__upload-card">
              <div className="faclaim__upload-head">
                <span className="faclaim__upload-title">Proof of Value/Invoice</span>
                <span className="faclaim__upload-sub">Required*</span>
              </div>
              <div className="faclaim__dropzone">
                <span className="faclaim__dropicon">
                  <UploadIcon size={28} />
                </span>
                <span className="faclaim__droptext">
                  Drag and drop files or <span className="faclaim__link-inline">browse</span>
                </span>
              </div>
              <div className="faclaim__uploaded">
                <span className="faclaim__uploaded-title">Uploaded</span>
                <span className="faclaim__uploaded-empty">No files uploaded so far</span>
              </div>
              <button
                type="button"
                className={`faclaim__checkrow${moreDocs ? " is-checked" : ""}`}
                onClick={() => setMoreDocs((v) => !v)}
                aria-pressed={moreDocs}
              >
                <span className="faclaim__checkbox">{moreDocs && <CheckIcon size={14} />}</span>
                <span>I have more documentation</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="faclaim__foot">
        {submitted ? (
          <button className="faclaim__btn faclaim__btn--primary" onClick={onClose}>
            Close
            <ArrowRightAltIcon size={20} />
          </button>
        ) : (
          <>
            <button
              className="faclaim__btn faclaim__btn--primary"
              disabled={!canContinue}
              onClick={() => {
                if (step < TOTAL_STEPS) setStep((s) => s + 1);
                else setSubmitted(true);
              }}
            >
              {step === TOTAL_STEPS ? "Submit Claim" : "Continue"}
              <ArrowRightAltIcon size={20} />
            </button>
            <button
              className="faclaim__btn faclaim__btn--ghost"
              onClick={() => (step === 1 ? onClose() : setStep((s) => s - 1))}
            >
              {step === 1 ? "Cancel" : "Back"}
            </button>
          </>
        )}
      </footer>
    </aside>
  );
}

const reasonSummaryLabels: Record<ClaimReason, string> = {
  lost: "Loss",
  damage: "Damage",
  missing: "Missing Contents",
};

function ClaimSummary({
  claimRef,
  reason,
  category,
}: {
  claimRef: string;
  reason: ClaimReason | null;
  category: string;
}) {
  const contact = ["D4 MEDIA CORP.", "jenaholt@ups.com", "999.999.9999", "35 Glenlake Pkwy NE", "Atlanta, Nevada 30328", "United States of America"];
  return (
    <div className="faclaim__summary">
      <section className="faclaim__sum-section">
        <div className="faclaim__sum-head">
          <AssignmentIcon size={16} />
          <span>Claim Summary</span>
        </div>
        <div className="faclaim__sum-badges">
          <span className="faclaim__sum-badge">Claim #{claimRef}</span>
          <span className="faclaim__sum-badge faclaim__sum-badge--paid">PAID</span>
        </div>
        <dl className="faclaim__sum-rows">
          <div><dt>File Date</dt><dd>Feb 22, 2026</dd></div>
          <div><dt>Deposit Date</dt><dd>March 3, 2026</dd></div>
          <div><dt>Claim Amount</dt><dd>$109.00</dd></div>
          <div><dt>Merchandise Value</dt><dd>$109.00</dd></div>
          <div><dt>Deductible</dt><dd>$15.00</dd></div>
          <div><dt>Claim Reason</dt><dd>{reason ? reasonSummaryLabels[reason] : "—"}</dd></div>
          <div><dt>Product Category</dt><dd>{category || "Apparel"}</dd></div>
          <div><dt>Destination</dt><dd>Portland, OR 97205</dd></div>
        </dl>
      </section>

      <section className="faclaim__sum-section">
        <div className="faclaim__sum-head">
          <PaymentArrowDownIcon size={16} />
          <span>Claim Payment Recipient</span>
        </div>
        <div className="faclaim__sum-block">
          {contact.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </section>

      <section className="faclaim__sum-section">
        <div className="faclaim__sum-head">
          <AccountBoxIcon size={16} />
          <span>Contact Information</span>
        </div>
        <div className="faclaim__sum-block">
          {contact.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </section>

      <section className="faclaim__sum-section">
        <div className="faclaim__sum-head">
          <ChatIcon size={16} />
          <span>Additional Comments</span>
        </div>
        <p className="faclaim__sum-text">
          I want the adjuster to know some more information about what happened.
        </p>
      </section>

      <section className="faclaim__sum-section">
        <div className="faclaim__sum-head">
          <PhotoIcon size={16} />
          <span>Uploaded Documents</span>
        </div>
        <div className="faclaim__sum-files">
          <span>document.pdf</span>
          <span>receipt.xls</span>
        </div>
      </section>
    </div>
  );
}

/* --------------------------------- Orders page --------------------------------- */
export default function Orders({ commerceShieldActive = false }: { commerceShieldActive?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [claimOrder, setClaimOrder] = useState<Order | null>(null);

  return (
    <main className="claims orders">
      <div className="claims-layout">
        <div className="claims-main">
          <div className="claims-header">
            <nav className="claims-breadcrumb">
              <a href="#home" onClick={(e) => e.preventDefault()}>
                Home
              </a>
              <ChevronRight size={14} />
              <span>Orders</span>
            </nav>

            <div className="claims-head">
              <h1 className="claims-title">Orders</h1>
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
                  Filters
                </button>
                <button className="tool-btn">
                  <DownloadIcon size={16} />
                  Export
                </button>
              </div>
            </div>
          </div>

          <OrdersTable
            selected={selected}
            onSelect={setSelected}
            onFileClaim={setClaimOrder}
            commerceShieldActive={commerceShieldActive}
          />
        </div>

        {!claimOrder && <OrderDetail order={orders[selected]} />}
      </div>

      {claimOrder && (
        <FileAClaimDrawer claimRef={claimOrder.orderId} onClose={() => setClaimOrder(null)} />
      )}
    </main>
  );
}