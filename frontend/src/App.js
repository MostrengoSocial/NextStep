import React, { useEffect, useRef } from "react";
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
import { WhatsAppFloat } from "./components/site/shared";
import { PrivacyPolicy } from "./components/pages/PrivacyPolicy";
import { TermsOfService } from "./components/pages/TermsOfService";
import { LegalDisclaimer } from "./components/pages/LegalDisclaimer";
import { NotFound } from "./components/pages/NotFound";
import { usePageMeta } from "./hooks/usePageMeta";
import { PAGE_META } from "./data/pageMeta";
import { useLanguage, pathFor } from "./context/LanguageContext";

// Scroll to the top on page changes, or to the #section in the URL.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const previous = useRef(pathname);

  useEffect(() => {
    // Switching language keeps the visitor where they are on the page.
    const sameAddress = pathFor(previous.current, 'en') === pathFor(pathname, 'en');
    previous.current = pathname;
    if (sameAddress && !hash) return;
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
  usePageMeta({ ...PAGE_META['/'][language], path: '/', lang: language });
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
            {['', '/pt'].map((prefix) => (
              <React.Fragment key={prefix || 'en'}>
                <Route path={`${prefix}/`} element={<HomePage />} />
                <Route path={`${prefix}/privacy-policy`} element={<PrivacyPolicy />} />
                <Route path={`${prefix}/terms-of-service`} element={<TermsOfService />} />
                <Route path={`${prefix}/legal-disclaimer`} element={<LegalDisclaimer />} />
              </React.Fragment>
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
        <WhatsAppFloat />
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
