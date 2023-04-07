import React, { useState, useEffect } from "react";
import Timer from "@/components/Timer";
import * as puzzleHelpers from "../helpers/puzzleHelpers";
import PuzzleSelection from "@/components/PuzzleSelection";
import Board from "@/components/Board";
import FinishedModal from "@/components/FinishedModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {faPause} from "@fortawesome/free-solid-svg-icons";

const index = () => {
  const [puzzle, setPuzzle] = useState();
  const [puzzleProgress, setPuzzleProgress] = useState([]);
  const [timerStatus, setTimerStatus] = useState({
    reset: false,
    stopped: undefined,
    expired: false,
  });
  const [isFinished, setIsFinished] = useState(false);
  const [showFinishedModal, setShowFinishedModal] = useState(false);

  useEffect(() => {
    if (puzzle && puzzleProgress && !isFinished && !timerStatus.reset) {
      if (puzzleHelpers.checkFinished(puzzle.solution, puzzleProgress)) {
        setIsFinished(true);
        setShowFinishedModal(true)
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
          <div className="flex flex-row justify-center">
            <Timer
              className="timer"
              setTimerStatus={setTimerStatus}
              timerStatus={timerStatus}
              isFinished={isFinished}
              setIsFinished={setIsFinished}
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
      <FinishedModal showFinishedModal={showFinishedModal} setShowFinishedModal={setShowFinishedModal} />
    </>
  );
};

export default index;
