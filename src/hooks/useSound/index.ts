import { useCallback } from "react";
import * as Tone from "tone";

export const useSound = () => {
  const playBeep = useCallback(() => {
    // const synth = new Tone.Synth().toDestination();
    // synth.triggerAttackRelease("A#2", "64n");
  }, []);

  return {
    playBeep,
  };
};
