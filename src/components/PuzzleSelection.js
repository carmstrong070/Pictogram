import puzzleList from "@/content/puzzles";
import gameStore from "@/states/store";

const PuzzleSelection = () => {
  const handleReset = gameStore((state) => state.handleReset);

  const PuzzleSelectTile = ({ puzzle }) => {
    return (
      <div
        onContextMenu={(e) => e.preventDefault()}
        onClick={(e) => handlePuzzleSelection(e)}
        id={puzzle.id}
        className="basis-1/5 inline-block text-gray-200 max-w-sm p-4 mx-2 bg-gray-700 border border-gray-500 rounded-lg shadow hover:bg-gray-500 cursor-pointer"
      >
        <p>Difficulty: {puzzle.difficulty}</p>
        <p>
          Size: {puzzle.solution[0].length}x{puzzle.solution.length}
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
    handleReset(newPuzzle);
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
