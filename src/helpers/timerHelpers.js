export const reset = () => {
  let newTimerStatus = {};
  newTimerStatus.reset = true;
  newTimerStatus.expired = false;
  return newTimerStatus;
};

export const expired = () => {
  let newTimerStatus = {};
  newTimerStatus.reset = false;
  newTimerStatus.expired = true;
  return newTimerStatus;
};

export const stop = () => {
  let newTimerStatus = {};
  newTimerStatus.reset = false;
  newTimerStatus.expired = false;
  return newTimerStatus;
};

export const start = () => {
  let newTimerStatus = {};
  newTimerStatus.reset = false;
  newTimerStatus.expired = false;
  return newTimerStatus;
};
