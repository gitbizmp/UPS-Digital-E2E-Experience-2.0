import { useEffect, useRef, useState } from "react";
import {
  BellIcon,
  AppsIcon,
  MenuIcon,
} from "./icons";
import upsLogo from "../assets/logos/ups-logo.png";
import operateImg from "../assets/apps/Operate.png";
import integrateImg from "../assets/apps/Integrate.png";
import controlImg from "../assets/apps/Control.png";
import developImg from "../assets/apps/Develop.png";
import "./TopBar.css";

type AppItem = {
  key: string;
  label: string;
  bg: string;
  img: string;
};

export type AppKey = "store-ops" | "lynkup" | "control-tower" | "develop";

export const apps: AppItem[] = [
  { key: "store-ops", label: "Operate", bg: "linear-gradient(135deg, #00bbbb 0%, #009292 100%)", img: operateImg },
  { key: "lynkup", label: "Integrate", bg: "linear-gradient(58.77deg, #0662bb 9.54%, #00337b 100%)", img: integrateImg },
  { key: "control-tower", label: "Control", bg: "linear-gradient(63.79deg, #613413 9.54%, #7e5844 100%)", img: controlImg },
  { key: "develop", label: "Develop", bg: "linear-gradient(135deg, #6ca342 0%, #3f810c 100%)", img: developImg },
];

export default function TopBar({
  onProfile,
  activeApp,
  onAppChange,
  unreadCount = 0,
  onToggleSidebar,
  sidebarCollapsed = false,
  hideSuite = false,
}: {
  onProfile?: () => void;
  activeApp: AppKey;
  onAppChange: (app: AppKey) => void;
  unreadCount?: number;
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
  hideSuite?: boolean;
}) {
  const [appsOpen, setAppsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  const activeAppItem = apps.find((a) => a.key === activeApp);

  useEffect(() => {
    if (!appsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setAppsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAppsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [appsOpen]);

  return (
    <header className={`topbar${hideSuite ? " topbar--plain" : ""}`}>
      <div className="topbar__left">
        {onToggleSidebar && !hideSuite && (
          <button
            type="button"
            className="topbar__menu-btn"
            onClick={onToggleSidebar}
            aria-label={sidebarCollapsed ? "Expand menu" : "Collapse menu"}
            aria-expanded={!sidebarCollapsed}
          >
            <MenuIcon size={20} className="topbar__menu" />
          </button>
        )}
        <div className="topbar__brand">
          <img src={upsLogo} alt="UPS" className="topbar__brand-logo" />
          <span className="topbar__brand-name">UPS Digital Solutions</span>
          {activeAppItem && !hideSuite && (
            <>
              <span className="topbar__brand-divider">|</span>
              <span className="topbar__brand-page">
                {activeAppItem.label}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="topbar__right">
        <button className="topbar__icon-btn topbar__icon-btn--notify" aria-label="Notifications">
          <BellIcon size={24} />
          {unreadCount > 0 && (
            <span className="topbar__notif-badge" aria-label={`${unreadCount} unread messages`}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        <div className="app-switcher" ref={switcherRef}>
          <button
            className="topbar__icon-btn"
            aria-label="Switch apps"
            aria-haspopup="true"
            aria-expanded={appsOpen}
            onClick={() => setAppsOpen((v) => !v)}
          >
            <AppsIcon size={24} />
          </button>

          {appsOpen && (
            <div className="app-switcher__drop" role="menu">
              {apps.map((app) => (
                <button
                  key={app.key}
                  type="button"
                  role="menuitemradio"
                  aria-checked={activeApp === app.key}
                  className={`app-tile${activeApp === app.key ? " app-tile--active" : ""}`}
                  onClick={() => {
                    onAppChange(app.key as AppKey);
                    setAppsOpen(false);
                  }}
                >
                  <span className="app-tile__icon" aria-hidden="true">
                    <img src={app.img} alt="" className="app-tile__icon-img" />
                  </span>
                  <span className="app-tile__label">{app.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="topbar__user" onClick={onProfile} aria-label="Open profile">
          <span className="topbar__biz">Rockwell&nbsp;Co.</span>
          <span className="topbar__avatar">R</span>
        </button>
      </div>
    </header>
  );
}
