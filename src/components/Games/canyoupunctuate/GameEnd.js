import React from "react"
import firebase from '../../../firebase'

function GameEnd(props){
  console.log(props.data.Score)
  console.log(props.data.questionCount)
  console.log(props.data.correct)
  console.log(props.data.curriculumPoint)

  if(props.data.isScoreHidden){
    return(
      <div className="gameStartEnd">
        <h3 className="descriptionOperation">Finished</h3>
        <button className="topicBtn" name="revealScore" onClick={props.scoreButton}>Click here to reveal your score!
        </button>
      </div>
    )
  }
  else{
    let ref = firebase.firestore().collection("Children").doc(props.data.id)
    ref.get().then(doc => {
      if(doc.exists){
      ref.collection("Plays").add({
        Subject: props.data.Subject,
        title: props.data.title,
        ncp: props.data.curriculumPoint, 
        date: props.data.date,
        score: props.data.Score
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      })
    }
    else{
      console.log("does not exist")
    }
  })
    return(
      <div className="gameStartEnd">
        <h3 className="descriptionOperation">Finished</h3>
        <button className="topicBtn" name="Well Done!" onClick={props.sendData} >DONE!
        </button>
        <h5 className="scoreBoardOperation">Final Score: {props.data.Score}%</h5>
        </div>
    )
  }
}

export default GameEnd
