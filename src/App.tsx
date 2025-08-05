import React, { type FC } from "react";
import { BiasedDiamondRing } from "./components/BiasedDiamondRing";
import { GitHub } from "./components/GitHub";
import { ReturnToHome } from "./components/ReturnToHome";
import "./scss/App.scss";

export const App: FC = () => (
  <div className="App">
    <ReturnToHome theme="light" />
    <GitHub theme="light" />
    <BiasedDiamondRing />
  </div>
);
