import React, { FC, useCallback, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { useWindowSize } from "../../hooks/useWindowSize";
import "../../scss/components/BiasedDiamondRing.scss";

type pointsType = {
  deg: number;
  x: number;
  y: number;
};

const MIN_POINTS = 10;
const MAX_POINTS = 100;

const CANVAS_SIZE = {
  width: 4000,
  height: 2500,
};

export const BiasedDiamondRing: FC = () => {
  const { windowSize } = useWindowSize();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number>();

  // let cx = 0;
  // let cy = 0;
  // let r = 0;
  // let points: pointsType[] = [];
  //
  // let cnt = 0;
  // let waitTime = 0;

  const render = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx) {
      render();
      return;
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
