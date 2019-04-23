import React from "react"

function OperandSwans(props){
  let swan1 = ""
  let swan2 = ""
  let id1 = ""
  let id2 = ""
  // console.log("Topic " + props.data.topic)
  if(props.data.topic === 1){
    swan1 = "./operationGame/Signs/plus.png"
    id1 = "+"
    swan2 = "./operationGame/Signs/minus.png"
    id2 = "-"
  }
  if(props.data.topic === 2){
    swan1 = "./operationGame/Signs/multiply.png"
    id1 = "*"
    swan2 = "./operationGame/Signs/divide.png"
    id2 = "/"
  }
  const styles = {
    width:200,
    height:200
  }
  return(
    <div>
      <button className="swanBtn" onClick={props.handleInput} disabled={props.data.isButtonDisabled}>
        <img src={swan1} alt="" id={id1} style={styles}/>
      </button>
      <button className="swanBtn" onClick={props.handleInput} disabled={props.data.isButtonDisabled}>
        <img src={swan2} alt="" id={id2} style={styles}/>
      </button>
    </div>
  )
}

export default OperandSwans
