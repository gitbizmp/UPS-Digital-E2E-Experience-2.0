import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function GoogleWord({ className }: { className?: string }) {
  return (
    <span className={`goog-word${className ? " " + className : ""}`}>
      <span className="goog-word__b">G</span>
      <span className="goog-word__r">o</span>
      <span className="goog-word__y">o</span>
      <span className="goog-word__b">g</span>
      <span className="goog-word__g">l</span>
      <span className="goog-word__r">e</span>
    </span>
  );
}

function SearchGlyph({ size = 20, color = "#9aa0a6" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DEFAULT_QUERY = "small business package insurance";

export function GoogleHome() {
  const navigate = useNavigate();
  const [q, setQ] = useState(DEFAULT_QUERY);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q.trim() || DEFAULT_QUERY)}`);
  };

  return (
    <div className="goog">
      <div className="goog-home">
        <GoogleWord className="goog-home__logo" />
        <form className="goog-home__search" onSubmit={submit}>
          <span className="goog-home__icon goog-home__icon--search">
            <SearchGlyph size={20} color="#9aa0a6" />
          </span>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search"
            autoFocus
          />
        </form>
        <div className="goog-home__btns">
          <button className="goog-btn" type="button" onClick={submit as never}>
            Google Search
          </button>
          <button className="goog-btn" type="button" onClick={submit as never}>
            I'm Feeling Lucky
          </button>
        </div>
      </div>
    </div>
  );
}

export function GoogleResults() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initial = params.get("q") || DEFAULT_QUERY;
  const [q, setQ] = useState(initial);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q.trim() || DEFAULT_QUERY)}`);
  };

  return (
    <div className="goog">
      <div className="goog-serp__bar">
        <GoogleWord className="goog-serp__logo" />
        <form className="goog-serp__search" onSubmit={submit}>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search"
          />
          <span className="goog-home__icon goog-home__icon--search">
            <SearchGlyph size={20} color="#4285f4" />
          </span>
        </form>
      </div>

      <div className="goog-serp__tabs">
        <span className="goog-serp__tab goog-serp__tab--active">All</span>
        <span className="goog-serp__tab">News</span>
        <span className="goog-serp__tab">Images</span>
        <span className="goog-serp__tab">Shopping</span>
        <span className="goog-serp__tab">Videos</span>
        <span className="goog-serp__tab">More</span>
      </div>

      <div className="goog-serp__body">
        <p className="goog-serp__count">About 4,120,000 results (0.48 seconds)</p>

        {/* Sponsored UPS Digital ad */}
        <div className="goog-result">
          <div className="goog-result__spon">Sponsored</div>
          <div className="goog-result__url-row">
            <span className="goog-result__fav">U</span>
            <div>
              <div className="goog-result__site">UPS Digital</div>
              <div className="goog-result__url">https://www.ups.com/digital/insurance</div>
            </div>
          </div>
          <button className="goog-result__title" onClick={() => navigate("/ups-digital")}>
            Package Insurance for Small Business | UPS Digital
          </button>
          <p className="goog-result__snippet">
            Protect every shipment with flexible, pay-as-you-go coverage built for small
            businesses. Get InsureShield&reg; Connect coverage in minutes &mdash; no long-term
            contracts. Fast claims, simple setup.
          </p>
        </div>

        {/* Organic results */}
        <div className="goog-result">
          <div className="goog-result__url-row">
            <span className="goog-result__fav" style={{ background: "#1a73e8" }}>
              I
            </span>
            <div>
              <div className="goog-result__site">Insureon</div>
              <div className="goog-result__url">https://www.insureon.com &rsaquo; small-business</div>
            </div>
          </div>
          <button className="goog-result__title">
            Small Business Insurance: Compare Quotes Online
          </button>
          <p className="goog-result__snippet">
            Get free small business insurance quotes and buy a policy online. Compare
            general liability, commercial property, and package coverage from top carriers.
          </p>
        </div>

        <div className="goog-result">
          <div className="goog-result__url-row">
            <span className="goog-result__fav" style={{ background: "#188038" }}>
              N
            </span>
            <div>
              <div className="goog-result__site">NerdWallet</div>
              <div className="goog-result__url">https://www.nerdwallet.com &rsaquo; shipping-insurance</div>
            </div>
          </div>
          <button className="goog-result__title">
            Shipping &amp; Package Insurance: What Small Businesses Need to Know
          </button>
          <p className="goog-result__snippet">
            A guide to insuring packages you ship. Learn how carrier coverage works, what it
            costs, and when third-party package insurance makes sense for your business.
          </p>
        </div>
      </div>
    </div>
  );
}
