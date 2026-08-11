// Shared Post Purchase + billing data used across Store Ops (Profile) and LynkUp Hub.

export type CapKey =
  | "notifications"
  | "feedback"
  | "resolutions"
  | "sameday"
  | "hosted-tracking";

export type PaymentMethod = {
  brand: string;
  label: string;
  last4: string;
  exp: string;
  isDefault: boolean;
};

export const paymentMethods: PaymentMethod[] = [
  { brand: "visa", label: "Visa", last4: "3465", exp: "01/2029", isDefault: true },
  { brand: "mastercard", label: "Mastercard", last4: "8821", exp: "07/2027", isDefault: false },
  { brand: "amex", label: "Amex", last4: "1004", exp: "11/2026", isDefault: false },
];

// Monthly price of each premium Post Purchase add-on, in USD.
export const PP_ADDON_PRICE = 15;

export type PpFeature = {
  key: CapKey;
  title: string;
  paid: boolean;
  blurb: string;
};

export const postPurchaseCatalog: PpFeature[] = [
  { key: "notifications", title: "Customer Notifications", paid: false, blurb: "SMS and email order updates." },
  { key: "feedback", title: "Hosted Feedback Page", paid: false, blurb: "Branded page for post delivery feedback." },
  { key: "resolutions", title: "Customer Resolutions", paid: false, blurb: "Self serve returns, refunds, and replacements." },
  { key: "sameday", title: "Same Day Live Tracking Page", paid: true, blurb: "Live map and ETA for same day delivery." },
  { key: "hosted-tracking", title: "Hosted Order Tracking Page", paid: true, blurb: "Branded tracking for multi fulfilment orders." },
];
