// import React, { useEffect, useRef, useState } from "react";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import "../assets/styles/Main.scss"; // Ensure this is correct path

// const WORDS = [
//   "Full-Stack Developer",
//   "Front-End Developer",
//   "Software Developer",
// ];

// const TYPE_MS = 80;
// const ERASE_MS = 50;
// const PAUSE_MS = 2000;

// export default function Main() {
//   const [text, setText] = useState("");
//   const [wordIndex, setIndex] = useState(0);
//   const [deleting, setDel] = useState(false);
//   const timer = useRef();

//   useEffect(() => {
//     const word = WORDS[wordIndex];

//     if (!deleting && text === word) {
//       timer.current = setTimeout(() => setDel(true), PAUSE_MS);
//       return () => clearTimeout(timer.current);
//     }

//     if (deleting && text === "") {
//       setDel(false);
//       setIndex((i) => (i + 1) % WORDS.length);
//       return;
//     }

//     const nextLength = text.length + (deleting ? -1 : 1);
//     const next = word.slice(0, nextLength);
//     const delay = deleting ? ERASE_MS : TYPE_MS;

//     timer.current = setTimeout(() => setText(next), delay);
//     return () => clearTimeout(timer.current);
//   }, [text, deleting, wordIndex]);

//   return (
//     <div className="container" id="home">
//       <div className="about-section">
//         <div className="image-wrapper">
//           <img src="/milad.png" alt="Avatar" />
//         </div>

//         <div className="content">
//           <div className="social_icons">
//             <a
//               href="https://github.com/miladmo68"
//               target="_blank"
//               rel="noreferrer"
//             >
//               <GitHubIcon />
//             </a>
//             <a
//               href="https://www.linkedin.com/in/miladmo68/"
//               target="_blank"
//               rel="noreferrer"
//             >
//               <LinkedInIcon />
//             </a>
//           </div>

//           <h1>Milad Mo</h1>

//           <p className="typed-wrapper">
//             I'm&nbsp;a&nbsp;
//             <span className="typed">{text}</span>
//             <span className="typed-cursor" aria-hidden="true" />
//           </p>

//           <div className="mobile_social_icons">
//             <a
//               href="https://github.com/miladmo68"
//               target="_blank"
//               rel="noreferrer"
//             >
//               <GitHubIcon />
//             </a>
//             <a
//               href="https://www.linkedin.com/in/miladmo68/"
//               target="_blank"
//               rel="noreferrer"
//             >
//               <LinkedInIcon />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Main.scss";

const WORDS = [
  "Full-Stack Developer",
  "Front-End Developer",
  "Software Developer",
];

const TYPE_MS = 80;
const ERASE_MS = 50;
const PAUSE_MS = 2000;

export default function Main() {
  const [text, setText] = useState("");
  const [wordIndex, setIndex] = useState(0);
  const [deleting, setDel] = useState(false);
  const timer = useRef();

  useEffect(() => {
    const word = WORDS[wordIndex];

    if (!deleting && text === word) {
      timer.current = setTimeout(() => setDel(true), PAUSE_MS);
      return () => clearTimeout(timer.current);
    }

    if (deleting && text === "") {
      setDel(false);
      setIndex((i) => (i + 1) % WORDS.length);
      return;
    }

    const nextLength = text.length + (deleting ? -1 : 1);
    const next = word.slice(0, nextLength);
    const delay = deleting ? ERASE_MS : TYPE_MS;

    timer.current = setTimeout(() => setText(next), delay);
    return () => clearTimeout(timer.current);
  }, [text, deleting, wordIndex]);

  return (
    <section id="home" className="main-hero">
      {/* ✅ فقط “زیرِ Main” فول‌واید می‌شود (بدون دست زدن به کانتینر محتوا) */}
      <div className="main-hero-bg full-bleed" aria-hidden="true" />

      {/* ✅ محتوای اصلی همون محدودیت قبلی رو حفظ می‌کند */}
      <div className="container">
        <div className="about-section">
          <div className="image-wrapper">
            <img src="/milad.png" alt="Avatar" />
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

            <p className="typed-wrapper">
              I'm&nbsp;a&nbsp;
              <span className="typed">{text}</span>
              <span className="typed-cursor" aria-hidden="true" />
            </p>

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
    </section>
  );
}
