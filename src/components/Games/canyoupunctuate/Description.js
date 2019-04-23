import React from "react"

function Description(props){
  console.log("Topic: " +props.topic)
  if(props.topic === 1){
  return(
    <div className="descriptionOperation">
      <h2>Choose the right swan - Should there be a full stop where the question mark is, or not?</h2>
    </div>
  )
}
  if(props.topic === 2){
  return(
    <div className="descriptionOperation">
      <h2>Choose the right swan - Should there be an apostrophe where the question mark is, or not?</h2>
    </div>
  )
}
}
export default Description
