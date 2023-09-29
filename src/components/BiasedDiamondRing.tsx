import React, { useEffect, useState } from "react";
import isMobile from "ismobilejs";
import Sketch from "react-p5";
import p5Types from "p5";
import "../scss/components/BiasedDiamondRing.scss";

type pointsType = {
  deg: number;
  x: number;
  y: number;
}[];

const BiasedDiamondRing: React.FunctionComponent = () => {
  const [p5Obj, setP5Obj] = useState<p5Types>();
  const [waitFlag, setWaitFlag] = useState(false);

  let cx = 0;
  let cy = 0;
  let r = 0;

  const MIN_POINTS = 10;
  const MAX_POINTS = 100;
  let points: pointsType = [];

  let cnt = 0;
  let waitTime = 0;

  useEffect(() => {
    window.addEventListener("resize", windowResizedHandler);
    return () => window.removeEventListener("resize", windowResizedHandler);
  }, [p5Obj, waitFlag]);

  const windowResizedHandler = () => {
    if (p5Obj) {
      p5Obj.resizeCanvas(window.innerWidth, window.innerHeight);
    }
  };

  // Support Functions
  const init = () => {
    if (p5Obj) {
      // Initialize
      cx = p5Obj.width / 2;
      cy = p5Obj.height / 2;
      r = p5Obj.min(p5Obj.width, p5Obj.height) / 2 - (isMobile().any ? 20 : 80);

      // Fill background
      p5Obj.background(255).fill(255);

      // Draw outer circle
      // p5Obj.noFill()
      // p5Obj.strokeWeight(0.1)
      // p5Obj.stroke(127)
      // p5Obj.circle(cx, cy, r * 2)
      // p5Obj.stroke(0)

      p5Obj.strokeWeight(0.5);
      setPoints();
      setWaitFlag(false);
    }
  };

  const setPoints = () => {
    if (p5Obj) {
      points = [];
      const pointNum = p5Obj.floor(p5Obj.random(MIN_POINTS, MAX_POINTS + 1));

      for (let i = 0; i < pointNum; i++) {
        const deg = p5Obj.random(360);
        const rad = (deg * p5Obj.PI) / 180;

        points[i] = { deg: 0, x: 0, y: 0 };
        points[i].deg = deg;
        points[i].x = r * p5Obj.cos(rad) + cx;
        points[i].y = r * p5Obj.sin(rad) + cy;
      }

      points.sort((a, b) => {
        if (a.deg < b.deg) return -1;
        if (a.deg > b.deg) return 1;
        return 0;
      });

      // console.log(points)
      // Show points length
      p5Obj
        .fill("rgba(68, 68, 68, 0.8)")
        .textFont("Inter")
        .textAlign(p5Obj.RIGHT, p5Obj.BOTTOM)
        .textSize(10)
        .text(points.length, p5Obj.width - 10, p5Obj.height - 10);
    }
  };

  // See annotations in JS for more information
  const setup = (p5: p5Types, parentRef: Element) => {
    setP5Obj(p5);
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(parentRef);
  };

  const draw = (p5: p5Types) => {
    if (!waitFlag) {
      if (cnt === 0) {
        init();
      }

      // Draw the diamond ring
      p5.stroke("rgba(0, 0, 0, 0.2)");

      for (let i = cnt + 1; i < points.length; i++) {
        p5.line(points[cnt].x, points[cnt].y, points[i].x, points[i].y);
      }

      cnt++;
      if (cnt >= points.length) {
        setWaitFlag(true);
      }
    } else {
      // Wait on complete
      waitTime++;
      if (waitTime > 300) {
        cnt = 0;
        p5.clear().background(255).noFill();
        setPoints();
        waitTime = 0;
        setWaitFlag(false);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default BiasedDiamondRing;
