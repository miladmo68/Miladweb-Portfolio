import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/design-tokens.scss";
import "./assets/styles/modern-components.scss";
import "./assets/styles/enhanced-sections.scss";
import "./index.scss";
import "./index.css";
import "./assets/styles/animations.scss";

const App = lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense
      fallback={<div style={{ background: "#0a0e17", minHeight: "100vh" }} />}
    >
      <App />
    </Suspense>
  </StrictMode>,
);
