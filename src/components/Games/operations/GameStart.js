import React from "react"

function GameStart(props){
  console.log(props)
  return(
    <div className="gameStartEnd">
      <h3 className="description">Which topic would you like to try?</h3>
      <button className="topicBtn" onClick={props.checkTopic} id="1">Addition & Subtraction</button>
      <br/><br/>
      <button className="topicBtn" onClick={props.checkTopic} id="2">Multiplication & Division </button>
    </div>
  )
}

export default GameStart
