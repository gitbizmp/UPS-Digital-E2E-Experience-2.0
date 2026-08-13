import upsLogo from "../assets/logos/ups-logo.png";
import "./Menu.css";

type MenuChoice = "e2e" | "portal" | "motion";

const OPTIONS: { key: MenuChoice; num: string; title: string; sub: string }[] = [
  {
    key: "e2e",
    num: "1",
    title: "End-to-End UPS Digital Experience",
    sub: "",
  },
  {
    key: "portal",
    num: "2",
    title: "UPS Digital Solutions Portal",
    sub: "Jump straight to the Integrate home.",
  },
  {
    key: "motion",
    num: "3",
    title: "UPS Digital Suite Iconography Playground",
    sub: "Explore the animated brand signatures in the Motion Lab.",
  },
];

export default function Menu({ onPick }: { onPick: (choice: MenuChoice) => void }) {
  return (
    <div className="menu">
      <div className="menu__inner">
        <img className="menu__logo" src={upsLogo} alt="UPS" />
        <h1 className="menu__title">What would you like to see?</h1>
        <p className="menu__sub">Choose an experience to begin.</p>
        <div className="menu__list">
          {OPTIONS.map((o) => (
            <button
              key={o.key}
              className="menu__card"
              type="button"
              onClick={() => onPick(o.key)}
            >
              <span className="menu__num">{o.num}</span>
              <span className="menu__text">
                <span className="menu__card-title">{o.title}</span>
                <span className="menu__card-sub">{o.sub}</span>
              </span>
              <span className="menu__arrow" aria-hidden="true">
                &rarr;
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
