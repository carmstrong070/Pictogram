import * as clickHelpers from "../helpers/clickHelpers";

const Tile = ({
  rowIndex,
  columnIndex,
  value,
  handleMouseUp,
  handleCursorMove,
  cursorPosition,
  mouseDownInfo,
  setMouseDownInfo,
}) => {
  const borderClasses = (rowIndex, columnIndex) => {
    let classes = "";

    if (columnIndex === 0) classes += "thick-border-left ";

    if (rowIndex === 0) classes += "thick-border-top ";

    if ((rowIndex + 1) % 5 === 0) classes += "thick-border-bottom ";

    if ((columnIndex + 1) % 5 === 0) classes += "thick-border-right ";

    return classes;
  };

  const highlightClasses = (columnIndex, rowIndex) => {
    let classes = "";

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
          ((rowIndex <= mouseDownInfo.row &&
            rowIndex >= cursorPosition.rowIndex) ||
            (rowIndex >= mouseDownInfo.row &&
              rowIndex <= cursorPosition.rowIndex))
        ) {
          classes += mouseDownInfo.button
            ? "right-click-preview-line "
            : "left-click-preview-line ";
          value = clickHelpers.handleDragPreview(
            mouseDownInfo.button,
            mouseDownInfo.initialValue,
            value,
            mouseDownInfo.isDragging
          );
        }
      } else {
        // Row drag preview and highlighting logic
        if (
          rowIndex === mouseDownInfo.row &&
          ((columnIndex <= mouseDownInfo.column &&
            columnIndex >= cursorPosition.columnIndex) ||
            (columnIndex >= mouseDownInfo.column &&
              columnIndex <= cursorPosition.columnIndex))
        ) {
          classes += mouseDownInfo.button
            ? "right-click-preview-line "
            : "left-click-preview-line ";
          value = clickHelpers.handleDragPreview(
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
          ? "right-click-cursor-current "
          : "left-click-cursor-current ";
      }
    }

    // Hover highlight logic
    if (cursorPosition && mouseDownInfo.button === undefined) {
      // Apply styling to current cursor position
      if (
        columnIndex === cursorPosition.columnIndex &&
        rowIndex === cursorPosition.rowIndex
      ) {
        classes += "hover-cursor ";
      }

      // Apply styling to current cursor position's column and row (guide lines)
      else if (
        columnIndex === cursorPosition.columnIndex ||
        rowIndex === cursorPosition.rowIndex
      ) {
        classes += "hover-guide-lines ";
      }
    }

    return classes;
  };

  const valueClasses = (value) => {
    let classList = ["empty ", "filled ", "flagged "];
    return classList[value];
  };

  return (
    <td
      onMouseOut={(e) => handleCursorMove(e, undefined)}
      onMouseEnter={(e) => handleCursorMove(e, columnIndex, rowIndex)}
      onMouseUp={(e) => handleMouseUp(e, columnIndex, rowIndex)}
      onMouseDown={(e) =>
        setMouseDownInfo(
          clickHelpers.mouseDown(
            e,
            value,
            columnIndex,
            rowIndex,
            mouseDownInfo.initialValue
          )
        )
      }
      onContextMenu={(e) => e.preventDefault()}
      className={`cell ${borderClasses(
        rowIndex,
        columnIndex
      )}${highlightClasses(columnIndex, rowIndex)}${valueClasses(value)}`}
      x-index={columnIndex}
      y-index={rowIndex}
    ></td>
  );
};

export default Tile;
