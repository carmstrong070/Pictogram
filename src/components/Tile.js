import { handleDragPreview, mouseDown } from "@/helpers/clickHelpers";
import { isBetween } from "@/helpers/puzzleHelpers";
import gameStore from "@/states/store";

const Tile = ({ rowIndex, columnIndex, value, handleCursorMove }) => {
  const isFinished = gameStore((state) => state.isFinished);
  const cursorPosition = gameStore((state) => state.cursorPosition);
  const mouseDownInfo = gameStore((state) => state.mouseDownInfo);
  const setMouseDownInfo = gameStore((state) => state.setMouseDownInfo);

  const borderClasses = (rowIndex, columnIndex, isFinished) => {
    let classes = "cell-borders ";

    if (isFinished) {
      return "cell ";
    }

    if (columnIndex === 0) classes += "thick-border-left ";

    if (rowIndex === 0) classes += "thick-border-top ";

    if ((rowIndex + 1) % 5 === 0) classes += "thick-border-bottom ";

    if ((columnIndex + 1) % 5 === 0) classes += "thick-border-right ";

    return classes;
  };

  const highlightClasses = (columnIndex, rowIndex) => {
    let classes = "";

    if (isFinished) {
      return classes;
    }
    // Handle styling if a there is a mouse down event
    if (cursorPosition && mouseDownInfo.button !== undefined) {
      // Maintain guide line styling on mouse down position
      if (
        columnIndex === mouseDownInfo.column ||
        rowIndex === mouseDownInfo.row
      ) {
        classes += mouseDownInfo.button
          ? "right-click-guide-lines "
          : "left-click-guide-lines ";
      }
      // Maintain cursor styling on mouse down position
      if (
        columnIndex === mouseDownInfo.column &&
        rowIndex === mouseDownInfo.row
      ) {
        classes += mouseDownInfo.button
          ? "right-click-cursor "
          : "left-click-cursor ";
      }

      // Determine if the drag highlighting and preview should follow the column or the row
      if (
        Math.abs(mouseDownInfo.column - cursorPosition.columnIndex) <=
        Math.abs(mouseDownInfo.row - cursorPosition.rowIndex)
      ) {
        // Column drag preview and highlighting logic
        if (
          columnIndex === mouseDownInfo.column &&
          isBetween(rowIndex, mouseDownInfo.row, cursorPosition.rowIndex)
        ) {
          classes += mouseDownInfo.button
            ? "right-click-preview-line "
            : "left-click-preview-line ";
          value = handleDragPreview(
            mouseDownInfo.button,
            mouseDownInfo.initialValue,
            value,
            mouseDownInfo.isDragging
          );
        }
      }
      // Row drag preview and highlighting logic
      else {
        if (
          rowIndex === mouseDownInfo.row &&
          isBetween(
            columnIndex,
            mouseDownInfo.column,
            cursorPosition.columnIndex
          )
        ) {
          classes += mouseDownInfo.button
            ? "right-click-preview-line "
            : "left-click-preview-line ";
          value = handleDragPreview(
            mouseDownInfo.button,
            mouseDownInfo.initialValue,
            value,
            mouseDownInfo.isDragging
          );
        }
      }

      // Apply styling to current cursor position during drag
      if (
        columnIndex === cursorPosition.columnIndex &&
        rowIndex === cursorPosition.rowIndex
      ) {
        classes += mouseDownInfo.button
          ? "hover-cursor-left "
          : "hover-cursor-right ";
      }
    }

    // Hover highlight logic
    else if (cursorPosition) {
      if (
        columnIndex === cursorPosition.columnIndex &&
        rowIndex === cursorPosition.rowIndex
      ) {
        classes += "hover-cursor ";
      } else if (
        columnIndex === cursorPosition.columnIndex ||
        rowIndex === cursorPosition.rowIndex
      ) {
        classes += "hover-guide-lines ";
      }
    }

    return classes;
  };

  const valueClasses = (value) => {
    if (!isFinished) {
      let classList = ["empty ", "filled ", "flagged "];
      return classList[value];
    } else {
      let classList = ["empty ", "filled-finished ", "empty "];
      return classList[value];
    }
  };

  return (
    <td
      onMouseEnter={(e) => handleCursorMove(e, columnIndex, rowIndex)}
      onMouseDown={(e) =>
        setMouseDownInfo(
          mouseDown(e, value, columnIndex, rowIndex, mouseDownInfo.initialValue)
        )
      }
      onContextMenu={(e) => e.preventDefault()}
      className={`${borderClasses(
        rowIndex,
        columnIndex,
        isFinished
      )}${highlightClasses(columnIndex, rowIndex)}${valueClasses(value)}`}
      x-index={columnIndex}
      y-index={rowIndex}
    ></td>
  );
};

export default Tile;
