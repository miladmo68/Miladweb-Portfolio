import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiArrowUp } from "react-icons/fi";
import { CONTACT } from "../data/site";

const LINKS = [
  ["About", "story"],
  ["Work", "work"],
  ["Stack", "stack"],
  ["Services", "expertise"],
  ["Contact", "connect"],
];

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Footer() {
  return (
    <footer className="s-footer">
      <div className="s-container">
        <div className="s-footer-cta">
          <p className="s-footer-big">
            Have an idea? <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>
        <div className="s-footer-bar">
          <div className="s-footer-brand">
            <img src="/Logo-Blue.png" alt="" width="36" height="36" />
            <span>
              <strong>Milad M.</strong>
              <small>Frontend-Focused Full-Stack Developer · Toronto</small>
            </span>
          </div>
          <nav className="s-footer-nav" aria-label="Footer">
            {LINKS.map(([label, id]) => (
              <button key={id} type="button" onClick={() => go(id)}>
                {label}
              </button>
            ))}
          </nav>
          <div className="s-footer-social">
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email"><FiMail /></a>
          </div>
        </div>
        <div className="s-footer-legal">
          <span>
            © {new Date().getFullYear()} Milad M. · Designed &amp; built by{" "}
            <a className="s-credit" href="https://milink.ca" target="_blank" rel="noopener noreferrer">
              milink.ca
            </a>
          </span>
          <button type="button" className="s-top" onClick={() => go("home")}>
            Back to top <FiArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
