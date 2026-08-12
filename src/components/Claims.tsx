import { useState, useRef, useEffect, useCallback, Fragment } from "react";
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
  PaymentIcon,
  AccountBoxIcon,
  ChatIcon,
  PhotoIcon,
  SendIcon,
  ConversionPathIcon,
  WarningTriangleIcon,
} from "./icons";
import isCoverageOn from "../assets/insureshield/is coverage on.png";
import shipmentMap from "../assets/insureshield/shipment-map.png";
import { FileAClaimDrawer } from "./Orders";
import "./Claims.css";

/* ---------------------------------- Data types --------------------------------- */
type StatusKind = "paid" | "approved" | "review" | "denied" | "submitted";

type AddressBlock = {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  country: string;
};

type Claim = {
  claimNo: string;
  tracking: string;
  fileDate: string;
  claimed: string;
  carrier: string;
  status: StatusKind;
  draftStep?: number;
  detail: {
    depositDate: string;
    claimAmount: string;
    merchandiseValue: string;
    deductible: string;
    reason: string;
    category: string;
    destination: string;
    recipient: AddressBlock;
    contact: AddressBlock;
    comments: string;
    documents: string[];
  };
};

type ClaimScope = "filed" | "drafts";

type ClaimMessageMeta = {
  unread: number;
  lastMessageAt: string;
};

const statusLabels: Record<StatusKind, string> = {
  paid: "Paid",
  approved: "Approved",
  review: "In Review",
  denied: "Denied",
  submitted: "Submitted",
};

const statusOrder: StatusKind[] = ["paid", "approved", "review", "denied", "submitted"];

const address: AddressBlock = {
  name: "D4 MEDIA CORP.",
  email: "jenaholt@ups.com",
  phone: "999.999.9999",
  line1: "35 Glenlake Pkwy NE",
  line2: "Atlanta, Nevada 30328",
  country: "United States of America",
};

const trackingHistory: { label: string; time: string; lost?: boolean }[] = [
  { label: "Delivery Lost", time: "Dec 21, 11:07 AM EST", lost: true },
  { label: "Ready for Pickup", time: "Dec 21, 10:58 AM EST" },
  { label: "Provider Assigned", time: "Dec 21, 10:32 AM EST" },
  { label: "Assigning Provider", time: "Dec 21, 10:24 AM EST" },
  { label: "Preparing Order", time: "Dec 21, 10:11 AM EST" },
  { label: "Order Confirmed", time: "Dec 21, 10:01 AM EST" },
];

