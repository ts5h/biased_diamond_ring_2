import { useCallback, useMemo } from "react";
import * as Tone from "tone";

// 6add9
const SCALE = ["D#0", "G0", "A#0", "C1", "F1"];

export const useSound = () => {
  const limiter = useMemo(() => new Tone.Limiter(-0.1).toDestination(), []);

  const playBeep = useCallback(() => {
    const synth = new Tone.Synth();
    synth.oscillator.type = "square";
    synth.volume.value = -10;

    synth.connect(limiter);
    synth.triggerAttackRelease(
      SCALE[Math.floor(Math.random() * SCALE.length)],
      "128n",
    );

    setTimeout(() => synth.dispose(), 2000);
  }, [limiter]);

  return { playBeep };
};
