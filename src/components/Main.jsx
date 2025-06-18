import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Main.scss";

function Main() {
  return (
    <div className="container" id="home">
      <div className="about-section">
        <div className="image-wrapper">
          {/* <img
            src="https://media.licdn.com/dms/image/v2/D5635AQH0LxDQO_M4Sg/profile-framedphoto-shrink_400_400/B56ZZeb0FnGcAc-/0/1745341072068?e=1750788000&v=beta&t=9sBDfNDLuzhoQLTFmd_bACsTu20Rv_DJoZvbxUz5s84"
            alt="Avatar"
          /> */}
        </div>
        <div className="content">
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
          <p>Full Stack Developer</p>

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

export default Main;
