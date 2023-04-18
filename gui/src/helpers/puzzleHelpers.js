import * as clickHelpers from "./clickHelpers";

export const resetPuzzleProgress = (puzzleSolution) => {
  let newPuzzle = puzzleSolution.map((row) => {
    return row.map(() => 0);
  });
  return newPuzzle;
};

export const checkFinished = (puzzleSolution, puzzleProgress) => {
  for (let i = 0; i < puzzleSolution.length; i++) {
    for (let j = 0; j < puzzleSolution[0].length; j++) {
      // refactor else out
      if (
        (!puzzleSolution[i][j] && !puzzleProgress[i][j]) ||
        (!puzzleSolution[i][j] && puzzleProgress[i][j] === 2) ||
        (puzzleSolution[i][j] === 1 && puzzleProgress[i][j] === 1)
      ) {
        continue;
      } else {
        return false;
      }
    }
  }
  return true;
};

export const puzzleChange = (puzzleProgress, mouseDownInfo, cursorPosition) => {
  let currentPuzzle = [...puzzleProgress];

  // Clicking on the same cell
  if (
    mouseDownInfo.column === cursorPosition.columnIndex &&
    mouseDownInfo.row === cursorPosition.rowIndex
  ) {
    let sameCell = true;
    clickHelpers.handleCellChange(
      mouseDownInfo.button,
      mouseDownInfo.initialValue,
      currentPuzzle,
      cursorPosition.columnIndex,
      cursorPosition.rowIndex,
      sameCell
    );
  }

  // Drag logic
  if (mouseDownInfo.isDragging) {
    // Dragging over a cell in the same column
    if (
      Math.abs(mouseDownInfo.column - cursorPosition.columnIndex) <=
      Math.abs(mouseDownInfo.row - cursorPosition.rowIndex)
    ) {
      // Dragging Up
      if (cursorPosition.rowIndex < mouseDownInfo.row) {
        for (let i = cursorPosition.rowIndex; i < mouseDownInfo.row + 1; i++) {
          clickHelpers.handleCellChange(
            mouseDownInfo.button,
            mouseDownInfo.initialValue,
            currentPuzzle,
            mouseDownInfo.column,
            i,
            false
          );
        }
      }
      // Dragging Down
      else {
        for (let i = mouseDownInfo.row; i < cursorPosition.rowIndex + 1; i++) {
          clickHelpers.handleCellChange(
            mouseDownInfo.button,
            mouseDownInfo.initialValue,
            currentPuzzle,
            mouseDownInfo.column,
            i,
            false
          );
        }
      }
    }

    // Dragging over a cell in the same row
    else {
      // Dragging to the left
      if (cursorPosition.columnIndex < mouseDownInfo.column) {
        for (
          let i = cursorPosition.columnIndex;
          i < mouseDownInfo.column + 1;
          i++
        ) {
          clickHelpers.handleCellChange(
            mouseDownInfo.button,
            mouseDownInfo.initialValue,
            currentPuzzle,
            i,
            mouseDownInfo.row,
            false
          );
        }
      }
      // Dragging to the right
      else {
        for (
          let i = mouseDownInfo.column;
          i < cursorPosition.columnIndex + 1;
          i++
        ) {
          clickHelpers.handleCellChange(
            mouseDownInfo.button,
            mouseDownInfo.initialValue,
            currentPuzzle,
            i,
            mouseDownInfo.row,
            false
          );
        }
      }
    }
  }

  return currentPuzzle;
};

export default { resetPuzzleProgress, checkFinished, puzzleChange };
