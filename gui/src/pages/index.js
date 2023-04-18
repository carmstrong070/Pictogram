import React, { useState, useEffect } from "react";
import Timer from "@/components/Timer";
import * as puzzleHelpers from "../helpers/puzzleHelpers";
import PuzzleSelection from "@/components/PuzzleSelection";
import Board from "@/components/Board";
import FinishedModal from "@/components/modals/FinishedModal";
import timerHelpers from "@/helpers/timerHelpers";
import InstructionsModal from "@/components/modals/InstructionsModal";

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
  const [cursorPosition, setCursorPosition] = useState();

  useEffect(() => {
    if (
      puzzle.solution &&
      puzzleProgress &&
      !isFinished &&
      !timerStatus.reset
    ) {
      if (puzzleHelpers.checkFinished(puzzle.solution, puzzleProgress)) {
        setIsFinished(true);
        setTimerStatus(timerHelpers.stop);
      }
      if (timerStatus.expired && !timerStatus.reset) {
        console.log("Time ran out!");
        alert("Time ran out!");
      }
    }
  }, [puzzleProgress, timerStatus]);

  return (
    <>
      <div className="container flex justify-evenly p-3">
        <button
          className="btn btn-blue mr-2"
          onClick={(e) => {
            e.preventDefault();
            userDifficulty ? setUserDifficulty(0) : setUserDifficulty(1);
          }}
        >
          Difficulty: {userDifficulty ? "Hard" : "Easy"}
        </button>
        <InstructionsModal setTimerStatus={setTimerStatus} />
      </div>
      <div
        className="container p-3"
        onMouseDown={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {puzzle.solution && puzzleProgress ? (
          <>
            <div className="flex flex-row justify-center">
              <Timer
                className="timer"
                setTimerStatus={setTimerStatus}
                timerStatus={timerStatus}
                isFinished={isFinished}
                setIsFinished={setIsFinished}
                userDifficulty={userDifficulty}
                puzzleHint={puzzle.hint}
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
                cursorPosition={cursorPosition}
                setCursorPosition={setCursorPosition}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        <br />
        <div className="flex flex-row justify-center mt-3">
          <PuzzleSelection
            setPuzzleProgress={setPuzzleProgress}
            setPuzzle={setPuzzle}
            setTimerStatus={setTimerStatus}
            setIsFinished={setIsFinished}
            timerStatus={timerStatus}
          />
        </div>
        <FinishedModal isFinished={isFinished} />
      </div>
    </>
  );
};

export default index;
