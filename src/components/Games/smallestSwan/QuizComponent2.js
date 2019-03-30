import React from "react"

import AnswerList from "./AnswerList"

function QuizComponent2(props){
  console.log(props)
  //console.log("Current q" + props.data.currentq)
  //console.log(props.data.questions[props.data.currentq])
  const choicelistTemp = props.data.questions[props.data.currentq]
  const choiceList = <AnswerList
      key={choicelistTemp.id}
      id = {choicelistTemp.id}
      choices = {props.data.questions[props.data.currentq]}
      current = {props.data.currentq}
      handleChange = {props.handleChange}
    />
  //console.log(choiceList)
  // const answerL = choiceList[props.currentq]
  return(
    <div>
      <h2>Total Correct: {props.data.correct}</h2>
      <h2>Total Incorrect: {props.data.incorrect}</h2>
      <h2>Choose the smallest:</h2>
      {choiceList}
    </div>
  )
}
export default QuizComponent2
