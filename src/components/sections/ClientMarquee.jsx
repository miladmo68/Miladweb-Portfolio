import { CLIENTS } from "../../data/site";

/* Infinite marquee of client names (pure CSS animation, pauses on hover) */
export default function ClientMarquee() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="s-marquee" aria-label="Client websites I have built">
      <p className="s-marquee-label">Websites shipped for businesses across the GTA</p>
      <div className="s-marquee-mask">
        <ul className="s-marquee-track">
          {row.map((name, i) => (
            <li key={`${name}-${i}`} aria-hidden={i >= CLIENTS.length}>
              {name}
              <span className="s-marquee-sep" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
