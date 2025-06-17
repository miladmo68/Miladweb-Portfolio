import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Footer.scss";

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/miladmo68" target="_blank" rel="noreferrer">
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

      <p>
        Designed by{" "}
        <a href="https://miladweb.com" target="_blank" rel="noreferrer">
          Miladweb.com
        </a>
      </p>
    </footer>
  );
}

export default Footer;
