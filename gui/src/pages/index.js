import React, { useState, useEffect } from "react";
import Timer from "@/components/Timer";
import * as puzzleHelpers from "../helpers/puzzleHelpers";
import PuzzleSelection from "@/components/PuzzleSelection";
import Board from "@/components/Board";
import FinishedModal from "@/components/modals/FinishedModal";
import timerHelpers from "@/helpers/timerHelpers";
import HintModal from "@/components/modals/HintModal";

const index = () => {
  const [puzzle, setPuzzle] = useState({});
  const [puzzleProgress, setPuzzleProgress] = useState([]);
  const [timerStatus, setTimerStatus] = useState({
    reset: false,
    stopped: false,
    expired: false,
  });
  const [isFinished, setIsFinished] = useState(false);
  const [userDifficulty, setUserDifficulty] = useState(0);

  useEffect(() => {
    if (
      puzzle.solution &&
      puzzleProgress &&
      !isFinished &&
      !timerStatus.reset
    ) {
      if (puzzleHelpers.checkFinished(puzzle.solution, puzzleProgress)) {
        setIsFinished(true);
        setTimerStatus(timerHelpers.stop)
      }
      if (timerStatus.expired && !timerStatus.reset) {
        console.log("Time ran out!");
        alert("Time ran out!");
      }
    }
  }, [puzzleProgress, timerStatus]);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          userDifficulty ? setUserDifficulty(0) : setUserDifficulty(1);
        }}
      >
        Difficulty: {userDifficulty ? "Hard" : "Easy"}
      </button>
      {puzzle.solution && puzzleProgress ? (
        <>
        <HintModal setTimerStatus={setTimerStatus} puzzleHint={puzzle.hint} />
          <div className="flex flex-row justify-center">
            <Timer
              className="timer"
              setTimerStatus={setTimerStatus}
              timerStatus={timerStatus}
              isFinished={isFinished}
              setIsFinished={setIsFinished}
              userDifficulty={userDifficulty}
              // If there is not a timeLimit provided by the puzzle, create one based on the puzzle size
              providedTimeLimit={
                puzzle.timeLimit ? puzzle.timeLimit : puzzle.size
              }
            />
          </div>
          <div className="flex flex-row justify-center">
            <Board
              puzzleProgress={puzzleProgress}
              setPuzzleProgress={setPuzzleProgress}
              puzzleSolution={puzzle.solution}
              isFinished={isFinished}
              timerStatus={timerStatus}
              setTimerStatus={setTimerStatus}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <br />
      <div className="flex flex-row justify-center">
        <PuzzleSelection
          setPuzzleProgress={setPuzzleProgress}
          setPuzzle={setPuzzle}
          setTimerStatus={setTimerStatus}
          setIsFinished={setIsFinished}
          timerStatus={timerStatus}
        />
      </div>
      <FinishedModal
        isFinished={isFinished}
      />
    </>
  );
};

export default index;
