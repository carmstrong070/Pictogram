import React, { useState } from "react"

const Tile = ({ rowIndex, cellIndex, handlePuzzleChange }) => {
  const [tileState, setTileState] = useState(0)
  const [mouseDownTile, setMouseDownTile] = useState()
  const [mouseUpFlag, setMouseUpFlag] = useState(false)

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

  const handleMouseDown = (e) => {
    e.preventDefault()
    setMouseDownTile({
      x: Number(e.target.getAttribute("x-index")),
      y: Number(e.target.getAttribute("y-index"))
    })
    console.log(mouseDownTile)
  }

  const handleMouseUp = (e, y, x) => {
    e.preventDefault()
    if (mouseDownTile !== undefined) {
      // console.log(mouseDownTile)
      // determine if the tile that triggered the mouse up is on the same row or column
      if (y === mouseDownTile.y && x === mouseDownTile.x) {
        console.log("same column & row")
      }
      else if (x === mouseDownTile.x) {
        console.log("same row")
      }
      else if (y === mouseDownTile.y) {
        console.log("same column")
      }
      // else {
      //   setMouseDownTile()
      // }
    }
  }

  if (tileState === 0) {
    return (
      <td onMouseDown={e => handleMouseDown(e)} onMouseUp={e => handleMouseUp(e, rowIndex, cellIndex)} onContextMenu={(e) => handleClick(e, 2, cellIndex, rowIndex)} className={`cell ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} x-index={cellIndex} y-index={rowIndex} onClick={(e) => handleClick(e, 1, cellIndex, rowIndex)}></td>
    )
  }
  else if (tileState === 1) {
    return (
      <td onContextMenu={(e) => handleClick(e, 0, rowIndex, cellIndex)} className={`cell ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} x-index={cellIndex} y-index={rowIndex} onClick={(e) => handleClick(e, 0, rowIndex, cellIndex)}>⬛</td>
    )
  }
  else if (tileState === 2) {
    return (
      <td onContextMenu={(e) => handleClick(e, 0, rowIndex, cellIndex)} className={`cell ${BorderClasses(rowIndex, cellIndex)}`} tilestate={tileState} x-index={cellIndex} y-index={rowIndex} onClick={(e) => handleClick(e, 2, rowIndex, cellIndex)}>🚩</td>
    )
  }
}

export default Tile