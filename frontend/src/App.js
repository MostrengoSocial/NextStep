import React from "react";
import "./App.css";
import { LanguageProvider } from "./context/LanguageContext";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { About } from "./components/landing/About";
import { Services } from "./components/landing/Services";
import { Testimonials } from "./components/landing/Testimonials";
import { Contact } from "./components/landing/Contact";
import { Footer } from "./components/landing/Footer";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </div>
    </LanguageProvider>
  );
}

export default App;
