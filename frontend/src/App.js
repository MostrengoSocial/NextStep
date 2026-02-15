import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { About } from "./components/landing/About";
import { Services } from "./components/landing/Services";
import { Testimonials } from "./components/landing/Testimonials";
import { Contact } from "./components/landing/Contact";
import { Footer } from "./components/landing/Footer";
import { Toaster } from "./components/ui/sonner";
import { PrivacyPolicy } from "./components/pages/PrivacyPolicy";
import { TermsOfService } from "./components/pages/TermsOfService";
import { LegalDisclaimer } from "./components/pages/LegalDisclaimer";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/legal-disclaimer" element={<LegalDisclaimer />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
