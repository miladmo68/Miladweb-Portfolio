import React, { useEffect, useRef, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Main.scss";

/* words that cycle */
const WORDS = [
  "Full-Stack Developer",
  "Front-End Developer",
  "Software Delevoper",
];

const TYPE_MS = 80; // speed while typing
const ERASE_MS = 50; // speed while deleting
const PAUSE_MS = 2000; // wait after a word is complete

export default function Main() {
  /* typewriter state */
  const [text, setText] = useState("");
  const [wordIndex, setIndex] = useState(0);
  const [deleting, setDel] = useState(false);
  const timer = useRef();

  useEffect(() => {
    const word = WORDS[wordIndex];

    /* finished typing → pause then start deleting */
    if (!deleting && text === word) {
      timer.current = setTimeout(() => setDel(true), PAUSE_MS);
      return () => clearTimeout(timer.current);
    }

    /* finished deleting → move to next word */
    if (deleting && text === "") {
      setDel(false);
      setIndex((i) => (i + 1) % WORDS.length);
      return;
    }

    /* next substring */
    const nextLength = text.length + (deleting ? -1 : 1);
    const next = word.slice(0, nextLength);
    const delay = deleting ? ERASE_MS : TYPE_MS;

    timer.current = setTimeout(() => setText(next), delay);
    return () => clearTimeout(timer.current);
  }, [text, deleting, wordIndex]);

  /* scroll-link helpers remain unchanged (if you had them) */

  return (
    <div className="container" id="home">
      <div className="about-section">
        <div className="image-wrapper">
          <img src="/milad.png" alt="Avatar" loading="lazy" />
        </div>

        <div className="content">
          {/* desktop social icons */}
          <div className="social_icons">
            <a
              href="https://github.com/miladmo68"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/miladmo68/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
            </a>
          </div>

          <h1>Milad Mo</h1>

          {/* typed line */}
          <p className="typed-wrapper">
            I'm&nbsp;a&nbsp;
            <span className="typed">{text}</span>
            <span className="typed-cursor" aria-hidden="true" />
          </p>

          {/* mobile social icons */}
          <div className="mobile_social_icons">
            <a
              href="https://github.com/miladmo68"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/miladmo68/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
