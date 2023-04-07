import React, { useState, useEffect } from "react";

const Timer = ({ setTimerStatus, timerStatus, isFinished, setIsFinished }) => {
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
      if (time < 0) {
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
    if (timerStatus.reset && !timeLimit) {
      setTime(timeLimit);
      setRunning(true);
      setReverseCount(false);
    } else if (timerStatus.reset && timeLimit) {
      setTime(timeLimit);
      setRunning(true);
      setReverseCount(true);
    }
  }, [timerStatus]);

  const handleReset = () => {
    let currentTimerStatus = { ...timerStatus };
    currentTimerStatus.reset = true;
    currentTimerStatus.expired = false;
    currentTimerStatus.stopped = false;
    setTimerStatus(currentTimerStatus);
    setTime(timeLimit);
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
    <div className="stopwatch">
      <div className="numbers">
        <span>
          {("0" + Math.floor(((time + 1000) / 60000) % 60)).slice(-2)}:
        </span>
        <span>
          {time
            ? ("0" + Math.floor(((time + 1000) / 1000) % 60)).slice(-2)
            : "00"}
        </span>
      </div>
      <div className="buttons">
        {timeLimit ? (
          <button onClick={() => handleTimeLimitChange(0)}>Count Up</button>
        ) : (
          <button onClick={() => handleTimeLimitChange(10000)}>
            00:10 Count Down
          </button>
        )}
        {isFinished || timerStatus.expired ? (
          <></>
        ) : (
          <button onClick={() => handleStop()}>
            {running ? "Pause" : "Start"}
          </button>
        )}
        <button onClick={() => handleReset()}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
