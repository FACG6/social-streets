import React from "react";
import { Icon } from "antd";
export default hrefs => {
  const aTags = hrefs.map(href => (
    <a
      key={href.iconName}
      className="footer--a"
      target="_blank"
      rel="noopener noreferrer"
      href={href.link}
    >
      <Icon type={href.iconName} />
    </a>
  ));
  return aTags;
};
