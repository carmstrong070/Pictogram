import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";


export const togglePlayPause = (timerIcon, setTimerIcon, setTimerIsActive) => {
  if (timerIcon == faPlay) {
    setTimerIcon(faPause);
    setTimerIsActive(true);
  }
  else {
    setTimerIcon(faPlay);
    setTimerIsActive(false);
  }
}

export default { togglePlayPause }