import React from "react";

import { Anchor } from "components/utils";
import "./style.css";

export default () => {
  const socialLinks = [
    { link: "https://www.facebook.com/socialstreetsco", iconName: "facebook" },
    {
      link: "https://www.instagram.com/socialstreetsco/",
      iconName: "instagram"
    },
    { link: "https://twitter.com/socialstreetsco", iconName: "twitter" },
    { link: "https://www.linkedin.com/company/10668755/", iconName: "linkedin" }
  ];

  return <footer>{<Anchor socialLinks={socialLinks} />}</footer>;
};
