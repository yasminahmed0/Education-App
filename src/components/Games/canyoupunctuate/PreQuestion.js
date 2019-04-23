import React from "react"

function PreQuestion(props){
  return(
    <div>
    <button className="topicBtn" onClick={props.setQuestions}>Load Question
    </button>
    </div>
  )

}
export default PreQuestion