const claims: Claim[] = [
  {
    claimNo: "987654",
    tracking: "1Z765123456",
    fileDate: "05/16/26",
    claimed: "$109.00",
    carrier: "UPS",
    status: "paid",
    detail: {
      depositDate: "March 3, 2026",
      claimAmount: "$109.00",
      merchandiseValue: "$109.00",
      deductible: "$15.00",
      reason: "Loss",
      category: "Apparel",
      destination: "Portland, OR 97205",
      recipient: address,
      contact: address,
      comments: "I want the adjuster to know some more information about what happened.",
      documents: ["document.pdf", "receipt.xls"],
    },
  },
  {
    claimNo: "987655",
    tracking: "1Z765123457",
    fileDate: "05/14/26",
    claimed: "$254.50",
    carrier: "UPS",
    status: "approved",
    detail: {
      depositDate: "—",
      claimAmount: "$254.50",
      merchandiseValue: "$254.50",
      deductible: "$25.00",
      reason: "Damage",
      category: "Electronics",
      destination: "Seattle, WA 98101",
      recipient: address,
      contact: address,
      comments: "Package arrived crushed with visible damage to contents.",
      documents: ["damage-photos.zip"],
    },
  },
  {
    claimNo: "987656",
    tracking: "1Z765123458",
    fileDate: "05/12/26",
    claimed: "$78.00",
    carrier: "FedEx",
    status: "review",
    detail: {
      depositDate: "—",
      claimAmount: "$78.00",
      merchandiseValue: "$78.00",
      deductible: "$15.00",
      reason: "Loss",
      category: "Home Goods",
      destination: "Austin, TX 78701",
      recipient: address,
      contact: address,
      comments: "Tracking stopped updating after the origin scan.",
      documents: ["invoice.pdf"],
    },
  },
  {
    claimNo: "987657",
    tracking: "1Z765123459",
    fileDate: "05/09/26",
    claimed: "$1,240.00",
    carrier: "UPS",
    status: "submitted",
    draftStep: 3,
    detail: {
      depositDate: "—",
      claimAmount: "$1,240.00",
      merchandiseValue: "$1,240.00",
      deductible: "$50.00",
      reason: "Theft",
      category: "Jewelry",
      destination: "Miami, FL 33101",
      recipient: address,
      contact: address,
      comments: "Signature-required package marked delivered but never received.",
      documents: ["police-report.pdf", "receipt.xls"],
    },
  },
  {
    claimNo: "987658",
    tracking: "1Z765123460",
    fileDate: "05/06/26",
    claimed: "$42.99",
    carrier: "USPS",
    status: "denied",
    detail: {
      depositDate: "—",
      claimAmount: "$42.99",
      merchandiseValue: "$42.99",
      deductible: "$15.00",
      reason: "Damage",
      category: "Apparel",
      destination: "Denver, CO 80202",
      recipient: address,
      contact: address,
      comments: "Claim filed outside of the coverage window.",
      documents: [],
    },
  },
  {
    claimNo: "987659",
    tracking: "1Z765123461",
    fileDate: "05/03/26",
    claimed: "$317.25",
    carrier: "UPS",
    status: "paid",
    detail: {
      depositDate: "May 20, 2026",
      claimAmount: "$317.25",
      merchandiseValue: "$317.25",
      deductible: "$25.00",
      reason: "Loss",
      category: "Electronics",
      destination: "Chicago, IL 60601",
      recipient: address,
      contact: address,
      comments: "Carrier confirmed the shipment was lost in transit.",
      documents: ["confirmation.pdf"],
    },
  },
  {
    claimNo: "987660",
    tracking: "1Z765123462",
    fileDate: "04/29/26",
    claimed: "$88.40",
    carrier: "FedEx",
    status: "approved",
    detail: {
      depositDate: "—",
      claimAmount: "$88.40",
      merchandiseValue: "$88.40",
      deductible: "$15.00",
      reason: "Damage",
      category: "Home Goods",
      destination: "Boston, MA 02108",
      recipient: address,
      contact: address,
      comments: "Fragile item packaged without adequate protection.",
      documents: ["photos.zip", "receipt.xls"],
    },
  },
  {
    claimNo: "987661",
    tracking: "1Z765123463",
    fileDate: "04/25/26",
    claimed: "$156.00",
    carrier: "UPS",
    status: "review",
    detail: {
      depositDate: "—",
      claimAmount: "$156.00",
      merchandiseValue: "$156.00",
      deductible: "$25.00",
      reason: "Loss",
      category: "Apparel",
      destination: "Portland, OR 97205",
      recipient: address,
      contact: address,
      comments: "Awaiting proof-of-value documentation from the shipper.",
      documents: ["order.pdf"],
    },
  },
  {
    claimNo: "987662",
    tracking: "1Z765123464",
    fileDate: "05/12/26",
    claimed: "$264.00",
    carrier: "UPS",
    status: "submitted",
    draftStep: 1,
    detail: {
      depositDate: "—",
      claimAmount: "$264.00",
      merchandiseValue: "$264.00",
      deductible: "$25.00",
      reason: "Damage",
      category: "Electronics",
      destination: "Seattle, WA 98101",
      recipient: address,
      contact: address,
      comments: "",
      documents: [],
    },
  },
  {
    claimNo: "987663",
    tracking: "1Z765123465",
    fileDate: "05/07/26",
    claimed: "$78.50",
    carrier: "FedEx",
    status: "submitted",
    draftStep: 5,
    detail: {
      depositDate: "—",
      claimAmount: "$78.50",
      merchandiseValue: "$78.50",
      deductible: "$15.00",
      reason: "Loss",
      category: "Home Goods",
      destination: "Austin, TX 78701",
      recipient: address,
      contact: address,
      comments: "Package never scanned as delivered.",
      documents: ["receipt.xls"],
    },
  },
  {
    claimNo: "987664",
    tracking: "1Z765123466",
    fileDate: "04/22/26",
    claimed: "$523.75",
    carrier: "UPS",
    status: "paid",
    detail: {
      depositDate: "May 8, 2026",
      claimAmount: "$523.75",
      merchandiseValue: "$523.75",
      deductible: "$25.00",
      reason: "Damage",
      category: "Electronics",
      destination: "Phoenix, AZ 85004",
      recipient: address,
      contact: address,
      comments: "Screen shattered during transit; unit non-functional.",
      documents: ["damage-photos.zip", "receipt.xls"],
    },
  },
  {
    claimNo: "987665",
    tracking: "1Z765123467",
    fileDate: "04/18/26",
    claimed: "$94.20",
    carrier: "USPS",
    status: "review",
    detail: {
      depositDate: "—",
      claimAmount: "$94.20",
      merchandiseValue: "$94.20",
      deductible: "$15.00",
      reason: "Loss",
      category: "Apparel",
      destination: "Nashville, TN 37201",
      recipient: address,
      contact: address,
      comments: "Carrier investigation in progress.",
      documents: ["invoice.pdf"],
    },
  },
  {
    claimNo: "987666",
    tracking: "1Z765123468",
    fileDate: "04/15/26",
    claimed: "$1,875.00",
    carrier: "UPS",
    status: "approved",
    detail: {
      depositDate: "—",
      claimAmount: "$1,875.00",
      merchandiseValue: "$1,875.00",
      deductible: "$50.00",
      reason: "Theft",
      category: "Jewelry",
      destination: "Atlanta, GA 30303",
      recipient: address,
      contact: address,
      comments: "High-value package stolen from doorstep after delivery.",
      documents: ["police-report.pdf", "photos.zip"],
    },
  },
  {
    claimNo: "987667",
    tracking: "1Z765123469",
    fileDate: "04/11/26",
    claimed: "$63.30",
    carrier: "FedEx",
    status: "denied",
    detail: {
      depositDate: "—",
      claimAmount: "$63.30",
      merchandiseValue: "$63.30",
      deductible: "$15.00",
      reason: "Damage",
      category: "Home Goods",
      destination: "San Diego, CA 92101",
      recipient: address,
      contact: address,
      comments: "Insufficient evidence of carrier-caused damage.",
      documents: [],
    },
  },
  {
    claimNo: "987668",
    tracking: "1Z765123470",
    fileDate: "05/10/26",
    claimed: "$412.00",
    carrier: "UPS",
    status: "submitted",
    draftStep: 2,
    detail: {
      depositDate: "—",
      claimAmount: "$412.00",
      merchandiseValue: "$412.00",
      deductible: "$25.00",
      reason: "Loss",
      category: "Electronics",
      destination: "Minneapolis, MN 55401",
      recipient: address,
      contact: address,
      comments: "",
      documents: [],
    },
  },
];

