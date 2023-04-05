const Tile = ({ rowIndex, columnIndex, value, handleMouseDown, handleMouseUp, handleCellHighlight, highlightedCell, isClicking, mouseDownPosition, handlePreview }) => {

  const borderClasses = (rowIndex, columnIndex) => {
    let classes = "";

    if (columnIndex === 0)
      classes += "thick-border-left ";

    if (rowIndex === 0)
      classes += "thick-border-top ";

    if ((rowIndex + 1) % 5 === 0)
      classes += "thick-border-bottom ";

    if ((columnIndex + 1) % 5 === 0)
      classes += "thick-border-right ";

    return classes;
  };

  const highlightClasses = (columnIndex, rowIndex) => {
    let classes = ""

    if (highlightedCell) {

      // Drag highlight logic
      if (isClicking >= 0) {
        // Stop guide lines and cursor on mouse down
        if (columnIndex === mouseDownPosition.column || rowIndex === mouseDownPosition.row) {
          classes += "hover-highlighted "
        }
        if (columnIndex === mouseDownPosition.column && rowIndex === mouseDownPosition.row) {
          classes += "hover-cursor "
        }

        // determine if the drag highlighting should follow the column or the row
        if (Math.abs(mouseDownPosition.column - highlightedCell.columnIndex) <= Math.abs(mouseDownPosition.row - highlightedCell.rowIndex)) {
          // column drag highlighting logic
          if (columnIndex === mouseDownPosition.column && ((rowIndex <= mouseDownPosition.row && rowIndex >= highlightedCell.rowIndex) || (rowIndex >= mouseDownPosition.row && rowIndex <= highlightedCell.rowIndex))) {
            classes += "hover-cursor "
            value = (handlePreview(value))
          }
        }

        else {
          // row drag highlighting logic
          if (rowIndex === mouseDownPosition.row && ((columnIndex <= mouseDownPosition.column && columnIndex >= highlightedCell.columnIndex) || (columnIndex >= mouseDownPosition.column && columnIndex <= highlightedCell.columnIndex))) {
            classes += "hover-cursor "
            value = (handlePreview(value))
          }
        }

        // tracking current cursor position during drag
        if (columnIndex === highlightedCell.columnIndex && rowIndex === highlightedCell.rowIndex) {
          classes += "hover-highlighted "
        }
      }

      // Hover highlight logic
      if (highlightedCell && isClicking < 0) {

        if (columnIndex === highlightedCell.columnIndex || rowIndex === highlightedCell.rowIndex) {
          classes += "hover-highlighted "
        }
        if (columnIndex === highlightedCell.columnIndex && rowIndex === highlightedCell.rowIndex) {
          classes += "hover-cursor "
        }
      }
    }

    return classes
  }

  let tileStates = ["", "⬛", "✖️"]

  return (
    <td onMouseOut={e => handleCellHighlight(e, -1, -1)} onMouseEnter={e => handleCellHighlight(e, columnIndex, rowIndex)} onMouseUp={(e) => handleMouseUp(e, columnIndex, rowIndex)} onMouseDown={(e) => handleMouseDown(e, value, columnIndex, rowIndex)} className={`cell ${borderClasses(rowIndex, columnIndex)} ${highlightClasses(columnIndex, rowIndex)}`} x-index={columnIndex} y-index={rowIndex} onContextMenu={e => e.preventDefault()} >{tileStates[value]}</td>
  )
}

export default Tile