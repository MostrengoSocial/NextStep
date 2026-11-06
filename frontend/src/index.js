import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

const rootElement = document.getElementById("root");

// The build prerenders each page into the HTML for search engines and AI crawlers.
// The app then renders fresh over it (rather than hydrating), because the live clocks,
// saved language and saved theme differ from the build-time snapshot.
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
