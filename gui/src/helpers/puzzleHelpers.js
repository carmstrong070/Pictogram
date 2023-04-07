import * as clickHelpers from "./clickHelpers"

export const resetPuzzleProgress = (puzzleSolution) => {
  let newPuzzle = puzzleSolution.map((row) => {
    return row.map(() => 0)
  })
  return newPuzzle
}

export const checkFinished = (puzzleSolution, puzzleProgress) => {
  for (let i = 0; i < puzzleSolution[0].length; i++) {
    for (let j = 0; j < puzzleSolution[0].length; j++) {
      // refactor else out
      if (!puzzleSolution[i][j] && !puzzleProgress[i][j] || !puzzleSolution[i][j] && puzzleProgress[i][j] === 2 || puzzleSolution[i][j] === 1 && puzzleProgress[i][j] === 1) {
        continue
      }
      else {
        return false
      }
    }
  }
  return true
}

export const puzzleChange = (puzzleProgress, mouseDownInfo, cursorPosition, columnIndex, rowIndex) => {
  let currentPuzzle = [...puzzleProgress]

  // Clicking on the same cell
  if (mouseDownInfo.column === columnIndex && mouseDownInfo.row === rowIndex) {
    let sameCell = true
    clickHelpers.handleCellChange(mouseDownInfo.button, mouseDownInfo.initialValue, currentPuzzle, columnIndex, rowIndex, sameCell)
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
          clickHelpers.handleCellChange(mouseDownInfo.button, mouseDownInfo.initialValue, currentPuzzle, columnIndex, i, false)
        }
      }
      // Dragging Down
      else {
        for (let i = mouseDownInfo.row; i < rowIndex + 1; i++) {
          clickHelpers.handleCellChange(mouseDownInfo.button, mouseDownInfo.initialValue, currentPuzzle, columnIndex, i, false)
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
          clickHelpers.handleCellChange(mouseDownInfo.button, mouseDownInfo.initialValue, currentPuzzle, i, rowIndex, false)
        }
      }
      // Dragging to the right
      else {
        for (let i = mouseDownInfo.column; i < columnIndex + 1; i++) {
          clickHelpers.handleCellChange(mouseDownInfo.button, mouseDownInfo.initialValue, currentPuzzle, i, rowIndex, false)
        }
      }
    }
  }

  return (currentPuzzle)
}

export default { resetPuzzleProgress, checkFinished, puzzleChange }