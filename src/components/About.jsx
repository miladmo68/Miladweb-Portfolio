import { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal";
import SectionHead from "./sections/SectionHead";
import { PILLARS, STATS } from "../data/site";

/* animated count-up once the stats scroll into view */
function Stat({ value, label }) {
  const ref = useRef(null);
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <div className="s-stat" ref={ref}>
      <span className="s-stat-value">
        {match ? `${n}${suffix}` : value}
      </span>
      <span className="s-stat-label">{label}</span>
    </div>
  );
}

export default function About() {
  const ref = useReveal();

  return (
    <section id="story" className="s-section" ref={ref} aria-labelledby="story-title">
      <div className="s-container s-about">
        <div className="s-about-intro">
          <SectionHead
            id="story-title"
            eyebrow="About"
            title={
              <>
                I turn complex ideas into <em>fast, polished</em> web products.
              </>
            }
          />
        </div>

        <div className="s-about-body">
          <p className="s-body" data-reveal style={{ "--d": "120ms" }}>
            I&apos;m Milad, a frontend-focused Full-Stack Developer in
            Toronto. For more than five years I&apos;ve built responsive web
            apps, dashboards and user portals with React, Next.js and
            TypeScript — most recently investor-facing portals for an
            enterprise asset-management platform.
          </p>
          <p className="s-body s-body--muted" data-reveal style={{ "--d": "200ms" }}>
            I work across the stack with Node.js, Express, MongoDB and
            PostgreSQL, ship to Vercel and AWS, and care about reusable
            components, clean code, testing and performance. Through my studio
            MiLink I also design and build websites for local businesses.
          </p>

          <div className="s-stats" data-reveal style={{ "--d": "280ms" }}>
            {STATS.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>

        <ul className="s-pillars">
          {PILLARS.map((p, i) => (
            <li
              key={p.title}
              className="s-pillar"
              data-reveal
              style={{ "--d": `${i * 90}ms` }}
            >
              <span className="s-pillar-num">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
