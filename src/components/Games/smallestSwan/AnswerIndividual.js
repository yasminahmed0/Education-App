import React from "react"

function AnswerIndividual(props){
  //console.log("Answer Individual" + props)
  //console.log(props.id)
  // <img src={require(props.item)} alt={props.id} onClick={props.handleChange}/>

  //console.log(props.item)
  return(
    <div >
      <button id={props.id} onClick={props.handleChange}>
        <img src={props.item} alt={props.item}/>
    </button>  </div>
  )
}

export default AnswerIndividual