export const reset = () => {
  let newTimerStatus = {};
  newTimerStatus.reset = true;
  newTimerStatus.stopped = false;
  newTimerStatus.expired = false;
  return newTimerStatus;
};

export const expired = () => {
  let newTimerStatus = {};
  newTimerStatus.reset = false;
  newTimerStatus.stopped = true;
  newTimerStatus.expired = true;
  return newTimerStatus;
};

export const stop = () => {
  let newTimerStatus = {};
  newTimerStatus.reset = false;
  newTimerStatus.stopped = true;
  newTimerStatus.expired = false;
  return newTimerStatus;
}

export default { reset, expired, stop };
