import React from 'react'
import firebase from '../../../firebase'

function SnakeGameOver(props){
  // <h4>Score: {props.data.Score}%</h4>
  console.log('reached 1')
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
    <div>
      <h3>Game Over</h3>
      <button className='snakeModalButton' name="Well Done!" onClick={props.sendData} >DONE!
        </button>
    </div>
  )
}
export default SnakeGameOver

// function SnakeGameOver(props){
//   if(props.data.isScoreHidden){
//     return(
//       <div className="">
//         <h3 className="">Finished</h3>
//         <button className="snakeModalButton" name="revealScore" onClick={props.revealScore}>Click here to reveal your score!
//         </button>
//       </div>
//     )
//   }
//   else{
//     let ref = firebase.firestore().collection("Children").doc(props.data.id)
//     ref.get().then(doc => {
//       if(doc.exists){
//       ref.collection("Plays").add({
//         Subject: props.data.Subject,
//         title: props.data.title,
//         ncp: props.data.curriculumPoint, 
//         date: props.data.date,
//         score: props.data.Score
//       })
//       .then(docRef => {
//         console.log("Document written with ID: ", docRef.id);
//       })
//       .catch(error => {
//         console.error("Error adding document: ", error);
//       })
//     }
//     else{
//       console.log("does not exist")
//     }
//   })
//     return(
//       <div className="">
//         <h3 className="">Finished</h3>
//         <button className="snakeModalButton" name="Well Done!" onClick={props.sendData} >DONE!
//         </button>
//         <h5 className="">Final Score: {props.data.Score}%</h5>
//         </div>
//     )
//   }
// }
// export default SnakeGameOver
