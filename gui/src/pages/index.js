import React, { useState, useEffect } from "react"

const index = () => {
  const [puzzle, setPuzzle] = useState()

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
  }, [])

  const Board = ({ puzzle }) => {
    if (puzzle) {
      return (
        <table>
          <thead>
            <tr>
              <th>😐</th>
              {/* Create a header row for each column that will contain the guide numbers*/}
              {puzzle.solution[0].map((head, headIndex) => {
                return (
                  <th key={headIndex}>{headIndex + 1}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {/* Create a table row for each array in the solution array */}
            {puzzle.solution.map((row, rowIndex) => {
              return (
                <tr row={rowIndex + 1} key={rowIndex}>
                  {row.map((cell, cellIndex) => {
                    // Create an extra column for each row that will contain the guide numbers
                    if (cellIndex == 0) {
                      return ([
                        <React.Fragment key={rowIndex}>
                          <td key={`${rowIndex}`}>{cellIndex}</td>
                          <td key={`${rowIndex} ${cellIndex}`} y={cellIndex} x={rowIndex}>[{cell ? "X" : " "}]</td>
                        </React.Fragment>
                      ])
                    }
                    else return (
                      <td key={`${rowIndex} ${cellIndex}`} y={cellIndex} x={rowIndex}>[{cell ? "X" : " "}]</td>
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
      <Board puzzle={puzzle} />
    </>
  )
}

export default index