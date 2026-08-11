import { useEffect, useState } from "react";
import { CloseIcon, ShieldIcon, ChevronRight, CheckIcon } from "./icons";
import "./ConnectStorePanel.css";

type Platform = {
  name: string;
  initial: string;
  color: string;
  desc: string;
};

const platforms: Platform[] = [
  { name: "WooCommerce", initial: "W", color: "#7f54b3", desc: "Sync orders and shipments from your WordPress WooCommerce store." },
  { name: "Shopify", initial: "S", color: "#95bf47", desc: "Connect your Shopify storefront to automate order and tracking updates." },
  { name: "Ship Station", initial: "SS", color: "#2b6bed", desc: "Import shipments and manage fulfillment through your ShipStation account." },
  { name: "Magento", initial: "M", color: "#ee672f", desc: "Link your Adobe Commerce (Magento) store to sync orders in real time." },
  { name: "Oracle SCM", initial: "O", color: "#c74634", desc: "Integrate Oracle SCM to streamline supply chain and order data." },
];

type Status = "idle" | "connecting" | "connected";
type Creds = { shopId: string; apiKey: string; apiSecret: string };

const emptyCreds: Creds = { shopId: "", apiKey: "", apiSecret: "" };

type ConnectStorePanelProps = {
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
};

export default function ConnectStorePanel({ open, onClose, onComplete }: ConnectStorePanelProps) {
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [creds, setCreds] = useState<Record<string, Creds>>({});

  const statusOf = (name: string): Status => statuses[name] ?? "idle";
  const credsOf = (name: string): Creds => creds[name] ?? emptyCreds;

  const openForm = (name: string) => {
    setStatuses((s) => ({ ...s, [name]: "connecting" }));
    setCreds((c) => (c[name] ? c : { ...c, [name]: { ...emptyCreds } }));
  };

  const updateCred = (name: string, field: keyof Creds, value: string) =>
    setCreds((c) => ({ ...c, [name]: { ...(c[name] ?? emptyCreds), [field]: value } }));

  const testConnection = (name: string) =>
    setStatuses((s) => ({ ...s, [name]: "connected" }));

  const disconnect = (name: string) =>
    setStatuses((s) => ({ ...s, [name]: "idle" }));

  const hasConnected = platforms.some((p) => statusOf(p.name) === "connected");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <aside
      className={`side-panel ${open ? "side-panel--open" : ""}`}
      aria-hidden={!open}
    >
      <div
        className="side-panel__inner"
        role="region"
        aria-label="Connect e-Commerce Store"
      >
        <header className="side-panel__header">
          <h2 className="side-panel__title">Connect e-Commerce Store</h2>
          <button className="side-panel__close" onClick={onClose} aria-label="Close">
            <CloseIcon size={24} />
          </button>
        </header>

        <div className="side-panel__body">
          <div className="side-panel__secure">
            <ShieldIcon size={12} />
            <span>Your credentials are encrypted and stored securely.</span>
          </div>

          <ul className="side-panel__list">
            {platforms.map((p) => {
              const status = statusOf(p.name);
              const c = credsOf(p.name);
              return (
                <li className={`store-row store-row--${status}`} key={p.name}>
                  <span
                    className="store-row__logo"
                    aria-hidden
                    style={{ background: p.color }}
                  >
                    {p.initial}
                  </span>
                  <div className="store-row__main">
                    <div className="store-row__head">
                      <div className="store-row__info">
                        <p className="store-row__name">{p.name}</p>
                        {status === "connected" ? (
                          <p className="store-row__synced">
                            <CheckIcon size={13} />
                            Orders Synced
                          </p>
                        ) : (
                          <p className="store-row__desc">{p.desc}</p>
                        )}
                      </div>
                      {status === "idle" && (
                        <button
                          className="btn btn--outline btn--sm store-row__cta"
                          onClick={() => openForm(p.name)}
                        >
                          Connect
                          <ChevronRight size={14} />
                        </button>
                      )}
                      {status === "connected" && (
                        <button
                          className="btn btn--outline btn--sm store-row__cta"
                          onClick={() => disconnect(p.name)}
                        >
                          Disconnect
                        </button>
                      )}
                    </div>

                    {status === "connecting" && (
                      <div className="store-form">
                        <StoreField
                          label="Shop ID"
                          value={c.shopId}
                          onChange={(v) => updateCred(p.name, "shopId", v)}
                        />
                        <StoreField
                          label="API Key"
                          value={c.apiKey}
                          onChange={(v) => updateCred(p.name, "apiKey", v)}
                        />
                        <StoreField
                          label="API Secret"
                          value={c.apiSecret}
                          onChange={(v) => updateCred(p.name, "apiSecret", v)}
                        />
                        <button
                          className="btn btn--outline btn--sm store-form__test"
                          onClick={() => testConnection(p.name)}
                        >
                          Test Connection
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="side-panel__actions">
          <button
            className={`btn ${hasConnected ? "btn--primary" : "btn--disabled"}`}
            disabled={!hasConnected}
            onClick={() => {
              onComplete?.();
              onClose();
            }}
          >
            Submit Connections
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

type StoreFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function StoreField({ label, value, onChange }: StoreFieldProps) {
  return (
    <label className="store-field">
      <input
        className="store-field__input"
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="store-field__label">{label}</span>
    </label>
  );
}
