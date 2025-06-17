import React from "react";
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
  return (
    <div id="services" style={{ padding: "4rem 1rem" }}>
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
              className="vertical-timeline-element--work"
              contentStyle={{ background: "white", color: "rgb(39, 40, 34)" }}
              contentArrowStyle={{ borderRight: "7px solid white" }}
              date={`Service ${index + 1}`}
              iconStyle={{ background: "#5000ca", color: "#fff" }}
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
