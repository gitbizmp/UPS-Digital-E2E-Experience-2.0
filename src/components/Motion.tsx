import { useEffect, useState, type CSSProperties } from "react";
import "./Motion.css";
import {
  OperateSignature,
  IntegrateSignature,
  ControlSignature,
  DevelopSignature,
} from "./MotionSignatures";
import upsBrand from "../assets/logos/ups-logo.png";

/* ------------------------------------------------------------------
   Inline SVG logos (exact vectors from Figma)
   Each path is a child so CSS can animate them individually.
   stroke paths use pathLength={1} so the "draw" effect is uniform.
------------------------------------------------------------------ */
function OperateSvg() {
  return (
    <svg viewBox="0 0 217 190" width="100%" height="100%" fill="none" aria-hidden>
      <g transform="translate(116.5 0)">
        <path
          d="M50.25 0C77.8642 0 100.5 22.3858 100.5 50V140C100.5 167.614 77.8642 190 50.25 190C22.6358 190 9.7731e-07 167.614 0 140V50C9.7731e-07 22.3858 22.6358 0 50.25 0ZM26.8555 56.8203C24.8875 55.2714 22 56.6733 22 59.1777V118.337C22.0002 121.255 25.745 122.456 27.4414 120.081L36.1982 107.82C37.5348 105.949 40.3936 106.216 41.3613 108.302L52.9434 133.267C53.6427 134.773 55.4334 135.425 56.9375 134.721L62.791 131.977C64.2879 131.275 64.9353 129.494 64.2383 127.995L52.5703 102.914C51.6452 100.925 53.0968 98.6485 55.29 98.6484H71.3379C74.1852 98.648 75.4305 95.0523 73.1934 93.291L26.8555 56.8203Z"
          fill="#FCC400"
        />
      </g>
      <rect x="0" y="0" width="100.5" height="87" rx="43.5" fill="#FCC400" />
      <rect x="0" y="103" width="100.5" height="87" rx="43.5" fill="#FCC400" />
    </svg>
  );
}

