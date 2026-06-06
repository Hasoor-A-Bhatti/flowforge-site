import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LeadQualificationDemoPage from "./pages/LeadQualificationDemoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/demo/lead-qualification"
          element={<LeadQualificationDemoPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}