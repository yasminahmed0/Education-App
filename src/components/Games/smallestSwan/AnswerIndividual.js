import React from "react"

function AnswerIndividual(props){
  //console.log("Answer Individual" + props)
  //console.log("Button Id indiv " + props.id)
  // <img src={require(props.item)} alt={props.id} onClick={props.handleChange}/>

  //console.log(props.item)
  return(
    <div >
      <button id={props.id} onClick={props.handleChange}>
        <img src={props.item} alt={props.item} id={props.id}/>
    </button>  </div>
  )
}

export default AnswerIndividual
