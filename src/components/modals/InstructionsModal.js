import { start, stop } from "@/helpers/timerHelpers";
import gameStore from "@/states/store";
import { useState } from "react";

const InstructionsModal = () => {
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const setTimerStatus = gameStore((state) => state.setTimerStatus);
  const setRunning = gameStore((state) => state.setRunning);

  const handleShowInstructionsModal = (e) => {
    e.preventDefault();
    setShowInstructionsModal(true);
    setTimerStatus(stop());
    setRunning(false);
  };

  const handleCloseInstructionsModal = (e) => {
    e.preventDefault();
    setShowInstructionsModal(false);
    setTimerStatus(start());
    setRunning(true);
  };

  return (
    <>
      {showInstructionsModal && (
        <>
          <div className="justify-center bg-gray-500/25 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto py-6 my-auto mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 text-gray-300 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b border-solid border-slate-500 rounded-t">
                  <h3 className="text-2xl font-semibold">How to play</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-white opacity-25 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={(e) => handleCloseInstructionsModal(e)}
                  >
                    <span className="bg-transparent text-white h-6 w-6 text-2xl block">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-y-auto">
                  <div className="my-4 text-gray-300 text-lg leading-relaxed">
                    <div>
                      <h1>Welcome to Pictogram!</h1>
                      <br />
                      <h2 className="font-bold">Objective:</h2>
                      <p>
                        Fill the tiles on the puzzle grid according to the guide
                        numbers to reveal a hidden picture!
                      </p>
                      <br />
                      <h2 className="font-bold">Nonogram Rules:</h2>
                      <ul>
                        <li>
                          Rows and columns have guide numbers that indicate the
                          consecutive groups of filled tiles in that row or
                          column.
                        </li>
                        <br />
                        <li>
                          Each group of filled tiles must be separated by at
                          least one blank tile.
                        </li>
                        <br />
                        <li>
                          The guide numbers provide hints on how to fill the
                          tiles and reveal the hidden picture.
                        </li>
                        <li>
                          Once the puzzle is completed, the hidden picture will
                          be revealed according to the filled tiles.
                        </li>
                      </ul>
                      <br />
                      <h2 className="font-bold">Gameplay Features & Tips:</h2>
                      <ul>
                        <li>
                          Select Difficulty: Choose between Easy and Hard
                          difficulty levels. In Easy mode, the timer counts up
                          indefinitely until you restart or finish the puzzle.
                          In Hard mode, the timer counts down from a provided
                          time limit, and you must finish within the allotted
                          time.
                        </li>
                        <br />
                        <li>
                          Understand Guide Numbers: Guide numbers are provided
                          on the rows and columns of the puzzle grid. These
                          numbers indicate the consecutive groups of filled
                          tiles in that row or column. For example, a row with
                          the guide numbers "3 1" means there is a group of 3
                          filled tiles followed by at least one blank tile, and
                          then a single filled tile.
                        </li>
                        <br />
                        <li>
                          Fill Tiles: Left-click on a tile to fill it. You can
                          also right-click on a tile to flag it, indicating that
                          it should not be filled. Use the guide numbers as
                          hints to determine which tiles should be filled and
                          which should be flagged.
                        </li>
                      </ul>
                      <br />
                      <p>
                        That's it! Use your logic and deduction skills to reveal
                        the hidden picture by filling the tiles according to the
                        guide numbers. Have fun and enjoy the challenge of
                        solving puzzles in Pictogram! Good luck and have fun!
                      </p>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-slate-500 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-3 py-2 text-sm focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => handleCloseInstructionsModal(e)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      <button
        className="btn btn-blue"
        onClick={(e) => handleShowInstructionsModal(e)}
      >
        Instructions
      </button>
    </>
  );
};

export default InstructionsModal;
