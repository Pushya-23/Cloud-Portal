import React from "react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export const SocialLinks = () => (
  <section
    id="socialLinks"
    aria-label="Social Media Links"
    style={{
      position: "fixed",
      bottom: "0.5rem",
      right: "1.5rem",
      display: "flex",
      gap: "1rem",
      fontSize: "1rem",
      color: "#7a8ca6",
      zIndex: 10,
    }}
  >
    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      style={{ color: "inherit", textDecoration: "none" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#f472b6")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#7a8ca6")}
    >
      <FaInstagram />
    </a>
    <a
      href="https://twitter.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="X (Twitter)"
      style={{ color: "inherit", textDecoration: "none" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#60a5fa")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#7a8ca6")}
    >
      <FaXTwitter />
    </a>
  </section>
);
