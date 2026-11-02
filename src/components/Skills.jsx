import useReveal from "../hooks/useReveal";
import SectionHead from "./sections/SectionHead";
import { STACK } from "../data/site";

export default function Skills() {
  const ref = useReveal();
  return (
    <section id="stack" className="s-section" ref={ref} aria-labelledby="stack-title">
      <div className="s-container">
        <SectionHead
          id="stack-title"
          eyebrow="Stack"
          title="Tools I use every day"
          lead="A focused, modern stack for building fast, reliable products end to end."
        />
        <div className="s-stack">
          {STACK.map((g, i) => (
            <div key={g.title} className="s-stack-row" data-reveal style={{ "--d": `${i * 70}ms` }}>
              <h3 className="s-stack-title">{g.title}</h3>
              <ul className="s-stack-items">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
