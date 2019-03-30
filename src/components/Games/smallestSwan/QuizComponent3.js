import React from "react"

import AnswerList from "./AnswerList"

function QuizComponent(props){
  const choiceList = props.data.questions.map(
    choices => <AnswerList
      key={choices.id}
      id = {choices.id}
      choices = {choices}
      current = {props.data.currentq}
      handleChange = {props.data.handleChange}
    />)
  //console.log(choiceList)
  // const answerL = choiceList[props.currentq]
  return(
    <div>
      <h2>Total Correct: {props.data.correct}</h2>
      <h2>Total Incorrect: {props.data.incorrect}</h2>
      <h2>Choose the smallest:</h2>
      <form>
      {choiceList}
      </form>
    </div>
  )
}
export default QuizComponent
