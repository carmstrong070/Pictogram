import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";

export const togglePlayPause = (timerIcon, setTimerIcon, setTimerIsActive) => {
  if (timerIcon == faPlay) {
    setTimerIcon(faPause);
    setTimerIsActive(true);
  } else {
    setTimerIcon(faPlay);
    setTimerIsActive(false);
  }
};

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

export default { togglePlayPause, reset };
