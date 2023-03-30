import React, { useState, useEffect } from "react"
import * as R from 'ramda'

const index = () => {
  const [puzzle, setPuzzle] = useState()
  const [puzzleProgress, setPuzzleProgress] = useState([])

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
  }, [])


  const handlePuzzleChange = (xIndex, yIndex) => {
    let currentPuzzle = puzzleProgress
    if (currentPuzzle[yIndex][xIndex] === 0) {
      currentPuzzle[yIndex][xIndex] = 1
    }
    else if (currentPuzzle[yIndex][xIndex] === 1) {
      currentPuzzle[yIndex][xIndex] = 0
    }
    setPuzzleProgress(currentPuzzle)
    if (R.equals(puzzleProgress, puzzle.solution)) {
      console.log("Puzzle finished!")
    }
  }

  const BorderClasses = (rowIndex, cellIndex) => {
    let classes = "";

    if (rowIndex === 0)
      classes += "thick-border-top ";

    if ((rowIndex + 1) % 5 === 0)
      classes += "thick-border-bottom ";

    if ((cellIndex + 1) % 5 === 0)
      classes += "thick-border-right ";

    return classes;
  };

  const Board = ({ puzzle }) => {
    if (puzzle[0] !== undefined) {
      return (
        <table>
          <thead>
            <tr>
              <th>😐</th>
              {/* Create a header row for each column that will contain the guide numbers*/}
              {puzzle[0].map((head, headIndex) => {
                return (
                  <th key={headIndex}>{headIndex + 1}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {/* Create a table row for each array in the solution array */}
            {puzzle.map((row, rowIndex) => {
              return (
                <tr row={rowIndex + 1} key={rowIndex}>
                  {row.map((cell, cellIndex) => {
                    // Create an extra column for each row that will contain the guide numbers
                    if (cellIndex == 0) {
                      return ([
                        <React.Fragment key={rowIndex}>
                          <td key={`${rowIndex}`}>{rowIndex + 1}</td>
                          <td className={`cell thick-border-left ${BorderClasses(rowIndex, cellIndex)}`} key={`${rowIndex} ${cellIndex}`} y-index={cellIndex} x-index={rowIndex} onClick={() => handlePuzzleChange(cellIndex, rowIndex)}></td>
                        </React.Fragment>
                      ])
                    }
                    else return (
                      <td className={`cell ${BorderClasses(rowIndex, cellIndex)}`} key={`${rowIndex} ${cellIndex}`} y-index={cellIndex} x-index={rowIndex} onClick={() => handlePuzzleChange(cellIndex, rowIndex)}></td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Board puzzle={puzzleProgress} />
    </>
  )
}

export default index