import { useEffect, useRef, useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

/* ---------- Icons (18x18, teal-filled to match production) ---------- */
const IconStore = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M4 4h16l1.2 4.2A2.4 2.4 0 0 1 18.9 11 2.4 2.4 0 0 1 16.5 8.6 2.4 2.4 0 0 1 12 8.6 2.4 2.4 0 0 1 7.5 8.6 2.4 2.4 0 0 1 2.8 8.2L4 4Zm0 8.6c.5.3 1 .4 1.6.4.9 0 1.7-.3 2.4-.9.7.6 1.5.9 2.4.9s1.7-.3 2.4-.9c.7.6 1.5.9 2.4.9.6 0 1.1-.1 1.6-.4V20H4v-7.4Zm5 2.4v3h6v-3H9Z" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 14a7.9 7.9 0 0 1-5.3-2c.1-1.6 3.5-2.5 5.3-2.5s5.2.9 5.3 2.5a7.9 7.9 0 0 1-5.3 2Z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm.4 2.2 8.6 6.1 8.6-6.1V6.8H3.4v.4Z" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M6.6 3.5 9 3.9l1.2 4.4-2 1.5a12 12 0 0 0 5.9 5.9l1.5-2 4.4 1.2.4 2.4a2 2 0 0 1-2 2.3A16.5 16.5 0 0 1 4.3 5.5a2 2 0 0 1 2.3-2Z" />
    <path d="M17.5 2.5v5M15 5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const Chevron = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 6 6 6-6 6" />
  </svg>
);
const Star = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="m12 2 2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2Z" />
  </svg>
);

/* ---------- Lead fields ---------- */
type LeadKey = "company" | "contact" | "email" | "phone";
type LeadField = {
  key: LeadKey;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  icon: () => ReactElement;
  error: string;
};
const LEAD_FIELDS: LeadField[] = [
  { key: "company", label: "Company Name", required: true, icon: IconStore, error: "Company name is required" },
  { key: "contact", label: "Contact Name", required: true, icon: IconUser, error: "Name is required" },
  { key: "email", label: "Company Email", required: true, type: "email", placeholder: "you@company.com", icon: IconMail, error: "Email is required" },
  { key: "phone", label: "Phone Number", placeholder: "(201) 555-0123", icon: IconPhone, error: "" },
];

/* ---------- Wizard questions ---------- */
type Option = { value: string; label: string; sub?: string };
type Question = {
  id: string;
  title: string;
  note?: string;
  type: "select" | "radio";
  placeholder?: string;
  options: Option[];
  listTitle?: string;
  list?: string[];
};
const QUESTIONS: Question[] = [
  {
    id: "volume",
    title: "About how many shipments do you send each week?",
    note: "Please note that we don't offer single occurrence shipment insurance.",
    type: "select",
    placeholder: "Select a volume",
    options: [
      { value: "1-5", label: "1-5" },
      { value: "6-50", label: "6-50" },
      { value: "51-250", label: "51-250" },
      { value: "251-500", label: "251-500" },
      { value: "501-999", label: "501-999" },
      { value: "1000+", label: "1,000+" },
    ],
  },
  {
    id: "modes",
    title: "What types of shipments do you typically send?",
    type: "radio",
    options: [
      { value: "parcel", label: "Only small parcel" },
      { value: "freight", label: "Only freight" },
      { value: "both", label: "All modes" },
    ],
  },
  {
    id: "highvalue",
    title: "Do you ship items valued over $50,000?",
    type: "radio",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "Rarely, if ever" },
    ],
  },
  {
    id: "solutions",
    title: "What kind of solutions do you need?",
    type: "radio",
    options: [
      { value: "platform", label: "Shipping, Labeling & Insurance", sub: "all in one platform" },
      { value: "insurance", label: "Insurance", sub: "for already set-up shipping infrastructure" },
    ],
  },
  {
    id: "luxury",
    title: "Do you ship high-value luxury goods?",
    type: "radio",
    listTitle: "View list of high-value goods",
    list: [
      "Jewelry",
      "Gemstones",
      "Watches",
      "Luxury Fashion Accessories",
      "Sports Memorabilia",
      "Cellphones",
      "Cameras/Drones",
      "Gaming Equipment",
      "Consumer Electronics",
    ],
    options: [
      { value: "yes", label: "Yes, we ship high-value luxury goods." },
      { value: "no", label: "No, we don't ship high-value luxury goods." },
    ],
  },
  {
    id: "ups",
    title: "Do you ship exclusively with UPS using your UPS shipper number?",
    type: "radio",
    options: [
      { value: "yes", label: "Yes, we ship only with UPS under our own UPS shipper number." },
      { value: "no", label: "No, we also ship with other carriers." },
    ],
  },
  {
    id: "coverage",
    title:
      "Would you prefer flexible, transactional insurance that adapts to your shipping volume or reliable blanket coverage you can set once and forget for every shipment?",
    type: "radio",
    options: [
      { value: "flexible", label: "We want to choose what gets insured" },
      { value: "blanket", label: "We want blanket coverage" },
    ],
  },
];

