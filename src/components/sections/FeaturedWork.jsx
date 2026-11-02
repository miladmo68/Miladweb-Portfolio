import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FiMaximize2, FiMonitor, FiSmartphone, FiX, FiChevronLeft, FiChevronRight, FiArrowUpRight, FiLock } from "react-icons/fi";
import useReveal from "../../hooks/useReveal";
import SectionHead from "./SectionHead";
import { FEATURED } from "../../data/site";
import { getShot } from "../../utils/images";

const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Shared timeline ──────────────────────────────────────────────────
   One clock per project drives every frame, so the desktop and phone
   screens always travel together: hold at the top, glide down, hold at
   the bottom, glide back up. A full pass takes PASS ms whatever the page
   length. The clock only advances while the project is on screen. */
const HOLD = 1300;
const PASS = 16000;
const CYCLE = HOLD * 2 + PASS * 2;
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const phaseAt = (ms) => {
  const t = ms % CYCLE;
  if (t < HOLD) return 0;
  if (t < HOLD + PASS) return ease((t - HOLD) / PASS);
  if (t < HOLD * 2 + PASS) return 1;
  return 1 - ease((t - HOLD * 2 - PASS) / PASS);
};

function useSyncedScroll(rootRef, frames) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduced = reducedMotion();
    const state = { elapsed: 0, last: 0, visible: false, raf: 0 };
    const items = frames.map((f) => ({ ...f, pos: 0, max: 0, target: null }));

    const measure = () =>
      items.forEach((it) => {
        const view = it.view.current;
        const inner = it.inner.current;
        if (view && inner) it.max = Math.max(0, inner.offsetHeight - view.clientHeight);
      });

    const tick = (now) => {
      const dt = Math.min(64, now - (state.last || now));
      state.last = now;
      if (!reduced) state.elapsed += dt;
      const phase = phaseAt(state.elapsed);
      items.forEach((it) => {
        const goal = it.target ?? phase * it.max;
        // ease towards the goal: smooth when scrubbing and when releasing
        it.pos += (goal - it.pos) * Math.min(1, dt / (it.target !== null ? 110 : 60));
        if (it.inner.current) it.inner.current.style.transform = `translate3d(0, ${-it.pos}px, 0)`;
      });
      state.raf = state.visible && !document.hidden ? requestAnimationFrame(tick) : 0;
      if (!state.raf) state.last = 0;
    };
    const run = () => {
      if (!state.raf && state.visible && !document.hidden) state.raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => {
      measure();
      run();
    });
    items.forEach((it) => {
      if (it.view.current) ro.observe(it.view.current);
      if (it.inner.current) ro.observe(it.inner.current);
    });
    const io = new IntersectionObserver(([e]) => {
      state.visible = e.isIntersecting;
      run();
    });
    io.observe(root);
    document.addEventListener("visibilitychange", run);

    // scrub the desktop frame with a mouse
    const scrub = items.find((it) => it.scrub);
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const view = scrub?.view.current;
    const move = (e) => {
      if (e.pointerType !== "mouse") return;
      const r = view.getBoundingClientRect();
      scrub.target = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) * scrub.max;
      run();
    };
    const leave = () => {
      // resume the shared clock from where the visitor left the page
      const ratio = scrub.max ? scrub.pos / scrub.max : 0;
      scrub.target = null;
      items.forEach((it) => (it.pos = ratio * it.max));
      state.elapsed = HOLD + PASS * ratio;
      run();
    };
    if (view && fine) {
      view.addEventListener("pointermove", move);
      view.addEventListener("pointerleave", leave);
    }
    measure();
    run();

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", run);
      if (view) {
        view.removeEventListener("pointermove", move);
        view.removeEventListener("pointerleave", leave);
      }
    };
    // frames are stable refs created once per card
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function CaseMedia({ project, onOpen }) {
  const rootRef = useRef(null);
  const desk = { view: useRef(null), inner: useRef(null), scrub: true };
  const phone = { view: useRef(null), inner: useRef(null) };
  const framesRef = useRef([desk, phone]);
  useSyncedScroll(rootRef, framesRef.current);

  const open = (device) => () => onOpen(device);
  const key = (device) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(device);
    }
  };

  return (
    <div className="s-case-media" ref={rootRef} data-reveal>
      <div className="s-case-frame">
        <div className="s-case-bar" aria-hidden="true">
          <i /> <i /> <i />
          <span className="s-case-url">
            <FiLock /> {host(project.live)}
          </span>
        </div>
        <div
          className="s-case-screen"
          ref={desk.view}
          role="button"
          tabIndex={0}
          aria-label={`Open ${project.title} in the full-page viewer`}
          onClick={open("desktop")}
          onKeyDown={key("desktop")}
        >
          <div className="s-case-inner" ref={desk.inner}>
            <img
              src={getShot(project.shots.desktopSm)}
              alt={`${project.title} website, full page`}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <div className="s-case-phone" onClick={open("mobile")} aria-hidden="true">
        <span className="s-case-notch" />
        <div className="s-case-phone-screen" ref={phone.view}>
          <div className="s-case-inner" ref={phone.inner}>
            <img src={getShot(project.shots.mobileSm)} alt="" loading="lazy" decoding="async" draggable={false} />
          </div>
        </div>
      </div>

      <button type="button" className="s-case-open" onClick={open("desktop")}>
        <FiMaximize2 aria-hidden="true" /> Full screen
      </button>
    </div>
  );
}

