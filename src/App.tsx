import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleHome, GoogleResults } from "./components/Google";
import UpsDigital from "./components/UpsDigital";
import Questionnaire from "./components/Questionnaire";
import Login from "./components/Login";
import Portal from "./components/Portal";
import InsureShield from "./components/InsureShield";
import AccessGate from "./components/AccessGate";
import "./App.css";
import "./components/Flow.css";

export default function App() {
  return (
    <AccessGate>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<GoogleHome />} />
        <Route path="/search" element={<GoogleResults />} />
        <Route path="/ups-digital" element={<UpsDigital />} />
        <Route path="/insureshield" element={<InsureShield />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/login" element={<Login />} />
          <Route path="/portal" element={<Portal />} />
        </Routes>
      </BrowserRouter>
    </AccessGate>
  );
}
