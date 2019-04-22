import React, { Component } from 'react'
import Snake from './Snake'
import Food from './Food'
import SnakeGameOver from './SnakeGameOver'
import SnakeModal from './SnakeModal'
import Instructions from './Instructions'
import spellingList from './spellingList'
import "../../resources/operationCSS/SnakeGame.css"
import M from "materialize-css";
import store from "../../../store"
import {Row,Col} from 'materialize-css'

const getRandomCoordinates = () => {
  let min = 1
  let max = 98
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2
  return [x,y]
}

const getDate = () => {
  let currDateTemp = new Date()
  let currDate = currDateTemp.getFullYear() + '-' + (currDateTemp.getMonth()+1) + '-' + currDateTemp.getDate() +' '+ currDateTemp.getHours()+':'+ currDateTemp.getMinutes()+':'+ currDateTemp.getSeconds();

  return currDate
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 170,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ],
  foodCount: 0,
  correct:0,
  finished:false,
  questionTime:false,
  isSnakeModalOpen:false,
  currentq:{},
  currentAns:"",
  canSubmit:false,
  correct:0,
  incorrect:0,
  Score:0,
  isScoreHidden:true,
  maxQ:10,
  questionCount:0,
  questions:spellingList,
  date: getDate(),
  Subject: 'English',
  title: 'Snake Game',
  curriculumPoint: '1.3 Spelling',
  id:'',
  startSnakeGame:false,
  dummyState:true
}

class SnakeContainer extends Component {
  constructor(){
    super()
    this.state = initialState
    store.subscribe(() => { 
      const { account } = store.getState();
        if(account){
          this.setState({
              id: account.acc.user.uid,
           })
        }
      })
    this.markQuestion = this.markQuestion.bind(this)
    this.closeSnakeModal = this.closeSnakeModal.bind(this)
    this.openSnakeModal = this.openSnakeModal.bind(this)
    this.setQuestion = this.setQuestion.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.sendData = this.sendData.bind(this)
    this.revealScore = this.revealScore.bind(this)
    this.startSnakeGame = this.startSnakeGame.bind(this)
    this.startMovement = this.startMovement.bind(this)
    this.updateScore = this.updateScore.bind(this)
  }

  closeSnakeModal(){
    this.markQuestion()
    setTimeout(this.setState({
      currentq: {},
      canSubmit:false,
      isSnakeModalOpen: false,
      questionTime: false
    }),5000)
    if(this.state.questionCount === 15){
      this.setState({finished:true})
    }
    console.log(this.state.Score)
  }

  openSnakeModal(){
    this.setState({
      isSnakeModalOpen: true
    })
  }

  setQuestion(){
    let randomIndex = Math.floor(Math.random() * Math.floor(this.state.questions.length))
    let qChoice = this.state.questions[randomIndex]
    return qChoice
  }

startMovement(){
  setInterval(this.moveSnake, this.state.speed)
  document.onkeydown = this.onKeyDown
}
componentDidMount(){
  M.AutoInit();
}


  componentDidUpdate(prevProps, prevState) {
    if(!this.state.finished || !this.state.questionTime && this.state.startSnakeGame){
    this.checkIfOutOfBorders()
    this.checkIfCollapsed()
    this.checkIfEat()
    if(this.state.questionCount !== prevState.questionCount)
    this.updateScore()
  }
  }

  updateScore(){
    this.setState({
      Score: Math.ceil((this.state.correct/this.state.questionCount)*100)
    })
  }

  shouldComponentUpdate(){
    if(this.state.finished){
      return false
    }
    else{
      return true
    }
  }