function IntegrateSvg() {
  return (
    <svg viewBox="0 0 276 182" width="100%" height="100%" fill="none" aria-hidden>
      <path d="M42.926 0.213329C34.3204 1.41342 25.5554 6.27132 16.8043 14.6637L16.645 14.8035H16.4856C15.4122 14.6177 14.3272 14.5433 13.2429 14.5815C9.51341 14.9612 6.05275 17.0395 3.58672 20.3803C1.1207 23.7211 -0.159071 28.0649 0.0158308 32.5007C0.334376 36.9364 2.09255 41.0518 4.91956 43.9793C7.7466 46.9067 11.4215 48.4173 15.1692 48.1924C18.3362 47.9191 21.3367 46.4044 23.6985 43.8867C26.0605 41.3689 27.6497 37.991 28.2161 34.2845V34.1283L28.3201 34.0214C33.9047 27.9716 39.6209 24.9796 45.7252 24.9796C46.4181 24.9796 47.1526 24.9796 47.8731 25.0947C56.0561 26.229 64.7171 32.4925 74.3762 44.1564C83.8546 55.6806 93.5549 71.1831 102.632 86.2253L115.9 108.509C121.499 117.904 127.284 127.621 133.153 136.72C138.336 144.455 145.272 154.22 152.907 161.083C161.021 168.358 168.947 171.201 177.109 169.755L179.729 169.204L178.232 167.076C162.809 147.858 150.351 125.976 141.253 110.046L125.718 83.2826C114.632 64.3113 104.198 46.3922 93.2569 32.1308C76.9257 10.4223 62.4652 0.213329 47.6584 0.00783415C46.0789 -0.0246586 44.4992 0.0439394 42.926 0.213329Z" fill="#492E22" />
      <path d="M28.8087 94.6056V94.77C28.5476 98.8325 27.0698 102.65 24.6426 105.533C22.2153 108.415 18.9989 110.172 15.5746 110.486C15.339 110.486 15.1034 110.486 14.8817 110.486C11.1145 110.678 7.43738 109.087 4.65924 106.062C1.88109 103.038 0.229495 98.8279 0.0677822 94.3586C-0.0939312 89.8902 1.24749 85.5275 3.79694 82.2321C6.34639 78.9359 9.89501 76.9768 13.6622 76.785H14.7778L37.8439 48.7719C39.4914 46.746 41.4764 45.1494 43.6726 44.0837C45.8688 43.0181 48.2281 42.5068 50.6 42.5824C52.8663 42.6338 55.0982 43.2495 57.1512 44.3893C59.2042 45.5292 61.0325 47.1679 62.5177 49.1994L63.3007 50.4981L28.8087 94.6056Z" fill="#FCC400" />
      <path d="M14.909 137.742H14.6111C10.8494 137.742 7.24185 139.515 4.58194 142.67C1.92204 145.826 0.427734 150.106 0.427734 154.568C0.427734 159.03 1.92204 163.311 4.58194 166.465C7.24185 169.621 10.8494 171.394 14.6111 171.394C15.2569 171.377 15.9007 171.303 16.5373 171.172L16.8144 171.123C19.9726 170.549 22.8711 168.714 25.0305 165.92C27.19 163.126 28.4811 159.542 28.6904 155.76V155.595L87.2115 80.4667L74.4902 62.2842L14.909 137.742Z" fill="#7D503B" />
      <path d="M228.58 181.789C239.396 180.35 250.059 173.298 261.29 160.212L261.408 160.08H263.127C266.828 159.704 270.253 157.605 272.657 154.244C275.059 150.883 276.244 146.531 275.952 142.137C275.635 137.701 273.88 133.585 271.056 130.653C268.233 127.722 264.561 126.204 260.812 126.42C257.396 126.691 254.181 128.438 251.778 131.332C249.375 134.225 247.95 138.064 247.773 142.12V142.285L247.682 142.408C239.749 153.094 231.801 157.869 223.431 156.875C215.255 155.741 206.587 149.477 196.935 137.813C187.436 126.305 177.749 110.811 168.7 95.7772L155.369 73.411C149.826 64.0322 144.013 54.3411 138.165 45.2664C132.982 37.5316 126.046 27.7665 118.403 20.9029C110.297 13.6284 102.37 10.7844 94.2084 12.231L91.707 12.5763L93.4531 14.6559C108.883 33.882 121.348 55.7549 130.453 71.7013L143.285 93.8455C156.284 116.721 167.203 135.002 178.255 149.863C194.552 171.58 209.04 181.789 223.854 181.994C225.431 182.021 227.008 181.953 228.58 181.789Z" fill="#FCC400" />
      <path d="M261.989 101.254H262.738C264.6 101.168 266.428 100.637 268.112 99.6896C269.795 98.7434 271.3 97.4014 272.535 95.7459C273.769 94.0913 274.709 92.1558 275.296 90.0581C275.883 87.9605 276.106 85.7433 275.951 83.5407C275.644 79.2497 273.991 75.2528 271.318 72.3394C268.645 69.426 265.148 67.8088 261.518 67.8078C261.283 67.8078 261.054 67.8078 260.826 67.8078C257.33 68.101 254.049 69.9106 251.607 72.8913C249.164 75.8718 247.733 79.8147 247.584 83.9682V84.1488L208.423 133.993L209.178 135.071C210.686 137.125 212.544 138.779 214.629 139.922C216.714 141.065 218.979 141.672 221.276 141.704H221.622C223.91 141.71 226.176 141.164 228.281 140.099C230.386 139.033 232.286 137.471 233.866 135.506L261.989 101.254Z" fill="#492E22" />
      <path d="M184.333 103.826L197.235 122.033L263.142 38.5277H263.28C266.959 38.1062 270.349 35.9854 272.721 32.6235C275.091 29.2616 276.253 24.9283 275.954 20.5592C275.638 16.1237 273.884 12.0065 271.06 9.07609C268.235 6.14564 264.561 4.63085 260.814 4.85113C257.087 5.15146 253.609 7.17977 251.133 10.4976C248.656 13.8153 247.38 18.1561 247.58 22.5813V22.7786L184.333 103.826Z" fill="#7D503B" />
    </svg>
  );
}

function ControlSvg() {
  return (
    <svg viewBox="0 0 276 276" width="100%" height="100%" fill="none" aria-hidden>
      <path pathLength={1} d="M138 237.188C192.78 237.188 237.188 192.78 237.188 138C237.188 83.2203 192.78 38.8125 138 38.8125C83.2203 38.8125 38.8125 83.2203 38.8125 138C38.8125 192.78 83.2203 237.188 138 237.188Z" stroke="#FFD84C" strokeWidth="24" />
      <path d="M138 171C156.225 171 171 156.225 171 138C171 119.775 156.225 105 138 105C119.775 105 105 119.775 105 138C105 156.225 119.775 171 138 171Z" fill="#351C15" />
      <path pathLength={1} d="M138 21.5625V56.0625" stroke="#FCC400" strokeWidth="24" strokeLinecap="round" />
      <path pathLength={1} d="M138 219.938V254.438" stroke="#FCC400" strokeWidth="24" strokeLinecap="round" />
      <path pathLength={1} d="M21.5625 138H56.0625" stroke="#FCC400" strokeWidth="24" strokeLinecap="round" />
      <path pathLength={1} d="M219.938 138H254.438" stroke="#FCC400" strokeWidth="24" strokeLinecap="round" />
    </svg>
  );
}

