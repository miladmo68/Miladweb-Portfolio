import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import useReveal from "../../hooks/useReveal";
import SectionHead from "./SectionHead";
import { FEATURED } from "../../data/site";
import { getImg, getShot } from "../../utils/images";

/* scroll speed scales with page length so every site moves at the same pace */
const setPace = (e) => {
  const img = e.currentTarget;
  const ratio = img.naturalHeight / img.naturalWidth;
  img.style.setProperty("--dur", `${Math.min(Math.max(ratio * 6, 10), 34)}s`);
};

/* Featured case studies — large alternating rows */
export default function FeaturedWork() {
  const ref = useReveal();

  return (
    <section id="work" className="s-section" ref={ref} aria-labelledby="work-title">
      <div className="s-container">
        <SectionHead
          id="work-title"
          eyebrow="Selected Work"
          title="Featured projects"
          lead="A few products and client websites I'm proud of — from AI-powered SaaS to dashboards and production business sites."
        />

        <ol className="s-featured">
          {FEATURED.map((p, i) => (
            <li key={p.title} className={`s-case ${i % 2 ? "s-case--flip" : ""}`}>
              <a
                className="s-case-media"
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.title} live site`}
                data-reveal
              >
                <span className="s-case-frame">
                  <span className="s-case-bar" aria-hidden="true">
                    <i /> <i /> <i />
                    <span className="s-case-url">{p.live.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                  </span>
                  <span className="s-case-screen">
                    <img
                      className="s-shot"
                      src={p.shots ? getShot(p.shots.desktop) : getImg(p.img, "full")}
                      alt={`${p.title} desktop website`}
                      loading="lazy"
                      decoding="async"
                      onLoad={setPace}
                    />
                  </span>
                </span>
                {p.shots?.mobile && (
                  <span className="s-case-phone" aria-hidden="true">
                    <span className="s-case-phone-screen">
                      <img
                        className="s-shot s-shot--phone"
                        src={getShot(p.shots.mobile)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onLoad={setPace}
                      />
                    </span>
                  </span>
                )}
              </a>

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
                  <a className="s-btn s-btn--primary" href={p.live} target="_blank" rel="noopener noreferrer">
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
    </section>
  );
}
