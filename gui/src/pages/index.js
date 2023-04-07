import React, { useState, useEffect } from "react"
import Timer from "@/components/Timer";
import * as puzzleHelpers from "../helpers/puzzleHelpers"
import PuzzleSelection from "@/components/PuzzleSelection"
import Board from "@/components/Board"

const index = () => {
  const [puzzle, setPuzzle] = useState()
  const [puzzleProgress, setPuzzleProgress] = useState([])
  const [timerReset, setTimerReset] = useState(false)

  useEffect(() => {
    if (puzzle && puzzleProgress) {
      if (puzzleHelpers.checkFinished(puzzle.solution, puzzleProgress)) {
        console.log("Puzzle Finished! 🎉")
        console.log(setPuzzleProgress)
        alert("Puzzle Finished! 🎉")
      }
    }
  }, [puzzleProgress])

  return (
    <>
      <div className="timer-wrapper">
        <Timer className="timer" setTimerReset={setTimerReset} timerReset={timerReset} />
      </div>
      {puzzle && puzzleProgress ? <Board puzzleProgress={puzzleProgress} setPuzzleProgress={setPuzzleProgress} puzzleSolution={puzzle.solution} /> : <></>}
      <br />
      <PuzzleSelection setPuzzleProgress={setPuzzleProgress} setPuzzle={setPuzzle} setTimerReset={setTimerReset} />
    </>
  )
}

export default index