const initialClaimMessages: Record<string, ClaimMessageMeta> = {
  "987654": { unread: 0, lastMessageAt: "Today 10:12 AM" },
  "987655": { unread: 0, lastMessageAt: "Yesterday 4:22 PM" },
  "987656": { unread: 2, lastMessageAt: "Today 9:18 AM" },
  "987657": { unread: 1, lastMessageAt: "Today 8:41 AM" },
  "987658": { unread: 0, lastMessageAt: "Jul 18 2:07 PM" },
  "987659": { unread: 0, lastMessageAt: "Jul 17 11:42 AM" },
  "987660": { unread: 3, lastMessageAt: "Today 11:03 AM" },
  "987661": { unread: 1, lastMessageAt: "Yesterday 6:05 PM" },
};

/* --------------------------------- Stat cards ---------------------------------- */
type Stat = { label: string; value: string; delta: string; up: boolean };

const stats: Stat[] = [
  { label: "Active Claims", value: "342", delta: "12.5%", up: true },
  { label: "Approval Rate", value: "127", delta: "12.5%", up: false },
  { label: "Avg. Processing Time", value: "91", delta: "4.2%", up: false },
  { label: "Total Protection Cost", value: "$2.4K", delta: "4.2%", up: true },
  { label: "Total Claim Payouts", value: "$2.4M", delta: "15.7%", up: true },
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
const columns = ["Claim No.", "File Date", "Claimed ($)", "Status"];

function ClaimsTable({
  rows,
  selectedClaimNo,
  unreadByClaim,
  onSelect,
}: {
  rows: Claim[];
  selectedClaimNo: string;
  unreadByClaim: Record<string, ClaimMessageMeta>;
  onSelect: (claimNo: string) => void;
}) {
  if (!rows.length) {
    return (
      <div className="claims-empty" role="status">
        No claims match this view.
      </div>
    );
  }

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

      {rows.map((claim) => {
        const unread = unreadByClaim[claim.claimNo]?.unread ?? 0;
        return (
        <div
          className={`claims-row claims-row--data${claim.claimNo === selectedClaimNo ? " is-selected" : ""}${unread > 0 ? " has-unread" : ""}`}
          role="row"
          key={claim.claimNo}
          onClick={() => onSelect(claim.claimNo)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(claim.claimNo);
            }
          }}
        >
          <span className="claims-cell claims-cell--dot">
            {unread > 0 && <span className="claims-unread-dot" aria-hidden />}
          </span>
          <span className="claims-cell claims-cell--shield">
            <img src={isCoverageOn} alt="Covered" className="coverage-badge" />
          </span>
          <span className="claims-cell claims-cell--strong">
            <span className="claims-claimno-wrap">
              <span>{claim.claimNo}</span>
            </span>
          </span>
          <span className="claims-cell">{claim.fileDate}</span>
          <span className="claims-cell">{claim.claimed}</span>
          <span className="claims-cell claims-cell--status">
            <span className={`status-badge status-badge--${claim.status}`}>
              {statusLabels[claim.status]}
            </span>
          </span>
          <span className="claims-cell claims-cell--more">
            <button
              className="icon-btn"
              aria-label="More actions"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertIcon size={20} />
            </button>
          </span>
        </div>
      );
      })}
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

