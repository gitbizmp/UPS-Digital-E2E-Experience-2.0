import { useState } from "react";
import {
  ShieldCheckIcon,
  MoreVertIcon,
  UnfoldMoreIcon,
  FilterIcon,
  GridIcon,
  TableIcon,
  ChevronRight,
  CloseIcon,
  CheckIcon,
  AssignmentIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "./icons";
import "./Resolutions.css";

/* ---------------------------------- Data types --------------------------------- */
type ResStatus = "not-started" | "in-progress" | "complete";

type ActionItem = { label: string; hint: string; done: boolean };

type Resolution = {
  id: string;
  requestDate: string;
  orderId: string;
  value: string;
  customer: string;
  type: "Refund" | "Repair" | "Return" | "Replacement";
  reason: string;
  amount: string;
  processing: string;
  status: ResStatus;
  detail: {
    product: string;
    quantity: string;
    tracking: string;
    carrier: string;
    reasonDetail: string;
    customerNote: string;
    actions: ActionItem[];
  };
};

const statusLabels: Record<ResStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  complete: "Complete",
};

type HistoryStat = { label: string; value: string; delta: string; up: boolean };

const historyStats: HistoryStat[] = [
  { label: "Resolution Ticket Volume", value: "20", delta: "12.5%", up: false },
  { label: "Avg Resolution Time", value: "19.5h", delta: "4.2%", up: false },
  { label: "Automation Rate", value: "43.0%", delta: "4.2%", up: true },
  { label: "Total Refunded", value: "$1.5K", delta: "15.7%", up: true },
];

