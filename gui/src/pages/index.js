import React, { useState, useEffect } from "react"
import * as R from 'ramda'
import Tile from '@/components/Tile'
import GuideNumbers from "@/components/GuideNumbers"

const index = () => {
  const [puzzle, setPuzzle] = useState()
  const [puzzleProgress, setPuzzleProgress] = useState([])
  const [completionProgress, setCompletionProgress] = useState([])

  // Initialize puzzle
  useEffect(() => {
    setPuzzle({
      "title": "Box",
      "size": 10,
      "solution": [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      "hint": "It's just a box"
    })
    setPuzzleProgress(
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    )
    setCompletionProgress(
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    )
  }, [])

  const handlePuzzleChange = (num, xIndex, yIndex) => {
    let currentPuzzle = puzzleProgress
    let currentPuzzleCompletion = completionProgress

    if (num === 0 || num === 1) {
      currentPuzzle[yIndex][xIndex] = num
      currentPuzzleCompletion[yIndex][xIndex] = num
    }

    else if (num === 2) {
      currentPuzzle[yIndex][xIndex] = num
      currentPuzzleCompletion[yIndex][xIndex] = 0
    }

    setPuzzleProgress(currentPuzzle)
    setCompletionProgress(currentPuzzleCompletion)

    if (R.equals(completionProgress, puzzle.solution)) {
      console.log("Puzzle finished!")
    }
  }

  const Board = ({ puzzle, puzzleSolution }) => {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            {/* Create a header row for each column that will contain the guide numbers*/}
            {puzzle[0].map((_, columnIndex) => {
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
          {puzzle.map((row, rowIndex) => {
            return (
              <tr row={rowIndex + 1} key={rowIndex}>
                {row.map((_, cellIndex) => {
                  if (cellIndex == 0) {
                    return (
                      <React.Fragment key={rowIndex}>
                        <GuideNumbers columnIndex={-1} rowIndex={rowIndex} puzzleSolution={puzzleSolution} />
                        <Tile key={`${rowIndex} ${cellIndex}`} rowIndex={rowIndex} cellIndex={cellIndex} handlePuzzleChange={handlePuzzleChange} />
                      </React.Fragment>
                    )
                  }

                  else return (
                    <Tile key={`${rowIndex} ${cellIndex}`} rowIndex={rowIndex} cellIndex={cellIndex} handlePuzzleChange={handlePuzzleChange} />
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  };

  if (puzzle !== undefined && puzzleProgress !== []) {
    return (
      <>
        <Board puzzle={puzzleProgress} puzzleSolution={puzzle.solution} />
      </>
    )
  }
  else {
    return null
  }
}

export default index