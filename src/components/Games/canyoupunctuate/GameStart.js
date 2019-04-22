import React from "react"

function GameStart(props){
  console.log(props)
  
  return(
    <div className="gameStartEnd">
      <h3 className="descriptionOperation">Which topic would you like try?</h3>
      <button className="topicBtn" onClick={props.checkTopic} id="1">Full Stops</button>
      <br/><br/>
      <button className="topicBtn" onClick={props.checkTopic} id="2">Apostrophe's </button>
    </div>
  )
}

export default GameStart