function AddressLines({ block }: { block: AddressBlock }) {
  return (
    <div className="detail-address">
      <span>{block.name}</span>
      <span>{block.email}</span>
      <span>{block.phone}</span>
      <span>{block.line1}</span>
      <span>{block.line2}</span>
      <span>{block.country}</span>
    </div>
  );
}

/* ------------------------------ Messages tab ----------------------------------- */
type ChatMessage = {
  from: "customer" | "adjuster";
  name: string;
  role?: string;
  time: string;
  text: string;
  showPills?: boolean;
};

const conversation: ChatMessage[] = [
  {
    from: "customer",
    name: "John Doe",
    time: "Apr 23 10:56 AM",
    text: "Hi, can you explain what notice to carrier is? I see you're requesting that, but I don't know what that is.",
  },
  {
    from: "adjuster",
    name: "Tina Marie",
    role: ", Adjuster",
    time: "Apr 23 11:00 AM",
    text: "It is a document that proves you have notified your transportation carrier that you have filed a claim with us.",
  },
  {
    from: "customer",
    name: "John Doe",
    time: "Apr 23 2:01 PM",
    text: "Makes sense. I will submit this ASAP.",
  },
  {
    from: "adjuster",
    name: "Tina Marie",
    role: ", Adjuster",
    time: "Apr 24 9:00 AM",
    text: "Is there anything else I can help you with?",
    showPills: true,
  },
  {
    from: "customer",
    name: "John Doe",
    time: "Apr 24 9:30 AM",
    text: "Nope, that's all. Thank you!",
  },
  {
    from: "adjuster",
    name: "Tina Marie",
    role: ", Adjuster",
    time: "Apr 24 9:30 AM",
    text: "Thank you!",
  },
];