/* ── Full-screen viewer ─────────────────────────────────────────────── */
function Viewer({ state, setState, onClose }) {
  const { index, device } = state;
  const project = FEATURED[index];
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const scrollRef = useRef(null);

  const go = useCallback(
    (dir) => setState((s) => ({ ...s, index: (s.index + dir + FEATURED.length) % FEATURED.length })),
    [setState],
  );

  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return go(1);
      if (e.key === "ArrowLeft") return go(-1);
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = [...panelRef.current.querySelectorAll("a[href], button, [tabindex='0']")];
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
        e.preventDefault();
        f[0].focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [onClose, go]);

  // new project or device: start at the top of the page
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [index, device]);

  const prev = FEATURED[(index - 1 + FEATURED.length) % FEATURED.length];
  const next = FEATURED[(index + 1) % FEATURED.length];
  const src = getShot(project.shots[device]);

  return (
    <div className="s-viewer" role="dialog" aria-modal="true" aria-label={`${project.title} full-page viewer`}>
      <button type="button" className="s-viewer-scrim" aria-label="Close viewer" tabIndex={-1} onClick={onClose} />
      <div className="s-viewer-panel" ref={panelRef}>
        <aside className="s-viewer-info">
          <div className="s-viewer-top">
            <span className="s-viewer-kind">{project.kind}</span>
            <button ref={closeRef} type="button" className="s-viewer-close" onClick={onClose} aria-label="Close viewer">
              <FiX />
            </button>
          </div>
          <h3 className="s-viewer-title">{project.title}</h3>
          <p className="s-viewer-summary">{project.summary}</p>
          <ul className="s-tags s-viewer-tags">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="s-viewer-actions">
            <a className="s-btn s-btn--primary" href={project.live} target="_blank" rel="noopener noreferrer">
              Visit live site <FiArrowUpRight aria-hidden="true" />
            </a>
            {project.github && (
              <a className="s-btn s-btn--ghost" href={project.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon fontSize="inherit" /> Source
              </a>
            )}
          </div>
          <nav className="s-viewer-nav" aria-label="Project navigation">
            <button type="button" onClick={() => go(-1)}>
              <FiChevronLeft aria-hidden="true" />
              <span>
                <small>Previous</small>
                {prev.title}
              </span>
            </button>
            <button type="button" onClick={() => go(1)}>
              <span>
                <small>Next</small>
                {next.title}
              </span>
              <FiChevronRight aria-hidden="true" />
            </button>
          </nav>
        </aside>

        <div className="s-viewer-stage">
          <div className="s-viewer-toolbar">
            <div className="s-toggle" role="group" aria-label="Device">
              <button type="button" aria-pressed={device === "desktop"} onClick={() => setState((s) => ({ ...s, device: "desktop" }))}>
                <FiMonitor aria-hidden="true" /> Desktop
              </button>
              <button type="button" aria-pressed={device === "mobile"} onClick={() => setState((s) => ({ ...s, device: "mobile" }))}>
                <FiSmartphone aria-hidden="true" /> Mobile
              </button>
            </div>
            <span className="s-viewer-hint">Scroll to explore the full page</span>
          </div>

          <div className={`s-viewer-device is-${device}`}>
            {device === "desktop" ? (
              <div className="s-viewer-browser">
                <div className="s-case-bar" aria-hidden="true">
                  <i /> <i /> <i />
                  <span className="s-case-url">
                    <FiLock /> {host(project.live)}
                  </span>
                </div>
                <div className="s-viewer-scroll" ref={scrollRef} tabIndex={0} aria-label={`${project.title}, full page, scrollable`}>
                  <img key={src} src={src} alt={`${project.title} website, full page`} />
                </div>
              </div>
            ) : (
              <div className="s-viewer-phone">
                <span className="s-case-notch" />
                <div className="s-viewer-scroll" ref={scrollRef} tabIndex={0} aria-label={`${project.title}, mobile, full page, scrollable`}>
                  <img key={src} src={src} alt={`${project.title} mobile website, full page`} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────────────── */
export default function FeaturedWork() {
  const ref = useReveal();
  const [viewer, setViewer] = useState(null);
  const close = useCallback(() => setViewer(null), []);
  const openAt = (index) => (device) => {
    const narrow = window.innerWidth < 768;
    setViewer({ index, device: narrow && device === "desktop" ? "mobile" : device });
  };

  return (
    <section id="work" className="s-section" ref={ref} aria-labelledby="work-title">
      <div className="s-container">
        <SectionHead
          id="work-title"
          eyebrow="Selected Work"
          title="Featured projects"
          lead="A few products and client websites I'm proud of. Click any preview to explore the full page on desktop and mobile."
        />

        <ol className="s-featured">
          {FEATURED.map((p, i) => (
            <li key={p.title} className={`s-case ${i % 2 ? "s-case--flip" : ""}`}>
              <CaseMedia project={p} onOpen={openAt(i)} />

              <div className="s-case-body">
                <p className="s-case-meta" data-reveal style={{ "--d": "60ms" }}>
                  <span className="s-case-index">{String(i + 1).padStart(2, "0")}</span>
                  {p.kind}
                </p>
                <h3 className="s-case-title" data-reveal style={{ "--d": "120ms" }}>
                  {p.title}
                </h3>
                <p className="s-case-summary" data-reveal style={{ "--d": "180ms" }}>
                  {p.summary}
                </p>
                <ul className="s-case-points" data-reveal style={{ "--d": "240ms" }}>
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <ul className="s-tags" aria-label="Tech stack" data-reveal style={{ "--d": "300ms" }}>
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="s-case-actions" data-reveal style={{ "--d": "360ms" }}>
                  <button type="button" className="s-btn s-btn--primary" onClick={() => openAt(i)("desktop")}>
                    <FiMaximize2 aria-hidden="true" /> Explore
                  </button>
                  <a className="s-btn s-btn--ghost" href={p.live} target="_blank" rel="noopener noreferrer">
                    <LaunchIcon fontSize="inherit" /> Live site
                  </a>
                  {p.github && (
                    <a className="s-btn s-btn--ghost" href={p.github} target="_blank" rel="noopener noreferrer">
                      <GitHubIcon fontSize="inherit" /> Source
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {viewer && createPortal(<Viewer state={viewer} setState={setViewer} onClose={close} />, document.body)}
    </section>
  );
}
