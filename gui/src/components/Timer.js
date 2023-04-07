import React, { useState, useEffect } from "react";

const Timer = ({setTimerReset, timerReset}) => {
  const [running, setRunning] = useState(false);
  const [reverseCount, setReverseCount] = useState(false)
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => reverseCount ? prevTime - 10 : prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, reverseCount]);

  useEffect(() => {
    if (timerReset) {
      setTime(0)
      setTimerReset(false)
    }
  }, [timerReset])

  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button>
        <button onClick={() => setReverseCount(!reverseCount)}>Reverse</button>
      </div>
    </div>
  );
};

export default Timer