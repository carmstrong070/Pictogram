import React, { useState, memo } from "react"

const Tile = ({ rowIndex, columnIndex, handlePuzzleChange, value }) => {

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
    <td onContextMenu={(e) => handlePuzzleChange(e, value, columnIndex, rowIndex)} className={`cell ${BorderClasses(rowIndex, columnIndex)}`} x-index={columnIndex} y-index={rowIndex} onClick={(e) => handlePuzzleChange(e, value, columnIndex, rowIndex)}>{tileStates[value]}</td>
  )
}

export default Tile