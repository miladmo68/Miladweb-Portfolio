import React, { useEffect, useRef } from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaPhp,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaWordpress,
  FaJoomla,
  FaAws,
} from "react-icons/fa";
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiBootstrap,
  SiJquery,
  SiDjango,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiHeroku,
  SiAdobephotoshop,
  SiWoocommerce,
  SiNpm,
  SiNextdotjs,
  SiExpress,
  SiRedux,
  SiGraphql,
} from "react-icons/si";
import Chip from "@mui/material/Chip";

/* same skills as before, now organised into labelled groups */
const skillGroups = [
  {
    title: "Frontend",
    items: [
      { label: "JavaScript", icon: <SiJavascript /> },
      { label: "React", icon: <FaReact /> },
      { label: "Next.js", icon: <SiNextdotjs /> },
      { label: "Redux", icon: <SiRedux /> },
      { label: "HTML5", icon: <SiHtml5 /> },
      { label: "CSS3", icon: <SiCss3 /> },
      { label: "TailwindCSS", icon: <SiTailwindcss /> },
      { label: "Bootstrap", icon: <SiBootstrap /> },
      { label: "jQuery", icon: <SiJquery /> },
    ],
  },
  {
    title: "Backend",
    items: [
      { label: "Node.js", icon: <FaNodeJs /> },
      { label: "Express.js", icon: <SiExpress /> },
      { label: "GraphQL", icon: <SiGraphql /> },
      { label: "Python", icon: <FaPython /> },
      { label: "Django", icon: <SiDjango /> },
      { label: "PHP", icon: <FaPhp /> },
      { label: "Java", icon: <FaJava /> },
    ],
  },
  {
    title: "Databases",
    items: [
      { label: "MongoDB", icon: <SiMongodb /> },
      { label: "MySQL", icon: <SiMysql /> },
    ],
  },
  {
    title: "Tools & Cloud",
    items: [
      { label: "Git", icon: <FaGitAlt /> },
      { label: "GitHub", icon: <FaGithub /> },
      { label: "AWS", icon: <FaAws /> },
      { label: "Heroku", icon: <SiHeroku /> },
      { label: "Postman", icon: <SiPostman /> },
      { label: "NPM", icon: <SiNpm /> },
      { label: "Photoshop", icon: <SiAdobephotoshop /> },
    ],
  },
  {
    title: "CMS & E-commerce",
    items: [
      { label: "WordPress", icon: <FaWordpress /> },
      { label: "Joomla", icon: <FaJoomla /> },
      { label: "WooCommerce", icon: <SiWoocommerce /> },
    ],
  },
];

function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-10 flex flex-col items-center justify-center fade-in-section"
      id="skills"
    >
      <h2 className="skills-heading text-2xl font-bold mb-2 text-center">
        Skills &amp; Technologies
      </h2>
      <p className="skills-subtitle mb-8 text-center">
        The languages, frameworks, and tools I work with.
      </p>

      <div className="skills-groups">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.title}>
            <h3 className="skill-group-title">{group.title}</h3>
            <div className="skill-group-chips">
              {group.items.map((item) => (
                <Chip
                  key={item.label}
                  label={item.label}
                  icon={React.cloneElement(item.icon, {
                    style: { fontSize: "1.3rem" },
                  })}
                  variant="outlined"
                  className="skill-chip"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
