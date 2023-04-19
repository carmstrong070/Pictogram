import gameStore from "@/states/store";
import { useEffect } from "react";

const GuideNumbers = ({ columnIndex, rowIndex }) => {
  const cursorPosition = gameStore((state) => state.cursorPosition);
  const puzzle = gameStore((state) => state.puzzle);

  useEffect(() => {
    document.querySelectorAll(".vertical-guide-numbers").forEach((el) => {
      el.classList.remove("hover-guide-lines");
    });
    document.querySelectorAll(".horizontal-guide-numbers").forEach((el) => {
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

  // Create guide numbers for each column
  if (rowIndex < 0) {
    let columnCount = puzzle.solution.reduce(
      (acc, row) => (Array.isArray(row) ? acc + 1 : acc),
      0
    );
    let guideNumbers = [];
    let counter = 0;

    // Generate guide number array
    for (let i = 0; i < columnCount; i++) {
      if (puzzle.solution[i][columnIndex] === 1) {
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
      <td
        className="vertical-guide-numbers font-medium"
        key={columnIndex}
        id={`columnIndex-${columnIndex}`}
      >
        {guideNumbers}
      </td>
    );
  }

  // Create guide numbers for each row
  if (columnIndex < 0) {
    let guideNumbers = [];
    let counter = 0;

    // Generate guide number array
    for (let i = 0; i < puzzle.solution[0].length; i++) {
      if (puzzle.solution[rowIndex][i] === 1) {
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
        className="horizontal-guide-numbers font-medium"
        key={rowIndex}
        id={`rowIndex-${rowIndex}`}
      >
        {guideNumbers}
      </td>
    );
  }
};

export default GuideNumbers;
