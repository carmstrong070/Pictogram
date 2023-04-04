export const resetPuzzleProgress = () => {
  return (
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
  );
}

export const checkFinished = (puzzleSolution, puzzleProgress) => {
  for (let i = 0; i < puzzleSolution[0].length; i++) {
    for (let j = 0; j < puzzleSolution[0].length; j++) {
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

export default { resetPuzzleProgress, checkFinished }