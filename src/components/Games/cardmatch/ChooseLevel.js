import React from 'react'

export default function ChooseLevel({
  chooseGameLevel
}){
  return(
    <div>
      <h2>Choose Which level to play!</h2>
      <div>
      <button className="matchGameButton" onClick={chooseGameLevel} id="1">Level 1</button>
      <br />
      <button className="matchGameButton" onClick={chooseGameLevel} id="2">Level 2</button>
      <br />
      <button className="matchGameButton" onClick={chooseGameLevel} id="3">Level 3</button>
      </div>
    </div>
  )
}
