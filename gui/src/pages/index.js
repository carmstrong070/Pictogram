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


  const Tile = ({ rowIndex, cellIndex, handlePuzzleChange }) => {
    const [tileState, setTileState] = useState(0)

    const handleClick = (num, cellIndex, rowIndex) => {
      setTileState(num)
      handlePuzzleChange(cellIndex, rowIndex)
    }

    if (cellIndex == 0) {
      if (tileState === 0) {
        return (
          <td className={`cell thick-border-left ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={() => handleClick(1, cellIndex, rowIndex)}></td>
        )
      }
      else if (tileState === 1) {
        return (
          <td className={`cell thick-border-left ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={() => handleClick(0, cellIndex, rowIndex)}>X</td>
        )
      }
    }
    else {
      if (tileState === 0) {
        return (
          <td className={`cell ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={() => handleClick(1, cellIndex, rowIndex)}></td>
        )
      }
      else if (tileState === 1) {
        return (
          <td className={`cell ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={() => handleClick(0, cellIndex, rowIndex)}>X</td>
        )
      }
    }

  }

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
              {puzzle[0].map((_, headIndex) => {
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
                  {row.map((_, cellIndex) => {
                    if (cellIndex == 0) {
                      return (
                        <React.Fragment key={rowIndex}>
                          <td key={`${rowIndex}`}>{rowIndex + 1}</td>
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