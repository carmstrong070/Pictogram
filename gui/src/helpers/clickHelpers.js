export const handleClick = (button, startValue, currentPuzzle, columnIndex, rowIndex) => {
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
  else if (button === 2) {
    if (startValue !== 2 && currentCell === 0) {
      currentPuzzle[rowIndex][columnIndex] = 2
    }
    else if (startValue === 2 && currentCell === 2) {
      currentPuzzle[rowIndex][columnIndex] = 0
    }
  }
}

export default { handleClick }