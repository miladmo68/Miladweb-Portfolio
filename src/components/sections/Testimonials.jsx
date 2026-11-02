import useReveal from "../../hooks/useReveal";
import SectionHead from "./SectionHead";
import { TESTIMONIALS } from "../../data/site";

const initials = (n) =>
  n.replace(/inc\.?/i, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

function Card({ t, hidden }) {
  return (
    <figure className="s-quote" aria-hidden={hidden || undefined}>
      <blockquote>“{t.quote}”</blockquote>
      <figcaption>
        <span className="s-quote-avatar" aria-hidden="true">{initials(t.name)}</span>
        <span>
          <strong>{t.name}</strong>
          <small>{t.role}</small>
        </span>
      </figcaption>
    </figure>
  );
}

/* Two marquee rows moving in opposite directions (pause on hover) */
export default function Testimonials() {
  const ref = useReveal();
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const rows = [TESTIMONIALS.slice(0, half), TESTIMONIALS.slice(half)];

  return (
    <section id="clients" className="s-section s-section--flush" ref={ref} aria-labelledby="clients-title">
      <div className="s-container">
        <SectionHead
          id="clients-title"
          eyebrow="Client words"
          title="Trusted by the businesses I build for"
          lead="Feedback from clients of MiLink, the web studio where I design and build websites."
          align="center"
        />
      </div>
      <div className="s-quotes" data-reveal>
        {rows.map((row, r) => (
          <div key={r} className="s-quotes-mask">
            <div className={`s-quotes-track ${r ? "s-quotes-track--rev" : ""}`}>
              {[...row, ...row].map((t, i) => (
                <Card key={`${t.name}-${i}`} t={t} hidden={i >= row.length} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
