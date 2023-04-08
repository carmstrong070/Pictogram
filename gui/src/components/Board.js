import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import GuideNumbers from "./GuideNumbers";
import { puzzleChange } from "@/helpers/puzzleHelpers";
import timerHelpers from "@/helpers/timerHelpers";
import * as puzzleHelpers from "@/helpers/puzzleHelpers";

const Board = ({
  puzzleProgress,
  setPuzzleProgress,
  puzzleSolution,
  isFinished,
  timerStatus,
  setTimerStatus,
}) => {
  useEffect(() => {
    // If the timer is reset, reset the puzzle progress
    if (timerStatus.reset) {
      setPuzzleProgress(puzzleHelpers.resetPuzzleProgress(puzzleSolution));
      let currentTimerStatus = { ...timerStatus };
      currentTimerStatus.reset = false;
      setTimerStatus(currentTimerStatus);
    }
  }, [timerStatus]);

  const [mouseDownInfo, setMouseDownInfo] = useState({
    column: undefined,
    row: undefined,
    initialValue: undefined,
    button: undefined,
    isDragging: false,
  });
  const [cursorPosition, setCursorPosition] = useState();

  const handleMouseUp = (e, columnIndex, rowIndex) => {
    e.preventDefault();

    // Do not allow changes to the board if the timer is stopped, expired, or the puzzle has been completed
    if (!isFinished && !(timerStatus.stopped || timerStatus.expired)) {
      setPuzzleProgress(
        puzzleChange(
          puzzleProgress,
          mouseDownInfo,
          cursorPosition,
          columnIndex,
          rowIndex
        )
      );
    }

    // Clean up
    setMouseDownInfo({
      column: undefined,
      row: undefined,
      initialValue: undefined,
      button: undefined,
      isDragging: false,
    });
  };

  const handleCursorMove = (e, columnIndex, rowIndex) => {
    e.preventDefault();

    // Set cursorPosition state if the cursor is on a tile
    if (columnIndex !== undefined) {
      setCursorPosition({
        columnIndex: columnIndex,
        rowIndex: rowIndex,
      });
    } else {
      setCursorPosition();
    }

    // Determine if the user is executing a click & drag
    if (mouseDownInfo.button !== undefined) {
      let currentState = { ...mouseDownInfo };
      if (
        mouseDownInfo.column === columnIndex &&
        mouseDownInfo.row === rowIndex
      ) {
        currentState.isDragging = false;
      } else {
        currentState.isDragging = true;
      }
      setMouseDownInfo(currentState);
    }

    // Handle mouse out of board component
    if (!cursorPosition) {
      setMouseDownInfo({
        column: undefined,
        row: undefined,
        initialValue: undefined,
        button: undefined,
        isDragging: false,
      });
    }
  };

  const customMargin = () => {
    let element = document.getElementById("guideNumbersWidth");

    return {
      marginRight: element ? element.offsetWidth : "0px",
    };
  };

  return (
    <table style={customMargin()} onMouseLeave={(e) => handleCursorMove(e)}>
      <thead>
        <tr onMouseEnter={(e) => handleCursorMove(e)}>
          <th id="guideNumbersWidth"></th>
          {/* Create a header row for each column that will contain the guide numbers*/}
          {puzzleProgress[0].map((_, columnIndex) => {
            return (
              <React.Fragment key={columnIndex}>
                <GuideNumbers
                  columnIndex={columnIndex}
                  rowIndex={-1}
                  puzzleSolution={puzzleSolution}
                />
              </React.Fragment>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {/* Create a table row for each array in the solution array */}
        {puzzleProgress.map((row, rowIndex) => {
          return (
            <tr row={rowIndex + 1} key={rowIndex}>
              {/* Create a cell for each column in the row */}
              {row.map((_, columnIndex) => {
                return (
                  <React.Fragment key={`fragment ${rowIndex} ${columnIndex}`}>
                    {/* Insert guide numbers before adding a Tile component if the column index is 0 */}
                    {columnIndex ? (
                      <></>
                    ) : (
                      <GuideNumbers
                        columnIndex={-1}
                        rowIndex={rowIndex}
                        puzzleSolution={puzzleSolution}
                        handleCursorMove={handleCursorMove}
                      />
                    )}
                    <Tile
                      key={`tile ${rowIndex} ${columnIndex}`}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      handleMouseUp={handleMouseUp}
                      handleCursorMove={handleCursorMove}
                      cursorPosition={cursorPosition}
                      mouseDownInfo={mouseDownInfo}
                      value={puzzleProgress[rowIndex][columnIndex]}
                      setMouseDownInfo={setMouseDownInfo}
                    />
                  </React.Fragment>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Board;