  onKeyDown = (e) => {
    e = e || window.event
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'})
        break
      case 40:
        this.setState({direction: 'DOWN'})
        break
      case 37:
        this.setState({direction: 'LEFT'})
        break
      case 39:
        this.setState({direction: 'RIGHT'})
        break
    }
  }

  moveSnake = () => {
    if(!this.state.questionTime){
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        break
      case 'LEFT':
        head = [head[0] - 2, head[1]]
        break
      case 'DOWN':
        head = [head[0], head[1] + 2]
        break
      case 'UP':
        head = [head[0], head[1] - 2]
        break
    }
    dots.push(head);
    dots.shift()
    this.setState({
      snakeDots: dots
    })
  }
  }

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver()
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots]
    let head = snake[snake.length - 1]
    snake.pop()
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver()
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    let food = this.state.food
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState(prevState => ({
        food: getRandomCoordinates(),
        foodCount:this.state.foodCount + 1
      }))
      if(this.state.foodCount%3 === 0 && this.state.foodCount !== 0 && this.state.questionCount !== 15){
        this.setState(prevState =>({
          currentq:Object.assign({}, this.setQuestion()),
          questionTime:true,
          isSnakeModalOpen:true,
        }))
      }
      this.enlargeSnake()
      this.increaseSpeed()
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots]
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  markQuestion(){
    if(parseInt(this.state.currentAns,10) === this.state.currentq.answer){
      this.setState(prevState =>({
        correct:this.state.correct+1,
        questionCount:this.state.questionCount+1
      }))
    }
    else{
      this.setState(prevState => ({
        incorrect:this.state.incorrect+1,
        questionCount:this.state.questionCount+1
      }))
    }
  }

  handleChange(e){
    let ans = e.target.value
    console.log(e)
    console.log('ans: '+ ans)
    this.setState({
      currentAns:ans,
      canSubmit:true
    })
  }

  revealScore(){
    this.setState({
      isScoreHidden:false
    })
  }

  onGameOver() {
    if(!this.state.finished){
      alert(`Game Over. Snake length is ${this.state.snakeDots.length}`)
      this.setState({
        finished:true
      })}
  }

  startSnakeGame(){
    this.setState({
      startSnakeGame:true,
    })
      this.startMovement()
  }

  sendData(){
    window.location.href ='./dashboard'
  }

  render() {
    if(this.state.finished){
      return(
      <SnakeGameOver
        data = {this.state}
        sendData = {this.sendData}
        revealScore = {this.revealScore}
      />
    )
    }
    else{
      return (
        <div className='row snakeGamePage'>
        <div s={6} className='col s6 snakeInstructions'>
        <Instructions
          data={this.state}
        />
        <button className='snakeModalButton' onClick={this.startSnakeGame}>START!
        </button>
        </div>
        <div className='col s6'>
        <div className='game-container'>
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots}/>
          <Food dot={this.state.food}/>
        </div>
        <SnakeModal
        handleChange = {this.handleChange}
        choices = {this.state.currentq.choices}
        canSubmit = {this.state.canSubmit}
        isSnakeModalOpen = {this.state.isSnakeModalOpen}
        closeSnakeModal = {this.closeSnakeModal}>
        </SnakeModal>
        </div>
        </div>
        </div>
      )
  }
  }
}

export default SnakeContainer


// import React, { Component } from 'react'
// import Snake from './Snake'
// import Food from './Food'
// import SnakeGameOver from './SnakeGameOver'
// import SnakeModal from './SnakeModal'
// import spellingList from './spellingList'
// import "../../resources/operationCSS/SnakeGame.css"
// import store from "../../../store"

// const getRandomCoordinates = () => {
//   let min = 1
//   let max = 98
//   let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2
//   let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2
//   return [x,y]
// }

// const getDate = () => {
//   let currDateTemp = new Date()
//   let currDate = currDateTemp.getFullYear() + '-' + (currDateTemp.getMonth()+1) + '-' + currDateTemp.getDate() +' '+ currDateTemp.getHours()+':'+ currDateTemp.getMinutes()+':'+ currDateTemp.getSeconds();

//   return currDate
// }

// const initialState = {
//   food: getRandomCoordinates(),
//   speed: 170,
//   direction: 'RIGHT',
//   snakeDots: [
//     [0,0],
//     [2,0]
//   ],
//   foodCount: 0,
//   correct:0,
//   finished:false,
//   questionTime:false,
//   isSnakeModalOpen:false,
//   currentq:{},
//   currentAns:"",
//   canSubmit:false,
//   correct:0,
//   incorrect:0,
//   Score:0,
//   isScoreHidden:true,
//   maxQ:10,
//   questionCount:0,
//   questions:spellingList,
//   date: getDate(),
//   Subject: 'English',
//   title: 'Snake Game',
//   curriculumPoint: '2.3 Spelling',
//   id:''
// }

// class SnakeContainer extends Component {
//   constructor(){
//     super()
//     this.state = initialState
//     store.subscribe(() => { 
//       const { account } = store.getState();
//       //console.log("Quiz containter, store update")
//       if(account){
//           this.setState({
//             id: account.acc.user.uid,
//           })
//         }
//     })
//     this.markQuestion = this.markQuestion.bind(this)
//     this.closeSnakeModal = this.closeSnakeModal.bind(this)
//     this.openSnakeModal = this.openSnakeModal.bind(this)
//     this.setQuestion = this.setQuestion.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//     this.sendData = this.sendData.bind(this)
//     this.revealScore = this.revealScore.bind(this)
//   }

//   closeSnakeModal(){
//     this.markQuestion()
//     setTimeout(this.setState({
//       currentq: {},
//       canSubmit:false,
//       isSnakeModalOpen: false,
//       questionTime: false
//     }),5000)
//     if(this.state.questionCount === 15){
//       this.setState({finished:true})
//     }
//   }

//   openSnakeModal(){
//     this.setState({
//       isSnakeModalOpen: true
//     })
//   }

//   setQuestion(){
//     let randomIndex = Math.floor(Math.random() * Math.floor(this.state.questions.length))
//     let qChoice = this.state.questions[randomIndex]
//     return qChoice
//   }

//   componentDidMount() {
//       setInterval(this.moveSnake, this.state.speed)
//       document.onkeydown = this.onKeyDown
//   }

