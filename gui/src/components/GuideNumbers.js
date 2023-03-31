import React from "react"
import * as R from 'ramda'

const GuideNumbers = ({ columnIndex, rowIndex, puzzleSolution }) => {

  // Create guide numbers for each column
  if (rowIndex < 0) {
    let guideNumbers = []
    let counter = 0
    for (let i = 0; i < puzzleSolution[0].length; i++) {
      if (puzzleSolution[i][columnIndex] === 1) {
        counter += 1
      }
      else if (puzzleSolution[i][columnIndex] === 0) {
        if (counter > 0) {
          guideNumbers.push(
            <React.Fragment key={`${columnIndex} ${i}`}>
              {counter} <br></br>
            </React.Fragment>
          )
          counter = 0
        }
      }
    }
    if (counter > 0) {
      guideNumbers.push(
        <React.Fragment key={`${columnIndex}`}>
          {counter}
        </React.Fragment>
      )
    }
    return (
      <td className="text-center" key={columnIndex}>{R.equals(guideNumbers, []) ? 0 : guideNumbers}</td>
    )
  }

  // Create guide numbers for each row
  if (columnIndex < 0) {
    let guideNumbers = []
    let counter = 0
    for (let i = 0; i < puzzleSolution[0].length; i++) {
      if (puzzleSolution[rowIndex][i] === 1) {
        counter += 1
      }
      else if (puzzleSolution[rowIndex][i] === 0) {
        if (counter > 0) {
          guideNumbers.push(
            <React.Fragment key={`${rowIndex} ${i}`}>
              {counter} &nbsp;
            </React.Fragment>
          )
          counter = 0
        }
      }
    }
    if (counter > 0) {
      guideNumbers.push(
        <React.Fragment key={`${rowIndex}`}>
          {counter}
        </React.Fragment>
      )
    }
    return (
      <td className="text-center" key={rowIndex}>{R.equals(guideNumbers, []) ? 0 : guideNumbers}</td>
    )
  }
}

export default GuideNumbers