import React from "react";
import Skills from "./Skills";

function About() {
  return (
    <div id="about" className="container items-container section py-12 px-4">
      {/* Section Title */}
      <div
        className="container mx-auto max-w-4xl text-center"
        data-aos="fade-up"
      >
        <h1 className="text-3xl font-extrabold text-center mb-2">About</h1>
        <p>
          Experienced Full Stack Developer with a passion for creating dynamic
          and responsive web applications. Skilled in front-end technologies
          like HTML5, CSS3, Tailwind, JavaScript, and ReactJS, and back-end
          frameworks including Node.js, Express.js. Database management using
          MongoDB and SQL, with expertise in CMS platforms such as WordPress,
          Joomla, and Shopify.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          With a Master’s in Computer Science/Information Technology, I have
          hands-on experience in designing, developing, and maintaining
          full-stack applications, delivering clean, scalable, and efficient
          code. I collaborate closely with cross-functional teams, ensuring
          seamless integration of front-end and back-end functionalities. My
          background includes optimizing website performance, implementing SEO
          best practices, and troubleshooting complex issues.
        </p>
      </div>
      <Skills />
    </div>
  );
}

export default About;
