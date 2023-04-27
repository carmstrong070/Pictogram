import React, { useEffect } from "react";
import Timer from "@/components/Timer";
import PuzzleSelection from "@/components/PuzzleSelection";
import Board from "@/components/Board";
import InstructionsModal from "@/components/modals/InstructionsModal";
import gameStore from "@/states/store";
import { stop } from "@/helpers/timerHelpers";
import { checkFinished } from "@/helpers/puzzleHelpers";

const index = () => {
  const userDifficulty = gameStore((state) => state.userDifficulty);
  const setUserDifficulty = gameStore((state) => state.setDifficulty);
  const isFinished = gameStore((state) => state.isFinished);
  const setIsFinished = gameStore((state) => state.setIsFinished);
  const puzzleProgress = gameStore((state) => state.puzzleProgress);
  const puzzle = gameStore((state) => state.puzzle);
  const time = gameStore((state) => state.time);
  const setRunning = gameStore((state) => state.setRunning);

  useEffect(() => {
    if (
      puzzle.solution &&
      puzzleProgress &&
      !isFinished
    ) {
      if (checkFinished(puzzle.solution, puzzleProgress)) {
        setIsFinished(true);
        setRunning(false);
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
      //-- If difficulty is not easy and the timer has reached 0
      if (userDifficulty > 0 && time <= 0) {
        alert("Time ran out!");
      }
    }
  }, [puzzleProgress]);

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
