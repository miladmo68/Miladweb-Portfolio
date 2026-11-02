import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { CONTACT } from "../data/site";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Main.scss";

export default function Main() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="container" id="home">
      <div className="about-section">
        <video
          className="hero-video hero-video--ambient"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="https://cdn.sceneai.art/Hero%20Section%20Video/5a6cf9a9-9f93-4e44-88f3-cf666065daf7.mp4"
            type="video/mp4"
          />
        </video>
        <video
          className="hero-video hero-video--stage"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="https://cdn.sceneai.art/Hero%20Section%20Video/5a6cf9a9-9f93-4e44-88f3-cf666065daf7.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-video-overlay" aria-hidden="true" />

        <div className="content">
          <div className="image-wrapper">
            <img
              src="/milad-avatar.jpg"
              alt="Milad Mohammadi, Full-Stack Developer"
              width="160"
              height="160"
              fetchPriority="high"
            />
          </div>

          <h1 className="hero-name">
            Milad <span className="name-accent">Mohammadi</span>
          </h1>

          <p className="typed-wrapper hero-role">
            Frontend-Focused Full-Stack Developer
          </p>

          <p className="hero-tagline">
            I build fast, accessible web apps, dashboards and portals with
            React, Next.js, TypeScript &amp; Node.js — turning ideas into
            polished products.
          </p>

          <div className="hero-cta">
            <button
              type="button"
              className="hero-btn hero-btn--primary"
              onClick={() => scrollTo("projects")}
            >
              View My Work
            </button>
            <button
              type="button"
              className="hero-btn hero-btn--ghost"
              onClick={() => scrollTo("connect")}
            >
              Get in Touch
            </button>
          </div>

          <div className="social_icons">
            <a
              href="https://github.com/miladmo68"
              aria-label="GitHub profile"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/miladmo68/"
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
            </a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email Milad">
              <MailOutlineIcon />
            </a>
          </div>

          <div className="mobile_social_icons">
            <a
              href="https://github.com/miladmo68"
              aria-label="GitHub profile"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/miladmo68/"
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
            </a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email Milad">
              <MailOutlineIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
