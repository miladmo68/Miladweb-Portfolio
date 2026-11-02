import React, { useState, useEffect, Suspense, lazy } from "react";
import { Main, Contact, Navigation, Footer, About, Services, Skills } from "./components";
import HeroV2 from "./components/HeroV2";
import ClientMarquee from "./components/sections/ClientMarquee";
import FeaturedWork from "./components/sections/FeaturedWork";
import Testimonials from "./components/sections/Testimonials";
import "./index.scss";
import "./assets/styles/alumica-theme.scss";
import "./assets/styles/site.scss";

const Project = lazy(() => import("./components/Project"));

/* Hero: "v2" = editorial headline + 3D showcase; "classic" = DNA-video hero.
   Switch back by setting this to "classic" (also tagged in git: hero-classic). */
const HERO = "v2";

function App() {
  const [mode, setMode] = useState("dark");

  const handleModeChange = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return (
    <div className={`main-container ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
      <Navigation parentToChild={{ mode }} modeChange={handleModeChange} />

      <main>
        {HERO === "v2" ? (
          <HeroV2 />
        ) : (
          <div className="mx-auto w-full max-w-[1536px] px-4">
            <Main />
          </div>
        )}
        <ClientMarquee />
        <About />
        <FeaturedWork />
        <Suspense fallback={<div className="s-loading" aria-hidden="true" />}>
          <Project />
        </Suspense>
        <Skills />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
