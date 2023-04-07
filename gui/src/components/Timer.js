import React, { useState, useEffect } from "react";

const Timer = ({
  setTimerStatus,
  timerStatus,
  isFinished,
  setIsFinished,
  userDifficulty,
  providedTimeLimit,
}) => {
  const [running, setRunning] = useState(false);
  const [reverseCount, setReverseCount] = useState(false);
  const [time, setTime] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);

  useEffect(() => {
    let interval;

    if (!isFinished) {
      if (running) {
        interval = setInterval(() => {
          setTime((prevTime) => (reverseCount ? prevTime - 10 : prevTime + 10));
        }, 10);
      } else if (!running) {
        clearInterval(interval);
      }
      if (time < 0 && timeLimit) {
        let currentTimerStatus = { ...timerStatus };
        currentTimerStatus.stopped = true;
        currentTimerStatus.expired = true;
        setTimerStatus(currentTimerStatus);
        setTime(0);
        setRunning(false);
        setReverseCount(false);
      }
    }
    return () => clearInterval(interval);
  }, [running, time, reverseCount]);

  useEffect(() => {
    if (timerStatus.reset && !userDifficulty) {
      setTime(timeLimit);
      setRunning(true);
      setReverseCount(false);
    } else if (timerStatus.reset && userDifficulty && providedTimeLimit) {
      setTimeLimit(providedTimeLimit);
      setTime(providedTimeLimit * 60000);
      setRunning(true);
      setReverseCount(true);
    }
  }, [timerStatus]);

  useEffect(() => {
    handleReset();
  }, [userDifficulty]);

  const handleReset = () => {
    let currentTimerStatus = { ...timerStatus };
    currentTimerStatus.reset = true;
    currentTimerStatus.expired = false;
    currentTimerStatus.stopped = false;
    setTimerStatus(currentTimerStatus);
    // setTime(timeLimit);
    setRunning(true);
    setIsFinished(false);
  };

  const handleTimeLimitChange = (time) => {
    setTimeLimit(time);
    let currentTimerStatus = { ...timerStatus };
    currentTimerStatus.reset = true;
    currentTimerStatus.stopped = false;
    currentTimerStatus.expired = false;
    setTimerStatus(currentTimerStatus);
    setIsFinished(false);
  };

  const handleStop = () => {
    let currentTimerStatus = { ...timerStatus };
    currentTimerStatus.stopped = running;
    setTimerStatus(currentTimerStatus);
    setRunning(!running);
  };

  return (
    <div className="border rounded border-solid border-black p-2 my-3">
      <div className="text-center">
        <span>
          {(
            "0" + Math.floor(((time + (reverseCount ? 1000 : 0)) / 60000) % 60)
          ).slice(-2)}
          :
        </span>
        <span>
          {time
            ? (
                "0" +
                Math.floor(((time + (reverseCount ? 1000 : 0)) / 1000) % 60)
              ).slice(-2)
            : "00"}
        </span>
      </div>
      <div className="buttons">
        {isFinished || timerStatus.expired ? (
          <></>
        ) : (
          <button className="btn btn-blue ml-3" onClick={() => handleStop()}>
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
