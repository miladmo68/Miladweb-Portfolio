import React, { useEffect, useRef, useState } from "react";
import { FiBriefcase, FiMapPin, FiBookOpen } from "react-icons/fi";
import "../assets/styles/ProjectCards.scss";
import "../assets/styles/Experience.scss";

/* Career history — kept in sync with the current resume */
const jobs = [
  {
    role: "Frontend Developer",
    company: "Blue Lighthouse",
    location: "Toronto, ON · Hybrid",
    period: "Feb 2026 – Aug 2026",
    points: [
      "Built production-grade Next.js and TypeScript interfaces for an enterprise asset-management platform.",
      "Developed investor-facing portals and dashboards that present real-time data clearly.",
      "Created reusable component systems with Tailwind CSS and shadcn/ui, and managed server state with React Query.",
      "Integrated REST APIs and Web3 data (wagmi, ethers.js, viem), with small Node.js and MongoDB backend updates.",
      "Supported CI/CD deployments on Vercel and AWS Amplify, using Amazon S3 for hosting and storage.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "React Query", "AWS"],
  },
  {
    role: "Frontend Developer",
    company: "Techfahm Systems Inc.",
    location: "Toronto, ON",
    period: "Nov 2022 – Feb 2026",
    points: [
      "Led development of scalable React applications with Hooks, Redux and Context API.",
      "Built reusable, performance-focused UI components with a maintainable code structure.",
      "Integrated RESTful APIs for reliable data rendering and synchronization.",
      "Wrote unit tests with Jest and React Testing Library, and took part in Agile code reviews.",
    ],
    tech: ["React", "Redux", "Context API", "Jest", "REST APIs"],
  },
  {
    role: "Web Developer & IT Specialist",
    company: "Sky Contracting Inc.",
    location: "Ontario, Canada",
    period: "Aug 2021 – Nov 2022",
    points: [
      "Built interactive UI components with React and JavaScript.",
      "Improved site performance through responsive design and SEO best practices.",
      "Analyzed website metrics and shipped UX improvements based on the data.",
    ],
    tech: ["React", "JavaScript", "SEO"],
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    period: "2016 – 2021",
    points: [
      "Delivered custom websites and web apps for clients, from design through deployment.",
      "Built responsive sites with HTML5, CSS3, JavaScript and React.",
    ],
    tech: ["React", "JavaScript", "WordPress"],
  },
  {
    role: "Web Developer",
    company: "Wikimohtava",
    location: "Tehran, Iran",
    period: "2014 – 2016",
    points: [
      "Built responsive websites with HTML5, CSS3 and JavaScript.",
      "Applied code and SEO optimizations to improve visibility and performance.",
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
  },
];

const education = [
  {
    degree: "Bachelor's, Computer Science / IT",
    school: "Limkokwing University of Creative Technology, Malaysia",
    year: "2013",
  },
  {
    degree: "Associate, Computer Science / IT",
    school: "Azad University, Iran",
    year: "2009",
  },
];

function Experience() {
  const sectionRef = useRef(null);
  const itemRefs = useRef({});
  const [revealed, setRevealed] = useState(new Set());

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("animate-in");
        }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    const itemObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const id = e.target.getAttribute("data-reveal-id");
          if (e.isIntersecting && id)
            setRevealed((prev) => {
              if (prev.has(id)) return prev;
              const next = new Set(prev);
              next.add(id);
              return next;
            });
        }),
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    Object.values(itemRefs.current).forEach(
      (el) => el && itemObserver.observe(el),
    );

    return () => {
      sectionObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  const reveal = (id) => ({
    ref: (el) => (itemRefs.current[id] = el),
    "data-reveal-id": id,
    className: revealed.has(id) ? "is-revealed" : undefined,
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="fade-in-section experience-section"
      aria-labelledby="experience-heading"
    >
      <h2 id="experience-heading" className="experience-heading">
        Experience
      </h2>
      <p className="experience-subtitle">
        Building for the web since 2014, with 5+ years shipping production
        React and Next.js applications in Canada.
      </p>

      <ol className="xp-list">
        {jobs.map((job) => {
          const id = `xp-${job.company}`;
          const r = reveal(id);
          return (
            <li key={id} {...r} className={`xp-item ${r.className || ""}`}>
              <span className="xp-dot" aria-hidden="true">
                <FiBriefcase />
              </span>
              <article className="xp-card">
                <header className="xp-head">
                  <div>
                    <h3 className="xp-role">{job.role}</h3>
                    <p className="xp-company">{job.company}</p>
                  </div>
                  <div className="xp-meta">
                    <span className="xp-period">{job.period}</span>
                    <span className="xp-location">
                      <FiMapPin aria-hidden="true" /> {job.location}
                    </span>
                  </div>
                </header>
                <ul className="xp-points">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <ul className="pc-tech xp-tech" aria-label="Tech used">
                  {job.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="xp-education">
        <h3 className="xp-edu-title">
          <FiBookOpen aria-hidden="true" /> Education
        </h3>
        <div className="xp-edu-grid">
          {education.map((ed) => (
            <div className="xp-edu-card" key={ed.degree}>
              <p className="xp-edu-degree">{ed.degree}</p>
              <p className="xp-edu-school">{ed.school}</p>
              <span className="xp-period">{ed.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
