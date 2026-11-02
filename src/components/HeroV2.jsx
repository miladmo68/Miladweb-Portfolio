import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiArrowUpRight, FiMail, FiLock } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { CONTACT, FEATURED } from "../data/site";
import { getShot } from "../utils/images";
import "../assets/styles/hero-v2.scss";

/* Projects that rotate inside the hero browser + phone */
const SHOWCASE = ["MiLink", "Northstar Ops", "JobBuddy AI"]
  .map((t) => FEATURED.find((p) => p.title === t))
  .filter(Boolean);

const HEADLINE = [
  { w: "I" },
  { w: "design" },
  { w: "&" },
  { w: "build" },
  { w: "web" },
  { w: "products" },
  { w: "that" },
  { w: "feel", accent: true },
  { w: "effortless.", accent: true },
];

/* Code card: a tiny profile, typed out character by character */
const CODE = [
  [["k", "const "], ["v", "milad"], ["p", " = {"]],
  [["p", "  role: "], ["s", '"Full-Stack Developer"'], ["p", ","]],
  [["p", "  stack: ["], ["s", '"React"'], ["p", ", "], ["s", '"Next.js"'], ["p", ", "], ["s", '"TS"'], ["p", "],"]],
  [["p", "  based: "], ["s", '"Toronto"'], ["p", ","]],
  [["p", "  ships: "], ["s", '"fast, polished UI"'], ["p", ","]],
  [["p", "};"]],
];
const CODE_LEN = CODE.flat().reduce((n, [, t]) => n + t.length, 0) + CODE.length;

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useTorontoTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-CA", { hour: "numeric", minute: "2-digit", timeZone: "America/Toronto" }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useTyped(total, start) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return undefined;
    if (reduced()) {
      setN(total);
      return undefined;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= total) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [total, start]);
  return n;
}

/* where each line starts in the typed character stream */
const LINE_START = CODE.reduce((acc, line, i) => {
  const prev = i ? acc[i - 1] + CODE[i - 1].reduce((n, [, t]) => n + t.length, 0) + 1 : 0;
  acc.push(prev);
  return acc;
}, []);

function CodeCard({ start }) {
  const n = useTyped(CODE_LEN, start);
  return (
    <div className="h2-code" aria-hidden="true">
      <div className="h2-code-bar">
        <i /> <i /> <i />
        <span>milad.ts</span>
      </div>
      <pre>
        {CODE.map((line, li) => {
          let left = n - LINE_START[li];
          const lineLen = line.reduce((m, [, t]) => m + t.length, 0);
          const active = n < CODE_LEN ? left >= 0 && left <= lineLen : li === CODE.length - 1;
          const parts = [];
          for (const [cls, text] of line) {
            if (left <= 0) break;
            const shown = text.slice(0, left);
            left -= shown.length;
            parts.push(
              <span key={parts.length} className={`t-${cls}`}>
                {shown}
              </span>,
            );
          }
          return (
            <code key={li}>
              <span className="h2-ln">{li + 1}</span>
              {parts}
              {active && <span className="h2-caret" />}
            </code>
          );
        })}
      </pre>
    </div>
  );
}

