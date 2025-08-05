// Mock for Tone.js to handle Jest testing
class Oscillator {
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

class Limiter {
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

class Synth {
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

const getContext = () => ({
  state: "running",
});

const start = () => Promise.resolve();

module.exports = {
  Oscillator,
  Limiter,
  Synth,
  getContext,
  start,
  default: {
    Oscillator,
    Limiter,
    Synth,
    getContext,
    start,
  },
};
