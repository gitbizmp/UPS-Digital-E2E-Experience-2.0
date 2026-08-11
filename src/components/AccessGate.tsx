import { useState, type ReactNode } from "react";
import "./AccessGate.css";

const ACCESS_CODE = "Happy-Honey";
const STORAGE_KEY = "experience-unlocked";

export default function AccessGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean>(
    () => sessionStorage.getItem(STORAGE_KEY) === "true"
  );
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === ACCESS_CODE.toLowerCase()) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="gate">
      <form className="gate__card" onSubmit={handleSubmit}>
        <div className="gate__lock" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect
              x="4"
              y="10"
              width="16"
              height="11"
              rx="2.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M8 10V7a4 4 0 018 0v3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="gate__title">Enter the experience</h1>
        <p className="gate__sub">This preview is protected. Enter the access code to continue.</p>
        <input
          className={`gate__input${error ? " gate__input--error" : ""}`}
          type="password"
          value={value}
          placeholder="Access code"
          aria-label="Access code"
          autoFocus
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
        />
        {error && <p className="gate__error">That code isn&rsquo;t right. Try again.</p>}
        <button className="gate__btn" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
