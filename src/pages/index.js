import React, { useEffect } from "react";
import Timer from "@/components/Timer";
import * as puzzleHelpers from "../helpers/puzzleHelpers";
import PuzzleSelection from "@/components/PuzzleSelection";
import Board from "@/components/Board";
import timerHelpers from "@/helpers/timerHelpers";
import InstructionsModal from "@/components/modals/InstructionsModal";
import gameStore from "@/states/store";

const index = () => {
  const userDifficulty = gameStore((state) => state.userDifficulty);
  const setUserDifficulty = gameStore((state) => state.setDifficulty);
  const isFinished = gameStore((state) => state.isFinished);
  const setIsFinished = gameStore((state) => state.setIsFinished);
  const puzzleProgress = gameStore((state) => state.puzzleProgress);
  const puzzle = gameStore((state) => state.puzzle);
  const timerStatus = gameStore((state) => state.timerStatus);
  const setTimerStatus = gameStore((state) => state.setTimerStatus);

  useEffect(() => {
    if (
      puzzle.solution &&
      puzzleProgress &&
      !isFinished &&
      !timerStatus.reset
    ) {
      if (puzzleHelpers.checkFinished(puzzle.solution, puzzleProgress)) {
        setIsFinished(true);
        setTimerStatus(timerHelpers.stop());
        // Remove flagged tiles upon completion
        document.querySelectorAll(".flagged").forEach((el) => {
          el.classList.remove("flagged");
          el.classList.add("empty");
        });
        // Restyle filled tiles upon completion
        document.querySelectorAll(".filled").forEach((el) => {
          el.classList.remove("filled");
          el.classList.add("filled-finished");
        });
      }
      if (timerStatus.expired && !timerStatus.reset) {
        alert("Time ran out!");
      }
    }
  }, [puzzleProgress, timerStatus]);

  return (
    <>
      <div className="bg-gray-800">
        <div className="dark:bg-gray-700 container flex justify-evenly p-3">
          <button
            className="btn btn-blue mr-2"
            onClick={(e) => {
              e.preventDefault();
              userDifficulty ? setUserDifficulty(0) : setUserDifficulty(1);
            }}
          >
            Difficulty: {userDifficulty ? "Hard" : "Easy"}
          </button>
          <InstructionsModal />
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
                  puzzleHint={puzzle.hint}
                  // If there is not a timeLimit provided by the puzzle, create one based on the puzzle size
                  providedTimeLimit={
                    puzzle.timeLimit ? puzzle.timeLimit : puzzle.size
                  }
                />
              </div>
              <div className="flex flex-row justify-center">
                <Board />
              </div>
            </>
          ) : (
            <></>
          )}
          <br />
          <div className="flex flex-row gap-2 flex-wrap grow justify-center mt-3">
            <PuzzleSelection />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
