import React from "react"

function OperandSwans(props){
  let swan1 = ""
  let swan2 = ""
  let id1 = ""
  let id2 = ""
  // console.log("Topic " + props.data.topic)
  if(props.data.topic === 1){
    swan1 = "./Can_You_Punctuate/Fullstop_game/x.png"
    id1 = "x"
    swan2 = "./Can_You_Punctuate/Fullstop_game/fullstop.png"
    id2 = "."
  }
  if(props.data.topic === 2){
    swan1 = "./Can_You_Punctuate/Apostrophe_game/x.png"
    id1 = "x"
    swan2 = "./Can_You_Punctuate/Apostrophe_game/apostrophe.png"
    id2 = "\'"
  }
  const styles = {
    width:200,
    height:200
  }
  return(
    <div>
      <button className="swanBtn" onClick={props.handleInput} disabled={props.data.isButtonDisabled}>
        <img src={swan1} alt="not punctuation mark" id={id1} style={styles}/>
      </button>
      <button className="swanBtn" onClick={props.handleInput} disabled={props.data.isButtonDisabled}>
        <img src={swan2} alt="punctuation mark" id={id2} style={styles}/>
      </button>
    </div>
  )
}

export default OperandSwans
