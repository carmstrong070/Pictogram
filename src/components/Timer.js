import React, { useState, useEffect } from "react";
import HintModal from "./modals/HintModal";
import FinishedModal from "./modals/FinishedModal";
import gameStore from "@/states/store";
import { expired, reset } from "@/helpers/timerHelpers";

const Timer = ({ providedTimeLimit, puzzleHint }) => {
  const [reverseCount, setReverseCount] = useState(false);
  const userDifficulty = gameStore((state) => state.userDifficulty);
  const isFinished = gameStore((state) => state.isFinished);
  const setIsFinished = gameStore((state) => state.setIsFinished);
  const time = gameStore((state) => state.time);
  const setTime = gameStore((state) => state.setTime);
  const running = gameStore((state) => state.running);
  const setRunning = gameStore((state) => state.setRunning);
  const timerStatus = gameStore((state) => state.timerStatus);
  const setTimerStatus = gameStore((state) => state.setTimerStatus);

  useEffect(() => {
    let interval;

    if (!isFinished) {
      // Timer incrementing logic
      if (running) {
        interval = setInterval(() => {
          let newTime = (prevTime) =>
            reverseCount ? prevTime - 10 : prevTime + 10;
          setTime(newTime(time));
        }, 10);

        // Timer expiration logic
        if (time < 0 && reverseCount) {
          setTimerStatus(expired());
          setTime(0);
          setRunning(false);
        }
      }
    }
    return () => clearInterval(interval);
  }, [running, time]);

  // When the timer resets, initiate the timer
  useEffect(() => {
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

    if (timerStatus.stopped) {
      setRunning(false);
    } else if (!timerStatus.stopped) {
      setRunning(true);
    }
  }, [timerStatus]);

  // When user difficulty changes, reset the puzzle
  useEffect(() => {
    handleReset();
  }, [userDifficulty]);

  const handleReset = () => {
    setTimerStatus(reset());
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
    <div className="timer border rounded border-solid border-gray-300 p-2 my-3">
      <FinishedModal providedTimeLimit={providedTimeLimit} />
      <div className="text-center text-gray-300 mb-2">
        <span>
          {/* Generate hours (if needed) */}
          {time >= 3599000
            ? (
                "0" +
                Math.floor(
                  ((time + (reverseCount ? 999 : 0)) / 1000 / 60 / 60) % 100
                )
              ).slice(-2) + ":"
            : ""}
        </span>
        <span>
          {/* Generate minutes */}
          {(
            "0" +
            Math.floor(((time + (reverseCount ? 999 : 0)) / 1000 / 60) % 60)
          ).slice(-2)}
          :
        </span>
        <span>
          {/* Generate seconds */}
          {time
            ? (
                "0" +
                Math.floor(((time + (reverseCount ? 999 : 0)) / 1000) % 60)
              ).slice(-2)
            : "00"}
        </span>
      </div>
      <div className="flex justify-around">
        {/* Remove the Start/Pause button if the puzzle is completed or the timer runs out*/}
        {isFinished || timerStatus.expired ? (
          <></>
        ) : (
          <>
            <button
              className="btn btn-blue"
              onClick={() => handleStartStopToggle()}
            >
              {running ? "Pause" : "Start"}
            </button>
            <HintModal puzzleHint={puzzleHint} />
          </>
        )}
        <button className="btn btn-red" onClick={() => handleReset()}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
