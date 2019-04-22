import React from "react"
import QuestionString from "./QuestionString"

function Question(props){
  // const n1 = props.data.currentq.image1
  // const n1string = n1.split("")
  // const numpath = []
  // for(let i=0;i<n1string.length;i++){
  //   const pathTemp = "./operationGame/Numbers/"+n1string[i]+".png"
  //   numpath.push(
  //     <QuestionString
  //       key = {i}
  //       path = {pathTemp}
  //     />
  //   )
  // }
  //
  // const n2 = props.data.currentq.number2 + ""
  // const n2string = n2.split("")
  // const numpath2 = []
  // for(let j=0;j<n2string.length;j++){
  //   const pathTemp = "./operationGame/Numbers/"+n2string[j]+".png"
  //   numpath2.push(
  //     <QuestionString
  //       key = {j}
  //       path = {pathTemp}
  //     />
  //   )
  // }
  // const ans = props.data.currentq.answer + ""
  // const ansString = ans.split("")
  // const numpath3 = []
  // for(let i=0;i<ansString.length;i++){
  //   const pathTemp = "./operationGame/Numbers/"+ansString[i]+".png"
  //   numpath3.push(
  //     <QuestionString
  //       key = {i}
  //       path = {pathTemp}
  //     />
  //   )
  // }
  // {numpath}
  // {numpath2}
  // <img className="questionImgOperation" src="./operationGame/Numbers/equals.png" alt=""/>
  // {numpath3}
  let folder = ""
  if(props.data.topic === 1){
    folder = "./Can_You_Punctuate/Fullstop_game/"
  }
  if(props.data.topic === 2){
    folder = "./Can_You_Punctuate/Apostrophe_game/"
  }

    const img1path =  folder + props.data.currentq.image1 + ".png"
    const img2path =  folder + props.data.currentq.image2 + ".png"
  // console.log(numpath)
    return(
      <div className="questionOperation">
        <img className="questionImgOperation" src={img1path} alt={props.data.currentq.image1}/>
        <img className="questionImgOperation" src="./Can_You_Punctuate/qmpurple.png" alt="questionmark"/>
        <img className="questionImgOperation" src={img2path} alt={props.data.currentq.image2}/>
      </div>
    )
}

export default Question
