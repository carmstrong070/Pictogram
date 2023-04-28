import React, { useEffect, useState } from "react";
import HintModal from "./modals/HintModal";
import FinishedModal from "./modals/FinishedModal";
import gameStore from "@/states/store";
import { calculateStartTime } from "@/helpers/timerHelpers";
import { resetPuzzleProgress } from "@/helpers/puzzleHelpers";
import ExpiredModal from "./modals/ExpiredModal";
import RestartModal from "./modals/RestartModal";

const Timer = ({ providedTimeLimit, puzzleHint }) => {
  const userDifficulty = gameStore((state) => state.userDifficulty);
  const isFinished = gameStore((state) => state.isFinished);
  const setIsFinished = gameStore((state) => state.setIsFinished);
  const time = gameStore((state) => state.time);
  const setTime = gameStore((state) => state.setTime);
  const running = gameStore((state) => state.running);
  const setRunning = gameStore((state) => state.setRunning);
  const setPuzzleProgress = gameStore((state) => state.setPuzzleProgress);
  const puzzle = gameStore((state) => state.puzzle);
  const setPuzzle = gameStore((state) => state.setPuzzle);
  const isExpired = gameStore((state) => state.isExpired);
  const setIsExpired = gameStore((state) => state.setIsExpired);
  const reverseCount = gameStore((state) => state.reverseCount);
  const setReverseCount = gameStore((state) => state.setReverseCount);
  const showRestartModal = gameStore((state) => state.showRestartModal);
  const setShowRestartModal = gameStore((state) => state.setShowRestartModal);

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
        if (time <= 0 && reverseCount) {
          setRunning(false);
          setTime(0);
          setIsExpired(true);
        }
      }
    }
    return () => clearInterval(interval);
  }, [running, time]);

  // When user difficulty changes, reset the puzzle
  useEffect(() => {}, [userDifficulty]);

  const confirmReset = () => {
    setRunning(false);
    setShowRestartModal(true);
  };

  const handleStartStopToggle = () => {
    setRunning(!running);
  };

  return (
    <div className="timer border rounded border-solid border-gray-300 p-2 my-3">
      {showRestartModal && <RestartModal />}
      {isExpired && <ExpiredModal isExpired={isExpired} />}
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
        {isFinished || (time <= 0 && reverseCount) ? (
          <></>
        ) : (
          <>
            <button
              className="btn btn-blue"
              onClick={() => handleStartStopToggle()}
            >
              {running ? "Pause" : "Start"}
            </button>
            {!reverseCount && <HintModal puzzleHint={puzzleHint} />}
          </>
        )}
        <button className="btn btn-red" onClick={() => confirmReset()}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
