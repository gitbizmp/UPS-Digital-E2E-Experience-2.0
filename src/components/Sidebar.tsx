import { useState } from "react";
import {
  OrdersIcon,
  TrackingIcon,
  ResolutionsIcon,
  ShieldIcon,
  HelpIcon,
  ChevronDown,
} from "./icons";
import "./Sidebar.css";

export type View =
  | "orders"
  | "tracking"
  | "claims"
  | "shipments"
  | "resolutions"
  | "profile"
  | "post-purchase";

type NavItem = { label: string; icon: React.ReactNode; view?: View };

const fulfillment: NavItem[] = [
  { label: "Orders", icon: <OrdersIcon size={16} />, view: "orders" },
];

const postPurchase: NavItem[] = [
  { label: "Tracking Pages", icon: <TrackingIcon size={16} />, view: "tracking" },
  { label: "Resolutions", icon: <ResolutionsIcon size={16} />, view: "resolutions" },
];

const insuranceSubtabs: { label: string; view: View }[] = [
  { label: "Shipments", view: "shipments" },
  { label: "Claims", view: "claims" },
];

function MenuLink({
  label,
  icon,
  active,
  onClick,
}: NavItem & { active?: boolean; onClick?: () => void }) {
  return (
    <button
      className={`menu-link${active ? " menu-link--active" : ""}`}
      onClick={onClick}
      title={label}
    >
      <span className="menu-link__icon">{icon}</span>
      <span className="menu-link__label">{label}</span>
    </button>
  );
}

export default function Sidebar({
  view,
  onNavigate,
  showNav = true,
  postPurchaseEnabled = false,
  claimsUnreadCount = 0,
  collapsed = false,
}: {
  view: View;
  onNavigate: (view: View) => void;
  showNav?: boolean;
  postPurchaseEnabled?: boolean;
  claimsUnreadCount?: number;
  collapsed?: boolean;
}) {
  const insuranceActive = view === "claims" || view === "shipments";
  const [insuranceOpen, setInsuranceOpen] = useState(insuranceActive);

  return (
    <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      <div className="sidebar__inner">
        {showNav && (
          <nav className="sidebar__middle">
          <div className="sidebar__section">
            <p className="sidebar__section-title">Pre-fulfillment</p>
            {fulfillment.map((item) => (
              <MenuLink
                key={item.label}
                {...item}
                active={!!item.view && view === item.view}
                onClick={item.view ? () => onNavigate(item.view!) : undefined}
              />
            ))}
          </div>

          <div className="sidebar__section">
            <p className="sidebar__section-title">Post-fulfillment</p>
            {postPurchaseEnabled ? (
              postPurchase.map((item) => (
                <MenuLink
                  key={item.label}
                  {...item}
                  active={!!item.view && view === item.view}
                  onClick={item.view ? () => onNavigate(item.view!) : undefined}
                />
              ))
            ) : null}

            <button
              className={`menu-link${insuranceActive ? " menu-link--active" : ""}`}
              onClick={() => setInsuranceOpen((o) => !o)}
              aria-expanded={insuranceOpen}
            >
              <span className="menu-link__icon">
                <ShieldIcon size={16} />
              </span>
              <span className="menu-link__label">Insurance</span>
              <ChevronDown
                size={16}
                className={`menu-link__chevron${
                  insuranceOpen ? " menu-link__chevron--open" : ""
                }`}
              />
            </button>

            {insuranceOpen && (
              <div className="sidebar__submenu">
                {insuranceSubtabs.map((sub) => (
                  <button
                    key={sub.view}
                    className={`submenu-link${
                      view === sub.view ? " submenu-link--active" : ""
                    }`}
                    onClick={() => onNavigate(sub.view)}
                  >
                    <span className="submenu-link__label">{sub.label}</span>
                    {sub.view === "claims" && claimsUnreadCount > 0 && (
                      <span className="submenu-link__badge">{claimsUnreadCount}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
        )}

        <div className="sidebar__bottom">
          <button className="menu-link menu-link--help">
            <span className="menu-link__icon">
              <HelpIcon size={16} />
            </span>
            <span className="menu-link__label">Help</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
