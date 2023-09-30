import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { useWindowSize } from "../../hooks/useWindowSize";
import "../../scss/components/BiasedDiamondRing.scss";

type pointsType = {
  deg: number;
  x: number;
  y: number;
};

const BACKGROUND_COLOR = "rgb(255, 255, 255)";
const MIN_POINTS = 10;
const MAX_POINTS = 100;

const CANVAS_SIZE = {
  width: 4000,
  height: 2500,
};

const WAIT_TIME = 300;

export const BiasedDiamondRing: FC = () => {
  const { windowSize } = useWindowSize();

  const [waitFlag, setWaitFlag] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number>();

  let cx = 0;
  let cy = 0;
  let r = 0;
  let points: pointsType[] = [];

  const counterRef = useRef(0);
  const waitTimeRef = useRef(0);

  const reset = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
  }, []);

  const init = useCallback(() => {
    cx = windowSize.width / 2;
    cy = windowSize.height / 2;

    console.log(cx, cy);
  }, []);

  const setPoints = useCallback(() => {}, []);

  const render = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      render();
      return;
    }

    if (!waitFlag) {
      if (counterRef.current >= WAIT_TIME) {
        init();
      }

      // TODO: Draw the diamond ring

      counterRef.current += 1;
      if (counterRef.current >= points.length) {
        setWaitFlag(true);
      }
    } else {
      waitTimeRef.current += 1;

      if (waitTimeRef.current >= WAIT_TIME) {
        init();
        waitTimeRef.current = WAIT_TIME;
        counterRef.current = 0;
        setWaitFlag(false);
      }
    }

    animationFrameIdRef.current = requestAnimationFrame(render);
  }, [windowSize]);

  useEffect(() => {
    render();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE.width}
      height={CANVAS_SIZE.height}
    />
  );
};
