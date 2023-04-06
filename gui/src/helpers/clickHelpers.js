export const handleClick = (button, startValue, currentPuzzle, columnIndex, rowIndex, sameCell) => {
  let currentCell = currentPuzzle[rowIndex][columnIndex]

  // Left click logic
  if (button === 0) {
    if (startValue !== 1 && currentCell !== 2) {
      currentPuzzle[rowIndex][columnIndex] = 1
    }
    else if (startValue === 1 && currentCell !== 2) {
      currentPuzzle[rowIndex][columnIndex] = 0
    }
  }

  // Right click logic
  if (button === 2) {
    if (startValue !== 2 && currentCell === 0) {
      currentPuzzle[rowIndex][columnIndex] = 2
    }
    else if (startValue === 2 && currentCell === 2 || currentCell === 1 && sameCell) {
      currentPuzzle[rowIndex][columnIndex] = 0
    }
  }
}

export const handleDragPreview = (button, startValue, currentValue, isDragging) => {
  if (button === 0) {
    if (currentValue === 2) {
      return 2
    }
    if (startValue !== 1) {
      return 1
    }
    if (startValue === 1) {
      return 0
    }
  }

  // Right click logic
  else if (button === 2) {
    if (startValue !== 2 && currentValue !== 1) {
      return 2
    }
    if (currentValue === 1 && isDragging) {
      return 1
    }
    if (currentValue !== 0) {
      return 0
    }
  }
}

export default { handleClick, handleDragPreview }