const resolutions: Resolution[] = [
  {
    id: "RR-100234",
    requestDate: "01/04/23",
    orderId: "123456",
    value: "$155.00",
    customer: "michael.r@email.com",
    type: "Refund",
    reason: "Defective Product",
    amount: "$89.99",
    processing: "Manual",
    status: "not-started",
    detail: {
      product: "Wireless Noise-Cancelling Headphones",
      quantity: "1",
      tracking: "1Z765123456",
      carrier: "UPS",
      reasonDetail: "Customer reports the left ear cup produces no sound out of the box.",
      customerNote:
        "The headphones arrived defective — the left side doesn't work at all. I'd like a full refund.",
      actions: [
        { label: "Review order & customer history", hint: "Confirm the order is eligible for resolution.", done: false },
        { label: "Verify defect evidence", hint: "Check uploaded photos or description of the issue.", done: false },
        { label: "Confirm refund amount", hint: "Validate $89.99 against the original charge.", done: false },
        { label: "Approve or deny request", hint: "Submit a final decision to the customer.", done: false },
      ],
    },
  },
  {
    id: "RR-100235",
    requestDate: "01/04/23",
    orderId: "123457",
    value: "$155.00",
    customer: "michael.r@email.com",
    type: "Repair",
    reason: "Defective Product",
    amount: "$89.99",
    processing: "Manual",
    status: "in-progress",
    detail: {
      product: "Smart Fitness Watch",
      quantity: "1",
      tracking: "1Z765123457",
      carrier: "UPS",
      reasonDetail: "Screen flickers intermittently after 2 weeks of use.",
      customerNote: "Would prefer a repair over a replacement if possible.",
      actions: [
        { label: "Review order & customer history", hint: "Confirm the order is eligible for resolution.", done: true },
        { label: "Verify defect evidence", hint: "Check uploaded photos or description of the issue.", done: true },
        { label: "Generate repair shipping label", hint: "Send the customer a prepaid return label.", done: false },
        { label: "Schedule repair with vendor", hint: "Coordinate the repair timeline.", done: false },
      ],
    },
  },
  {
    id: "RR-100236",
    requestDate: "01/04/23",
    orderId: "123458",
    value: "$155.00",
    customer: "michael.r@email.com",
    type: "Refund",
    reason: "Defective Product",
    amount: "$89.99",
    processing: "Auto Approved",
    status: "in-progress",
    detail: {
      product: "Portable Bluetooth Speaker",
      quantity: "2",
      tracking: "1Z765123458",
      carrier: "FedEx",
      reasonDetail: "One of two speakers will not charge.",
      customerNote: "Second unit is fine, only need a partial refund for the broken one.",
      actions: [
        { label: "Review order & customer history", hint: "Confirm the order is eligible for resolution.", done: true },
        { label: "Confirm refund amount", hint: "Validate $89.99 against the original charge.", done: false },
        { label: "Issue refund to original payment", hint: "Process the approved refund.", done: false },
      ],
    },
  },
  {
    id: "RR-100237",
    requestDate: "01/04/23",
    orderId: "123459",
    value: "$155.00",
    customer: "michael.r@email.com",
    type: "Return",
    reason: "Defective Product",
    amount: "$89.99",
    processing: "Manual Approval",
    status: "not-started",
    detail: {
      product: "Mechanical Keyboard",
      quantity: "1",
      tracking: "1Z765123459",
      carrier: "UPS",
      reasonDetail: "Several keys are unresponsive.",
      customerNote: "I'd like to return this and get my money back.",
      actions: [
        { label: "Review order & customer history", hint: "Confirm the order is eligible for resolution.", done: false },
        { label: "Approve return request", hint: "Authorize the return for this order.", done: false },
        { label: "Generate return shipping label", hint: "Send the customer a prepaid return label.", done: false },
        { label: "Confirm receipt & refund", hint: "Refund once the item is received.", done: false },
      ],
    },
  },
  {
    id: "RR-100238",
    requestDate: "01/04/23",
    orderId: "123460",
    value: "$155.00",
    customer: "michael.r@email.com",
    type: "Return",
    reason: "Defective Product",
    amount: "$89.99",
    processing: "Manual Approval",
    status: "not-started",
    detail: {
      product: "USB-C Charging Hub",
      quantity: "1",
      tracking: "1Z765123460",
      carrier: "USPS",
      reasonDetail: "Two ports stopped working after a day.",
      customerNote: "Please advise on how to return this.",
      actions: [
        { label: "Review order & customer history", hint: "Confirm the order is eligible for resolution.", done: false },
        { label: "Approve return request", hint: "Authorize the return for this order.", done: false },
        { label: "Generate return shipping label", hint: "Send the customer a prepaid return label.", done: false },
      ],
    },
  },
  {
    id: "RR-100239",
    requestDate: "01/04/23",
    orderId: "123461",
    value: "$155.00",
    customer: "michael.r@email.com",
    type: "Replacement",
    reason: "Damaged in Transit",
    amount: "$89.99",
    processing: "Manual Approval",
    status: "not-started",
    detail: {
      product: "Ceramic Pour-Over Coffee Set",
      quantity: "1",
      tracking: "1Z765123461",
      carrier: "UPS",
      reasonDetail: "Carafe arrived cracked.",
      customerNote: "Box was damaged on arrival, the carafe is broken.",
      actions: [
        { label: "Review order & customer history", hint: "Confirm the order is eligible for resolution.", done: false },
        { label: "Verify damage evidence", hint: "Check uploaded photos of the damage.", done: false },
        { label: "Approve replacement", hint: "Authorize a replacement shipment.", done: false },
        { label: "Create replacement order", hint: "Ship a new unit to the customer.", done: false },
      ],
    },
  },
  {
    id: "RR-100240",
    requestDate: "01/03/23",
    orderId: "123462",
    value: "$210.00",
    customer: "sara.k@email.com",
    type: "Refund",
    reason: "Wrong Item Shipped",
    amount: "$120.00",
    processing: "Manual",
    status: "in-progress",
    detail: {
      product: "Running Shoes — Size 9",
      quantity: "1",
      tracking: "1Z765123462",
      carrier: "UPS",
      reasonDetail: "Received size 11 instead of size 9.",
      customerNote: "Wrong size was shipped. I need the correct size or a refund.",
      actions: [
        { label: "Review order & customer history", hint: "Confirm the order is eligible for resolution.", done: true },
        { label: "Confirm fulfillment error", hint: "Verify the wrong item was shipped.", done: true },
        { label: "Issue refund to original payment", hint: "Process the approved refund.", done: false },
      ],
    },
  },
];

const columns = [
  "Request Date",
  "Order ID",
  "Value",
  "Customer",
  "Type",
  "Reason",
  "Amount",
  "Processing",
  "Status",
];

