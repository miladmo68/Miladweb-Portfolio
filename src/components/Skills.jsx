import React, { useEffect, useRef, useState } from "react";
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
  /* per-group scroll reveal — same pattern as the Portfolio cards and the
     About highlight cards: each group observes itself and animates only
     when it actually scrolls into view. */
  const [revealedGroups, setRevealedGroups] = useState(new Set());
  const groupRefs = useRef({});

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    const groupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-reveal-id");
            if (id)
              setRevealedGroups((prev) => {
                if (prev.has(id)) return prev;
                const next = new Set(prev);
                next.add(id);
                return next;
              });
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    const t = setTimeout(() => {
      Object.values(groupRefs.current).forEach(
        (el) => el && groupObserver.observe(el),
      );
    }, 30);

    return () => {
      clearTimeout(t);
      sectionObserver.disconnect();
      groupObserver.disconnect();
    };
  }, []);

  const revealStyle = (id, delay = 0) => {
    const shown = revealedGroups.has(id);
    return {
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    };
  };

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
        {skillGroups.map((group, i) => {
          const id = `sg-${group.title}`;
          return (
            <div
              className="skill-group"
              key={group.title}
              ref={(el) => (groupRefs.current[id] = el)}
              data-reveal-id={id}
              style={revealStyle(id, Math.min(i * 0.08, 0.32))}
            >
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
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
