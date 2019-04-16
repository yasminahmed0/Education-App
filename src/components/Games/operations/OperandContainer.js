import React, {Component} from "react"
import "../../resources/operationCSS/styleOperation.css"
import GameStart from "./GameStart"
import GameEnd from "./GameEnd"
import ArithmeticComponent from "./ArithmeticComponent"
import additionSet from "./additionSet"
import subtractionSet from "./subtractionSet"
import multiplicationSet from "./multiplicationSet"
import divisionSet from "./divisionSet"
import store from "../../../store"

class OperandContainer extends Component{
  constructor(){
    super()
    let currDateTemp = new Date()
    let currDate = currDateTemp.getFullYear() + '-' + (currDateTemp.getMonth()+1) + '-' + currDateTemp.getDate() +' '+ currDateTemp.getHours()+':'+ currDateTemp.getMinutes()+':'+ currDateTemp.getSeconds();
    this.state = {
      correct : 0,
      incorrect : 0,
      currentq : 0,
      questionCount:0,
      questions1 : 0,
      questions2 : 0,
      questionSet: false,
      isButtonDisabled:true,
      isScoreHidden:true,
      finished : false,
      topic:"",
      Subject: "Maths",
      title: "Operations",
      curriculumPoint : "Addition and Subtraction, Multiplication and Division",
      date : currDate,
      score: 0
    }
    store.subscribe(() => { 
      const { account } = store.getState();
      //console.log("Quiz containter, store update")
      if(account){
          this.setState({
            id: account.acc.user.uid,
          })
        }
    })
    this.handleInput = this.handleInput.bind(this)
    this.checkTopic = this.checkTopic.bind(this)
    this.setQuestions = this.setQuestions.bind(this)
    this.scoreButton = this.scoreButton.bind(this)
  }

  scoreButton(e){
    this.setState({
      score:this.state.correct/this.state.questionCount *100,
      isScoreHidden:false
    })
  }

  handleInput(e){
    console.log("handleInput reached")
    if(e.target.id === this.state.currentq.sign){
      console.log("reached")
      this.setState(prevState => ({
        correct: this.state.correct + 1,
        questionSet: false,
        isButtonDisabled:true
      }))
      // console.log("Score c: " + this.state.correct)
    }
    else{
      this.setState(prevState => ({
        incorrect: this.state.incorrect + 1,
        questionSet: false,
        isButtonDisabled:true
      }))
      // console.log("Score in: " + this.state.incorrect)
    }

    if(this.state.questionCount === 10){
      this.setState({
        finished:true
      })
    }
    // console.log(this.state.Score)
  }

  setQuestions(e){
    // console.log(this.state.questions1)
    let smallestSet={}
    if(this.state.questions1.length < this.state.questions2.length){
      smallestSet =  this.state.questions1.length
    }
    else{
      smallestSet =  this.state.questions2.length
    }

    const questionTopic = Math.floor(Math.random() * Math.floor(2))
    const question = Math.floor(Math.random() * Math.floor(smallestSet))
    // console.log("Question length: " + this.state.questions1.length)
    // console.log(questionTopic)
    // console.log(question)
    if(questionTopic === 0){
      const q1 = this.state.questions1[question]
      // console.log(q1)
      this.setState(prevState => ({
        currentq:Object.assign({}, q1),
        questionSet: true,
        isButtonDisabled:false,
        questionCount: this.state.questionCount +1
      }))
      // console.log(this.state.questions1[question])
      // console.log(this.state.currentq)
    }
    else if(questionTopic === 1){
      const q2 = this.state.questions2[question]
      console.log(q2)
      this.setState(prevState =>({
        currentq:Object.assign({},q2),
        questionSet: true,
        isButtonDisabled:false,
        questionCount: this.state.questionCount +1
      }))
      console.log(this.state.currentq)
    }
    else{
      console.log("Fix Math.random")
    }
    // console.log(this.state)
  }

  sendData(e){
    window.location.href = "./dashboard"
  }

  checkTopic(e){
    // console.log(e.target.id)
    if(e.target.id === "1"){
      console.log("reached 1")
      this.setState({
        topic: 1,
        questions1: additionSet,
        questions2: subtractionSet,
      })
    }
    else if(e.target.id === "2"){
      console.log("reached 2")
      this.setState({
        topic: 2,
        questions1: multiplicationSet,
        questions2: divisionSet,
      })
    }
    else{
      console.log("Must Choose Topic")
    }
    console.log(this.state)
    // this.setQuestions()
  }

  render(){
    if(this.state.topic === ""){
      return(
        <GameStart
          checkTopic = {this.checkTopic}
        />
      )
    }
    else if(this.state.finished){
      return(
        <GameEnd
          sendData = {this.sendData}
          data = {this.state}
          scoreButton = {this.scoreButton}
        />
      )
    }
    else{
      return(
        <div>
          <ArithmeticComponent
            handleInput = {this.handleInput}
            setQuestions = {this.setQuestions}
            data = {this.state}
          />
        </div>
      )
    }
  }
}

export default OperandContainer
