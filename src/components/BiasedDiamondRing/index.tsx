import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useSound } from "../../hooks/useSound";
import "../../scss/components/BiasedDiamondRing.scss";

type pointsType = {
  deg: number;
  x: number;
  y: number;
};

const BACKGROUND_COLOR = "rgb(232, 234, 237)";
const MIN_POINTS = 20;
const MAX_POINTS = isMobile ? 100 : 120;

const CANVAS_SIZE = {
  width: 4000,
  height: 3000,
};

const WAIT_TIME = 300;

export const BiasedDiamondRing: FC = () => {
  const { windowSize } = useWindowSize();
  const { playBeep } = useSound();

  const [waitFlag, setWaitFlag] = useState(false);
  const [points, setPoints] = useState<pointsType[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef(0);
  const animationFrameIdRef = useRef<number>();
  const waitTimeRef = useRef(0);

  // Clear the canvas
  const clearCanvas = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
  }, []);

  const setNewPoints = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const getRad = (deg: number) => (deg * Math.PI) / 180;

      const localPoints: pointsType[] = [];
      const pointsLength =
        Math.floor(Math.random() * (MAX_POINTS - MIN_POINTS)) + MIN_POINTS;

      const cx = windowSize.width / 2;
      const cy = windowSize.height / 2;

      let rx = Math.min(windowSize.width, windowSize.height) / 2;
      let ry = Math.random() * (rx * 0.65) + rx * 0.35;

      if (rx / ry >= 0.99) {
        rx *= 0.99;
        ry *= 0.99;
      }

      const rotDeg = Math.random() * 360;
      const rotRad = getRad(rotDeg);

      for (let i = 0; i < pointsLength; i++) {
        const deg = Math.random() * 360;
        const rad = getRad(deg);

        // Calculate the coordinates of the tilted ellipse
        const x = rx * Math.cos(rad);
        const y = ry * Math.sin(rad);
        const rotX = x * Math.cos(rotRad) - y * Math.sin(rotRad) + cx;
        const rotY = x * Math.sin(rotRad) + y * Math.cos(rotRad) + cy;

        localPoints.push({ deg, x: rotX, y: rotY });
      }

      localPoints.sort((a, b) => {
        if (a.deg < b.deg) return -1;
        if (a.deg > b.deg) return 1;
        return 0;
      });

      setPoints(localPoints);

      // Show the points length
      ctx.fillStyle = "rgba(68, 68, 68, 0.8)";
      ctx.font = "10px Inter";
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText(
        `${pointsLength}`,
        windowSize.width - 8,
        windowSize.height - 8,
      );
    },
    [windowSize],
  );

  const initialize = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      clearCanvas(ctx);
      setNewPoints(ctx);
      setWaitFlag(false);
    },
    [clearCanvas, setNewPoints],
  );

  const render = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) {
      render();
      return;
    }

    if (!waitFlag) {
      if (counterRef.current >= WAIT_TIME) {
        initialize(ctx);
      }

      ctx.strokeStyle = "rgba(34, 34, 34, 0.4)";
      ctx.lineWidth = 0.2;

      for (let i = counterRef.current + 1; i < points.length; i++) {
        const { x: x1, y: y1 } = points[counterRef.current];
        const { x: x2, y: y2 } = points[i];

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      if (!isMobile && counterRef.current > 0) {
        playBeep();
      }

      counterRef.current += 1;
      if (counterRef.current >= points.length) {
        setWaitFlag(true);
      }
    } else {
      waitTimeRef.current -= 1;

      if (waitTimeRef.current <= 0) {
        initialize(ctx);
        waitTimeRef.current = WAIT_TIME;
        counterRef.current = 0;
        setWaitFlag(false);
      }
    }

    animationFrameIdRef.current = requestAnimationFrame(render);
  }, [points, waitFlag]);

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
