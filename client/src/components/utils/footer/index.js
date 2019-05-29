import React from "react";
import "./style.css";
import { Icon } from "antd";

export default () => {
  const socialLinks = {
    fb: "https://www.facebook.com/socialstreetsco",
    instagram: "https://www.instagram.com/socialstreetsco/",
    twitter: "https://twitter.com/socialstreetsco",
    linkedIn: "https://www.linkedin.com/company/10668755/"
  };

  return (
    <footer className="footer">
      <a
        className="footer--a"
        target="_blank"
        rel="noopener noreferrer"
        href={socialLinks.FB}
      >
        <Icon type="facebook" />
      </a>
      <a
        className="footer--a"
        target="_blank"
        rel="noopener noreferrer"
        href={socialLinks.linkedIn}
      >
        <Icon type="linkedin" />
      </a>
      <a
        className="footer--a"
        target="_blank"
        rel="noopener noreferrer"
        href={socialLinks.instagram}
      >
        <Icon type="instagram" />
      </a>
      <a
        className="footer--a"
        target="_blank"
        rel="noopener noreferrer"
        href={socialLinks.twitter}
      >
        <Icon type="twitter" />
      </a>
    </footer>
  );
};
