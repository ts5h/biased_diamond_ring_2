// Mock for Tone.js to handle Jest testing
export class Oscillator {
  constructor() {
    this.frequency = { value: 440 };
    this.type = "square";
  }

  connect() {
    return this;
  }

  toDestination() {
    return this;
  }

  start() {
    return this;
  }

  stop() {
    return this;
  }

  dispose() {
    return this;
  }
}

export class Limiter {
  constructor(threshold) {
    this.threshold = threshold;
  }

  toDestination() {
    return this;
  }

  dispose() {
    return this;
  }
}

export class Synth {
  constructor() {
    this.oscillator = new Oscillator();
  }

  connect() {
    return this;
  }

  toDestination() {
    return this;
  }

  triggerAttackRelease() {
    return this;
  }

  dispose() {
    return this;
  }
}

export const getContext = () => ({
  state: "running",
});

export const start = () => Promise.resolve();

export default {
  Oscillator,
  Limiter,
  Synth,
  getContext,
  start,
};
