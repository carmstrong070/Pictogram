const GuideNumbers = ({ columnIndex, rowIndex, puzzleSolution, handleMouseOut }) => {

  const ToggleStrikethrough = (e) => {
    e.preventDefault()
    if (e.target.classList.contains("strikethrough"))
      e.target.classList.remove("strikethrough");
    else
      e.target.classList.add("strikethrough");
  }

  // Create guide numbers for each column
  if (rowIndex < 0) {
    let guideNumbers = []
    let counter = 0
    for (let i = 0; i < puzzleSolution[0].length; i++) {
      if (puzzleSolution[i][columnIndex] === 1) {
        counter += 1
      }
      else if (puzzleSolution[i][columnIndex] === 0) {
        if (counter > 0) {
          guideNumbers.push(
            <span className="guide-number" onContextMenu={e => e.preventDefault()} onClick={(e) => ToggleStrikethrough(e)} key={`${columnIndex} ${i}`}>
              {counter} <br />
            </span>
          )
          counter = 0
        }
      }
    }
    if (counter > 0) {
      guideNumbers.push(
        <span className="guide-number" onContextMenu={e => e.preventDefault()} onClick={(e) => ToggleStrikethrough(e)} key={`${columnIndex}`}>
          {counter}
        </span>
      )
    }
    if (guideNumbers.length === 0) {
      guideNumbers = [
        <span className="guide-number" onContextMenu={e => e.preventDefault()} onClick={(e) => ToggleStrikethrough(e)} key={`${columnIndex}`}>
          {counter}
        </span>
      ]
    }
    return (
      <td className="vertical-guide-numbers" key={columnIndex}>{guideNumbers.length === 0 ? 0 : guideNumbers}</td>
    )
  }

  // Create guide numbers for each row
  if (columnIndex < 0) {
    let guideNumbers = []
    let counter = 0
    for (let i = 0; i < puzzleSolution[0].length; i++) {
      if (puzzleSolution[rowIndex][i] === 1) {
        counter += 1
      }
      else if (puzzleSolution[rowIndex][i] === 0) {
        if (counter > 0) {
          guideNumbers.push(
            <span className="guide-number" onContextMenu={e => e.preventDefault()} onClick={(e) => ToggleStrikethrough(e)} key={`${rowIndex} ${i}`}>
              {counter}
            </span>
          )
          counter = 0
        }
      }
    }
    if (counter > 0) {
      guideNumbers.push(
        <span className="guide-number" onContextMenu={e => e.preventDefault()} onClick={(e) => ToggleStrikethrough(e)} key={`${rowIndex}`}>
          {counter}
        </span>
      )
    }
    if (guideNumbers.length === 0) {
      guideNumbers = [
        <span className="guide-number" onContextMenu={e => e.preventDefault()} onClick={(e) => ToggleStrikethrough(e)} key={`${columnIndex}`}>
          {counter}
        </span>
      ]
    }
    return (
      <td className="horizontal-guide-numbers" key={rowIndex} onMouseEnter={(e) => handleMouseOut(e)}>{guideNumbers.length === 0 ? 0 : guideNumbers}</td>
    )
  }
}

export default GuideNumbers