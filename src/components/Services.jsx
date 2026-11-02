import { FiLayout, FiGlobe, FiShoppingBag, FiPenTool, FiZap, FiShield } from "react-icons/fi";
import useReveal from "../hooks/useReveal";
import SectionHead from "./sections/SectionHead";
import { SERVICES } from "../data/site";

const ICONS = [FiLayout, FiGlobe, FiShoppingBag, FiPenTool, FiZap, FiShield];

export default function Services() {
  const ref = useReveal();
  return (
    <section id="expertise" className="s-section" ref={ref} aria-labelledby="expertise-title">
      <div className="s-container">
        <SectionHead
          id="expertise-title"
          eyebrow="Services"
          title="What I can build for you"
          lead="From a single landing page to a full SaaS product — designed, built and shipped with care."
        />
        <ul className="s-services">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={s.title} className="s-service" data-reveal style={{ "--d": `${(i % 3) * 90}ms` }}>
                <span className="s-service-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
