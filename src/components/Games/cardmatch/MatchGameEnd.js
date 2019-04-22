import React from 'react'
import firebase from '../../../firebase'

export default function MatchGameEnd({
  date,
  curriculumPoint,
  Subject,
  title,
  id,
  sendData
}){
  let ref = firebase.firestore().collection("Children").doc(id)
    ref.get().then(doc => {
      if(doc.exists){
      ref.collection("Plays").add({
        Subject: Subject,
        title: title,
        ncp: curriculumPoint, 
        date: date,
        score: 100
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
    <div>
      <h3 className="descriptionOperation">Finished</h3>
      <button className="matchGameButton" name="Well Done!" onClick={sendData} >DONE!
      </button>
      <h5 className="scoreBoardMatchGame">Final Score: 100%</h5>
    </div>
  )
}
