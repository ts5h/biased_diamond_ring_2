import React, { FC } from "react";
import { ReturnToHome } from "./components/ReturnToHome";
import { GitHub } from "./components/GitHub";
import { BiasedDiamondRing } from "./components/BiasedDiamondRing";
import "./scss/App.scss";

export const App: FC = () => (
  <div className="App">
    <ReturnToHome theme="light" />
    <GitHub theme="light" />
    <BiasedDiamondRing />
  </div>
);