function DevelopSvg() {
  return (
    <svg viewBox="0 0 304 256" width="100%" height="100%" fill="none" aria-hidden>
      <path pathLength={1} d="M92 52L28 128L92 204" stroke="#FCC400" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
      <path pathLength={1} d="M172 42L132 214" stroke="#351C15" strokeWidth="24" strokeLinecap="round" />
      <path pathLength={1} d="M212 52L276 128L212 204" stroke="#FCC400" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type LogoKey = "operate" | "integrate" | "control" | "develop";

const LOGOS: {
  key: LogoKey;
  label: string;
  Svg: () => React.JSX.Element;
  Signature: (p: { dur: string }) => React.JSX.Element;
}[] = [
  { key: "operate", label: "Operate", Svg: OperateSvg, Signature: OperateSignature },
  { key: "integrate", label: "Integrate", Svg: IntegrateSvg, Signature: IntegrateSignature },
  { key: "control", label: "Control", Svg: ControlSvg, Signature: ControlSignature },
  { key: "develop", label: "Develop", Svg: DevelopSvg, Signature: DevelopSignature },
];

const ANIMATIONS: { id: string; label: string }[] = [
  { id: "none", label: "None" },
  { id: "pulse", label: "Pulse" },
  { id: "breathe", label: "Breathe" },
  { id: "float", label: "Float" },
  { id: "spin", label: "Spin" },
  { id: "wobble", label: "Wobble" },
  { id: "pop", label: "Pop" },
  { id: "shimmer", label: "Shimmer" },
  { id: "tilt", label: "3D Tilt" },
  { id: "swing", label: "Swing" },
  { id: "cascade", label: "Cascade" },
  { id: "signature", label: "Signature" },
];

/* Small pen-nib mark used in place of the old ✨ emoji for the Signature style. */
const SignatureIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 17c3 0 4-9 6-9s2 6 4 6 3-4 5-4" />
    <path d="M3 21h18" />
  </svg>
);

/* ------------------------------------------------------------------
   Presentation mode — each suite is introduced with a punchy one-liner
   (the suite verb rendered as brown gradient text) alongside its signature
   animation, then the UPS Digital Solutions lockup animates in and out.
------------------------------------------------------------------ */
type Slide = { key: LogoKey; pre: string; word: string; post: string; dur: string };

// Fixed slide length; each signature's `dur` is chosen so its meaningful motion
// spans the WHOLE slot (no early finish + awkward hold). Operate/Integrate loop
// edge-to-edge so dur === slot. Control's payload ends at ~71% of its cycle and
// Develop's grow finishes at ~65%, so those get a longer dur to stretch the
// motion across the full 5s and land right before the switch.
const SLIDE_MS = 5000;

const SLIDES: Slide[] = [
  { key: "operate", pre: "Change the way you ", word: "Operate", post: " your business.", dur: "5s" },
  { key: "integrate", pre: "Seamlessly ", word: "Integrate", post: " tools you already trust.", dur: "5s" },
  { key: "control", pre: "Take full ", word: "Control", post: " of every shipment.", dur: "5.4s" },
  { key: "develop", pre: "", word: "Develop", post: " what's next, without limits.", dur: "6.6s" },
];

function Present({ onClose }: { onClose: () => void }) {
  const total = SLIDES.length; // step === total → finale
  const [step, setStep] = useState(0);

  // auto-advance through the slides, then the finale, then close
  useEffect(() => {
    const FINALE_MS = 4200;
    const wait = step < total ? SLIDE_MS : FINALE_MS;
    const t = window.setTimeout(
      () => (step < total ? setStep((s) => s + 1) : onClose()),
      wait
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // keyboard: Esc exits, arrows scrub
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") setStep((s) => Math.min(s + 1, total));
      else if (e.key === "ArrowLeft") setStep((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFinale = step >= total;
  const slide = SLIDES[step];
  const Signature = slide
    ? LOGOS.find((l) => l.key === slide.key)!.Signature
    : null;

  return (
    <div className="present" role="dialog" aria-modal="true">
      <button
        className="present__close"
        onClick={onClose}
        aria-label="Exit presentation"
      >
        ✕
      </button>

      {!isFinale && slide && Signature ? (
        <div className="present__slide" key={step}>
          <div className="present__stage">
            <Signature dur={slide.dur} />
          </div>
          <p className="present__line">
            {slide.pre}
            <span className="present__word">{slide.word}</span>
            {slide.post}
          </p>
        </div>
      ) : (
        <div className="present__finale" key="finale">
          <img src={upsBrand} alt="" className="present__brand-logo" />
          <span className="present__brand-text">UPS Digital Solutions</span>
        </div>
      )}

      <div className="present__dots">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`present__dot${i === step ? " is-active" : ""}`}
          />
        ))}
        <span className={`present__dot${isFinale ? " is-active" : ""}`} />
      </div>
    </div>
  );
}

export default function Motion() {
  const [anims, setAnims] = useState<Record<LogoKey, string>>({
    operate: "none",
    integrate: "none",
    control: "none",
    develop: "none",
  });
  const [speed, setSpeed] = useState(1);
  const [hoverOnly, setHoverOnly] = useState(false);
  const [bg, setBg] = useState<"light" | "dark">("light");
  const [presenting, setPresenting] = useState(false);

  const setAll = (id: string) =>
    setAnims({ operate: id, integrate: id, control: id, develop: id });

  const allAre = (id: string) => LOGOS.every((l) => anims[l.key] === id);

  const duration = (base: number) => `${(base / speed).toFixed(2)}s`;

  const allSignature = LOGOS.every((l) => anims[l.key] === "signature");

  return (
    <div className={`motion motion--${bg}`}>
      {presenting && <Present onClose={() => setPresenting(false)} />}
      <header className="motion__head">
        <div>
          <h1 className="motion__title">Motion Lab</h1>
        </div>
        <button
          type="button"
          className="motion__present-btn"
          onClick={() => setPresenting(true)}
        >
          ▶ Present
        </button>
      </header>

      <section className="motion__controls">
        <div className="motion__control">
          <label className="motion__label">Apply to all</label>
          <div className="motion__chips">
            {ANIMATIONS.map((a) => (
              <button
                key={a.id}
                type="button"
                className={`motion__chip${allAre(a.id) ? " is-active" : ""}`}
                onClick={() => setAll(a.id)}
              >
                {a.id === "signature" && <SignatureIcon />}
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div className="motion__control motion__control--row">
          <div className="motion__field">
            <label className="motion__label" htmlFor="speed">
              Speed · {speed.toFixed(2)}×
            </label>
            <input
              id="speed"
              type="range"
              min={0.25}
              max={3}
              step={0.05}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>

          <label className="motion__toggle">
            <input
              type="checkbox"
              checked={hoverOnly}
              onChange={(e) => setHoverOnly(e.target.checked)}
            />
            Play on hover only
          </label>

          <div className="motion__seg">
            <button
              type="button"
              className={`motion__seg-btn${bg === "light" ? " is-active" : ""}`}
              onClick={() => setBg("light")}
            >
              Light
            </button>
            <button
              type="button"
              className={`motion__seg-btn${bg === "dark" ? " is-active" : ""}`}
              onClick={() => setBg("dark")}
            >
              Dark
            </button>
          </div>
        </div>
      </section>

      <section className={`motion__grid${allSignature ? " motion__grid--stacked" : ""}`}>
        {LOGOS.map(({ key, label, Svg, Signature }) => (
          <div className={`motion__card${anims[key] === "signature" ? " motion__card--wide" : ""}`} key={key}>
            <div
              className={`motion__stage${
                hoverOnly ? " motion__stage--hover" : ""
              }`}
            >
              {anims[key] === "signature" ? (
                <Signature dur={duration(4)} />
              ) : (
                <div
                  className={`motion__logo anim-${anims[key]}`}
                  style={{ "--dur": duration(2) } as CSSProperties}
                >
                  <Svg />
                </div>
              )}
            </div>

            <div className="motion__card-foot">
              <span className="motion__card-name">{label}</span>
              <select
                className="motion__select"
                value={anims[key]}
                onChange={(e) =>
                  setAnims((prev) => ({ ...prev, [key]: e.target.value }))
                }
              >
                {ANIMATIONS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