/* ---------------------------------- Table view --------------------------------- */
function ResolutionsTable({
  onSelect,
  forceStatus,
}: {
  onSelect: (r: Resolution) => void;
  forceStatus?: ResStatus;
}) {
  return (
    <div className="res-table" role="table">
      <div className="res-row res-row--head" role="row">
        <span className="res-cell res-cell--shield" />
        {columns.map((c) => (
          <span className="res-cell res-cell--head" role="columnheader" key={c}>
            {c}
            <UnfoldMoreIcon size={14} className="res-sort" />
          </span>
        ))}
        <span className="res-cell res-cell--more" />
      </div>

      {resolutions.map((r) => (
        <div
          className="res-row res-row--data"
          role="row"
          key={r.id}
          onClick={() => onSelect(r)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(r);
            }
          }}
        >
          <span className="res-cell res-cell--shield">
            <ShieldCheckIcon size={20} className="res-shield" />
          </span>
          <span className="res-cell">{r.requestDate}</span>
          <span className="res-cell res-cell--strong">{r.orderId}</span>
          <span className="res-cell">{r.value}</span>
          <span className="res-cell res-cell--link">{r.customer}</span>
          <span className="res-cell">{r.type}</span>
          <span className="res-cell res-cell--truncate">{r.reason}</span>
          <span className="res-cell">{r.amount}</span>
          <span className="res-cell res-cell--truncate">{r.processing}</span>
          <span className="res-cell res-cell--status">
            <span className={`res-badge res-badge--${forceStatus ?? r.status}`}>
              {statusLabels[forceStatus ?? r.status]}
            </span>
          </span>
          <span className="res-cell res-cell--more">
            <button
              className="res-icon-btn"
              aria-label="More actions"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertIcon size={20} />
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------- Kanban view -------------------------------- */
function KanbanCard({
  res,
  onSelect,
}: {
  res: Resolution;
  onSelect: (r: Resolution) => void;
}) {
  const total = res.detail.actions.length;
  const done = res.detail.actions.filter((a) => a.done).length;
  const showProgress = res.status !== "not-started";

  return (
    <button className="kanban-card" onClick={() => onSelect(res)}>
      <div className="kanban-card__topline">
        <span className="kanban-tag kanban-tag--type">{res.type}</span>
        <span className="kanban-card__date">{res.requestDate}</span>
      </div>

      <div className="kanban-card__row">
        <span className="kanban-card__label">Order</span>
        <span className="kanban-card__value kanban-card__value--strong">
          <ShieldCheckIcon size={14} className="res-shield" />
          {res.orderId}
        </span>
      </div>

      <div className="kanban-card__row">
        <span className="kanban-card__label">Customer</span>
        <span className="kanban-card__value kanban-card__value--truncate">{res.customer}</span>
      </div>

      <div className="kanban-card__row">
        <span className="kanban-card__label">Reason</span>
        <span className="kanban-card__value kanban-card__value--truncate">{res.reason}</span>
      </div>

      {showProgress && (
        <div className="kanban-card__foot">
          <span className="kanban-card__progress">
            {done}/{total} steps complete
          </span>
        </div>
      )}
    </button>
  );
}

function KanbanBoard({
  onSelect,
}: {
  onSelect: (r: Resolution) => void;
}) {
  const board: { key: ResStatus; title: string }[] = [
    { key: "not-started", title: "Not Started" },
    { key: "in-progress", title: "In Progress" },
  ];

  return (
    <div className="kanban">
      {board.map((col) => {
        const items = resolutions.filter((r) => r.status === col.key);
        return (
          <section className="kanban-col" key={col.key}>
            <header className="kanban-col__head">
              <span className={`kanban-col__dot kanban-col__dot--${col.key}`} />
              <h2 className="kanban-col__title">{col.title}</h2>
              <span className="kanban-col__count">{items.length}</span>
            </header>
            <div className="kanban-col__list">
              {items.map((r) => (
                <KanbanCard key={r.id} res={r} onSelect={onSelect} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* -------------------------------- Detail drawer -------------------------------- */function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="res-kv">
      <span className="res-kv__key">{label}</span>
      <span className="res-kv__val">{value}</span>
    </div>
  );
}

function ResolutionDrawer({
  res,
  onClose,
}: {
  res: Resolution;
  onClose: () => void;
}) {
  const [actions, setActions] = useState<ActionItem[]>(res.detail.actions);
  const [tab, setTab] = useState<"actions" | "summary">("actions");
  const done = actions.filter((a) => a.done).length;
  const total = actions.length;
  const allDone = done === total;

  const toggle = (index: number) =>
    setActions((prev) =>
      prev.map((a, i) => (i === index ? { ...a, done: !a.done } : a))
    );

  return (
    <aside className="res-drawer" role="region" aria-label="Resolution request detail">
        <div className="res-drawer__tabs">
          <button
            className={`res-tab${tab === "actions" ? " res-tab--active" : ""}`}
            onClick={() => setTab("actions")}
          >
            Actions
          </button>
          <button
            className={`res-tab${tab === "summary" ? " res-tab--active" : ""}`}
            onClick={() => setTab("summary")}
          >
            Overview
          </button>
          <button
            className="res-icon-btn res-drawer__close"
            aria-label="Close"
            onClick={onClose}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="res-drawer__ref">
          <span>Resolution Request #{res.orderId}</span>
        </div>

        <div className="res-drawer__body">
          {tab === "actions" ? (
            <section className="res-section">
              <div className="res-actions">
                {actions.map((a, i) => (
                  <button
                    type="button"
                    className={`res-action${a.done ? " res-action--done" : ""}`}
                    key={a.label}
                    onClick={() => toggle(i)}
                  >
                    <span className="res-action__check">
                      {a.done && <CheckIcon size={14} />}
                    </span>
                    <span className="res-action__body">
                      <span className="res-action__label">{a.label}</span>
                      <span className="res-action__hint">{a.hint}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <>
              <section className="res-section">
                <div className="res-section__head">
                  <AssignmentIcon size={16} />
                  <span>Request Summary</span>
                </div>
                <div className="res-kvs">
                  <KeyValue label="Status" value={statusLabels[res.status]} />
                  <KeyValue label="Type" value={res.type} />
                  <KeyValue label="Request Date" value={res.requestDate} />
                  <KeyValue label="Order ID" value={res.orderId} />
                  <KeyValue label="Tracking No." value={res.detail.tracking} />
                  <KeyValue label="Carrier" value={res.detail.carrier} />
                  <KeyValue label="Order Value" value={res.value} />
                  <KeyValue label="Resolution Amount" value={res.amount} />
                  <KeyValue label="Product" value={res.detail.product} />
                  <KeyValue label="Quantity" value={res.detail.quantity} />
                  <KeyValue label="Reason" value={res.reason} />
                  <KeyValue label="Issue" value={res.detail.reasonDetail} />
                  <KeyValue label="Customer Note" value={res.detail.customerNote} />
                </div>
              </section>
            </>
          )}
        </div>

        <footer className="res-drawer__foot">
          <button className="res-btn res-btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="res-btn res-btn--primary" disabled={!allDone}>
            {allDone ? "Complete" : `Complete (${done}/${total})`}
            <ChevronRight size={14} />
          </button>
        </footer>
    </aside>
  );
}

/* --------------------------------- Resolutions --------------------------------- */
export default function Resolutions() {
  const [layout, setLayout] = useState<"grid" | "table">("grid");
  const [scope, setScope] = useState<"todo" | "history">("todo");
  const [active, setActive] = useState<Resolution | null>(null);

  return (
    <main className="res">
      <div className="res-page">
        <nav className="res-breadcrumb">
          <a href="#home" onClick={(e) => e.preventDefault()}>
            Home
          </a>
          <ChevronRight size={14} />
          <span>Resolutions</span>
        </nav>

        <div className="res-head">
          <div className="res-head__titles">
            <h1 className="res-title">Resolutions</h1>
            <p className="res-subtitle">
              Resolution requests requiring your manual review or action
            </p>
          </div>
          <div className="res-scope">
            <button
              className={`res-scope-btn${scope === "todo" ? " is-active" : ""}`}
              onClick={() => setScope("todo")}
            >
              To Do
            </button>
            <button
              className={`res-scope-btn${scope === "history" ? " is-active" : ""}`}
              onClick={() => setScope("history")}
            >
              Resolution History
            </button>
          </div>
        </div>

        <div className="res-controls">
          {scope === "todo" ? (
            <>
              <div className="res-viewtoggle">
                <button
                  className={`res-view-btn${layout === "grid" ? " is-active" : ""}`}
                  onClick={() => setLayout("grid")}
                >
                  <GridIcon size={16} />
                  Grid
                </button>
                <button
                  className={`res-view-btn${layout === "table" ? " is-active" : ""}`}
                  onClick={() => setLayout("table")}
                >
                  <TableIcon size={16} />
                  Table
                </button>
              </div>
              <button className="res-tool-btn">
                <FilterIcon size={16} />
                Filters
              </button>
            </>
          ) : (
            <div className="res-stats">
              {historyStats.map((s) => (
                <div className="res-stat" key={s.label}>
                  <p className="res-stat__label">{s.label}</p>
                  <div className="res-stat__row">
                    <span className="res-stat__value">{s.value}</span>
                    <span className={`res-stat__delta ${s.up ? "is-up" : "is-down"}`}>
                      {s.up ? (
                        <TrendingUpIcon size={16} />
                      ) : (
                        <TrendingDownIcon size={16} />
                      )}
                      {s.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="res-panel__body">
          {scope === "history" ? (
            <ResolutionsTable onSelect={setActive} forceStatus="complete" />
          ) : layout === "grid" ? (
            <KanbanBoard onSelect={setActive} />
          ) : (
            <ResolutionsTable onSelect={setActive} />
          )}
        </div>
      </div>

      {active && (
        <ResolutionDrawer res={active} onClose={() => setActive(null)} />
      )}
    </main>
  );
}
