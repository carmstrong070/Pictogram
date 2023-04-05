import React, { useEffect, useState } from "react"
import Tile from "./Tile";
import GuideNumbers from "./GuideNumbers";
import * as clickHelpers from "../helpers/clickHelpers"


const Board = ({ puzzleProgress, setPuzzleProgress, puzzleSolution }) => {
  const [mouseDownPosition, setMouseDownPosition] = useState()
  const [highlightedCell, setHighlightedCell] = useState()
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = (e, value, columnIndex, rowIndex) => {
    e.preventDefault()

    if (!isDragging) {
      setMouseDownPosition({
        column: columnIndex,
        row: rowIndex,
        initialValue: value
      })
      setIsDragging(true)
    }

    // if there is an additional mouse down, the action will be canceled
    else {
      setMouseDownPosition()
      setIsDragging(false)
    }
  }

  const handleMouseUp = (e, columnIndex, rowIndex) => {
    e.preventDefault()

    if (isDragging) {
      // handling column drag
      if (Math.abs(mouseDownPosition.column - highlightedCell.columnIndex) <= Math.abs(mouseDownPosition.row - highlightedCell.rowIndex)) {
        rowIndex = highlightedCell.rowIndex
        columnIndex = mouseDownPosition.column
      }
      // handling row drag
      else {
        columnIndex = highlightedCell.columnIndex
        rowIndex = mouseDownPosition.row
      }
    }

    if (mouseDownPosition) {
      let currentPuzzle = [...puzzleProgress]
      // Clicking on the same cell
      if (mouseDownPosition.column === columnIndex && mouseDownPosition.row === rowIndex) {
        let sameCell = true
        clickHelpers.handleClick(e.button, mouseDownPosition.initialValue, currentPuzzle, columnIndex, rowIndex, sameCell)
        setPuzzleProgress(currentPuzzle)
      }

      // Dragging over a cell in the same column
      else if (mouseDownPosition.column === columnIndex) {
        // Dragging Up
        if (rowIndex < mouseDownPosition.row) {
          for (let i = rowIndex; i < mouseDownPosition.row + 1; i++) {
            clickHelpers.handleClick(e.button, mouseDownPosition.initialValue, currentPuzzle, columnIndex, i)
          }
          setPuzzleProgress(currentPuzzle)
        }
        // Dragging Down
        else {
          for (let i = mouseDownPosition.row; i < rowIndex + 1; i++) {
            clickHelpers.handleClick(e.button, mouseDownPosition.initialValue, currentPuzzle, columnIndex, i)
          }
          setPuzzleProgress(currentPuzzle)
        }
      }

      // Dragging over a cell in the same row
      else if (mouseDownPosition.row === rowIndex) {
        // Dragging to the left
        if (columnIndex < mouseDownPosition.column) {
          for (let i = columnIndex; i < mouseDownPosition.column + 1; i++) {
            clickHelpers.handleClick(e.button, mouseDownPosition.initialValue, currentPuzzle, i, rowIndex)
          }
          setPuzzleProgress(currentPuzzle)
        }
        // Dragging to the right
        else {
          for (let i = mouseDownPosition.column; i < columnIndex + 1; i++) {
            clickHelpers.handleClick(e.button, mouseDownPosition.initialValue, currentPuzzle, i, rowIndex)
          }
          setPuzzleProgress(currentPuzzle)
        }
      }
    }
    setMouseDownPosition()
    setIsDragging(false)
  }

  const handleCellHighlight = (e, columnIndex, rowIndex) => {
    e.preventDefault()
    if (columnIndex > -1 || rowIndex > -1) {
      setHighlightedCell({
        columnIndex: columnIndex,
        rowIndex: rowIndex
      })
    }
    else {
      setHighlightedCell()
    }
    if (!highlightedCell) {
      setIsDragging(false)
    }
  }

  const handleMouseOut = (e) => {
    e.preventDefault()
    setIsDragging(false)
    setMouseDownPosition()
  }

  return (
    <table onMouseLeave={e => handleMouseOut(e)}>
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
                    <Tile key={`tile ${rowIndex} ${columnIndex}`} rowIndex={rowIndex} columnIndex={columnIndex} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} handleCellHighlight={handleCellHighlight} highlightedCell={highlightedCell} isDragging={isDragging} mouseDownPosition={mouseDownPosition} value={puzzleProgress[rowIndex][columnIndex]} />
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