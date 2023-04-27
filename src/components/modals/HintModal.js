import { start, stop } from "@/helpers/timerHelpers";
import gameStore from "@/states/store";
import { useState } from "react";

const HintModal = ({ puzzleHint }) => {
  const [showHintModal, setShowHintModal] = useState(false);
  const setRunning = gameStore((state) => state.setRunning);

  const handleShowHintModal = (e) => {
    e.preventDefault();
    setShowHintModal(true);
    setRunning(false);
  };

  const handleCloseHintModal = (e) => {
    e.preventDefault();
    setShowHintModal(false);
    setRunning(true);
  };

  return (
    <>
      {showHintModal && (
        <>
          <div className="justify-center bg-gray-500/25 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="hint-modal border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex text-gray-300 items-start justify-between p-3 border-b border-solid border-slate-500 rounded-t">
                  <h3 className="text-3xl font-semibold">Hint</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-300 opacity-25 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={(e) => handleCloseHintModal(e)}
                  >
                    <span className="bg-transparent text-white h-6 w-6 text-2xl block">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-gray-300 text-lg leading-relaxed">
                    {puzzleHint}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-slate-500 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-3 py-2 text-sm focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => handleCloseHintModal(e)}
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
      <button className="btn btn-blue" onClick={(e) => handleShowHintModal(e)}>
        Hint
      </button>
    </>
  );
};

export default HintModal;
