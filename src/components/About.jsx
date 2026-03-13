import React, { useEffect, useRef } from "react";
import Skills from "./Skills";

function About() {
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
      id="about"
      className="container items-container section py-12 px-4 fade-in-section"
    >
      <div
        className="container mx-auto max-w-4xl text-center"
        data-aos="fade-up"
      >
        <h1 className="text-3xl font-extrabold text-center mb-2">About Me</h1>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          I'm a Full Stack Developer and Technology Consultant specializing in
          building high-performance web applications that drive business growth.
          With expertise in modern JavaScript frameworks like React.js and
          Next.js, I create scalable, SEO-optimized solutions that deliver
          exceptional user experiences.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          My technical stack includes Next.js for server-side rendering and
          static site generation, React for dynamic UIs, Node.js and Express.js
          for robust backend systems, and MongoDB/MySQL for efficient data
          management. I specialize in building full-stack applications with
          modern architectures including RESTful APIs, GraphQL, and
          microservices.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          With a Master's degree in Computer Science and hands-on experience as
          a Technology Consultant and Full Stack Engineer, I've successfully
          delivered enterprise-level projects across e-commerce, SaaS platforms,
          and content management systems. I focus on performance optimization,
          implementing Core Web Vitals improvements, lazy loading strategies,
          and advanced caching techniques to ensure lightning-fast load times.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          Beyond development, I provide strategic consulting on technology
          architecture, cloud deployment (AWS, Heroku, Vercel), CI/CD pipelines,
          and DevOps best practices. I'm passionate about clean code,
          accessibility standards (WCAG), and creating maintainable solutions
          that scale with your business needs.
        </p>
      </div>
      <Skills />
    </div>
  );
}

export default About;
