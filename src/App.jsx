import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  Main,
  Timeline,
  Skills,
  Contact,
  Navigation,
  Footer,
  About,
  Services,
} from "./components";
import FadeIn from "./components/FadeIn";
import "./index.scss";

/* ── code-split the heavy gallery ── */
const Project = lazy(() => import("./components/Project"));

function App() {
  const [mode, setMode] = useState("dark");

  const handleModeChange = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  /* always start at the top */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className={`main-container ${
        mode === "dark" ? "dark-mode" : "light-mode"
      }`}
    >
      <Navigation parentToChild={{ mode }} modeChange={handleModeChange} />

      <FadeIn transitionDuration={700}>
        <Main />
        <About />
        <Skills />
        <Timeline />

        {/* ─── Project loads only when user reaches this point ─── */}
        <Suspense
          fallback={
            <div style={{ padding: "2rem", textAlign: "center" }}>Loading…</div>
          }
        >
          {/* <Project /> */}
        </Suspense>

        {/* <Services /> */}
        <Contact />
      </FadeIn>

      <Footer />
    </div>
  );
}

export default App;