//   componentDidUpdate() {
//     if(!this.state.finished || !this.state.questionTime){
//     this.checkIfOutOfBorders()
//     this.checkIfCollapsed()
//     this.checkIfEat()
//   }
//   }

//   shouldComponentUpdate(){
//     if(!this.state.isScoreHidden){
//       return false
//     }
//     else{
//       return true
//     }
//   }

//   onKeyDown = (e) => {
//     e = e || window.event
//     switch (e.keyCode) {
//       case 38:
//         this.setState({direction: 'UP'})
//         break
//       case 40:
//         this.setState({direction: 'DOWN'})
//         break
//       case 37:
//         this.setState({direction: 'LEFT'})
//         break
//       case 39:
//         this.setState({direction: 'RIGHT'})
//         break
//     }
//   }

//   moveSnake = () => {
//     if(!this.state.questionTime){
//     let dots = [...this.state.snakeDots];
//     let head = dots[dots.length - 1];

//     switch (this.state.direction) {
//       case 'RIGHT':
//         head = [head[0] + 2, head[1]]
//         break
//       case 'LEFT':
//         head = [head[0] - 2, head[1]]
//         break
//       case 'DOWN':
//         head = [head[0], head[1] + 2]
//         break
//       case 'UP':
//         head = [head[0], head[1] - 2]
//         break
//     }
//     dots.push(head);
//     dots.shift()
//     this.setState({
//       snakeDots: dots
//     })
//   }
//   }

//   checkIfOutOfBorders() {
//     let head = this.state.snakeDots[this.state.snakeDots.length - 1]
//     if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
//       this.onGameOver()
//     }
//   }

//   checkIfCollapsed() {
//     let snake = [...this.state.snakeDots]
//     let head = snake[snake.length - 1]
//     snake.pop()
//     snake.forEach(dot => {
//       if (head[0] === dot[0] && head[1] === dot[1]) {
//         this.onGameOver()
//       }
//     })
//   }

//   checkIfEat() {
//     let head = this.state.snakeDots[this.state.snakeDots.length - 1]
//     let food = this.state.food
//     if (head[0] === food[0] && head[1] === food[1]) {
//       this.setState(prevState => ({
//         food: getRandomCoordinates(),
//         foodCount:this.state.foodCount + 1
//       }))
//       if(this.state.foodCount%3 === 0 && this.state.foodCount !== 0 && this.state.questionCount !== 15){
//         this.setState(prevState =>({
//           currentq:Object.assign({}, this.setQuestion()),
//           questionTime:true,
//           isSnakeModalOpen:true,
//           questionCount:this.state.questionCount+1
//         }))
//       }
//       this.enlargeSnake()
//       this.increaseSpeed()
//     }
//   }

//   enlargeSnake() {
//     let newSnake = [...this.state.snakeDots]
//     newSnake.unshift([])
//     this.setState({
//       snakeDots: newSnake
//     })
//   }

//   increaseSpeed() {
//     if (this.state.speed > 10) {
//       this.setState({
//         speed: this.state.speed - 10
//       })
//     }
//   }

//   markQuestion(){
//     if(parseInt(this.state.currentAns,10) === this.state.currentq.answer){
//       this.setState(prevState =>({
//         correct:this.state.correct+1
//       }))
//     }
//     else{
//       this.setState(prevState => ({
//         incorrect:this.state.incorrect+1
//       }))
//     }
//   }

//   handleChange(e){
//     let ans = e.target.value
//     console.log(e)
//     console.log('ans: '+ ans)
//     this.setState({
//       currentAns:ans,
//       canSubmit:true
//     })
//   }

//   revealScore(){
//     this.setState({
//       isScoreHidden:false
//     })
//   }

//   onGameOver() {
//     if(!this.state.finished){
//       let score = (this.state.correct/this.state.maxQ)*100
//       alert(`Game Over. Snake length is ${this.state.snakeDots.length}`)
//       this.setState({
//         finished:true,
//         Score:score
//       })}
//   }

//   sendData(){
//     window.location.href ='./dashboard'
//   }

//   render() {
//     if(this.state.finished){
//       return(
//       <SnakeGameOver
//         data = {this.state}
//         sendData = {this.sendData}
//         revealScore = {this.revealScore}
//       />
//     )
//     }
//     else{
//     return (
//       <div className='game-container'>
//       <h5>Food Count: {this.state.foodCount}</h5>
//       <br />
//       <h5>Spell Count: {this.state.correct}</h5>
//       <div className="game-area">
//         <Snake snakeDots={this.state.snakeDots}/>
//         <Food dot={this.state.food}/>
//       </div>
//       <SnakeModal
//       handleChange = {this.handleChange}
//       choices = {this.state.currentq.choices}
//       canSubmit = {this.state.canSubmit}
//       isSnakeModalOpen = {this.state.isSnakeModalOpen}
//       closeSnakeModal = {this.closeSnakeModal}>
//       </SnakeModal>
//       </div>
//     )
//   }
//   }
// }

// export default SnakeContainer
