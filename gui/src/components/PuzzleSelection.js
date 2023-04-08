import { resetPuzzleProgress } from "@/helpers/puzzleHelpers";
import puzzleList from "@/content/puzzles";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import * as timerHelpers from "../helpers/timerHelpers";

const PuzzleSelection = ({
  setPuzzleProgress,
  setPuzzle,
  setTimerStatus,
  setIsFinished,
}) => {
  const PuzzleSelectTile = ({ puzzle }) => {
    return (
      <div
        onContextMenu={(e) => e.preventDefault()}
        onClick={(e) => handlePuzzleSelection(e)}
        id={puzzle.id}
        className="inline-block max-w-sm p-4 mx-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
      >
        <p>Title: {puzzle.title}</p>
        <p>
          Size: {puzzle.size}x{puzzle.size}
        </p>
        {puzzle.timeLimit != undefined ? (
          <p>
            Time Limit: {puzzle.timeLimit}{" "}
            {puzzle.timeLimit === 1 ? "minute" : "minutes"}
          </p>
        ) : (
          <p>Time Limit: N/A</p>
        )}
      </div>
    );
  };

  const handlePuzzleSelection = (e) => {
    let newPuzzle = puzzleList.find((puzz) => {
      return puzz.id == e.currentTarget.getAttribute("id");
    });
    setPuzzleProgress(resetPuzzleProgress(newPuzzle.solution));
    setIsFinished(false);
    setPuzzle(newPuzzle);
    setTimerStatus(timerHelpers.reset);
  };

  return (
    <>
      {puzzleList.map((puzzleItem) => {
        return <PuzzleSelectTile key={puzzleItem.id} puzzle={puzzleItem} />;
      })}
    </>
  );
};

export default PuzzleSelection;
