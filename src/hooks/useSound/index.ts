import { useCallback, useMemo } from "react";
import * as Tone from "tone";

// 6add9
const SCALE = ["C1", "E1", "G1", "A1", "D2"];

export const useSound = () => {
  const limiter = useMemo(() => new Tone.Limiter(-0.1).toDestination(), []);

  const playBeep = useCallback(() => {
    const synth = new Tone.Synth();
    synth.oscillator.type = "square";
    synth.volume.value = -5;

    synth.connect(limiter);
    synth.triggerAttackRelease(
      SCALE[Math.floor(Math.random() * SCALE.length)],
      "64n",
    );

    setTimeout(() => synth.dispose(), 500);
  }, [limiter]);

  return { playBeep };
};
