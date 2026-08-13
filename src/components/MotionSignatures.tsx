import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./MotionSignatures.css";

type SigProps = { dur: string; playing?: boolean };

/* ================= OPERATE — cursor drags the 3 shapes into place =========
   A single mouse pointer lives in the SAME svg coordinate space as the logo,
   so it can pick up each shape, drag it into place, then settle onto the big
   oval and become the excluded cursor cutout inside it. */
export function OperateSignature({ dur }: SigProps) {
  return (
    <div className="sig sig-operate" style={{ "--sig": dur } as CSSProperties}>
      <svg viewBox="0 0 217 190" className="sig__svg" fill="none" aria-hidden>
        {/* two rounded bars (left) */}
        <g className="op-bar op-bar1">
          <rect x="0" y="0" width="100.5" height="87" rx="43.5" fill="#FCC400" />
        </g>
        <g className="op-bar op-bar2">
          <rect x="0" y="103" width="100.5" height="87" rx="43.5" fill="#FCC400" />
        </g>

        {/* big oval (right) — solid while dragging */}
        <g className="op-oval">
          <rect x="116.5" y="0" width="100.5" height="190" rx="50" fill="#FCC400" />
        </g>

        {/* final oval WITH the cursor cut out — revealed at the "stamp" */}
        <g className="op-subtract" transform="translate(116.5 0)">
          <path
            d="M50.25 0C77.8642 0 100.5 22.3858 100.5 50V140C100.5 167.614 77.8642 190 50.25 190C22.6358 190 9.7731e-07 167.614 0 140V50C9.7731e-07 22.3858 22.6358 0 50.25 0ZM26.8555 56.8203C24.8875 55.2714 22 56.6733 22 59.1777V118.337C22.0002 121.255 25.745 122.456 27.4414 120.081L36.1982 107.82C37.5348 105.949 40.3936 106.216 41.3613 108.302L52.9434 133.267C53.6427 134.773 55.4334 135.425 56.9375 134.721L62.791 131.977C64.2879 131.275 64.9353 129.494 64.2383 127.995L52.5703 102.914C51.6452 100.925 53.0968 98.6485 55.29 98.6484H71.3379C74.1852 98.648 75.4305 95.0523 73.1934 93.291L26.8555 56.8203Z"
            fill="#FCC400"
          />
        </g>

        {/* the pointer — IS the cursor-cutout shape (no stroke). It drags each
            shape, then grows to exactly fill the oval's cutout and vanishes. */}
        <g className="op-pointer">
          <g transform="translate(116.5 0)">
            <path
              d="M26.8555 56.8203C24.8875 55.2714 22 56.6733 22 59.1777V118.337C22.0002 121.255 25.745 122.456 27.4414 120.081L36.1982 107.82C37.5348 105.949 40.3936 106.216 41.3613 108.302L52.9434 133.267C53.6427 134.773 55.4334 135.425 56.9375 134.721L62.791 131.977C64.2879 131.275 64.9353 129.494 64.2383 127.995L52.5703 102.914C51.6452 100.925 53.0968 98.6485 55.29 98.6484H71.3379C74.1852 98.648 75.4305 95.0523 73.1934 93.291L26.8555 56.8203Z"
              fill="#492E22"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ================= INTEGRATE — 3 ropes plug into place ==================== */
export function IntegrateSignature({ dur }: SigProps) {
  return (
    <div className="sig sig-integrate" style={{ "--sig": dur } as CSSProperties}>
      <svg viewBox="0 0 276 182" className="sig__svg" fill="none" aria-hidden>
        {/* Each rope's exact silhouette is filled, then revealed by an angled
            sweep whose axis matches that rope's direction, so the color flows
            ALONG each rope's own path (not a flat left→right wipe). */}
        <defs>
          {/* gold sweeps down-right (~22.5°), espresso ~12°, brown up-right ~-28.5° */}
          <mask id="in-mask-bot" maskUnits="userSpaceOnUse" x="0" y="0" width="276" height="182">
            <g transform="rotate(22.5 138 96)">
              <rect className="in-wipe in-wipe-bot" x="-462" y="-504" width="600" height="1200" fill="#fff" />
            </g>
          </mask>
          <mask id="in-mask-mid" maskUnits="userSpaceOnUse" x="0" y="0" width="276" height="182">
            <g transform="rotate(11.9 138 96)">
              <rect className="in-wipe in-wipe-mid" x="-462" y="-504" width="600" height="1200" fill="#fff" />
            </g>
          </mask>
          <mask id="in-mask-top" maskUnits="userSpaceOnUse" x="0" y="0" width="276" height="182">
            <g transform="rotate(-28.5 138 96)">
              <rect className="in-wipe in-wipe-top" x="-462" y="-504" width="600" height="1200" fill="#fff" />
            </g>
          </mask>
        </defs>

        {/* gold rope (bottom) */}
        <g mask="url(#in-mask-bot)" fill="#FCC400">
          <path d="M28.8087 94.6056V94.77C28.5476 98.8325 27.0698 102.65 24.6426 105.533C22.2153 108.415 18.9989 110.172 15.5746 110.486C15.339 110.486 15.1034 110.486 14.8817 110.486C11.1145 110.678 7.43738 109.087 4.65924 106.062C1.88109 103.038 0.229495 98.8279 0.0677822 94.3586C-0.0939312 89.8902 1.24749 85.5275 3.79694 82.2321C6.34639 78.9359 9.89501 76.9768 13.6622 76.785H14.7778L37.8439 48.7719C39.4914 46.746 41.4764 45.1494 43.6726 44.0837C45.8688 43.0181 48.2281 42.5068 50.6 42.5824C52.8663 42.6338 55.0982 43.2495 57.1512 44.3893C59.2042 45.5292 61.0325 47.1679 62.5177 49.1994L63.3007 50.4981L28.8087 94.6056Z" />
          <path d="M228.58 181.789C239.396 180.35 250.059 173.298 261.29 160.212L261.408 160.08H263.127C266.828 159.704 270.253 157.605 272.657 154.244C275.059 150.883 276.244 146.531 275.952 142.137C275.635 137.701 273.88 133.585 271.056 130.653C268.233 127.722 264.561 126.204 260.812 126.42C257.396 126.691 254.181 128.438 251.778 131.332C249.375 134.225 247.95 138.064 247.773 142.12V142.285L247.682 142.408C239.749 153.094 231.801 157.869 223.431 156.875C215.255 155.741 206.587 149.477 196.935 137.813C187.436 126.305 177.749 110.811 168.7 95.7772L155.369 73.411C149.826 64.0322 144.013 54.3411 138.165 45.2664C132.982 37.5316 126.046 27.7665 118.403 20.9029C110.297 13.6284 102.37 10.7844 94.2084 12.231L91.707 12.5763L93.4531 14.6559C108.883 33.882 121.348 55.7549 130.453 71.7013L143.285 93.8455C156.284 116.721 167.203 135.002 178.255 149.863C194.552 171.58 209.04 181.789 223.854 181.994C225.431 182.021 227.008 181.953 228.58 181.789Z" />
        </g>
        {/* espresso rope (middle) */}
        <g mask="url(#in-mask-mid)" fill="#492E22">
          <path d="M42.926 0.213329C34.3204 1.41342 25.5554 6.27132 16.8043 14.6637L16.645 14.8035H16.4856C15.4122 14.6177 14.3272 14.5433 13.2429 14.5815C9.51341 14.9612 6.05275 17.0395 3.58672 20.3803C1.1207 23.7211 -0.159071 28.0649 0.0158308 32.5007C0.334376 36.9364 2.09255 41.0518 4.91956 43.9793C7.7466 46.9067 11.4215 48.4173 15.1692 48.1924C18.3362 47.9191 21.3367 46.4044 23.6985 43.8867C26.0605 41.3689 27.6497 37.991 28.2161 34.2845V34.1283L28.3201 34.0214C33.9047 27.9716 39.6209 24.9796 45.7252 24.9796C46.4181 24.9796 47.1526 24.9796 47.8731 25.0947C56.0561 26.229 64.7171 32.4925 74.3762 44.1564C83.8546 55.6806 93.5549 71.1831 102.632 86.2253L115.9 108.509C121.499 117.904 127.284 127.621 133.153 136.72C138.336 144.455 145.272 154.22 152.907 161.083C161.021 168.358 168.947 171.201 177.109 169.755L179.729 169.204L178.232 167.076C162.809 147.858 150.351 125.976 141.253 110.046L125.718 83.2826C114.632 64.3113 104.198 46.3922 93.2569 32.1308C76.9257 10.4223 62.4652 0.213329 47.6584 0.00783415C46.0789 -0.0246586 44.4992 0.0439394 42.926 0.213329Z" />
          <path d="M261.989 101.254H262.738C264.6 101.168 266.428 100.637 268.112 99.6896C269.795 98.7434 271.3 97.4014 272.535 95.7459C273.769 94.0913 274.709 92.1558 275.296 90.0581C275.883 87.9605 276.106 85.7433 275.951 83.5407C275.644 79.2497 273.991 75.2528 271.318 72.3394C268.645 69.426 265.148 67.8088 261.518 67.8078C261.283 67.8078 261.054 67.8078 260.826 67.8078C257.33 68.101 254.049 69.9106 251.607 72.8913C249.164 75.8718 247.733 79.8147 247.584 83.9682V84.1488L208.423 133.993L209.178 135.071C210.686 137.125 212.544 138.779 214.629 139.922C216.714 141.065 218.979 141.672 221.276 141.704H221.622C223.91 141.71 226.176 141.164 228.281 140.099C230.386 139.033 232.286 137.471 233.866 135.506L261.989 101.254Z" />
        </g>
        {/* brown rope (top) */}
        <g mask="url(#in-mask-top)" fill="#7D503B">
          <path d="M14.909 137.742H14.6111C10.8494 137.742 7.24185 139.515 4.58194 142.67C1.92204 145.826 0.427734 150.106 0.427734 154.568C0.427734 159.03 1.92204 163.311 4.58194 166.465C7.24185 169.621 10.8494 171.394 14.6111 171.394C15.2569 171.377 15.9007 171.303 16.5373 171.172L16.8144 171.123C19.9726 170.549 22.8711 168.714 25.0305 165.92C27.19 163.126 28.4811 159.542 28.6904 155.76V155.595L87.2115 80.4667L74.4902 62.2842L14.909 137.742Z" />
          <path d="M184.333 103.826L197.235 122.033L263.142 38.5277H263.28C266.959 38.1062 270.349 35.9854 272.721 32.6235C275.091 29.2616 276.253 24.9283 275.954 20.5592C275.638 16.1237 273.884 12.0065 271.06 9.07609C268.235 6.14564 264.561 4.63085 260.814 4.85113C257.087 5.15146 253.609 7.17977 251.133 10.4976C248.656 13.8153 247.38 18.1561 247.58 22.5813V22.7786L184.333 103.826Z" />
        </g>
      </svg>
    </div>
  );
}

/* ================= CONTROL — target sweeps, finds the mark, settles ======
   A red ✗ hides behind heavy frosted glass, off to the right. The reticle
   starts centred, sweeps left, then right past centre and lands on the mark.
   It holds while the ✗ shrinks away and a green ✓ grows in its place. The ✓
   vanishes, the reticle returns to centre, and the whole frosted panel
   collapses into a brown dot — the centre of the target logo. */
export function ControlSignature({ dur }: SigProps) {
  const [tx, setTx] = useState(0);
  const [dot, setDot] = useState<"red" | "shrink" | "green" | "gone">("gone");
  const [collapsed, setCollapsed] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    const DOTX = 203; // reticle offset (user units) that centres it on the mark (~halfway to the right edge)
    // the whole sequence is scaled to fill exactly one `dur` cycle
    const cycle = Math.max(2000, (parseFloat(dur) || 5.8) * 1000);
    const s = cycle / 5800; // original timeline was authored against a 5800ms cycle
    const at = (ms: number) => Math.round(ms * s);
    const run = () => {
      setTx(0);
      setDot("gone");
      setCollapsed(false);
      setFocused(false);
      timers.push(window.setTimeout(() => setTx(-203), at(350))); // sweep hard left first (~halfway to the left edge)
      timers.push(window.setTimeout(() => setDot("red"), at(1250))); // only once it reaches the left does the ✗ appear
      timers.push(window.setTimeout(() => setTx(DOTX), at(1450))); // sweep hard right, past centre, onto the mark
      timers.push(window.setTimeout(() => setFocused(true), at(2050))); // reticle has settled over the mark — it snaps into focus
      timers.push(window.setTimeout(() => setDot("shrink"), at(3250))); // hold on the ✗ for ~1s, then it shrinks to nothing
      timers.push(window.setTimeout(() => setDot("green"), at(3500))); // grows back as green ✓
      timers.push(window.setTimeout(() => setDot("gone"), at(4150))); // ✓ disappears
      timers.push(window.setTimeout(() => setTx(0), at(4300))); // reticle returns to centre
      timers.push(window.setTimeout(() => setCollapsed(true), at(4650))); // panel collapses into the brown centre dot
      timers.push(window.setTimeout(run, cycle));
    };
    run();
    return () => timers.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dur]);

  // the frosted panel is masked so it clears a lens exactly under the reticle
  const lensX = `${(tx * 190) / 276}px`; // user units → rendered px (svg scaled to 190px tall)

  return (
    <div className="sig sig-control" style={{ "--sig": dur, "--lens-x": lensX } as CSSProperties}>
      {/* the whole background — collapses to the brown centre dot */}
      <div className={`ctrl-bg${collapsed ? " is-collapsed" : ""}`} />

      {/* marks live behind the glass, off to the right */}
      <svg viewBox="0 0 276 276" className={`sig__svg ctrl-dots${focused ? " is-focused" : ""}`} fill="none" aria-hidden>
        <g className={`ctrl-red${dot === "red" ? " is-on" : ""}`}>
          <circle cx="341" cy="138" r="34" fill="#E4322B" />
          <path d="M328 125L354 151M354 125L328 151" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
        </g>
        <g className={`ctrl-green${dot === "green" ? " is-on" : ""}`}>
          <circle cx="341" cy="138" r="34" fill="#2F9E44" />
          <path d="M326 139L337 150L357 126" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>

      {/* frosted glass — heavy blur so the mark is barely legible; collapses to the brown dot */}
      <div className={`ctrl-glass${collapsed ? " is-collapsed" : ""}`} />

      {/* reticle rides on top of the glass */}
      <svg viewBox="0 0 276 276" className="sig__svg ctrl-targetwrap" fill="none" aria-hidden>
        <g className="ctrl-target" style={{ transform: `translate(${tx}px, 0)` }}>
          <path className="ctrl-ring" d="M138 237.188C192.78 237.188 237.188 192.78 237.188 138C237.188 83.2203 192.78 38.8125 138 38.8125C83.2203 38.8125 38.8125 83.2203 38.8125 138C38.8125 192.78 83.2203 237.188 138 237.188Z" stroke="#FFD84C" strokeWidth="12" />
          <g className="ctrl-ticks">
            <path d="M138 21.5625V56.0625" stroke="#FCC400" strokeWidth="16" strokeLinecap="round" />
            <path d="M138 219.938V254.438" stroke="#FCC400" strokeWidth="16" strokeLinecap="round" />
            <path d="M21.5625 138H56.0625" stroke="#FCC400" strokeWidth="16" strokeLinecap="round" />
            <path d="M219.938 138H254.438" stroke="#FCC400" strokeWidth="16" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ================= DEVELOP — matrix 0/1 resolving into </> ================ */
export function DevelopSignature({ dur }: SigProps) {
  const COLS = 7;
  const cycle = Math.max(3000, (parseFloat(dur) || 5) * 1000); // one full loop
  const spinMs = Math.round((cycle * 0.5) / COLS); // spin phase = first ~half

  // the three real logo shapes that live in the middle reels
  const SHAPES: Record<number, { vb: string; d: string; cap?: "round"; color?: string }> = {
    2: { vb: "0 0 96 256", d: "M80 52L20 128L80 204" }, // <
    3: { vb: "0 0 64 256", d: "M52 42L12 214" }, // /
    4: { vb: "0 0 96 256", d: "M16 52L76 128L16 204" }, // >
  };

  const [active, setActive] = useState(0); // index currently spinning; < active = locked
  const [erased, setErased] = useState(0); // how many outer ring-pairs of 0s have been wiped
  const [revealed, setRevealed] = useState(false); // middle 3 handed off to the growable logo
  const [assembled, setAssembled] = useState(false); // logo enlarged + converged

  useEffect(() => {
    const timers: number[] = [];
    const start = () => {
      setAssembled(false);
      setRevealed(false);
      setErased(0);
      setActive(0);
      for (let c = 1; c <= COLS; c++) {
        timers.push(window.setTimeout(() => setActive(c), c * spinMs));
      }
      const locked = COLS * spinMs;
      // brief settle after the row locks, then in ONE beat: delete the outer
      // 0s, hand the middle three to the logo, and start it growing — no pause
      timers.push(
        window.setTimeout(() => {
          setErased(2);
          setRevealed(true);
          setAssembled(true);
        }, locked + 180)
      );
      timers.push(window.setTimeout(start, cycle));
    };
    start();
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinMs]);

  // binary spin strip: two identical halves for a seamless loop
  const half = Array.from({ length: 10 }, (_, i) => (i % 2 === 0 ? "0" : "1"));
  const bits = [...half, ...half];

  return (
    <div
      className={`sig sig-develop${revealed ? " is-revealed" : ""}${assembled ? " is-assembled" : ""}`}
      style={{ "--sig": dur } as CSSProperties}
    >
      <div className="dev-slot" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {Array.from({ length: COLS }, (_, ci) => {
          const shape = SHAPES[ci];
          const state = ci < active ? "locked" : ci === active ? "spin" : "idle";
          const dist = Math.abs(ci - 3); // ring distance from the centre reel
          const wiped = (erased >= 1 && dist >= 3) || (erased >= 2 && dist >= 2);
          const side = ci < 3 ? "l" : "r"; // wipe outward toward this edge
          return (
            <div
              className={`dev-reel is-${state}${shape ? " is-symbol" : ""}${wiped ? ` is-wiped is-wipe-${side}` : ""}`}
              key={ci}
            >
              <div className="dev-reel-spin">
                {bits.map((d, ri) => (
                  <span className="dev-cell" key={ri}>
                    {d}
                  </span>
                ))}
              </div>
              <div className="dev-reel-final">
                {shape ? (
                  <svg className="dev-shape" viewBox={shape.vb} fill="none" aria-hidden>
                    <path
                      d={shape.d}
                      stroke={shape.color ?? "#FCC400"}
                      strokeWidth="24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className="dev-cell">0</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* the assembled full logo the three shapes grow into */}
      <svg className="dev-logo" viewBox="0 0 304 256" fill="none" aria-hidden>
        <g className="dl-shape dl-lt">
          <path d="M92 52L28 128L92 204" stroke="#FCC400" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="dl-shape dl-sl">
          <path d="M172 42L132 214" stroke="#FCC400" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="dl-shape dl-gt">
          <path d="M212 52L276 128L212 204" stroke="#FCC400" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
