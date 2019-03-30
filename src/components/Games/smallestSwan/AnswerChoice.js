import React from "react"

import AnswerIndividual from "./AnswerIndividual"

function AnswerChoice(props){
  //console.log("Answer Choice" + props.list)
  const buttons = []
  for(let i=0;i<props.list.length;i++){
    buttons.push(
      <AnswerIndividual
      key = {i}
      id = {i}
      item = {props.list[i]}
      handleChange = {props.handleChange}
      />
    )
  }
  //console.log(buttons)
  return(
    <div>
    {buttons}
    </div>
  )
}

export default AnswerChoice
