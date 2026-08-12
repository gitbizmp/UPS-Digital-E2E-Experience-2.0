import { HashRouter, Routes, Route } from "react-router-dom";
import { GoogleHome, GoogleResults } from "./components/Google";
import UpsDigital from "./components/UpsDigital";
import Questionnaire from "./components/Questionnaire";
import Login from "./components/Login";
import Portal from "./components/Portal";
import InsureShield from "./components/InsureShield";
import CommerceShield from "./components/CommerceShield";
import AccessGate from "./components/AccessGate";
import "./App.css";
import "./components/Flow.css";

export default function App() {
  return (
    <AccessGate>
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
        </Routes>
      </HashRouter>
    </AccessGate>
  );
}
