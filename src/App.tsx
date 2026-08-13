import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { GoogleHome, GoogleResults } from "./components/Google";
import UpsDigital from "./components/UpsDigital";
import Questionnaire from "./components/Questionnaire";
import Login from "./components/Login";
import Portal from "./components/Portal";
import InsureShield from "./components/InsureShield";
import CommerceShield from "./components/CommerceShield";
import Motion from "./components/Motion";
import AccessGate from "./components/AccessGate";
import Menu from "./components/Menu";
import "./App.css";
import "./components/Flow.css";

type MenuChoice = "e2e" | "portal" | "motion";

export default function App() {
  const [choice, setChoice] = useState<MenuChoice | null>(null);

  const handlePick = (picked: MenuChoice) => {
    if (picked === "portal") window.location.hash = "#/portal";
    else if (picked === "motion") window.location.hash = "#/motion";
    else window.location.hash = "#/";
    setChoice(picked);
  };

  return (
    <AccessGate>
      {choice === null ? (
        <Menu onPick={handlePick} />
      ) : (
        <HashRouter>
          <Routes>
            <Route path="/" element={<GoogleHome />} />
            <Route path="/search" element={<GoogleResults />} />
            <Route path="/ups-digital" element={<UpsDigital />} />
            <Route path="/insureshield" element={<InsureShield />} />
            <Route path="/commerceshield" element={<CommerceShield />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/motion" element={<Motion />} />
          </Routes>
        </HashRouter>
      )}
    </AccessGate>
  );
}
