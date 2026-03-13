import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faLaptopCode,
  faPencilRuler,
  faShoppingCart,
  faSearch,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../assets/styles/Timeline.scss";

const services = [
  {
    icon: faCode,
    title: "Custom Web Development",
    description:
      "Build dynamic, responsive, and user-friendly websites tailored to meet your business goals and enhance user experience.",
  },
  {
    icon: faLaptopCode,
    title: "Full Stack Development",
    description:
      "Provide end-to-end solutions using HTML5, CSS3, React, Node.js, and MySQL/MongoDB to create scalable, dynamic web apps.",
  },
  {
    icon: faPencilRuler,
    title: "UI/UX Design",
    description:
      "Create intuitive, visually appealing designs ensuring seamless user experience across all devices.",
  },
  {
    icon: faShoppingCart,
    title: "E-commerce Solutions",
    description:
      "Develop and optimize e-commerce websites using Shopify, WooCommerce, and custom solutions.",
  },
  {
    icon: faSearch,
    title: "SEO Optimization",
    description:
      "Enhance your website’s visibility with proven SEO strategies, on-page optimization, and keyword research.",
  },
  {
    icon: faTools,
    title: "Website Maintenance & Support",
    description:
      "Offer ongoing support, updates, and troubleshooting to keep your website running smoothly and securely.",
  },
];

function Timeline() {
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

  // Check if dark mode is active
  const isDarkMode = document.querySelector(".dark-mode") !== null;

  return (
    <div
      ref={sectionRef}
      id="services"
      className="fade-in-section services-section"
      style={{ padding: "4rem 1rem" }}
    >
      <div
        style={{ textAlign: "center", marginBottom: "3rem" }}
        className="items-container"
      >
        <h1 className="text-3xl font-extrabold text-center mb-2">Services</h1>
        <p style={{ maxWidth: "700px", margin: "0 auto" }}>
          I want your business to succeed, and I'm committed to doing everything
          I can to make that happen. Below is an overview of the professional
          web development services I offer, each designed to support your growth
          and success.
        </p>
        <VerticalTimeline>
          {services.map((service, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work service-card"
              date={`Service ${index + 1}`}
              iconStyle={{ background: "#1e3a8a", color: "#fff" }}
              icon={<FontAwesomeIcon icon={service.icon} />}
            >
              <h3 className="vertical-timeline-element-title">
                {service.title}
              </h3>
              <p>{service.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
