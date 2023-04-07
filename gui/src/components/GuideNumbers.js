const GuideNumbers = ({
  columnIndex,
  rowIndex,
  puzzleSolution,
  handleCursorMove,
}) => {
  const ToggleStrikethrough = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("strikethrough"))
      e.target.classList.remove("strikethrough");
    else e.target.classList.add("strikethrough");
  };

  // Create guide numbers for each column
  if (rowIndex < 0) {
    let columnCount = puzzleSolution.reduce(
      (acc, row) => (Array.isArray(row) ? acc + 1 : acc),
      0
    );
    let guideNumbers = [];
    let counter = 0;

    // Generate guide number array
    for (let i = 0; i < columnCount; i++) {
      if (puzzleSolution[i][columnIndex] === 1) {
        counter += 1;
      } else {
        if (counter > 0) {
          guideNumbers.push(
            <span
              className="guide-number"
              onContextMenu={(e) => e.preventDefault()}
              onClick={(e) => ToggleStrikethrough(e)}
              key={`${columnIndex} ${i}`}
            >
              {counter} <br />
            </span>
          );
          counter = 0;
        }
      }
    }

    // Handle empty column, and push any remaining value in counter to guide number array
    if (counter > 0 || guideNumbers.length === 0) {
      guideNumbers.push(
        <span
          className="guide-number"
          onContextMenu={(e) => e.preventDefault()}
          onClick={(e) => ToggleStrikethrough(e)}
          key={`${columnIndex}`}
        >
          {counter}
        </span>
      );
    }

    return (
      <td className="vertical-guide-numbers" key={columnIndex}>
        {guideNumbers}
      </td>
    );
  }

  // Create guide numbers for each row
  if (columnIndex < 0) {
    let guideNumbers = [];
    let counter = 0;

    // Generate guide number array
    for (let i = 0; i < puzzleSolution[0].length; i++) {
      if (puzzleSolution[rowIndex][i] === 1) {
        counter += 1;
      } else {
        if (counter > 0) {
          guideNumbers.push(
            <span
              className="guide-number"
              onContextMenu={(e) => e.preventDefault()}
              onClick={(e) => ToggleStrikethrough(e)}
              key={`${rowIndex} ${i}`}
            >
              {counter}
            </span>
          );
          counter = 0;
        }
      }
    }

    // Handle empty row, and push any remaining value in counter to guide number array
    if (counter > 0 || guideNumbers.length === 0) {
      guideNumbers.push(
        <span
          className="guide-number"
          onContextMenu={(e) => e.preventDefault()}
          onClick={(e) => ToggleStrikethrough(e)}
          key={`${rowIndex}`}
        >
          {counter}
        </span>
      );
    }

    return (
      <td
        className="horizontal-guide-numbers"
        key={rowIndex}
        onMouseEnter={(e) => handleCursorMove(e)}
      >
        {guideNumbers}
      </td>
    );
  }
};

export default GuideNumbers;
