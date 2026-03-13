"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Main from "@/components/Main";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Project = dynamic(() => import("@/components/Project"), {
  loading: () => (
    <div style={{ padding: "2rem", textAlign: "center" }}>Loading…</div>
  ),
  ssr: false,
});

export default function Home() {
  const [mode, setMode] = useState("dark");

  const handleModeChange = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

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

      <div className="mx-auto w-full max-w-[1536px] px-4">
        <Main />
        <About />
        <Project />
        <Services />
        <Contact />
      </div>

      <Footer />
    </div>
  );
}
