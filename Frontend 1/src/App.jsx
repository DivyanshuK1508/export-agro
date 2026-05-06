import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import CropRecommendation from "./pages/CropRecommendation";
import SpecialCropsRecommendation from "./pages/SpecialCropsRecommendation";
import FAQPage from "./pages/FAQPage";
import Contact from "./pages/Contact";
import HowToUse from "./pages/HowToUse";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/howto" element={<HowToUse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/recommend" element={<CropRecommendation />} />
        <Route path="/reccomend" element={<CropRecommendation />} />
        <Route path="/special-crops" element={<SpecialCropsRecommendation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;