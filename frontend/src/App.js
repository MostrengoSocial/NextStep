import React, { useEffect } from "react";
import "./styles/site.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { SiteHeader } from "./components/site/SiteHeader";
import { Hero } from "./components/site/Hero";
import { RoutesMap } from "./components/site/RoutesMap";
import { About } from "./components/site/About";
import { Rights } from "./components/site/Rights";
import { Services } from "./components/site/Services";
import { Places } from "./components/site/Places";
import { Stories } from "./components/site/Stories";
import { Contact } from "./components/site/Contact";
import { SiteFooter } from "./components/site/SiteFooter";
import { PrivacyPolicy } from "./components/pages/PrivacyPolicy";
import { TermsOfService } from "./components/pages/TermsOfService";
import { LegalDisclaimer } from "./components/pages/LegalDisclaimer";
import { NotFound } from "./components/pages/NotFound";
import { usePageMeta } from "./hooks/usePageMeta";
import { PAGE_META } from "./data/pageMeta";
import { useLanguage } from "./context/LanguageContext";

// Scroll to the top on page changes, or to the #section in the URL.
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  const { language } = useLanguage();
  usePageMeta({ ...PAGE_META['/'][language], path: '/' });
  return (
    <>
      <Hero />
      <RoutesMap />
      <About />
      <Rights />
      <Services />
      <Places />
      <Stories />
      <Contact />
    </>
  );
}

/* The site without a router, so the build can render it with a StaticRouter
   (scripts/prerender.mjs) and the browser with a BrowserRouter. */
export function Site() {
  return (
    <LanguageProvider>
      <ScrollManager />
      <div className="App">
        <SiteHeader />
        <main id="top">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/legal-disclaimer" element={<LegalDisclaimer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </LanguageProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}

export default App;
