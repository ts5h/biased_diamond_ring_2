import React, { FC, useState } from "react";
import { isMobile } from "react-device-detect";
import Styles from "../../scss/components/GitHub.module.scss";

// GitHub Link
type Props = {
  theme: "light" | "dark";
  url: string;
};

export const GitHub: FC<Props> = ({ theme, url }) => {
  const [hover, setHover] = useState(false);

  const onMouseHandler = (state: boolean) => {
    if (isMobile) return;
    setHover(state);
  };

  const onTouchHandler = (state: boolean) => {
    if (!isMobile) return;
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
