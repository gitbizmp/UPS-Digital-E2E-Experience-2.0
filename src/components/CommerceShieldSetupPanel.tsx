import { useEffect, useState } from "react";
import { CloseIcon, ShieldIcon, CheckIcon, CheckCircleIcon, PackageIcon } from "./icons";
import { paymentMethods } from "../data/postPurchase";
import "./ConnectStorePanel.css";
import "./CommerceShieldSetupPanel.css";

type PlanKey = "os" | "eos";

const PLANS: Record<PlanKey, {
  name: string;
  tag: string;
  amount: string;
  per: string;
  sub?: string;
  features: string[];
}> = {
  os: {
    name: "Order Scoring",
    tag: "Fraud detection",
    amount: "$0.30",
    per: "/order",
    features: [
      "ML risk scoring on 40+ signals",
      "Risk score (0–1000) on every order",
      "Manual review holds & email alerts",
      "Decisions in under 80ms",
    ],
  },
  eos: {
    name: "Enhanced Order Scoring",
    tag: "Fraud detection + chargeback protection",
    amount: "$0.30",
    per: "/order",
    sub: "+ 0.6% of order value",
    features: [
      "Everything in Order Scoring",
      "Chargeback protection on approved orders",
      "Reimbursement for fraudulent chargebacks",
      "Peace of mind on every approved sale",
    ],
  },
};

type Props = {
  open: boolean;
  onClose: () => void;
  onComplete?: (plan: PlanKey) => void;
};

export default function CommerceShieldSetupPanel({ open, onClose, onComplete }: Props) {
  const [plan, setPlan] = useState<PlanKey>("eos");
  const [pay, setPay] = useState(
    () => (paymentMethods.find((m) => m.isDefault) ?? paymentMethods[0]).last4,
  );
  const [shipProtect, setShipProtect] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const activePlan = PLANS[plan];

  return (
    <aside className={`side-panel ${open ? "side-panel--open" : ""}`} aria-hidden={!open}>
      <div className="side-panel__inner" role="region" aria-label="Set up CommerceShield">
        <header className="side-panel__header">
          <div className="css-titles">
            <h2 className="side-panel__title">Set up CommerceShield</h2>
            <p className="css-subtitle">Choose how CommerceShield scores and protects your orders.</p>
          </div>
          <button className="side-panel__close" onClick={onClose} aria-label="Close">
            <CloseIcon size={24} />
          </button>
        </header>

        <div className="side-panel__body">
          <div className="side-panel__secure">
            <ShieldIcon size={12} />
            <span>Real-time fraud scoring turns on for new orders once activated.</span>
          </div>

          <div className="css-plans">
            {(["os", "eos"] as PlanKey[]).map((key) => {
              const p = PLANS[key];
              const selected = plan === key;
              return (
                <button
                  type="button"
                  key={key}
                  className={`css-plan${selected ? " css-plan--selected" : ""}`}
                  onClick={() => setPlan(key)}
                  aria-pressed={selected}
                >
                  {key === "eos" && <span className="css-plan__badge">Most protection</span>}
                  <div className="css-plan__head">
                    <span className="css-plan__radio" aria-hidden />
                    <div className="css-plan__titles">
                      <span className="css-plan__name">{p.name}</span>
                      <span className="css-plan__tag">{p.tag}</span>
                    </div>
                    <div className="css-plan__price">
                      <span className="css-plan__amount">{p.amount}</span>
                      <span className="css-plan__per">{p.per}</span>
                      {p.sub && <span className="css-plan__sub">{p.sub}</span>}
                    </div>
                  </div>
                  <ul className="css-plan__features">
                    {p.features.map((f) => (
                      <li key={f}>
                        <CheckCircleIcon size={15} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="css-addon">
            <button
              type="button"
              className={`css-addon__toggle${shipProtect ? " css-addon__toggle--on" : ""}`}
              onClick={() => setShipProtect((v) => !v)}
              aria-pressed={shipProtect}
            >
              <span className="css-addon__icon"><PackageIcon size={18} /></span>
              <span className="css-addon__text">
                <span className="css-addon__title">Add Shipping Protection</span>
                <span className="css-addon__sub">
                  Cover loss, damage &amp; theft &mdash; from $0.80 per $100 of package value.
                </span>
              </span>
              <span className="css-switch" aria-hidden>
                <span className="css-switch__knob" />
              </span>
            </button>
            {shipProtect && (
              <p className="css-addon__note">
                You&rsquo;ll set which orders to cover in CommerceShield settings after activation.
              </p>
            )}
          </div>

          <div className="css-pay">
            <p className="css-pay__label">Payment method</p>
            {paymentMethods.map((m) => (
              <label className={`css-payrow${pay === m.last4 ? " css-payrow--selected" : ""}`} key={m.last4}>
                <input
                  type="radio"
                  name="css-pay"
                  checked={pay === m.last4}
                  onChange={() => setPay(m.last4)}
                />
                <span className="css-payrow__brand">{m.label}</span>
                <span className="css-payrow__num">•••• {m.last4}</span>
                {m.isDefault && <span className="css-payrow__default">Default</span>}
              </label>
            ))}
            <p className="css-pay__note">
              You’ll be billed monthly on this card for orders scored by CommerceShield.
            </p>
          </div>
        </div>

        <footer className="side-panel__actions">
          <button
            className="btn btn--primary"
            onClick={() => {
              onComplete?.(plan);
              onClose();
            }}
          >
            Activate CommerceShield
            <CheckIcon size={18} />
          </button>
          <button className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </aside>
  );
}
