import React, { useState, useEffect } from "react"
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import * as puzzleHelpers from "../helpers/puzzleHelpers"
import PuzzleSelection from "@/components/PuzzleSelection"
import Board from "@/components/Board"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {faPause} from "@fortawesome/free-solid-svg-icons";
import { togglePlayPause } from "@/helpers/timerHelpers";

const index = () => {
  const [puzzle, setPuzzle] = useState()
  const [puzzleProgress, setPuzzleProgress] = useState([])
  const [timerIcon, setTimerIcon] = useState(faPlay)
  const [timerIsActive, setTimerIsActive] = useState(false)

  useEffect(() => {
    if (puzzle && puzzleProgress) {
      if (puzzleHelpers.checkFinished(puzzle.solution, puzzleProgress)) {
        console.log("Puzzle Finished! 🎉")
        alert("Puzzle Finished! 🎉")
      }
    }
  }, [puzzleProgress])

  return (
    <>
      <div className="timer-wrapper">
        <Timer className="timer" active={timerIsActive} duration={null}>
          <Timecode />
        </Timer>
        <button onClick={e => togglePlayPause(timerIcon, setTimerIcon, setTimerIsActive)} type="button" className="timer-button"><FontAwesomeIcon icon={timerIcon} /></button>
      </div>
      {puzzle && puzzleProgress ? <Board puzzleProgress={puzzleProgress} setPuzzleProgress={setPuzzleProgress} puzzleSolution={puzzle.solution} /> : <></>}
      <br />
      <PuzzleSelection setPuzzleProgress={setPuzzleProgress} setPuzzle={setPuzzle} />
    </>
  )
}

export default index