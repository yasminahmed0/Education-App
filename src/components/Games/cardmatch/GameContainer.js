import React, { useState, useEffect } from 'react'
import ChooseLevel from "./ChooseLevel"
import MatchGameEnd from "./MatchGameEnd"
import Board from './board/Board'
import levels from './levels'
import store from '../../../store'
import "../../resources/cardmatchCSS/matchgame.css"
import initializeDeck from './Deck'
import M from "materialize-css";

export default function GameContainer() {
  let currDateTemp = new Date()
  let currDate = currDateTemp.getFullYear() + '-' + (currDateTemp.getMonth()+1) + '-' + currDateTemp.getDate() +' '+ currDateTemp.getHours()+':'+ currDateTemp.getMinutes()+':'+ currDateTemp.getSeconds();
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [dimension, setDimension] = useState(400)
  const [disabled, setDisabled] = useState(false)
  const [questionSet, setQuestionSet] = useState([])
  //const [Score, setScore] = useState(100)
  // const [correct, updateCorrect] = useState(0)
  // const [incorrect, updateIncorrect] = useState(0)
  // const [level, setLevel] = useState("")
  const [isLevelSet, setIstLevelSet] = useState(false)
  const [finished, updateFinished] = useState(false)
  const [subject, setSubject] = useState("Maths")
  const [title, setTitle] = useState("Card Match")
  const [curriculumPoint, setCurriculumPoint] = useState("Fraction")
  const [date, setDate] = useState(currDate)
  const [id, setID] = useState("")

  store.subscribe(() => { 
    const { account } = store.getState();
    //console.log("Quiz containter, store update")
    if(account){
        setID(account.acc.user.uid)
      }
  })

 
    M.AutoInit();
  
 
  useEffect(() => {
    if(isLevelSet){
      resizeBoard()
      // setCards(initializeDeck())
    }
  },)


  useEffect(() => {
    preloadImages()
  },)

  useEffect(() => {
    const resizeListener = window.addEventListener('resize', resizeBoard)

    return () => window.removeEventListener('resize', resizeListener)
  })

 

  

  const preloadImages = () =>
    cards.map((card) => {
      const src = `/matchgame/level1/${card.type}.png`
      new Image().src = src
    })

  const resizeBoard = () => {
    setDimension(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
      ),
    )
  }

  const sameCardClickedTwice = (id) => flipped.includes(id)

  const isAMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id)
    const flippedCard = cards.find((card) => flipped[0] === card.id)
    let card1type = clickedCard.type
    let card2type = flippedCard.type
    if(!card1type.startsWith("n")){
      card1type = "n"+card1type
    }
    else{
      card2type = "n"+card2type
    }
    return card2type === card1type
  }

  const resetCards = () => {
    setFlipped([])
    setDisabled(false)
  }

  const handleClick = (id) => {
    setDisabled(true)
    if (flipped.length === 0) {
      setFlipped((flipped) => [...flipped, id])
      setDisabled(false)
    } else {
      if (sameCardClickedTwice(flipped, id)) return
      setFlipped((flipped) => [...flipped, id])
      if (isAMatch(id)) {
        setSolved([...solved, ...flipped, id])
        console.log("Solved: " + solved)
        console.log(cards.length)
        // updateCorrect(prevCorrect => prevCorrect + 1)
        resetCards()
      } else {
        // updateIncorrect(prevIncorrect => prevIncorrect + 1)
        setTimeout(resetCards, 1000)
      }
      if(solved.length === cards.length - 2){
        setTimeout(updateFinished(true),1000000000)
      }
    }
  }

  const sendData = () => {
    window.location.href = "./dashboard"
  }

  const chooseGameLevel = (e) => {
    console.log(e.target.id)
    const id = e.target.id
    if(id === "1"){
      console.log(levels[0])
      setQuestionSet(levels[0])
      console.log(questionSet)
      const questionSet = levels[0]
      setIstLevelSet(true)
      setCards(initializeDeck(questionSet))
      console.log(cards)
      setCurriculumPoint("2.1 Fractions")
    }
    if(id === "2"){
      // setQuestionSet(levels[1])
      const questionSet = levels[1]
      setIstLevelSet(true)
      setCards(initializeDeck(questionSet))
      setCurriculumPoint("2.2 Fractions")
    }
    if(id === "3"){
      // setQuestionSet(levels[2])
      const questionSet = levels[2]
      setIstLevelSet(true)
      setCards(initializeDeck(questionSet))
      setCurriculumPoint("2.2 Fractions")
    }
  }

  if(!isLevelSet){
    return(
      <ChooseLevel
        chooseGameLevel={chooseGameLevel}
      />
    )
  }
  if(finished){
    return(
      <MatchGameEnd
      date = {date}
      curriculumPoint = {curriculumPoint}
      Subject = {subject}
      title = {title}
      id = {id}
      sendData = {sendData}
      />
    )
  }
  else{
    return (
      <div className="row cardGamePage">
      <div className='col s4 cardInstructions' >
        <br />
        <h2>Match Game</h2>
        <br />
        <p>Can you remember where the cards are?</p>
        <br />
        <p>Match the picture to the fraction!</p>
      </div>
        
        <div className="col s6 boardMatchGame">
        <Board
          cards={cards}
          flipped={flipped}
          solved={solved}
          dimension={dimension}
          handleClick={handleClick}
          disabled={disabled}
        />
        </div>
      </div>
    )
  }
}
