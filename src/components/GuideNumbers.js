import gameStore from "@/states/store";
import { useEffect } from "react";

const GuideNumbers = ({ columnIndex, rowIndex }) => {
  const cursorPosition = gameStore((state) => state.cursorPosition);
  const puzzle = gameStore((state) => state.puzzle);

  useEffect(() => {
    document
      .querySelectorAll(".vertical-guide-numbers, .horizontal-guide-numbers")
      .forEach((el) => {
        el.classList.remove("hover-guide-lines");
      });
    handleHighlight(cursorPosition);
  }, [cursorPosition]);

  const ToggleStrikethrough = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("strikethrough"))
      e.target.classList.remove("strikethrough");
    else e.target.classList.add("strikethrough");
  };

  const handleHighlight = (cursorPosition) => {
    if (cursorPosition !== undefined) {
      // Guide number row highlighting
      let horizontalGuideNumbers = document.getElementById(
        `rowIndex-${cursorPosition.rowIndex}`
      );
      horizontalGuideNumbers.classList.add("hover-guide-lines");
      // Guide number column highlighting
      let verticalGuideNumbers = document.getElementById(
        `columnIndex-${cursorPosition.columnIndex}`
      );
      verticalGuideNumbers.classList.add("hover-guide-lines");
    }
  };

  const generateGuideNumbers = (
    iterationCount,
    rowIndex,
    columnIndex,
    solution
  ) => {
    let isVertical = rowIndex < 0;

    let guideNumbers = [];
    let counter = 0;
    let index = isVertical ? columnIndex : rowIndex;

    // Generate guide number array
    for (let i = 0; i < iterationCount; i++) {
      let value = isVertical ? solution[i][index] : solution[index][i];

      if (value === 1) {
        counter += 1;
      } else {
        if (counter > 0) {
          guideNumbers.push(
            <span
              className="guide-number"
              onContextMenu={(e) => e.preventDefault()}
              onClick={(e) => ToggleStrikethrough(e)}
              key={`${index} ${i}`}
            >
              {counter} {isVertical ? <br /> : null}
            </span>
          );
          counter = 0;
        }
      }
    }

    // Handle empty row or column, and push any remaining value in counter to guide number array
    if (counter > 0 || guideNumbers.length === 0) {
      guideNumbers.push(
        <span
          className="guide-number"
          onContextMenu={(e) => e.preventDefault()}
          onClick={(e) => ToggleStrikethrough(e)}
          key={`${index}`}
        >
          {counter}
        </span>
      );
    }

    let className = isVertical
      ? "vertical-guide-numbers"
      : "horizontal-guide-numbers";
    let id = isVertical ? `columnIndex-${index}` : `rowIndex-${index}`;

    return (
      <td className={`${className} font-medium`} key={index} id={id}>
        {guideNumbers}
      </td>
    );
  };

  // Create guide numbers for each column
  if (rowIndex < 0) {
    let columnCount = puzzle.solution.reduce(
      (acc, row) => (Array.isArray(row) ? acc + 1 : acc),
      0
    );

    return generateGuideNumbers(
      columnCount,
      rowIndex,
      columnIndex,
      puzzle.solution
    );
  }

  // Create guide numbers for each row
  let rowCount = puzzle.solution[0].length;
  return generateGuideNumbers(rowCount, rowIndex, columnIndex, puzzle.solution);
};

export default GuideNumbers;
