import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircleIcon, ArrowRightAltIcon, ShieldIcon, StarIcon, ChevronDown } from "./icons";
import "./InsureShieldConfig.css";

/* ---------- LimeAide acquisition questions (page version) ---------- */
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

/* ---------- Products ---------- */
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
  { id: "parcelpro", short: "Parcel Pro", name: "Parcel Pro\u00ae", desc: "Specialized risk mitigation for high-value products" },
];

type Props = {
  activated: boolean;
  onActivate: (productName: string) => void;
  onGoToOperate: () => void;
};

export default function InsureShieldConfig({ activated, onActivate, onGoToOperate }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answered, setAnswered] = useState(1); // number of questions revealed
  const [phase, setPhase] = useState<"questions" | "rec">("questions");
  const [openList, setOpenList] = useState<Record<string, boolean>>({});
  const scrollAnchor = useRef<HTMLDivElement | null>(null);
  const recRef = useRef<HTMLDivElement | null>(null);

  const answeredCount = useMemo(
    () => QUESTIONS.filter((q) => !!answers[q.id]).length,
    [answers],
  );

  // Progress value (0-100) drives the clip-path gradient reveal.
  const pbValue = phase === "rec" ? 100 : 8 + (answeredCount / QUESTIONS.length) * 84;

  // Smooth-scroll to the newest revealed question as the widget grows.
  useEffect(() => {
    if (phase === "questions" && answered > 1) {
      scrollAnchor.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [answered, phase]);

  useEffect(() => {
    if (phase === "rec") {
      requestAnimationFrame(() =>
        recRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, [phase]);

  const answer = (id: string, value: string, index: number) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    if (index + 1 >= QUESTIONS.length) {
      setTimeout(() => setPhase("rec"), 260);
    } else if (index + 1 > answered - 1) {
      setTimeout(() => setAnswered(index + 2), 180);
    }
  };

  const back = () => {
    if (phase === "rec") {
      setPhase("questions");
      setAnswered(QUESTIONS.length);
    } else if (answered > 1) {
      setAnswered((n) => n - 1);
    }
  };

  /* ---------------- Activated success state ---------------- */
  if (activated) {
    return (
      <div className="isc">
        <div className="isc-success">
          <span className="isc-success__icon">
            <CheckCircleIcon size={40} />
          </span>
          <h2 className="isc-success__title">Your InsureShield&reg; Connect policy is active</h2>
          <p className="isc-success__body">
            Eligible shipments are now protected against loss, damage, and theft. You can review and
            adjust your policy anytime from your Profile, and file claims from Operate.
          </p>
          <div className="isc-success__meta">
            <div className="isc-success__metaitem">
              <span className="isc-success__metalabel">Policy</span>
              <span className="isc-success__metaval">InsureShield&reg; Connect</span>
            </div>
            <div className="isc-success__metaitem">
              <span className="isc-success__metalabel">Policy #</span>
              <span className="isc-success__metaval">1234-567890</span>
            </div>
            <div className="isc-success__metaitem">
              <span className="isc-success__metalabel">Status</span>
              <span className="isc-badge">Active</span>
            </div>
          </div>
          <button type="button" className="lyn-btn lyn-btn--primary" onClick={onGoToOperate}>
            Go to Operate
            <ArrowRightAltIcon size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="isc">
      {/* Value proposition band */}
      <div className="isc-band">
        <div className="isc-band__item">
          <span className="isc-band__icon"><ShieldIcon size={20} /></span>
          <div className="isc-band__text">
            <p className="isc-band__title">Protect every shipment</p>
            <p className="isc-band__body">Coverage for loss, damage, and porch piracy across carriers.</p>
          </div>
        </div>
        <div className="isc-band__item">
          <span className="isc-band__icon"><CheckCircleIcon size={20} /></span>
          <div className="isc-band__text">
            <p className="isc-band__title">Faster claims</p>
            <p className="isc-band__body">Most claims resolved in under 4 days with the online portal.</p>
          </div>
        </div>
        <div className="isc-band__item">
          <span className="isc-band__icon"><StarIcon size={20} /></span>
          <div className="isc-band__text">
            <p className="isc-band__title">Coverage tuned to you</p>
            <p className="isc-band__body">Answer a few questions to get the right policy recommendation.</p>
          </div>
        </div>
      </div>

      <div className="isc-widget">
        {/* Gradient progress bar */}
        <div className="isc-widget__progress">
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

        <div className="isc-widget__body">
          {/* ---------- Questions ---------- */}
          {phase === "questions" && (
            <section className="isc-wizard">
              <h2 className="isc-wizard__title">Let&rsquo;s find the right coverage for your business</h2>
              <p className="isc-wizard__sub">
                Answer a few questions and we&rsquo;ll recommend the policy that fits.
              </p>

              <div className="isc-qs">
                {QUESTIONS.slice(0, answered).map((q, i) => {
                  const isLast = i === answered - 1;
                  return (
                    <div className="isc-q" key={q.id} ref={isLast ? scrollAnchor : null}>
                      <h3 className="isc-q__title">{q.title}</h3>

                      {q.list && (
                        <div className="isc-q__aside">
                          <button
                            type="button"
                            className="isc-link"
                            onClick={() => setOpenList((o) => ({ ...o, [q.id]: !o[q.id] }))}
                          >
                            {q.listTitle}
                            <ChevronDown size={14} className={`isc-link__chev${openList[q.id] ? " is-open" : ""}`} />
                          </button>
                          {openList[q.id] && (
                            <ul className="isc-q__list">
                              {q.list.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      {q.type === "select" ? (
                        <div className="isc-select">
                          <select
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
                          <ChevronDown size={16} />
                        </div>
                      ) : (
                        <div className="isc-options">
                          {q.options.map((o) => {
                            const selected = answers[q.id] === o.value;
                            return (
                              <button
                                type="button"
                                key={o.value}
                                className={`isc-option${selected ? " isc-option--selected" : ""}`}
                                onClick={() => answer(q.id, o.value, i)}
                              >
                                <span className="isc-option__radio" />
                                <span className="isc-option__text">
                                  <span className="isc-option__label">{o.label}</span>
                                  {o.sub && <span className="isc-option__sub">{o.sub}</span>}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {q.note && <p className="isc-q__note">{q.note}</p>}
                    </div>
                  );
                })}
              </div>

              {answered > 1 && (
                <button type="button" className="isc-back" onClick={back}>
                  Back
                </button>
              )}
            </section>
          )}

          {/* ---------- Recommendation ---------- */}
          {phase === "rec" && (
            <section className="isc-rec" ref={recRef}>
              <div className="isc-rec__intro">
                <h2 className="isc-rec__title">InsureShield&reg; Connect is a good fit!</h2>
                <p className="isc-rec__sub">
                  Based on your responses. Review coverage terms carefully, then activate your policy.
                </p>
              </div>

              <div className="isc-cards">
                {PRODUCTS.map((p) => (
                  <div key={p.id} className={`isc-card${p.recommended ? " isc-card--recommended" : ""}`}>
                    {p.recommended && (
                      <span className="isc-card__badge">
                        <StarIcon size={14} />
                        Recommended
                      </span>
                    )}
                    <div className="isc-card__icon">{p.short}</div>
                    <h3 className="isc-card__name">{p.name}</h3>
                    <p className="isc-card__desc">{p.desc}</p>
                    <button
                      type="button"
                      className={`lyn-btn ${p.recommended ? "lyn-btn--primary" : "lyn-btn--ghost"} isc-card__cta`}
                      onClick={() => onActivate(p.name)}
                    >
                      {p.recommended ? "Select & activate" : "Select"}
                    </button>
                  </div>
                ))}
              </div>

              <button type="button" className="isc-back" onClick={back}>
                Back to questions
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
