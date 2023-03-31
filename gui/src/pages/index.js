import React, { useState, useEffect } from "react"
import * as R from 'ramda'

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
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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


  const Tile = ({ rowIndex, cellIndex, handlePuzzleChange }) => {
    const [tileState, setTileState] = useState(0)

    const handleClick = (e, num, cellIndex, rowIndex) => {
      e.preventDefault()

      if (e.type === "click") {
        setTileState(num)
        handlePuzzleChange(num, cellIndex, rowIndex)
      }
      else {
        setTileState(num)
        handlePuzzleChange(num, cellIndex, rowIndex)
      }
    }

    if (cellIndex == 0) {
      if (tileState === 0) {
        return (
          <td onContextMenu={(e) => handleClick(e, 2, cellIndex, rowIndex)} className={`cell thick-border-left ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={(e) => handleClick(e, 1, cellIndex, rowIndex)}></td>
        )
      }

      else if (tileState === 1) {
        return (
          <td onContextMenu={(e) => handleClick(e, 0, cellIndex, rowIndex)} className={`cell thick-border-left ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={(e) => handleClick(e, 0, cellIndex, rowIndex)}>✖️</td>
        )
      }

      else if (tileState === 2) {
        return (
          <td onContextMenu={(e) => handleClick(e, 0, cellIndex, rowIndex)} className={`cell thick-border-left ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={(e) => handleClick(e, 2, cellIndex, rowIndex)}>🚩</td>
        )
      }
    }

    else {
      if (tileState === 0) {
        return (
          <td onContextMenu={(e) => handleClick(e, 2, cellIndex, rowIndex)} className={`cell ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={(e) => handleClick(e, 1, cellIndex, rowIndex)}></td>
        )
      }

      else if (tileState === 1) {
        return (
          <td onContextMenu={(e) => handleClick(e, 0, cellIndex, rowIndex)} className={`cell ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={(e) => handleClick(e, 0, cellIndex, rowIndex)}>✖️</td>
        )
      }

      else if (tileState === 2) {
        return (
          <td onContextMenu={(e) => handleClick(e, 0, cellIndex, rowIndex)} className={`cell ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={(e) => handleClick(e, 2, cellIndex, rowIndex)}>🚩</td>
        )
      }
    }

  }

  const handlePuzzleChange = (num, xIndex, yIndex) => {
    let currentPuzzle = puzzleProgress
    let currentPuzzleCompletion = completionProgress

    if (num === 0) {
      currentPuzzle[yIndex][xIndex] = num
      currentPuzzleCompletion[yIndex][xIndex] = num
    }

    else if (num === 1) {
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