export const reset = () => {
  let newTimerStatus = {};
  newTimerStatus.reset = true;
  return newTimerStatus;
};

export const stop = () => {
  let newTimerStatus = {};
  newTimerStatus.reset = false;
  return newTimerStatus;
};

export const start = () => {
  let newTimerStatus = {};
  newTimerStatus.reset = false;
  return newTimerStatus;
};
