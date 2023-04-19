import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import GuideNumbers from "./GuideNumbers";
import { puzzleChange } from "@/helpers/puzzleHelpers";
import * as puzzleHelpers from "@/helpers/puzzleHelpers";
import gameStore from "@/states/store";

const Board = ({ puzzleTitle, timerStatus, setTimerStatus }) => {
  const [mouseDownInfo, setMouseDownInfo] = useState({
    column: undefined,
    row: undefined,
    initialValue: undefined,
    button: undefined,
    isDragging: false,
  });
  const isFinished = gameStore((state) => state.isFinished);
  const cursorPosition = gameStore((state) => state.cursorPosition);
  const setCursorPosition = gameStore((state) => state.setCursorPosition);
  const puzzleProgress = gameStore((state) => state.puzzleProgress);
  const setPuzzleProgress = gameStore((state) => state.setPuzzleProgress);
  const puzzle = gameStore((state) => state.puzzle);

  useEffect(() => {
    // If the timer is reset, reset the puzzle progress
    if (timerStatus.reset) {
      setPuzzleProgress(puzzleHelpers.resetPuzzleProgress(puzzle.solution));
      let currentTimerStatus = { ...timerStatus };
      currentTimerStatus.reset = false;
      setTimerStatus(currentTimerStatus);
    }
  }, [timerStatus]);

  const handleMouseUp = (e) => {
    e.preventDefault();

    // Do not allow changes to the board if the timer is stopped, expired, or the puzzle has been completed
    if (
      !isFinished &&
      !(timerStatus.stopped || timerStatus.expired) &&
      cursorPosition !== undefined
    ) {
      setPuzzleProgress(
        puzzleChange(puzzleProgress, mouseDownInfo, cursorPosition)
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
    if (rowIndex !== undefined) {
      setCursorPosition({
        columnIndex: columnIndex,
        rowIndex: rowIndex,
      });
    } else {
      setCursorPosition(undefined);
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
    if (isFinished) return;
    let element = document.getElementById("guideNumbersWidth");

    return {
      marginRight: element ? element.offsetWidth : "0px",
    };
  };

  return (
    <div
      className="table-container"
      onMouseLeave={(e) => handleCursorMove(e)}
      onMouseUp={(e) => {
        handleMouseUp(e);
      }}
    >
      {isFinished ? (
        <h1 className="text-center font-medium text-3xl my-6 text-gray-300 ">
          {puzzleTitle}
        </h1>
      ) : (
        <></>
      )}

      <table style={customMargin()}>
        <thead>
          <tr>
            <th id="guideNumbersWidth"></th>

            {/* Create a header row for each column that will contain the guide numbers*/}
            {isFinished ? (
              <></>
            ) : (
              puzzleProgress[0].map((_, columnIndex) => {
                return (
                  <React.Fragment key={columnIndex}>
                    <GuideNumbers columnIndex={columnIndex} rowIndex={-1} />
                  </React.Fragment>
                );
              })
            )}
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
                      {columnIndex || isFinished ? (
                        <></>
                      ) : (
                        <GuideNumbers
                          columnIndex={-1}
                          rowIndex={rowIndex}
                          handleCursorMove={handleCursorMove}
                        />
                      )}
                      <Tile
                        key={`tile ${rowIndex} ${columnIndex}`}
                        rowIndex={rowIndex}
                        columnIndex={columnIndex}
                        handleCursorMove={handleCursorMove}
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
    </div>
  );
};

export default Board;
