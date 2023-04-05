import React, { useState, useEffect } from "react"
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import * as puzzleHelpers from "../helpers/puzzleHelpers"
import PuzzleSelection from "@/components/PuzzleSelection"
import Board from "@/components/Board"

const index = () => {
  const [puzzle, setPuzzle] = useState()
  const [puzzleProgress, setPuzzleProgress] = useState([])

  useEffect(() => {
    if (puzzle && puzzleProgress) {
      if (puzzleHelpers.checkFinished(puzzle.solution, puzzleProgress)) {
        console.log("Puzzle Finished! 🎉")
        alert("Puzzle Finished! 🎉")
      }
    }
  }, [puzzleProgress])

  return (
    <>
      <div className="timer-wrapper">
        <Timer className="timer" duration={null}>
          <Timecode />
        </Timer>
      </div>
      {puzzle && puzzleProgress ? <Board puzzleProgress={puzzleProgress} setPuzzleProgress={setPuzzleProgress} puzzleSolution={puzzle.solution} /> : <></>}
      <br />
      <PuzzleSelection setPuzzleProgress={setPuzzleProgress} setPuzzle={setPuzzle} />
    </>
  )
}

export default index