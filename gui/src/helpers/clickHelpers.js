export const handleClick = (button, startValue, endValue, currentPuzzle, columnIndex, rowIndex) => {
  let currentCell = currentPuzzle[rowIndex][columnIndex]

  // Left click logic
  if (button === 0) {
    if (currentCell === 0 && startValue !== 1 || startValue === 0 && endValue === 1 && currentCell !== 2) {
      currentPuzzle[rowIndex][columnIndex] = 1
    }
    else if (endValue === 1 && currentCell !== 2 || startValue === 1 && currentCell === 1) {
      currentPuzzle[rowIndex][columnIndex] = 0
    }
  }

  // Right click logic
  else if (button === 2) {
    if (startValue === 0 && currentCell !== 1 || startValue === 0 && endValue === 0 && currentCell !== 1) {
      currentPuzzle[rowIndex][columnIndex] = 2
    }
    else if (startValue === 1 && endValue !== 2 && currentCell === 1 || startValue === 2 && endValue === 0 && currentCell !== 1) {
      currentPuzzle[rowIndex][columnIndex] = 0
    }
    else if (startValue === 2 && endValue === 2 && currentCell === 2 || startValue === 1 && endValue !== 0 && currentCell === 1) {
      currentPuzzle[rowIndex][columnIndex] = 0
    }
  }
}

export default { handleClick }