/* ---------- Products / comparison ---------- */
type Product = {
  id: string;
  short: string;
  name: string;
  desc: string;
  recommended?: boolean;
};
const PRODUCTS: Product[] = [
  { id: "connect", short: "Connect", name: "InsureShield\u00ae Connect", desc: "Shipment-by-shipment coverage with a customizable setup", recommended: true },
  { id: "complete", short: "Complete", name: "InsureShield\u00ae Complete", desc: "Blanket coverage for all shipments" },
  { id: "packages", short: "UPS", name: "InsureShield\u00ae for UPS\u00ae Packages", desc: "Shipment-by-shipment coverage for UPS small package only" },
  { id: "parcelpro", short: "Parcel Pro", name: "Parcel Pro\u00ae", desc: "Specialized risk mitigation and protection for high-value products" },
];

type CompareRow = { label: string; values: string[] };
const COMPARE_ROWS: CompareRow[] = [
  {
    label: "Coverage",
    values: [
      "Set business rules by connecting your shipments via API, webhooks, your UPS shipper number, or batch uploads",
      "Annual policy covers all your shipments",
      "Pay per shipment through your UPS shipper number",
      "Pay per shipment for your high-value UPS and FedEx shipments",
    ],
  },
  {
    label: "Covered carriers",
    values: [
      "All carriers and modes, including freight",
      "All carriers, including freight",
      "UPS only",
      "UPS + FedEx only",
    ],
  },
  {
    label: "Best for",
    values: [
      "Businesses looking for flexible, case-by-case insurance solutions",
      "Businesses seeking simple, all-inclusive shipment protection",
      "Businesses that ship exclusively with UPS though their shipper number",
      "Businesses shipping high-value items needing expanded risk tools",
    ],
  },
  {
    label: "Billing",
    values: [
      "Transactional, pay-as-you-go billed monthly",
      "Premium billed in monthly, quarterly, semi-annual, or annual installments",
      "Billed weekly or bi-weekly through us or through UPS based on declared value",
      "Transactional, pay-as-you-go billed monthly",
    ],
  },
];

/* ---------- Footer data ---------- */
const FOOTER_NAV: { heading: string; links: string[] }[] = [
  {
    heading: "InsureShield Sites",
    links: ["Shipping Insurance", "Delivery Orchestration", "Claims", "Partners", "Resources", "About"],
  },
  {
    heading: "Other UPS Sites",
    links: ["UPS Capital", "Parcel Pro", "UPS", "UPS Supply Chain Solutions", "About UPS"],
  },
  {
    heading: "Connect with Us",
    links: ["Facebook", "Instagram", "@UPSCapital", "LinkedIn", "YouTube"],
  },
];
const FOOTER_LEGAL = [
  "Website Terms of Use",
  "Technology Agreement",
  "Product Disclosure",
  "Terms of Service",
  "Your California Privacy Rights",
  "Privacy Notice",
  "Cookie Settings",
  "Do Not Sell or Share My Personal Information",
];

