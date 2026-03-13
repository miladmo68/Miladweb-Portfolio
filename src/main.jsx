import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./index.css";
import "./assets/styles/animations.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
