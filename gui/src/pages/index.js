import React, { useState, useEffect } from "react"
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
      }
    }
  }, [puzzleProgress])

  return (
    <>
      {puzzle && puzzleProgress ? <Board puzzleProgress={puzzleProgress} setPuzzleProgress={setPuzzleProgress} puzzleSolution={puzzle.solution} /> : <></>}
      <br />
      <PuzzleSelection setPuzzleProgress={setPuzzleProgress} setPuzzle={setPuzzle} />
    </>
  )
}

export default index