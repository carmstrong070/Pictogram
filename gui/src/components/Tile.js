const Tile = ({ rowIndex, columnIndex, value, handleMouseDown, handleMouseUp, handleCellHighlight, highlightedCell }) => {

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

      if (columnIndex === highlightedCell.columnIndex || rowIndex === highlightedCell.rowIndex) {
        classes += "highlighted "
      }
      if (columnIndex === highlightedCell.columnIndex && rowIndex === highlightedCell.rowIndex) {
        classes += "cursor"
      }
    }

    return classes
  }

  let tileStates = ["", "⬛", "🚩"]

  return (
    <td onMouseOut={e => handleCellHighlight(e, -1, -1)} onMouseEnter={e => handleCellHighlight(e, columnIndex, rowIndex)} onMouseUp={(e) => handleMouseUp(e, columnIndex, rowIndex)} onMouseDown={(e) => handleMouseDown(e, value, columnIndex, rowIndex)} className={`cell ${borderClasses(rowIndex, columnIndex)} ${highlightClasses(columnIndex, rowIndex)}`} x-index={columnIndex} y-index={rowIndex} onContextMenu={e => e.preventDefault()} >{tileStates[value]}</td>
  )
}

export default Tile