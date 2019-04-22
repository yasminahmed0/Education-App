import React from 'react'

function Instructions(props){
  return(
    <div>
    <br /><br />
    <p>Collect apples to make the snake grow</p>
    <br />
    <p>Watch out though! Don't hit the walls or go back on yourself</p>
    <p>Use the arrow keys to move around</p>
    <br />
      <p>Food Count: {props.data.foodCount}</p>
      <p>Spell Count: {props.data.correct}</p>
    </div>
  )
}
export default Instructions
