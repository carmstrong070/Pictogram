import React, { useState, useEffect } from "react"
import Tile from '@/components/Tile'
import GuideNumbers from "@/components/GuideNumbers"
import puzzleList from "@/content/puzzles"
import * as puzzleHelpers from "../helpers/puzzleHelpers"
import PuzzleSelection from "@/components/PuzzleSelection"

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

  const handlePuzzleChange = (e, value, columnIndex, rowIndex) => {
    e.preventDefault()
    let currentPuzzle = [...puzzleProgress]
    let currentRow = [...currentPuzzle[rowIndex]]

    // Left click logic
    if (e.button === 0) {
      if (value === 0) {
        currentRow[columnIndex] = 1
      }
      else if (value === 1) {
        currentRow[columnIndex] = 0
      }
    }

    // Right click logic
    else if (e.button === 2) {
      if (value === 0) {
        currentRow[columnIndex] = 2
      }
      else if (value === 2 || value === 1) {
        currentRow[columnIndex] = 0
      }
    }

    currentPuzzle[rowIndex] = currentRow
    setPuzzleProgress(currentPuzzle)
  }

  const Board = ({ puzzleProgress, puzzleSolution }) => {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            {/* Create a header row for each column that will contain the guide numbers*/}
            {puzzleProgress[0].map((_, columnIndex) => {
              return (
                <React.Fragment key={columnIndex}>
                  <GuideNumbers columnIndex={columnIndex} rowIndex={-1} puzzleSolution={puzzleSolution} />
                </React.Fragment>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {/* Create a table row for each array in the solution array */}
          {puzzleProgress.map((row, rowIndex) => {
            return (
              <tr row={rowIndex + 1} key={rowIndex}>
                {row.map((_, columnIndex) => {
                  return (
                    <React.Fragment key={`fragment ${rowIndex} ${columnIndex}`}>
                      {columnIndex ? <></> :
                        <GuideNumbers key={`guide ${rowIndex} ${columnIndex}`} columnIndex={-1} rowIndex={rowIndex} puzzleSolution={puzzleSolution} />
                      }
                      <Tile key={`tile ${rowIndex} ${columnIndex}`} rowIndex={rowIndex} columnIndex={columnIndex} handlePuzzleChange={handlePuzzleChange} value={puzzleProgress[rowIndex][columnIndex]} />
                    </React.Fragment>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      {puzzle && puzzleProgress ? <Board puzzleProgress={puzzleProgress} puzzleSolution={puzzle.solution} /> : <></>}
      <br />
      <PuzzleSelection setPuzzleProgress={setPuzzleProgress} setPuzzle={setPuzzle} />
    </>
  )
}

export default index