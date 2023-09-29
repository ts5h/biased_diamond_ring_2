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

  const handleOnMouse = (state: boolean) => {
    if (isMobile) return;
    setHover(state);
  };

  const handleOnTouch = (state: boolean) => {
    if (!isMobile) return;
    setHover(state);
  };

  return (
    <div
      onMouseOver={() => handleOnMouse(true)}
      onMouseOut={() => handleOnMouse(false)}
      onFocus={() => handleOnMouse(true)}
      onBlur={() => handleOnMouse(false)}
      onTouchStart={() => handleOnTouch(true)}
      onTouchEnd={() => handleOnTouch(false)}
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
