import React, { useState, useEffect } from "react"
import Tile from '@/components/Tile'
import GuideNumbers from "@/components/GuideNumbers"
import * as puzzleHelpers from "../helpers/puzzleHelpers"
import PuzzleSelection from "@/components/PuzzleSelection"

const index = () => {
  const [puzzle, setPuzzle] = useState()
  const [puzzleProgress, setPuzzleProgress] = useState([])
  const [mouseDownPosition, setMouseDownPosition] = useState()

  useEffect(() => {
    if (puzzle && puzzleProgress) {
      if (puzzleHelpers.checkFinished(puzzle.solution, puzzleProgress)) {
        console.log("Puzzle Finished! 🎉")
      }
    }
  }, [puzzleProgress])

  const handleMouseDown = (e, value, columnIndex, rowIndex) => {
    e.preventDefault()
    setMouseDownPosition({
      column: columnIndex,
      row: rowIndex,
      initialValue: value
    })
  }

  const handleClick = (button, startValue, endValue, currentPuzzle, columnIndex, rowIndex) => {
    let currentCell = currentPuzzle[rowIndex][columnIndex]

    // Left click logic
    if (button === 0) {
      if (currentCell === 0) {
        currentPuzzle[rowIndex][columnIndex] = 1
      }
      else if (startValue === 0 && endValue === 1 && currentCell !== 2) {
        currentPuzzle[rowIndex][columnIndex] = 1
      }
      else if (endValue === 1 && currentCell !== 2) {
        currentPuzzle[rowIndex][columnIndex] = 0
      }
    }

    // Right click logic
    else if (button === 2) {
      if (startValue === 0 && endValue === 0 && currentCell !== 1) {
        currentPuzzle[rowIndex][columnIndex] = 2
        console.log("1st case")
      }
      else if (startValue === 0 && endValue === 0 && currentCell === 1) {
        currentPuzzle[rowIndex][columnIndex] = 1
        console.log("2nd case")
      }
      else if (startValue === 0 && endValue === 2 && currentCell !== 1 || startValue === 0 && endValue === 2 && currentCell !== 1) {
        currentPuzzle[rowIndex][columnIndex] = 2
        console.log("3rd case")
      }
      else if (currentCell === 2 && startValue !== 1 && endValue !== 1 || currentCell === 1) {
        currentPuzzle[rowIndex][columnIndex] = 0
        console.log("4th case")
      }
    }
  }

  const handleMouseUp = (e, value, columnIndex, rowIndex) => {
    e.preventDefault()
    if (mouseDownPosition) {
      let currentPuzzle = [...puzzleProgress]
      // Clicking on the same cell
      if (mouseDownPosition.column === columnIndex && mouseDownPosition.row === rowIndex) {
        handleClick(e.button, mouseDownPosition.initialValue, value, currentPuzzle, columnIndex, rowIndex)
        setPuzzleProgress(currentPuzzle)
      }

      // Dragging over a cell in the same column
      else if (mouseDownPosition.column === columnIndex) {
        // Dragging Up
        if (rowIndex < mouseDownPosition.row) {
          for (let i = rowIndex; i < mouseDownPosition.row + 1; i++) {
            handleClick(e.button, mouseDownPosition.initialValue, value, currentPuzzle, columnIndex, i)
          }
          setPuzzleProgress(currentPuzzle)
        }
        // Dragging Down
        else {
          for (let i = mouseDownPosition.row; i < rowIndex + 1; i++) {
            handleClick(e.button, mouseDownPosition.initialValue, value, currentPuzzle, columnIndex, i)
          }
          setPuzzleProgress(currentPuzzle)
        }
      }

      // Dragging over a cell in the same row
      else if (mouseDownPosition.row === rowIndex) {
        // Dragging to the left
        if (columnIndex < mouseDownPosition.column) {
          for (let i = columnIndex; i < mouseDownPosition.column + 1; i++) {
            handleClick(e.button, mouseDownPosition.initialValue, value, currentPuzzle, i, rowIndex)
          }
          setPuzzleProgress(currentPuzzle)
        }
        // Dragging to the right
        else {
          for (let i = mouseDownPosition.column; i < columnIndex + 1; i++) {
            handleClick(e.button, mouseDownPosition.initialValue, value, currentPuzzle, i, rowIndex)
          }
          setPuzzleProgress(currentPuzzle)
        }
      }
    }
    setMouseDownPosition()
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
                      <Tile key={`tile ${rowIndex} ${columnIndex}`} rowIndex={rowIndex} columnIndex={columnIndex} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} value={puzzleProgress[rowIndex][columnIndex]} />
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