const quickReplies = ["Nope, that's all. Thank you!", "I still need help."];

// The single adjuster assigned to this claim — surfaced once at the top of the thread.
const adjuster = conversation.find((m) => m.from === "adjuster");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Parse the mock "Apr 23 10:56 AM" strings into real Dates so we can group by time.
function parseTime(s: string): Date {
  const m = s.match(/^(\w+)\s+(\d+)\s+(\d+):(\d+)\s+(AM|PM)$/);
  if (!m) return new Date();
  const [, mon, day, hh, mm, ap] = m;
  let h = parseInt(hh, 10) % 12;
  if (ap === "PM") h += 12;
  return new Date(2024, MONTHS.indexOf(mon), parseInt(day, 10), h, parseInt(mm, 10));
}

// iMessage-style separator: full date+time when the day changes, time-only for a same-day gap.
function dividerLabel(cur: Date, showDate: boolean): string {
  const time = cur.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  if (!showDate) return time;
  const date = cur.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  return `${date} · ${time}`;
}

function MessagesTab() {
  const [step, setStep] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const visible = conversation.slice(0, step);
  const last = visible[visible.length - 1];
  const hasMore = step < conversation.length;

  // Awaiting-reply note: the customer sent the last message and the adjuster hasn't replied yet.
  const awaitingReply = !!last && last.from === "customer" && hasMore;
  // Quick-reply pills: shown when the adjuster asks the closing question.
  const showPills = !!last && !!last.showPills && hasMore;
  // It is the customer's turn when nothing is pending from the adjuster.
  const isUserTurn = hasMore && (!last || last.from === "adjuster");

  const advance = () => setStep((s) => Math.min(s + 1, conversation.length));

  // After the customer sends, the adjuster responds automatically after a short delay.
  useEffect(() => {
    if (!awaitingReply) return;
    const timer = setTimeout(
      () => setStep((s) => Math.min(s + 1, conversation.length)),
      1600
    );
    return () => clearTimeout(timer);
  }, [awaitingReply, step]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [step, awaitingReply]);

  return (
    <div className="claim-messages">
      {adjuster && (
        <div className="claim-messages__adjuster">
          <span className="claim-messages__adjuster-avatar">{adjuster.name.charAt(0)}</span>
          <div className="claim-messages__adjuster-meta">
            <span className="claim-messages__adjuster-name">{adjuster.name}</span>
            <span className="claim-messages__adjuster-role">Claims Adjuster · Typically replies within 24 hours</span>
          </div>
        </div>
      )}

      <div className="claim-messages__list" ref={listRef}>
        {visible.map((m, i) => {
          const cur = parseTime(m.time);
          const prev = i > 0 ? parseTime(visible[i - 1].time) : null;
          const gapMin = prev ? (cur.getTime() - prev.getTime()) / 60000 : Infinity;
          const newDay = !prev || cur.toDateString() !== prev.toDateString();
          const showDivider = i === 0 || newDay || gapMin >= 30;
          return (
            <Fragment key={i}>
              {showDivider && <div className="chat-time">{dividerLabel(cur, newDay)}</div>}
              <div className={`chat-row chat-row--${m.from}`}>
                <div className="chat-msg">{m.text}</div>
              </div>
            </Fragment>
          );
        })}

        {awaitingReply && (
          <p className="claim-messages__status">
            Message sent. Your adjuster will reply here when they review your claim.
          </p>
        )}

        {showPills && (
          <div className="claim-messages__pills">
            {quickReplies.map((label) => (
              <button
                type="button"
                className="chat-pill"
                key={label}
                onClick={advance}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        className="claim-messages__composer"
        onSubmit={(e) => {
          e.preventDefault();
          e.currentTarget.reset();
          if (isUserTurn) advance();
        }}
      >
        <input type="text" placeholder="Write a message..." />
        <button
          type="submit"
          className="claim-messages__send"
          aria-label="Send message"
          disabled={!isUserTurn}
        >
          <SendIcon size={16} />
        </button>
      </form>
    </div>
  );
}

function ClaimDetail({
  claim,
  unreadCount,
  onOpenMessages,
}: {
  claim: Claim;
  unreadCount: number;
  onOpenMessages: (claimNo: string) => void;
}) {
  const d = claim.detail;
  const [tab, setTab] = useState<"detail" | "shipment" | "messages">("detail");

  return (
    <aside className="claim-detail">
      <div className="claim-detail__tabs">
        <button
          className={`claim-tab${tab === "detail" ? " claim-tab--active" : ""}`}
          onClick={() => setTab("detail")}
        >
          Claim Detail
        </button>
        <button
          className={`claim-tab${tab === "shipment" ? " claim-tab--active" : ""}`}
          onClick={() => setTab("shipment")}
        >
          Shipment Detail
        </button>
        <button
          className={`claim-tab${tab === "messages" ? " claim-tab--active" : ""}`}
          onClick={() => {
            setTab("messages");
            onOpenMessages(claim.claimNo);
          }}
        >
          Messages
          {unreadCount > 0 && <span className="claim-tab__badge">{unreadCount}</span>}
        </button>
      </div>

      {tab === "messages" ? (
        <MessagesTab />
      ) : tab === "shipment" ? (
        <div className="claim-detail__body">
          <section className="detail-section">
            <div className="detail-section__head">
              <AssignmentIcon size={16} />
              <span>Shipment Summary</span>
            </div>
            <div className="detail-kvs">
              <KeyValue label="Shipment Date" value="Feb 22, 2026" />
              <KeyValue label="Shipping Cost" value="$9.50" />
              <KeyValue label="Carrier" value="UPS Ground" />
              <KeyValue label="Tracking No." value="1Z999AA10123456784" />
              <KeyValue label="UPS Account No." value="67890123" />
              <div className="detail-kv">
                <span className="detail-kv__key">Sender</span>
                <span className="detail-kv__val">
                  D4 Media Corp
                  <br />
                  Atlanta, Nevada
                  <br />
                  United States of America
                </span>
              </div>
              <div className="detail-kv">
                <span className="detail-kv__key">Recipient</span>
                <span className="detail-kv__val">
                  SOUTH END G &amp; PAWN LLC
                  <br />
                  Atlanta, Tennessee
                  <br />
                  United States of America
                </span>
              </div>
            </div>
          </section>

          <section className="detail-section">
            <div className="detail-section__head">
              <ConversionPathIcon size={16} />
              <span>Tracking History</span>
            </div>
            <ol className="track-history">
              {trackingHistory.map((t, i) => (
                <li className="track-step" key={t.label}>
                  <div className="track-step__rail">
                    {t.lost ? (
                      <WarningTriangleIcon size={16} className="track-step__lost" />
                    ) : (
                      <span className="track-step__dot" aria-hidden />
                    )}
                    {i < trackingHistory.length - 1 && (
                      <span className="track-step__line" aria-hidden />
                    )}
                  </div>
                  <div className="track-step__body">
                    <p className="track-step__label">{t.label}</p>
                    <p className="track-step__time">{t.time}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="track-map">
            <img src={shipmentMap} alt="Shipment route map" />
          </div>
        </div>
      ) : (
        <div className="claim-detail__body">
        <section className="detail-section">
          <div className="detail-section__head">
            <AssignmentIcon size={16} />
            <span>Claim Summary</span>
          </div>
          <div className="detail-kvs">
            <KeyValue label="Status" value={statusLabels[claim.status]} />
            <KeyValue label="Claim No." value={claim.claimNo} />
            <KeyValue label="File Date" value={claim.fileDate} />
            <KeyValue label="Tracking No." value={claim.tracking} />
            <KeyValue label="Carrier" value={claim.carrier} />
            <KeyValue label="Deposit Date" value={d.depositDate} />
            <KeyValue label="Claim Amount" value={d.claimAmount} />
            <KeyValue label="Merchandise Value" value={d.merchandiseValue} />
            <KeyValue label="Deductible" value={d.deductible} />
            <KeyValue label="Claim Reason" value={d.reason} />
            <KeyValue label="Product Category" value={d.category} />
            <KeyValue label="Destination" value={d.destination} />
          </div>
        </section>

        <section className="detail-section">
          <div className="detail-section__head">
            <PaymentIcon size={16} />
            <span>Claim Payment Recipient</span>
          </div>
          <AddressLines block={d.recipient} />
        </section>

        <section className="detail-section">
          <div className="detail-section__head">
            <AccountBoxIcon size={16} />
            <span>Contact Information</span>
          </div>
          <AddressLines block={d.contact} />
        </section>

        <section className="detail-section">
          <div className="detail-section__head">
            <ChatIcon size={16} />
            <span>Additional Comments</span>
          </div>
          <p className="detail-comment">{d.comments}</p>
        </section>

        <section className="detail-section">
          <div className="detail-section__head">
            <PhotoIcon size={16} />
            <span>Uploaded Documents</span>
          </div>
          {d.documents.length ? (
            <div className="detail-docs">
              {d.documents.map((doc) => (
                <a className="detail-doc" href="#doc" key={doc} onClick={(e) => e.preventDefault()}>
                  {doc}
                </a>
              ))}
            </div>
          ) : (
            <p className="detail-comment detail-comment--muted">No documents uploaded.</p>
          )}
        </section>
        </div>
      )}
    </aside>
  );
}

/* --------------------------------- Claims page --------------------------------- */
export default function Claims({
  onUnreadCountChange,
  initialScope = "filed",
  scopeToken,
}: {
  onUnreadCountChange?: (count: number) => void;
  initialScope?: ClaimScope;
  scopeToken?: number;
}) {
  const [scope, setScope] = useState<ClaimScope>(initialScope);
  const [draftClaim, setDraftClaim] = useState<Claim | null>(null);

  useEffect(() => {
    if (scopeToken !== undefined) setScope(initialScope);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopeToken]);
  const [unreadByClaim, setUnreadByClaim] = useState<Record<string, ClaimMessageMeta>>(
    initialClaimMessages,
  );

  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Set<StatusKind>>(new Set());
  const [carrierFilter, setCarrierFilter] = useState<Set<string>>(new Set());
  const [messagesOnly, setMessagesOnly] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterOpen) return;
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [filterOpen]);

  const carriers = Array.from(new Set(claims.map((c) => c.carrier)));

  const toggleStatus = (s: StatusKind) =>
    setStatusFilter((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });

  const toggleCarrier = (c: string) =>
    setCarrierFilter((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });

  const clearFilters = () => {
    setStatusFilter(new Set());
    setCarrierFilter(new Set());
    setMessagesOnly(false);
  };

  const activeFilterCount = statusFilter.size + carrierFilter.size + (messagesOnly ? 1 : 0);

  const isDraft = (claim: Claim) => claim.status === "submitted";

  const rows = claims.filter((claim) => {
    const inScope = scope === "drafts" ? isDraft(claim) : !isDraft(claim);
    if (!inScope) return false;
    if (statusFilter.size && !statusFilter.has(claim.status)) return false;
    if (carrierFilter.size && !carrierFilter.has(claim.carrier)) return false;
    if (messagesOnly && (unreadByClaim[claim.claimNo]?.unread ?? 0) === 0) return false;
    return true;
  });

  const [selectedClaimNo, setSelectedClaimNo] = useState(claims[0]?.claimNo ?? "");

  useEffect(() => {
    if (!rows.length) return;
    if (!rows.some((c) => c.claimNo === selectedClaimNo)) {
      setSelectedClaimNo(rows[0].claimNo);
    }
  }, [rows, selectedClaimNo]);

  const selectedClaim = rows.find((c) => c.claimNo === selectedClaimNo) ?? rows[0] ?? claims[0];
  const needsReplyCount = Object.values(unreadByClaim).reduce((sum, m) => sum + m.unread, 0);

  useEffect(() => {
    onUnreadCountChange?.(needsReplyCount);
  }, [needsReplyCount, onUnreadCountChange]);

  const markClaimMessagesRead = (claimNo: string) => {
    setUnreadByClaim((prev) => {
      if (!prev[claimNo] || prev[claimNo].unread === 0) return prev;
      return {
        ...prev,
        [claimNo]: { ...prev[claimNo], unread: 0 },
      };
    });
  };

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
              <span>Claims</span>
            </nav>

            <div className="claims-head">
              <h1 className="claims-title">Claims</h1>
              <div className="claims-scope">
                <button
                  className={`scope-btn${scope === "filed" ? " is-active" : ""}`}
                  onClick={() => {
                    setScope("filed");
                    setDraftClaim(null);
                  }}
                >
                  Filed
                </button>
                <button
                  className={`scope-btn${scope === "drafts" ? " is-active" : ""}`}
                  onClick={() => setScope("drafts")}
                >
                  Drafts
                </button>
              </div>
            </div>

            <StatCards />

            <div className="claims-toolbar">
              <label className="claims-search">
                <SearchIcon size={16} />
                <input type="text" placeholder="Search" />
              </label>
              <div className="claims-toolbar__actions">
                <div className="claims-filter" ref={filterRef}>
                  <button
                    className={`tool-btn${activeFilterCount > 0 ? " tool-btn--active" : ""}`}
                    onClick={() => setFilterOpen((o) => !o)}
                    aria-expanded={filterOpen}
                  >
                    <FilterIcon size={16} />
                    Filter
                    {activeFilterCount > 0 && (
                      <span className="tool-btn__count">{activeFilterCount}</span>
                    )}
                  </button>
                  {filterOpen && (
                    <div className="filter-pop" role="dialog" aria-label="Filter claims">
                      <div className="filter-pop__group">
                        <p className="filter-pop__title">Status</p>
                        {statusOrder.map((s) => (
                          <label className="filter-pop__opt" key={s}>
                            <input
                              type="checkbox"
                              checked={statusFilter.has(s)}
                              onChange={() => toggleStatus(s)}
                            />
                            <span>{statusLabels[s]}</span>
                          </label>
                        ))}
                      </div>
                      <div className="filter-pop__group">
                        <p className="filter-pop__title">Carrier</p>
                        {carriers.map((c) => (
                          <label className="filter-pop__opt" key={c}>
                            <input
                              type="checkbox"
                              checked={carrierFilter.has(c)}
                              onChange={() => toggleCarrier(c)}
                            />
                            <span>{c}</span>
                          </label>
                        ))}
                      </div>
                      <div className="filter-pop__group">
                        <p className="filter-pop__title">Messages</p>
                        <label className="filter-pop__opt">
                          <input
                            type="checkbox"
                            checked={messagesOnly}
                            onChange={() => setMessagesOnly((v) => !v)}
                          />
                          <span>Claims with messages</span>
                        </label>
                      </div>
                      <div className="filter-pop__footer">
                        <button
                          className="filter-pop__clear"
                          onClick={clearFilters}
                          disabled={activeFilterCount === 0}
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button className="tool-btn">
                  <DownloadIcon size={16} />
                  Export
                </button>
              </div>
            </div>
          </div>

          <ClaimsTable
            rows={rows}
            selectedClaimNo={selectedClaim?.claimNo ?? ""}
            unreadByClaim={unreadByClaim}
            onSelect={(claimNo) => {
              if (scope === "drafts") {
                const draft = rows.find((c) => c.claimNo === claimNo);
                if (draft) setDraftClaim(draft);
              } else {
                setSelectedClaimNo(claimNo);
              }
            }}
          />
        </div>

        {scope !== "drafts" && selectedClaim && (
          <ClaimDetail
            claim={selectedClaim}
            unreadCount={unreadByClaim[selectedClaim.claimNo]?.unread ?? 0}
            onOpenMessages={markClaimMessagesRead}
          />
        )}
      </div>

      {draftClaim && (
        <FileAClaimDrawer
          claimRef={draftClaim.claimNo}
          initialStep={draftClaim.draftStep ?? 1}
          onClose={() => setDraftClaim(null)}
        />
      )}
    </main>
  );
}
