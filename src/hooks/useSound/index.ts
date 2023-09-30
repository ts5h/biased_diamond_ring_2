import { useCallback } from "react";

export const useSound = () => {
  const playBeep = useCallback(() => {
    console.log("play");
  }, []);

  return {
    playBeep,
  };
};
