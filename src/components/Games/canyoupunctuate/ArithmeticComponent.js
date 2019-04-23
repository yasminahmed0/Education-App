import React from "react"
import Description from "./Description"
import OperandSwans from "./OperandSwans"
import Question from "./Question"
import PreQuestion from "./PreQuestion"

function ArithmeticComponent(props){
  console.log(props);
  // <Question
  //   data = {props.data}
  //   handleInput = {props.handleInput}
  // />
  if(!props.data.questionSet){
    return(
      <div>
        <Description
        topic = {props.data.topic}
        />
        <OperandSwans
          data = {props.data}
          handleInput = {props.handleInput}
        />
        <PreQuestion
          setQuestions = {props.setQuestions}
        />
        <h5 className="scoreBoardOperation">Score: {props.data.correct}</h5>
      </div>
    )
  }
  else{
    return(
      <div>
        <Description
        topic = {props.data.topic}
        />
        <OperandSwans
          data = {props.data}
          handleInput = {props.handleInput}
        />
        <Question
          data = {props.data}
        />
        <h5 className="scoreBoardOperation">Score: {props.data.correct}</h5>
      </div>
    )
  }

}

export default ArithmeticComponent
