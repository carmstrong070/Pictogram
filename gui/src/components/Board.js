import React, { useState } from "react"
import Tile from "./Tile";
import GuideNumbers from "./GuideNumbers";
import * as clickHelpers from "../helpers/clickHelpers"


const Board = ({ puzzleProgress, setPuzzleProgress, puzzleSolution }) => {
  const [mouseDownInfo, setMouseDownInfo] = useState({
    column: undefined,
    row: undefined,
    initialValue: undefined,
    button: undefined,
    isDragging: false
  })
  const [cursorPosition, setCursorPosition] = useState()


  const handleMouseDown = (e, value, columnIndex, rowIndex) => {
    e.preventDefault()

    // Invoke setMouseDownInfo if a mouse down has not been executed already
    if (mouseDownInfo.initialValue === undefined) {
      setMouseDownInfo({
        column: columnIndex,
        row: rowIndex,
        initialValue: value,
        button: e.button,
        isDragging: false
      })
    }

    // If there is an additional mouse down, the action will be canceled
    else {
      setMouseDownInfo({
        column: undefined,
        row: undefined,
        initialValue: undefined,
        button: undefined,
        isDragging: false
      })
    }
  }


  const handleMouseUp = (e, columnIndex, rowIndex) => {
    e.preventDefault()

    let currentPuzzle = [...puzzleProgress]

    // Clicking on the same cell
    if (mouseDownInfo.column === columnIndex && mouseDownInfo.row === rowIndex) {
      let sameCell = true
      clickHelpers.handleClick(mouseDownInfo.button, mouseDownInfo.initialValue, currentPuzzle, columnIndex, rowIndex, sameCell)
    }

    // Drag logic
    if (mouseDownInfo.isDragging) {

      // Dragging over a cell in the same column
      if (Math.abs(mouseDownInfo.column - cursorPosition.columnIndex) <= Math.abs(mouseDownInfo.row - cursorPosition.rowIndex)) {

        // Reassign columnIndex and rowIndex for snap logic
        rowIndex = cursorPosition.rowIndex
        columnIndex = mouseDownInfo.column

        // Dragging Up
        if (rowIndex < mouseDownInfo.row) {
          for (let i = rowIndex; i < mouseDownInfo.row + 1; i++) {
            clickHelpers.handleClick(mouseDownInfo.button, mouseDownInfo.initialValue, currentPuzzle, columnIndex, i)
          }
        }
        // Dragging Down
        else {
          for (let i = mouseDownInfo.row; i < rowIndex + 1; i++) {
            clickHelpers.handleClick(mouseDownInfo.button, mouseDownInfo.initialValue, currentPuzzle, columnIndex, i)
          }
        }
      }

      // Dragging over a cell in the same row
      else {

        // Reassign columnIndex and rowIndex for snap logic
        columnIndex = cursorPosition.columnIndex
        rowIndex = mouseDownInfo.row

        // Dragging to the left
        if (columnIndex < mouseDownInfo.column) {
          for (let i = columnIndex; i < mouseDownInfo.column + 1; i++) {
            clickHelpers.handleClick(mouseDownInfo.button, mouseDownInfo.initialValue, currentPuzzle, i, rowIndex)
          }
        }
        // Dragging to the right
        else {
          for (let i = mouseDownInfo.column; i < columnIndex + 1; i++) {
            clickHelpers.handleClick(mouseDownInfo.button, mouseDownInfo.initialValue, currentPuzzle, i, rowIndex)
          }
        }
      }

      setPuzzleProgress(currentPuzzle)
    }

    // Clean up
    setMouseDownInfo({
      column: undefined,
      row: undefined,
      initialValue: undefined,
      button: undefined,
      isDragging: false
    })
  }


  const handleCursorMove = (e, columnIndex, rowIndex) => {
    e.preventDefault()

    // Set cursorPosition state if the cursor is on a tile
    if (columnIndex !== undefined) {
      setCursorPosition({
        columnIndex: columnIndex,
        rowIndex: rowIndex
      })
    }
    else {
      setCursorPosition()
    }

    // Determine if the user is executing a click & drag
    if (mouseDownInfo.button !== undefined) {
      let currentState = { ...mouseDownInfo }
      if (mouseDownInfo.column === columnIndex && mouseDownInfo.row === rowIndex) {
        currentState.isDragging = false
      }
      else {
        currentState.isDragging = true
      }
      setMouseDownInfo(currentState)
    }

    // Handle mouse out of board component
    if (!cursorPosition) {
      setMouseDownInfo({
        column: undefined,
        row: undefined,
        initialValue: undefined,
        button: undefined,
        isDragging: false
      })
    }
  }


  return (
    <table onMouseLeave={(e) => handleCursorMove(e)}>
      <thead>
        <tr onMouseEnter={(e) => handleCursorMove(e)}>
          <th></th>
          {/* Create a header row for each column that will contain the guide numbers*/}
          {puzzleProgress[0].map((_, columnIndex) => {
            return (
              <React.Fragment key={columnIndex}>
                <GuideNumbers
                  columnIndex={columnIndex}
                  rowIndex={-1}
                  puzzleSolution={puzzleSolution}
                />
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
              {/* Create a cell for each column in the row */}
              {row.map((_, columnIndex) => {
                return (
                  <React.Fragment key={`fragment ${rowIndex} ${columnIndex}`}>
                    {/* Insert guide numbers before adding a Tile component if the column index is 0 */}
                    {columnIndex ? <></> :
                      <GuideNumbers
                        columnIndex={-1}
                        rowIndex={rowIndex}
                        puzzleSolution={puzzleSolution}
                        handleCursorMove={handleCursorMove}
                      />
                    }
                    <Tile
                      key={`tile ${rowIndex} ${columnIndex}`}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      handleMouseDown={handleMouseDown}
                      handleMouseUp={handleMouseUp}
                      handleCursorMove={handleCursorMove}
                      cursorPosition={cursorPosition}
                      mouseDownInfo={mouseDownInfo}
                      value={puzzleProgress[rowIndex][columnIndex]}
                    />
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

export default Board