import React from "react"
import firebase from '../../../firebase'

function GameEnd(props){
  let total = props.data.incorrect+props.data.correct
  let per = Math.round((props.data.correct/total)*100)
  let ref = firebase.firestore().collection("Children").doc(props.data.id)
  ref.get()
  .then(doc => {
    if(doc.exists){
      ref.collection("Plays").add({
        Subject: props.data.Subject,
        title: props.data.title,
        ncp: props.data.curriculumPoint, 
        date: props.data.date,
        score: per
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
  console.log(props.data.id)
  return(
    <div>
      <h3>Finished</h3>
      <button name="Finished" onClick={props.handleChange} >DONE!
      </button>
    </div>
  )
}

export default GameEnd
