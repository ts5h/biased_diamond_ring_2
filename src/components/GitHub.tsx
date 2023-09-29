import React, { useState } from "react";
import isMobile from "ismobilejs";
import Styles from "../scss/components/GitHub.module.scss";

// GitHub Link
type GitHubLinkType = {
  theme: "light" | "dark";
  url: string;
};

const GitHub = (props: GitHubLinkType) => {
  const { theme, url } = props;
  const [hover, setHover] = useState(false);

  const onMouseHandler = (state: boolean) => {
    if (isMobile().any) return;
    setHover(state);
  };

  const onTouchHandler = (state: boolean) => {
    if (!isMobile().any) return;
    setHover(state);
  };

  return (
    <div
      onMouseOver={() => onMouseHandler(true)}
      onMouseOut={() => onMouseHandler(false)}
      onFocus={() => onMouseHandler(true)}
      onBlur={() => onMouseHandler(false)}
      onTouchStart={() => onTouchHandler(true)}
      onTouchEnd={() => onTouchHandler(false)}
      className={`${Styles.github} ${theme === "light" ? Styles.light : ""} ${
        hover ? Styles.on : ""
      }`}
    >
      <a href={url} target="_blank" title="GitHub" rel="noreferrer">
        GitHub
      </a>
    </div>
  );
};

export default GitHub;
