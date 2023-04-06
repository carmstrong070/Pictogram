export const handleCellChange = (button, startValue, currentPuzzle, columnIndex, rowIndex, sameCell) => {
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

  // Left click logic
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

export const mouseDown = (e, value, columnIndex, rowIndex, initialValue) => {
  e.preventDefault()

  // Return a mouse down object if a mouse down has not already been executed
  if (initialValue === undefined) {
    return {
      column: columnIndex,
      row: rowIndex,
      initialValue: value,
      button: e.button,
      isDragging: false
    }
  }

  // If there is an additional mouse down, the action will be canceled
  else {
    return {
      column: undefined,
      row: undefined,
      initialValue: undefined,
      button: undefined,
      isDragging: false
    }
  }
}


export default { handleCellChange, handleDragPreview, mouseDown }