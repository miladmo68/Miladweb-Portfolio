import React from "react";
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
} from "react-icons/si";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const techList = [
  { label: "JavaScript", icon: <SiJavascript /> },
  { label: "React", icon: <FaReact /> },
  { label: "HTML5", icon: <SiHtml5 /> },
  { label: "CSS3", icon: <SiCss3 /> },
  { label: "TailwindCSS", icon: <SiTailwindcss /> },
  { label: "Bootstrap", icon: <SiBootstrap /> },
  { label: "jQuery", icon: <SiJquery /> },
  { label: "Node.js", icon: <FaNodeJs /> },
  { label: "Python", icon: <FaPython /> },
  { label: "Django", icon: <SiDjango /> },
  { label: "PHP", icon: <FaPhp /> },
  { label: "Java", icon: <FaJava /> },
  { label: "MongoDB", icon: <SiMongodb /> },
  { label: "MySQL", icon: <SiMysql /> },
  { label: "Git", icon: <FaGitAlt /> },
  { label: "GitHub", icon: <FaGithub /> },
  { label: "Photoshop", icon: <SiAdobephotoshop /> },
  { label: "Postman", icon: <SiPostman /> },
  { label: "Heroku", icon: <SiHeroku /> },
  { label: "WordPress", icon: <FaWordpress /> },
  { label: "Joomla", icon: <FaJoomla /> },
  { label: "WooCommerce", icon: <SiWoocommerce /> },
  { label: "NPM", icon: <SiNpm /> },
  { label: "AWS", icon: <FaAws /> },
];

const workflowItems = [
  "Responsive Design & UI/UX Optimization",
  "Cross-Browser Compatibility & Performance Optimization",
  "Version Control with Git & API Integration",
  "Database Management & Security Best Practices",
  "Testing, Debugging & Continuous Learning",
  "Cloud Deployment & Client Collaboration",
];

function Skills() {
  return (
    <div
      className=" w-full px-4 sm:px-6 md:px-10 lg:px-20 py-10 flex flex-col items-center justify-center"
      id="skills"
    >
      {/* <h1 className="text-3xl font-extrabold text-center mb-2">Skills</h1> */}
      {/* <h2 className="text-lg text-gray-600 mb-6 text-center">
        My Technical Skills & Expertise
      </h2> */}
      <h2 className="text-lg text-gray-600 mb-6 text-center">
        Programming Languages & Tools
      </h2>

      {/* Tech Chips with Hover */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.75rem",
          maxWidth: "1200px",
          marginBottom: "20px",
        }}
      >
        {techList.map((item, index) => (
          <Chip
            key={index}
            label={item.label}
            icon={React.cloneElement(item.icon, {
              style: { fontSize: "1.4rem" },
            })}
            variant="outlined"
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "6px 10px",
              fontSize: "0.9rem",
              transition: "all 0.3s ease",
              cursor: "pointer",

              "&:hover": {
                backgroundColor: "#e7d8fd", //
                color: "#5000ca", //
                borderColor: "#5000ca",
              },
            }}
          />
        ))}
      </div>

      {/* Workflow Section */}
      <div className="mt-12 w-full max-w-3xl">
        <h3 className="text-xl font-semibold mb-4 text-left ">Workflow</h3>
        <ul className="space-y-3 ">
          {workflowItems.map((item, index) => (
            <p
              key={index}
              className="flex items-start text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer "
            >
              <CheckCircleIcon
                className="text-green-500 mt-0.5 mr-2 "
                fontSize="small"
              />
              <span>{item}</span>
            </p>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Skills;