function Footer() {
  return (
    <footer className="qfooter">
      <div className="qfooter__inner">
        <div className="qfooter__nav">
          {FOOTER_NAV.map((col) => (
            <div key={col.heading} className="qfooter__col">
              <h3 className="qfooter__heading">{col.heading}</h3>
              <ul className="qfooter__links">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="qfooter__divider" />

        <ul className="qfooter__legal">
          {FOOTER_LEGAL.map((l) => (
            <li key={l}>
              <a href="#">{l}</a>
            </li>
          ))}
        </ul>

        <p className="qfooter__copy">
          Copyright &copy; 2026 United Parcel Service of America, Inc.. All rights reserved.
        </p>
        <p className="qfooter__recaptcha">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of
          Service apply.
        </p>
      </div>
    </footer>
  );
}

export default function Questionnaire() {
  const navigate = useNavigate();
  type Phase = "lead" | "wizard" | "rec";
  const [phase, setPhase] = useState<Phase>("lead");
  const [lead, setLead] = useState<Record<LeadKey, string>>({
    company: "",
    contact: "",
    email: "",
    phone: "",
  });
  const [showErrors, setShowErrors] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answered, setAnswered] = useState(0); // number of questions revealed/answered
  const [openList, setOpenList] = useState<Record<string, boolean>>({});
  const scrollAnchor = useRef<HTMLDivElement | null>(null);

  // Smooth-scroll to the newest question as the form accumulates.
  useEffect(() => {
    if (phase === "wizard" && answered > 0) {
      scrollAnchor.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [answered, phase]);

  // Start the recommendation page at the top.
  useEffect(() => {
    if (phase === "rec") {
      window.scrollTo(0, 0);
    }
  }, [phase]);

  const leadValid = !!(lead.company.trim() && lead.contact.trim() && lead.email.trim());

  // Progress value (0-100) drives the clip-path gradient reveal.
  let pbValue = 5;
  if (phase === "wizard") pbValue = 12 + (answered / QUESTIONS.length) * 78;
  if (phase === "rec") pbValue = 100;

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadValid) {
      setShowErrors(true);
      return;
    }
    setPhase("wizard");
    setAnswered(1); // reveal first question
  };

  const answer = (qid: string, value: string, index: number) => {
    setAnswers((a) => ({ ...a, [qid]: value }));
    if (index + 1 >= QUESTIONS.length) {
      setTimeout(() => setPhase("rec"), 220);
    } else if (index + 1 > answered - 1) {
      setTimeout(() => setAnswered(index + 2), 160);
    }
  };

  const back = () => {
    if (phase === "rec") {
      setPhase("wizard");
      setAnswered(QUESTIONS.length);
      return;
    }
    if (phase === "wizard") {
      if (answered <= 1) {
        setPhase("lead");
      } else {
        setAnswered((n) => n - 1);
      }
    }
  };

  return (
    <div className="qflow">
      {/* Masthead — visually hidden, matches production */}
      <header className="qflow__masthead">
        <h1>Sign up for a UPS Business Account</h1>
        <p>
          Answer a few questions to find the right shipping and supply chain solutions for
          your business.
        </p>
      </header>

      {/* Sticky progress header */}
      <div className="qflow__progress-header">
        <div
          className="pb-track"
          role="progressbar"
          aria-valuenow={Math.round(pbValue)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span className="pb-gradient" style={{ ["--pb-value" as string]: `${pbValue}%` }} />
        </div>
      </div>

      <main className={`qflow__main${phase === "rec" ? " qflow__main--rec" : ""}`}>
        {/* ---------- Lead panel ---------- */}
        {phase === "lead" && (
          <section className="qlead">
            <h2 className="qlead__title">Instant Pricing and Quick Coverage</h2>
            <p className="qlead__sub">Start protecting your shipments as soon as tomorrow.</p>

            <form className="qlead__form" onSubmit={submitLead} noValidate>
              {LEAD_FIELDS.map((f) => {
                const Icon = f.icon;
                const hasError = showErrors && f.required && !lead[f.key].trim();
                return (
                  <div className="qfield" key={f.key}>
                    <div className="qfield__box">
                      <span className="qfield__icon">
                        <Icon />
                      </span>
                      <input
                        id={`lead-${f.key}`}
                        className={`qfield__input${hasError ? " qfield__input--error" : ""}`}
                        type={f.type ?? "text"}
                        value={lead[f.key]}
                        placeholder={f.placeholder ?? " "}
                        onChange={(e) => setLead({ ...lead, [f.key]: e.target.value })}
                      />
                      <label htmlFor={`lead-${f.key}`} className="qfield__label">
                        {f.label}
                        {f.required && <span className="qfield__req">*</span>}
                      </label>
                    </div>
                    {hasError && <p className="qfield__error">{f.error}</p>}
                  </div>
                );
              })}

              <button className="qbtn qbtn--primary qlead__go" type="submit">
                Let's Go
                <Chevron />
              </button>
            </form>
          </section>
        )}

        {/* ---------- Wizard ---------- */}
        {phase === "wizard" && (
          <section className="qwizard">
            <h2 className="qwizard__title">Let's find the right fit for your business</h2>

            <div className="qwizard__questions">
              {QUESTIONS.slice(0, answered).map((q, i) => {
                const isLast = i === answered - 1;
                return (
                  <div className="qquestion" key={q.id} ref={isLast ? scrollAnchor : null}>
                    <h3 className="qquestion__title">{q.title}</h3>

                    {q.list && (
                      <div className="qquestion__aside">
                        <button
                          type="button"
                          className="qlink"
                          onClick={() =>
                            setOpenList((o) => ({ ...o, [q.id]: !o[q.id] }))
                          }
                        >
                          {q.listTitle}
                        </button>
                        {openList[q.id] && (
                          <ul className="qquestion__list">
                            {q.list.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    {q.type === "select" ? (
                      <select
                        className="qselect"
                        value={answers[q.id] ?? ""}
                        onChange={(e) => answer(q.id, e.target.value, i)}
                      >
                        <option value="" disabled>
                          {q.placeholder}
                        </option>
                        {q.options.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="qoptions">
                        {q.options.map((o) => {
                          const selected = answers[q.id] === o.value;
                          return (
                            <button
                              type="button"
                              key={o.value}
                              className={`qoption${selected ? " qoption--selected" : ""}`}
                              onClick={() => answer(q.id, o.value, i)}
                            >
                              <span className="qoption__radio" />
                              <span className="qoption__text">
                                <span className="qoption__label">{o.label}</span>
                                {o.sub && <span className="qoption__sub">{o.sub}</span>}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {q.note && <p className="qquestion__note">{q.note}</p>}
                  </div>
                );
              })}
            </div>

            <button type="button" className="qback" onClick={back}>
              Back
            </button>
          </section>
        )}

        {/* ---------- Recommendation ---------- */}
        {phase === "rec" && (
          <section className="qrec">
            <h2 className="qrec__title">InsureShield&reg; Connect is a good fit!</h2>
            <p className="qrec__sub">
              Recommendations are based on your responses. Please review coverage terms and
              options carefully before applying.
            </p>

            <div className="qcards">
              {PRODUCTS.map((p) => (
                <div
                  key={p.id}
                  className={`qcard${p.recommended ? " qcard--recommended" : ""}`}
                >
                  {p.recommended && (
                    <span className="qcard__badge">
                      <Star />
                      Recommended
                    </span>
                  )}
                  <div className="qcard__icon">{p.short}</div>
                  <h3 className="qcard__name">{p.name}</h3>
                  <p className="qcard__desc">{p.desc}</p>
                  <button
                    type="button"
                    className={`qbtn qcard__select${
                      p.recommended ? " qbtn--primary" : " qbtn--outline"
                    }`}
                    onClick={() => navigate("/login")}
                  >
                    Select
                    <Chevron />
                  </button>
                </div>
              ))}
            </div>

            <div className="qcompare">
              <h2 className="qcompare__heading">Compare Options</h2>
              <p className="qcompare__sub">
                Here's how the options compare so you can choose with confidence.
              </p>

              <div className="qtable">
                <div className="qtable__row qtable__row--head">
                  {PRODUCTS.map((p) => (
                    <div
                      key={p.id}
                      className={`qtable__cell qtable__cell--head${
                        p.recommended ? " qtable__cell--hl" : ""
                      }`}
                    >
                      {p.name}
                    </div>
                  ))}
                </div>

                {COMPARE_ROWS.map((row) => (
                  <div className="qtable__row" key={row.label}>
                    {row.values.map((v, idx) => (
                      <div
                        key={idx}
                        className={`qtable__cell${
                          PRODUCTS[idx].recommended ? " qtable__cell--hl" : ""
                        }`}
                      >
                        <span className="qtable__cat">{row.label}</span>
                        <span className="qtable__val">{v}</span>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="qtable__row qtable__row--foot">
                  {PRODUCTS.map((p) => (
                    <div
                      key={p.id}
                      className={`qtable__cell${p.recommended ? " qtable__cell--hl" : ""}`}
                    >
                      <button
                        type="button"
                        className={`qbtn qcard__select${
                          p.recommended ? " qbtn--primary" : " qbtn--outline"
                        }`}
                        onClick={() => navigate("/login")}
                      >
                        Select
                        <Chevron />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button type="button" className="qback" onClick={back}>
              Back
            </button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
