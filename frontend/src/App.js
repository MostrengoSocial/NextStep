import React, { useState } from "react";
import "./App.css";
import { LanguageProvider } from "./context/LanguageContext";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { About } from "./components/landing/About";
import { Services } from "./components/landing/Services";
import { Testimonials } from "./components/landing/Testimonials";
import { Contact } from "./components/landing/Contact";
import { Footer } from "./components/landing/Footer";
import { LogoShowcase } from "./components/landing/LogoShowcase";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [showLogoShowcase, setShowLogoShowcase] = useState(true);
  const [selectedLogo, setSelectedLogo] = useState(1);

  const handleLogoSelect = (logoId) => {
    setSelectedLogo(logoId);
    setShowLogoShowcase(false);
  };

  return (
    <LanguageProvider>
      <div className="App">
        {showLogoShowcase && (
          <LogoShowcase
            onSelect={handleLogoSelect}
            onClose={() => setShowLogoShowcase(false)}
          />
        )}
        <Header selectedLogo={selectedLogo} />
        <main>
          <Hero />
          <About />
          <Services />
          <Testimonials />
          <Contact />
        </main>
        <Footer selectedLogo={selectedLogo} />
        <Toaster position="bottom-right" richColors />
      </div>
    </LanguageProvider>
  );
}

export default App;
