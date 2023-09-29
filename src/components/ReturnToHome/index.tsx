import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import Styles from "../../scss/components/ReturnToHome.module.scss";

// Common "Return To Home" Link
export const ReturnToHome = (props: { theme: "light" | "dark" }) => {
  const { theme } = props;
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
      className={`${Styles.return_to_home} ${
        theme === "light" ? Styles.light : ""
      } ${hover ? Styles.on : ""}`}
    >
      <a href="/" title="HOME">
        HOME
      </a>
    </div>
  );
};