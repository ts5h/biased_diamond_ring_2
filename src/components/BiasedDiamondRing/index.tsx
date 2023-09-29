import React, { FC, useRef } from "react";
import { isMobile } from "react-device-detect";
import "../../scss/components/BiasedDiamondRing.scss";

type pointsType = {
  deg: number;
  x: number;
  y: number;
};

const MIN_POINTS = 10;
const MAX_POINTS = 100;

const canvasSize = {
  width: 4000,
  height: 2500,
};

export const BiasedDiamondRing: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // let cx = 0;
  // let cy = 0;
  // let r = 0;
  // let points: pointsType[] = [];
  //
  // let cnt = 0;
  // let waitTime = 0;

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  );

  // const [waitFlag, setWaitFlag] = useState(false);
  //
  // const p5Obj = useRef<p5Types>();
  //
  // const windowResized = () => {
  //   if (!p5Obj.current) return;
  //   const p5 = p5Obj.current;
  //
  //   p5.resizeCanvas(window.innerWidth, window.innerHeight);
  //   init();
  // };
  //
  // // Support Functions
  // const init = () => {
  //   if (!p5Obj.current) return;
  //   const p5 = p5Obj.current;
  //
  //   // Initialize
  //   cx = p5.width / 2;
  //   cy = p5.height / 2;
  //   r = p5.min(p5.width, p5.height) / 2 - (isMobile().any ? 20 : 80);
  //
  //   // Fill background
  //   p5.background(255);
  //   p5.fill(255);
  //   p5?.rect(0, 0, p5?.width, p5?.height);
  //
  //   p5.strokeWeight(0.5);
  //   setPoints();
  //   setWaitFlag(false);
  // };
  //
  // const setPoints = () => {
  //   if (!p5Obj.current) return;
  //   const p5 = p5Obj.current;
  //
  //   points = [];
  //   const pointNum = p5.floor(p5.random(MIN_POINTS, MAX_POINTS + 1));
  //
  //   for (let i = 0; i < pointNum; i++) {
  //     const deg = p5.random(360);
  //     const rad = (deg * p5.PI) / 180;
  //
  //     points[i] = { deg: 0, x: 0, y: 0 };
  //     points[i].deg = deg;
  //     points[i].x = r * p5.cos(rad) + cx;
  //     points[i].y = r * p5.sin(rad) + cy;
  //   }
  //
  //   points.sort((a, b) => {
  //     if (a.deg < b.deg) return -1;
  //     if (a.deg > b.deg) return 1;
  //     return 0;
  //   });
  //
  //   // console.log(points)
  //   // Show points length
  //   p5
  //     .fill("rgba(68, 68, 68, 0.8)")
  //     .textFont("Inter")
  //     .textAlign(p5.RIGHT, p5.BOTTOM)
  //     .textSize(10)
  //     .text(points.length, p5.width - 10, p5.height - 10);
  // };
  //
  // // See annotations in JS for more information
  // const setup = (p5: p5Types, parentRef: Element) => {
  //   p5Obj.current = p5;
  //   p5.createCanvas(window.innerWidth, window.innerHeight).parent(parentRef);
  // };
  //
  // const draw = (p5: p5Types) => {
  //   if (!waitFlag) {
  //     if (cnt === 0) {
  //       init();
  //     }
  //
  //     // Draw the diamond ring
  //     p5.stroke("rgba(0, 0, 0, 0.2)");
  //
  //     for (let i = cnt + 1; i < points.length; i++) {
  //       p5.line(points[cnt].x, points[cnt].y, points[i].x, points[i].y);
  //     }
  //
  //     cnt++;
  //     if (cnt >= points.length) {
  //       setWaitFlag(true);
  //     }
  //   } else {
  //     // Wait on complete
  //     waitTime++;
  //     if (waitTime > 300) {
  //       cnt = 0;
  //       // @ts-ignore
  //       p5.clear().background(255, 255, 255, 255).noFill();
  //       setPoints();
  //       waitTime = 0;
  //       setWaitFlag(false);
  //     }
  //   }
  // };
  //
  // return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
