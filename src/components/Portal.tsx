import { useState } from "react";
import Sidebar, { type View } from "./Sidebar";
import TopBar, { apps, type AppKey } from "./TopBar";
import Orders from "./Orders";
import TrackingPages from "./TrackingPages";
import Claims from "./Claims";
import Shipments from "./Shipments";
import Resolutions from "./Resolutions";
import Profile from "./Profile";
import LynkUpHub from "./LynkUpHub";
import Dashboard from "./Dashboard";
import { paymentMethods, type CapKey } from "../data/postPurchase";

type LynView = "home" | "landing" | "commerceshield" | "insureshield" | CapKey;

export default function Portal() {
  const [view, setView] = useState<View>("orders");
  const [app, setApp] = useState<AppKey>("lynkup");
  const [claimsUnreadCount, setClaimsUnreadCount] = useState(0);
  const [postPurchasePurchased, setPostPurchasePurchased] = useState(false);
  const [ppSubs, setPpSubs] = useState<Record<CapKey, boolean>>({
    notifications: true,
    feedback: true,
    resolutions: true,
    sameday: false,
    "hosted-tracking": false,
  });
  const [lynkupView, setLynkupView] = useState<LynView>("home");
  const [lynkupNav, setLynkupNav] = useState(0);
  const [commerceShieldConfigured, setCommerceShieldConfigured] = useState(false);
  const [insureShieldPurchased, setInsureShieldPurchased] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [claimsScope, setClaimsScope] = useState<"filed" | "drafts">("filed");
  const [claimsScopeToken, setClaimsScopeToken] = useState(0);

  const openClaimsDrafts = () => {
    setClaimsScope("drafts");
    setClaimsScopeToken((t) => t + 1);
    setApp("store-ops");
    setView("claims");
  };

  const appLabel = apps.find((a) => a.key === app)?.label ?? "UPS Digital Solutions";

  const openLynkUpConfig = () => {
    setLynkupView("landing");
    setLynkupNav((n) => n + 1);
    setApp("lynkup");
    setView("orders");
  };

  const configureCapabilityInLynkUp = (k: CapKey) => {
    setLynkupView(k);
    setLynkupNav((n) => n + 1);
    setApp("lynkup");
    setView("orders");
  };

  const configureCommerceShieldInLynkUp = () => {
    setLynkupView("commerceshield");
    setLynkupNav((n) => n + 1);
    setApp("lynkup");
    setView("orders");
  };

  const configureInsureShieldInLynkUp = () => {
    setLynkupView("insureshield");
    setLynkupNav((n) => n + 1);
    setApp("lynkup");
    setView("orders");
  };

  const safeView: View =
    !postPurchasePurchased && (view === "tracking" || view === "resolutions")
      ? "orders"
      : view;

  // LynkUp Hub is a self-contained shell (its own sidebar + top bar).
  if (app === "lynkup") {
    return (
      <LynkUpHub
        activeApp={app}
        onAppChange={(next) => {
          setApp(next);
          setView(next === "store-ops" ? "dashboard" : "orders");
        }}
        onProfile={() => {
          setApp("store-ops");
          setView("profile");
        }}
        onConfigured={() => {
          setPostPurchasePurchased(true);
          setApp("store-ops");
          setView("tracking");
        }}
        onStoreOpsEnabled={() => setPostPurchasePurchased(true)}
        onDeactivate={() => setPostPurchasePurchased(false)}
        onCommerceShieldConfigured={(active) => setCommerceShieldConfigured(active)}
        onInsureShieldActivated={() => setInsureShieldPurchased(true)}
        insureShieldPurchased={insureShieldPurchased}
        onGoToStoreOpsOrders={() => {
          setApp("store-ops");
          setView("orders");
        }}
        onGoToStoreOpsHome={() => {
          setApp("store-ops");
          setView("dashboard");
        }}
        postPurchaseActive={postPurchasePurchased}
        subs={ppSubs}
        onSubscribe={(k) => setPpSubs((s) => ({ ...s, [k]: true }))}
        onUnsubscribe={(k) => setPpSubs((s) => ({ ...s, [k]: false }))}
        paymentMethods={paymentMethods}
        initialView={lynkupView}
        navToken={lynkupNav}
      />
    );
  }

  return (
    <div className="app-shell">
      <TopBar
        onProfile={() => setView("profile")}
        activeApp={app}
        unreadCount={claimsUnreadCount}
        onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
        sidebarCollapsed={sidebarCollapsed}
        hideSuite={safeView === "profile"}
        onAppChange={(next) => {
          setApp(next);
          setView(next === "store-ops" ? "dashboard" : "orders");
          if (next === "lynkup") {
            setLynkupView("home");
            setLynkupNav((n) => n + 1);
          }
        }}
      />
      <div className="app-body">
        {safeView !== "profile" && (
          <Sidebar
            view={safeView}
            onNavigate={setView}
            showNav={app === "store-ops"}
            postPurchaseEnabled={postPurchasePurchased}
            claimsUnreadCount={claimsUnreadCount}
            collapsed={sidebarCollapsed}
          />
        )}
        <div className="app-content">
        {app !== "store-ops" ? (
          <main className="app-placeholder">
            <h1 className="app-placeholder__title">{appLabel}</h1>
            <p className="app-placeholder__text">This part of the suite is coming soon.</p>
          </main>
        ) : safeView === "orders" ? (
          <Orders commerceShieldActive={commerceShieldConfigured} />
        ) : safeView === "dashboard" ? (
          <Dashboard onOpenDrafts={openClaimsDrafts} />
        ) : safeView === "tracking" ? (
          <TrackingPages />
        ) : safeView === "shipments" ? (
          <Shipments />
        ) : safeView === "resolutions" ? (
          <Resolutions />
        ) : safeView === "profile" ? (
          <Profile
            postPurchasePurchased={postPurchasePurchased}
            postPurchaseSubs={ppSubs}
            commerceShieldPurchased={commerceShieldConfigured}
            insureShieldPurchased={insureShieldPurchased}
            onConfigureInLynkUp={openLynkUpConfig}
            onConfigureCommerceShieldInLynkUp={configureCommerceShieldInLynkUp}
            onConfigureInsureShieldInLynkUp={configureInsureShieldInLynkUp}
            onConfigureCapability={configureCapabilityInLynkUp}
            onCancelAddon={(k) => setPpSubs((s) => ({ ...s, [k]: false }))}
            onCancelCommerceShield={() => setCommerceShieldConfigured(false)}
            onBack={() => setView("orders")}
          />
        ) : (
          <Claims
            onUnreadCountChange={setClaimsUnreadCount}
            initialScope={claimsScope}
            scopeToken={claimsScopeToken}
          />
        )}
      </div>
      </div>
    </div>
  );
}
