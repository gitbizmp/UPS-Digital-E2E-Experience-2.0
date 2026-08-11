import { useEffect, useState } from "react";
import {
  CloseIcon,
  ChevronRight,
  ChevronLeft,
  CheckIcon,
  SearchIcon,
  UnfoldMoreIcon,
} from "./icons";
import allShipmentsIcon from "../assets/insurance/all-shipments.svg";
import specificShipmentsIcon from "../assets/insurance/specific-shipments.png";
import "./ConnectStorePanel.css";
import "./InsurancePreferences.css";

type Scope = "all" | "specific";
type Step = "scope" | "products" | "summary";

type Product = { id: string; desc: string };

const products: Product[] = [
  { id: "WR-234", desc: "10*14mm Flat Teardrop Natural Amethyst" },
  { id: "WR-236", desc: "GenMartUSA Loose Gemstone" },
  { id: "WR-236", desc: "[ABCgems] Tanzanian Cranberry Garnet" },
  { id: "WR-234", desc: "10*14mm Flat Teardrop Natural Amethyst" },
  { id: "WR-236", desc: "GenMartUSA Loose Gemstone" },
  { id: "WR-236", desc: "[ABCgems] Tanzanian Cranberry Garnet" },
  { id: "WR-234", desc: "10*14mm Flat Teardrop Natural Amethyst" },
];

const subtitles: Record<Step, string> = {
  scope: "Which shipments do you want protected?",
  products: "All products are covered by default. Choose any you don’t want covered.",
  summary: "Review your summary.",
};

const progressByStep: Record<Step, number> = {
  scope: 0.17,
  products: 0.5,
  summary: 1,
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

type InsurancePreferencesProps = {
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
};

export default function InsurancePreferences({ open, onClose, onComplete }: InsurancePreferencesProps) {
  const [step, setStep] = useState<Step>("scope");
  const [scope, setScope] = useState<Scope>("all");
  const [excluded, setExcluded] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const toggleProduct = (i: number) =>
    setExcluded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const allChecked = excluded.size === products.length;
  const toggleAll = () =>
    setExcluded(allChecked ? new Set() : new Set(products.map((_, i) => i)));

  const advance = () => {
    if (step === "scope") setStep(scope === "specific" ? "products" : "summary");
    else if (step === "products") setStep("summary");
    else {
      onComplete?.();
      onClose();
    }
  };

  const progress = progressByStep[step];
  const primaryLabel = step === "summary" ? "Submit Preferences" : "Continue";
  const excludedProducts = products.filter((_, i) => excluded.has(i));

  return (
    <aside className={`side-panel ${open ? "side-panel--open" : ""}`} aria-hidden={!open}>
      <div className="side-panel__inner" role="region" aria-label="Insurance Preferences">
        <header className="side-panel__header">
          <div className="ins-titles">
            <h2 className="ins-title">Insurance Preferences</h2>
            <p className="ins-subtitle">{subtitles[step]}</p>
          </div>
          <button className="side-panel__close" onClick={onClose} aria-label="Close">
            <CloseIcon size={24} />
          </button>
        </header>

        <div className="side-panel__body">
          <div className="ins-progress" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span className="ins-progress__seg" key={i}>
                <span
                  className="ins-progress__fill"
                  style={{ width: `${clamp((progress * 3 - i) * 100)}%` }}
                />
              </span>
            ))}
          </div>

          {step === "scope" && (
            <div className="ins-options">
              <button
                type="button"
                className={`ins-option ${scope === "all" ? "ins-option--active" : ""}`}
                onClick={() => setScope("all")}
              >
                <span className="ins-radio">{scope === "all" && <CheckIcon size={12} />}</span>
                <img className="ins-option__icon" src={allShipmentsIcon} alt="" />
                <span className="ins-option__text">
                  <span className="ins-option__title">All Shipments</span>
                  <span className="ins-option__desc">Protect every shipment automatically</span>
                </span>
              </button>

              <button
                type="button"
                className={`ins-option ${scope === "specific" ? "ins-option--active" : ""}`}
                onClick={() => setScope("specific")}
              >
                <span className="ins-radio">
                  {scope === "specific" && <CheckIcon size={12} />}
                </span>
                <img className="ins-option__icon" src={specificShipmentsIcon} alt="" />
                <span className="ins-option__text">
                  <span className="ins-option__title">Specific Shipments</span>
                  <span className="ins-option__desc">Choose which products to protect</span>
                </span>
              </button>
            </div>
          )}

          {step === "products" && (
            <div className="ins-table">
              <div className="ins-table__toolbar">
                <span className="ins-table__tab">Product ID</span>
                <div className="ins-table__controls">
                  <button className="ins-table__ctrl" aria-label="Search">
                    <SearchIcon size={16} />
                  </button>
                  <button className="ins-table__ctrl" aria-label="Sort">
                    <UnfoldMoreIcon size={16} />
                  </button>
                </div>
              </div>
              <div className="ins-table__scroll">
                <table className="ins-table__grid">
                  <thead>
                    <tr>
                      <th className="ins-table__check">
                        <input
                          type="checkbox"
                          checked={allChecked}
                          onChange={toggleAll}
                          aria-label="Select all"
                        />
                      </th>
                      <th>Product ID</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, i) => (
                      <tr key={i}>
                        <td className="ins-table__check">
                          <input
                            type="checkbox"
                            checked={excluded.has(i)}
                            onChange={() => toggleProduct(i)}
                            aria-label={`Exclude ${p.id}`}
                          />
                        </td>
                        <td className="ins-table__id">{p.id}</td>
                        <td className="ins-table__desc">{p.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="ins-table__pagination">
                <button className="ins-table__page" aria-label="Previous page" disabled>
                  <ChevronLeft size={16} />
                </button>
                <button className="ins-table__page" aria-label="Next page">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === "summary" && (
            <div className="ins-summary">
              <p className="ins-summary__label">Coverage:</p>
              <p className="ins-summary__scope">
                {scope === "all" ? "All Shipments" : "Specific Shipments"}
              </p>
              {scope === "all" ? (
                <p className="ins-summary__note">Protect every shipment automatically</p>
              ) : (
                <>
                  <p className="ins-summary__note">
                    Protect all shipments except shipments with these products:
                  </p>
                  <ul className="ins-summary__list">
                    {excludedProducts.length > 0 ? (
                      excludedProducts.map((p, i) => (
                        <li key={i}>
                          {p.id}: {p.desc}
                        </li>
                      ))
                    ) : (
                      <li className="ins-summary__empty">No products excluded.</li>
                    )}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>

        <footer className="side-panel__actions">
          <button className="btn btn--primary" onClick={advance}>
            {primaryLabel}
            <ChevronRight size={18} />
          </button>
          <button className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </aside>
  );
}
