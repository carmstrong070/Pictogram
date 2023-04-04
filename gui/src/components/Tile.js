const Tile = ({ rowIndex, columnIndex, value, handleMouseDown, handleMouseUp }) => {

  const BorderClasses = (rowIndex, columnIndex) => {
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

  let tileStates = ["", "⬛", "🚩"]

  return (
    <td onMouseUp={(e) => handleMouseUp(e, value, columnIndex, rowIndex)} onMouseDown={(e) => handleMouseDown(e, value, columnIndex, rowIndex)} className={`cell ${BorderClasses(rowIndex, columnIndex)}`} x-index={columnIndex} y-index={rowIndex} onContextMenu={e => e.preventDefault()} >{tileStates[value]}</td>
  )
}

export default Tile