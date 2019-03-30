import React, { Component } from "react"
import store from "../../../store"
import questionData from "./questionData"
import QuizComponent2 from "./QuizComponent2"
import GameEnd from "./GameEnd"

class Quiz extends Component{
  
  constructor() {
    super()
    
    
    let currDateTemp = new Date()
    let currDate = currDateTemp.getFullYear() + '-' + (currDateTemp.getMonth()+1) + '-' + currDateTemp.getDate() +' '+ currDateTemp.getHours()+':'+ currDateTemp.getMinutes()+':'+ currDateTemp.getSeconds();
    
    this.state = {
      id: null,
      correct : 0,
      incorrect : 0,
      currentq : 0,
      score: 88,
      questions : questionData,
      finished: false,
      Subject:"Maths",
      title:"Smallest Swan",
      curriculumPoint: "Placeholder 1.2",
      date:currDate
    }

    //let { account } = store.getState()
    //console.log("account "+account)
    store.subscribe(() => { 
      const { account } = store.getState();
      console.log("Quiz containter, store update")
      if(account){
          this.setState({
            id: account.acc.user.uid,
          })
        }
    })
    this.handleChange = this.handleChange.bind(this)
    //console.log("Date: "+this.state.date)
    console.log(this.state.id)
  }

  handleChange(e){
    const {name} = e.target
    if(name === "Finished"){
      window.location.href = "/dashboard"
    }
    else{
     //console.log("reached1")
      //console.log(e.target.id)
      //console.log(this.state.questions[this.state.currentq].answer)
      // const {id} = event.target
      // console.log(value)
      const ans = parseInt(e.target.id,10)
      if(ans === this.state.questions[this.state.currentq].answer){
        this.setState(prevState => ({
          correct: this.state.correct + 1}))
          console.log("correct worked")
        }
        else{
          this.setState(prevState => ({
            incorrect: this.state.incorrect + 1}))
            console.log("incorrect worked")
          }


          if(this.state.currentq === this.state.questions.length - 1){
            this.setState({
              // currentq:0,
              // correct:0,
              // incorrect:0,
              finished:true
            })
          }
          else{
            this.setState(prevState => ({
              currentq: this.state.currentq + 1}))
              console.log("change worked")
            }
          }

        }

        render(){
          console.log(this.state)
          if(this.state.finished){
            return(

              <GameEnd
              handleChange = {this.handleChange}
              data = {this.state}
              />
            )
          }
          else{
            return(
              <QuizComponent2
              handleChange = {this.handleChange}
              data = {this.state}
              />
            )
          }
        }
      }

      export default Quiz
