import React from "react"

function GameStart(props){
  return(
    <div>
      <h2></h2>
      <h3>Which year are you in?</h3>
      <button onClick={props.checkYear} id="1">Year 1 </button>
      <button onClick={props.checkYear} id="2">Year 2 </button>
      <button onClick={props.checkYear} id="3">Year 3 </button>
    </div>
  )
}
export default GameStart