export default function HeroV2() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [slide, setSlide] = useState(0);
  const time = useTorontoTime();
  const project = SHOWCASE[slide];

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // rotate the showcased project
  useEffect(() => {
    if (reduced() || SHOWCASE.length < 2) return undefined;
    const id = setInterval(() => setSlide((s) => (s + 1) % SHOWCASE.length), 6500);
    return () => clearInterval(id);
  }, []);

  // pointer: spotlight + 3D tilt with depth layers (desktop, fine pointer only)
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || reduced()) return undefined;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;
    let raf = 0;
    const cur = { x: 0, y: 0 };
    const goal = { x: 0, y: 0 };
    const loop = () => {
      cur.x += (goal.x - cur.x) * 0.08;
      cur.y += (goal.y - cur.y) * 0.08;
      stage.style.setProperty("--rx", `${(-cur.y * 7).toFixed(2)}deg`);
      stage.style.setProperty("--ry", `${(cur.x * 9).toFixed(2)}deg`);
      stage.style.setProperty("--px", cur.x.toFixed(3));
      stage.style.setProperty("--py", cur.y.toFixed(3));
      raf = Math.abs(goal.x - cur.x) + Math.abs(goal.y - cur.y) > 0.001 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e) => {
      const r = root.getBoundingClientRect();
      root.style.setProperty("--mx", `${e.clientX - r.left}px`);
      root.style.setProperty("--my", `${e.clientY - r.top}px`);
      goal.x = (e.clientX - r.left) / r.width - 0.5;
      goal.y = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => {
      goal.x = 0;
      goal.y = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
    };
  }, []);

  // magnetic primary button
  const magnet = (e) => {
    if (e.pointerType !== "mouse") return;
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
  };
  const unmagnet = (e) => {
    e.currentTarget.style.transform = "";
  };

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" ref={rootRef} className={`h2 ${ready ? "is-ready" : ""}`} aria-labelledby="hero-title">
      {/* background */}
      <div className="h2-bg" aria-hidden="true">
        <div className="h2-grid" />
        <div className="h2-orb h2-orb--a" />
        <div className="h2-orb h2-orb--b" />
        <div className="h2-spot" />
        <div className="h2-noise" />
      </div>

      <div className="h2-inner">
        {/* copy */}
        <div className="h2-copy">
          <p className="h2-status h2-in" style={{ "--i": 0 }}>
            <span className="h2-status-dot" aria-hidden="true" />
            Toronto, ON
            <span className="h2-status-sep" aria-hidden="true" />
            <time>{time}</time> local time
          </p>

          <p className="h2-name h2-in" style={{ "--i": 1 }}>
            <img src="/milad-avatar.jpg" alt="" width="36" height="36" />
            <span>
              <strong>Milad M.</strong>
              <small>Frontend-Focused Full-Stack Developer</small>
            </span>
          </p>

          <h1 className="h2-title" id="hero-title" aria-label="I design and build web products that feel effortless.">
            {HEADLINE.map(({ w, accent }, i) => (
              <span key={w + i} aria-hidden="true">
                <span className="h2-word">
                  <span className={accent ? "h2-accent" : undefined} style={{ "--i": i }}>
                    {w}
                  </span>
                </span>
                {i < HEADLINE.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <p className="h2-lead h2-in" style={{ "--i": 6 }}>
            React, Next.js and TypeScript up front, Node.js and PostgreSQL behind it — fast,
            accessible and pixel-tight, from dashboards and SaaS to business websites.
          </p>

          <div className="h2-cta h2-in" style={{ "--i": 7 }}>
            <button type="button" className="h2-btn h2-btn--primary" onClick={() => go("work")} onPointerMove={magnet} onPointerLeave={unmagnet}>
              View my work <FiArrowRight aria-hidden="true" />
            </button>
            <button type="button" className="h2-btn h2-btn--ghost" onClick={() => go("connect")}>
              Let&apos;s talk
            </button>
          </div>

          <div className="h2-meta h2-in" style={{ "--i": 8 }}>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a className="h2-mail" href={`mailto:${CONTACT.email}`}>
              <FiMail aria-hidden="true" /> {CONTACT.email}
            </a>
          </div>
        </div>

        {/* showcase */}
        <div className="h2-stage-wrap h2-in" style={{ "--i": 3 }}>
          <div className="h2-stage" ref={stageRef}>
            <div className="h2-browser h2-layer" style={{ "--z": 40 }}>
              <div className="h2-browser-bar">
                <i /> <i /> <i />
                <span className="h2-url">
                  <FiLock aria-hidden="true" />
                  <span key={project.title} className="h2-url-text">
                    {project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </span>
                </span>
              </div>
              <div className="h2-screen">
                {SHOWCASE.map((p, i) => (
                  <img
                    key={p.title}
                    className={`h2-shot ${i === slide ? "is-on" : ""}`}
                    src={getShot(p.shots.desktopSm)}
                    alt={i === slide ? `${p.title} website` : ""}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding={i === 0 ? "sync" : "async"}
                  />
                ))}
              </div>
            </div>

            <div className="h2-phone h2-layer" style={{ "--z": 90 }} aria-hidden="true">
              <span className="h2-notch" />
              <div className="h2-phone-screen">
                {SHOWCASE.map((p, i) => (
                  <img key={p.title} className={`h2-shot ${i === slide ? "is-on" : ""}`} src={getShot(p.shots.mobileSm)} alt="" loading="lazy" decoding="async" />
                ))}
              </div>
            </div>

            <div className="h2-code-wrap h2-layer" style={{ "--z": 120 }}>
              <CodeCard start={ready} />
            </div>

            <div className="h2-chip h2-chip--a h2-layer" style={{ "--z": 150 }} aria-hidden="true">
              <span className="h2-chip-ring">100</span>
              <span>
                <strong>Lighthouse</strong>
                <small>Performance &amp; SEO</small>
              </span>
            </div>
            <div className="h2-chip h2-chip--b h2-layer" style={{ "--z": 130 }} aria-hidden="true">
              <strong>75+</strong>
              <small>projects shipped</small>
            </div>
            <div className="h2-chip h2-chip--c h2-layer" style={{ "--z": 110 }} aria-hidden="true">
              <span className="h2-stack">
                <b>React</b>
                <b>Next.js</b>
                <b>TS</b>
              </span>
            </div>
          </div>

          <div className="h2-caption">
            <a key={project.title} className="h2-caption-link" href={project.live} target="_blank" rel="noopener noreferrer">
              <span>{project.kind}</span>
              <strong>{project.title}</strong>
              <FiArrowUpRight aria-hidden="true" />
            </a>
          <div className="h2-dots" role="tablist" aria-label="Showcased project">
            {SHOWCASE.map((p, i) => (
              <button
                key={p.title}
                type="button"
                role="tab"
                aria-selected={i === slide}
                aria-label={p.title}
                className={i === slide ? "is-on" : ""}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
          </div>
        </div>
      </div>

      <button type="button" className="h2-scroll" onClick={() => go("story")} aria-label="Scroll to About">
        <span className="h2-mouse" aria-hidden="true">
          <i />
        </span>
        Scroll
      </button>
    </section>
  );
}
