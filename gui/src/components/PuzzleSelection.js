import { resetPuzzleProgress } from "@/helpers/puzzleHelpers";
import puzzleList from "@/content/puzzles";

const PuzzleSelection = ({ setPuzzleProgress, setPuzzle }) => {

  const PuzzleSelectTile = ({ puzzle }) => {
    return (<div onContextMenu={e => e.preventDefault()} onClick={e => handlePuzzleSelection(e)} id={puzzle.id} className="puzzle-card">
      <p>Title: {puzzle.title}</p>
      <p>Size: {puzzle.size}x{puzzle.size}</p>
    </div>);
  }

  const handlePuzzleSelection = (e) => {
    let newPuzzle = puzzleList.find((puzz) => {
      return puzz.id == e.currentTarget.getAttribute("id");
    })
    setPuzzleProgress(resetPuzzleProgress);
    setPuzzle(newPuzzle);
  }

  return (
    <>
      {puzzleList.map((puzzleItem) => {
        return (<PuzzleSelectTile key={puzzleItem.id} puzzle={puzzleItem} />);
      })}
    </>
  );
}

export default PuzzleSelection