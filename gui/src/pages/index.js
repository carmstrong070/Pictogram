import React, { useState, useEffect } from "react";
import Timer from "@/components/Timer";
import * as puzzleHelpers from "../helpers/puzzleHelpers";
import PuzzleSelection from "@/components/PuzzleSelection";
import Board from "@/components/Board";

const index = () => {
  const [puzzle, setPuzzle] = useState();
  const [puzzleProgress, setPuzzleProgress] = useState([]);
  const [timerStatus, setTimerStatus] = useState({
    reset: false,
    stopped: undefined,
    expired: false,
  });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (puzzle && puzzleProgress && !isFinished && !timerStatus.reset) {
      if (puzzleHelpers.checkFinished(puzzle.solution, puzzleProgress)) {
        setIsFinished(true);
        console.log("Puzzle Finished! 🎉");
        alert("Puzzle Finished! 🎉");
      }
      if (timerStatus.expired && !timerStatus.reset) {
        console.log("Time ran out!");
        alert("Time ran out!");
      }
    }
  }, [puzzleProgress, timerStatus]);

  return (
    <>
      {puzzle && puzzleProgress ? (
        <>
          <div className="timer-wrapper">
            <Timer
              className="timer"
              setTimerStatus={setTimerStatus}
              timerStatus={timerStatus}
              isFinished={isFinished}
              setIsFinished={setIsFinished}
            />
          </div>
          <Board
            puzzleProgress={puzzleProgress}
            setPuzzleProgress={setPuzzleProgress}
            puzzleSolution={puzzle.solution}
            isFinished={isFinished}
            timerStatus={timerStatus}
            setTimerStatus={setTimerStatus}
          />
        </>
      ) : (
        <></>
      )}
      <br />
      <PuzzleSelection
        setPuzzleProgress={setPuzzleProgress}
        setPuzzle={setPuzzle}
        setTimerStatus={setTimerStatus}
        setIsFinished={setIsFinished}
        timerStatus={timerStatus}
      />
    </>
  );
};

export default index;
