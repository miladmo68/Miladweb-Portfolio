import React, { useEffect, useRef, useState } from "react";
import Skills from "./Skills";
import { FiCode, FiZap, FiLayers, FiCloud } from "react-icons/fi";

const stats = [
  { value: "75+", label: "Projects Built" },
  { value: "28", label: "Technologies" },
  { value: "100%", label: "Responsive & SEO" },
];

const highlights = [
  {
    icon: <FiCode />,
    title: "Full-Stack Development",
    text: "End-to-end web apps with React, Next.js, Node.js and Express — from database design to a polished, accessible UI.",
  },
  {
    icon: <FiZap />,
    title: "Performance & SEO",
    text: "Core Web Vitals, lazy loading and smart caching for fast, search-friendly experiences that rank and convert.",
  },
  {
    icon: <FiLayers />,
    title: "Scalable Architecture",
    text: "Clean, maintainable code built on REST and GraphQL APIs with a modular, component-driven structure.",
  },
  {
    icon: <FiCloud />,
    title: "Cloud & DevOps",
    text: "Reliable deployment and CI/CD pipelines on AWS, Vercel and Heroku — shipping with confidence.",
  },
];

/* animated count-up that runs once the section is revealed */
function Stat({ value, label, run }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const isNum = !!match;
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(0);

  // primitive deps only — using `match` (a fresh array each render) would
  // restart the animation on every setN and freeze it near zero.
  useEffect(() => {
    if (!run || !isNum) return;
    let raf;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, isNum]);

  return (
    <div className="stat">
      <span className="stat-value">{isNum ? `${n}${suffix}` : value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function About() {
  const sectionRef = useRef(null);
  /* per-box scroll reveal — same pattern as the Portfolio cards: each box
     observes itself and animates only when it actually scrolls into view. */
  const [revealedItems, setRevealedItems] = useState(new Set());
  const itemRefs = useRef({});

  useEffect(() => {
    /* About sits right below the hero — without a tighter bottom rootMargin
       the section observer fires while the user is still in the hero area,
       so the fade-in completes before they actually scroll to About. */
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40% 0px" },
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    /* Per-box observer — mirrors the Portfolio card reveal pattern. */
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-reveal-id");
            if (id)
              setRevealedItems((prev) => {
                if (prev.has(id)) return prev;
                const next = new Set(prev);
                next.add(id);
                return next;
              });
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    const t = setTimeout(() => {
      Object.values(itemRefs.current).forEach(
        (el) => el && itemObserver.observe(el),
      );
    }, 30);

    return () => {
      clearTimeout(t);
      sectionObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  const revealStyle = (id, delay = 0) => {
    const shown = revealedItems.has(id);
    return {
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    };
  };

  const statsRevealed = revealedItems.has("stats");

  return (
    <section ref={sectionRef} id="about" className="fade-in-section">
      <div className="about-inner">
        <h1>About Me</h1>

        <p className="about-lead">
          I'm a Full-Stack Developer and Technology Consultant who builds
          high-performance web applications that drive real business growth.
          Using React, Next.js, Node.js and modern databases, I turn ideas into
          fast, scalable products with exceptional user experiences.
        </p>
        <p className="about-lead about-lead--muted">
          With hands-on delivery across e-commerce, SaaS and content platforms,
          I care about clean code, accessibility and performance — solutions
          that are built to last and easy to grow.
        </p>

        <div
          className="about-stats"
          ref={(el) => (itemRefs.current["stats"] = el)}
          data-reveal-id="stats"
          style={revealStyle("stats")}
        >
          {stats.map((s) => (
            <Stat
              key={s.label}
              value={s.value}
              label={s.label}
              run={statsRevealed}
            />
          ))}
        </div>

        <div className="about-highlights">
          {highlights.map((h, i) => {
            const id = `hl-${h.title}`;
            return (
              <article
                className="highlight-card"
                key={h.title}
                ref={(el) => (itemRefs.current[id] = el)}
                data-reveal-id={id}
                style={revealStyle(id, Math.min(i * 0.08, 0.32))}
              >
                <span className="highlight-icon">{h.icon}</span>
                <h3 className="highlight-title">{h.title}</h3>
                <p className="highlight-text">{h.text}</p>
              </article>
            );
          })}
        </div>
      </div>

      <Skills />
    </section>
  );
}

export default About;
