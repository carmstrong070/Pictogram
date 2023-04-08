import React, { useState, useEffect } from "react";
import * as timerHelpers from "../helpers/timerHelpers";

const Timer = ({
  setTimerStatus,
  timerStatus,
  isFinished,
  setIsFinished,
  userDifficulty,
  providedTimeLimit,
}) => {
  const [running, setRunning] = useState(true);
  const [reverseCount, setReverseCount] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (!isFinished) {
      // Timer incrementing logic
      if (running) {
        interval = setInterval(() => {
          setTime((prevTime) => (reverseCount ? prevTime - 10 : prevTime + 10));
        }, 10);

        // Timer expiration logic
        if (time < 0 && reverseCount) {
          setTimerStatus(timerHelpers.expired);
          setTime(0);
          setRunning(false);
        }
      }
    }
    return () => clearInterval(interval);
  }, [running, time]);

  useEffect(() => {
    // When the timer resets, initiate the timer
    if (timerStatus.reset) {
      // Initialization settings when the difficulty is set to EASY
      if (!userDifficulty) {
        setTime(0);
        setRunning(true);
        setReverseCount(false);

        // Initialization settings when the difficulty is set to HARD
      } else if (userDifficulty) {
        setTime(providedTimeLimit * 60000);
        setRunning(true);
        setReverseCount(true);
      }
    }
  }, [timerStatus]);

  // When user difficulty changes, reset the puzzle
  useEffect(() => {
    handleReset();
  }, [userDifficulty]);

  const handleReset = () => {
    setTimerStatus(timerHelpers.reset);
    setRunning(true);
    setIsFinished(false);
  };

  const handleStartStopToggle = () => {
    let currentTimerStatus = { ...timerStatus };
    currentTimerStatus.stopped = running;
    setTimerStatus(currentTimerStatus);
    setRunning(!running);
  };

  return (
    <div className="border rounded border-solid border-black p-2 my-3">
      <div className="text-center">
        <span>
          {/* Generate hours (if needed) */}
          {time >= 3599000
            ? (
                "0" +
                Math.floor(
                  ((time + (reverseCount ? 1000 : 0)) / 1000 / 60 / 60) % 100
                )
              ).slice(-2) + ":"
            : ""}
        </span>
        <span>
          {/* Generate minutes */}
          {(
            "0" +
            Math.floor(((time + (reverseCount ? 1000 : 0)) / 1000 / 60) % 60)
          ).slice(-2)}
          :
        </span>
        <span>
          {/* Generate seconds */}
          {time
            ? (
                "0" +
                Math.floor(((time + (reverseCount ? 1000 : 0)) / 1000) % 60)
              ).slice(-2)
            : "00"}
        </span>
      </div>
      <div className="buttons">
        {/* Remove the Start/Pause button if the puzzle is completed or the timer runs out*/}
        {isFinished || timerStatus.expired ? (
          <></>
        ) : (
          <button
            className="btn btn-blue ml-3"
            onClick={() => handleStartStopToggle()}
          >
            {running ? "Pause" : "Start"}
          </button>
        )}
        <button className="btn btn-red ml-3" onClick={() => handleReset()}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
