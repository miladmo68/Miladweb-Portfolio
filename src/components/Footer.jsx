import React from "react";
import { FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "../assets/styles/Footer.scss";

const navLinks = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Services", "#services"],
  ["Contact", "#contact"],
];

const socials = [
  { icon: <FaGithub />, label: "GitHub", href: "https://github.com/miladmo68" },
  {
    icon: <FaLinkedinIn />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/miladmo68/",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    href: "https://instagram.com/milink.ca",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    href: "https://wa.me/14376003139",
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/Logo-Blue.png" alt="MiladWeb logo" />
            <span>MiladWeb</span>
          </div>
          <p className="footer-tagline">
            Full-Stack Developer building fast, scalable and SEO-friendly web
            applications that help businesses grow.
          </p>
          <div className="footer-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* quick nav */}
        <nav className="footer-col">
          <h4>Navigate</h4>
          <ul>
            {navLinks.map(([label, href]) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* contact */}
        <div className="footer-col">
          <h4>Get in Touch</h4>
          <ul>
            <li>
              <a href="tel:+14376003139">+1 (437) 600-3139</a>
            </li>
            <li>
              <a href="https://wa.me/14376003139" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </li>
            <li className="footer-muted">GTA, Ontario, Canada</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} MiladWeb. All rights reserved.</p>
        <p>
          Designed &amp; built by{" "}
          <a href="https://miladweb.com" target="_blank" rel="noreferrer">
            Miladweb.com
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
