import React from "react"

import AnswerChoice from "./AnswerChoice.js"

function AnswerList(props){
  // console.log(props.choices)
  const answers = []
  //console.log(props.id === props.current)
  let breakcondition = false
  if(props.id === props.current && !breakcondition){
    answers.push(<AnswerChoice
      key = {props.id}
      list = {props.choices.choices}
      handleChange = {props.handleChange}
    />)
    breakcondition = true
  }
  //console.log("Answer List" + answers)
  return(
    <div className="answer-list">
      {answers}
    </div>
  )
}

export default AnswerList
