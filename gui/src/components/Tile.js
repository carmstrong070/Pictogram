import React, { useState } from "react"

const Tile = ({ rowIndex, cellIndex, handlePuzzleChange }) => {
  const [tileState, setTileState] = useState(0)

  const handleClick = (e, num, cellIndex, rowIndex) => {
    e.preventDefault()
    setTileState(num)
    handlePuzzleChange(num, cellIndex, rowIndex)
  }

  const BorderClasses = (rowIndex, cellIndex) => {
    let classes = "";

    if (cellIndex === 0)
      classes += "thick-border-left ";

    if (rowIndex === 0)
      classes += "thick-border-top ";

    if ((rowIndex + 1) % 5 === 0)
      classes += "thick-border-bottom ";

    if ((cellIndex + 1) % 5 === 0)
      classes += "thick-border-right ";

    return classes;
  };

  if (tileState === 0) {
    return (
      <td onContextMenu={(e) => handleClick(e, 2, cellIndex, rowIndex)} className={`cell ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={(e) => handleClick(e, 1, cellIndex, rowIndex)}></td>
    )
  }
  else if (tileState === 1) {
    return (
      <td onContextMenu={(e) => handleClick(e, 0, cellIndex, rowIndex)} className={`cell ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={(e) => handleClick(e, 0, cellIndex, rowIndex)}>⬛</td>
    )
  }
  else if (tileState === 2) {
    return (
      <td onContextMenu={(e) => handleClick(e, 0, cellIndex, rowIndex)} className={`cell ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} y-index={cellIndex} x-index={rowIndex} onClick={(e) => handleClick(e, 2, cellIndex, rowIndex)}>🚩</td>
    )
  }
}

export default Tile