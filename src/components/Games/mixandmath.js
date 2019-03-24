import React, { Component } from 'react';
import oneof2 from '../resources/css/img/gameImg/mixandmath/1of2.png';
import oneof3 from '../resources/css/img/gameImg/mixandmath/2of3.png';
import oneof4 from '../resources/css/img/gameImg/mixandmath/3of4.png';
import word1of2 from '../resources/css/img/gameImg/mixandmath/word1of2.png';
import word1of3 from '../resources/css/img/gameImg/mixandmath/word2of3.png';
import word1of4 from '../resources/css/img/gameImg/mixandmath/word3of4.png';


import './match.css';
//import firebase from '../../firebase';

class mixandmatch extends Component{ 
    //once a correct match is selected then score is increased via a counter (or how ever)
    //they can press finish game at anytime but if there is no matches,
    //score will be 0 and that will be saved onto database 
    
    constructor(props){
        super(props)
        this.state = {
            name: "Mix and Math",
            score: 0,
            specPoint:"Fractions Y2",
            date:"",
            yearGroup:"Year 2",
            //id: firebase.auth().currentUser.uid
        }
     }
    componentDidMount(){
        const fractions = document.querySelectorAll(".fraction");
        console.log("reached");
        let hasBeenSelected = false;
        let pieSelect, wordSelect;

function highlight(){
  this.classList.add('highlightBorder');

  if(!hasBeenSelected){
    //selectpie
    hasBeenSelected = true;
    pieSelect = this;
    console.log("works");
  }
  else{
    //select word representation
    hasBeenSelected = false;
    wordSelect = this;
    console.log("works2");

    //check pies Match
    if(pieSelect.dataset.framework === wordSelect.dataset.framework){
      //they Match
      pieSelect.removeEventListener('click', highlight);
      wordSelect.removeEventListener('click', highlight);
      console.log("works3");

    }
    else {
      //not a Match
      setTimeout(() => {
        pieSelect.classList.remove('highlightBorder');
        wordSelect.classList.remove('highlightBorder');
      }, 1500);
      console.log("works4");

    }
  }
}
fractions.forEach(fraction => fraction.addEventListener('click', highlight))
console.log("reached2");

    }

    render(){
        return(<div className="gameContainer">
    <div className="game">
    <h2>Match the pie to the right fraction!</h2>
    <p>ID: {this.state.id}</p>
    <div class="question">
          <div class="fraction" data-framework="3of4">
            <img src={oneof4} height="100" width="100" alt=""/>
          <p>&#9711;</p>
          </div>
          <div class="fraction" data-framework="2of3">
            <img src={oneof3} height="100" width="100" alt=""/>
          <p>&#9711;</p>
          </div>
          <div class="fraction" data-framework="1of2">
            <img src={oneof2} height="100" width="100" alt=""/>
            <p>&#9711;</p>
          </div>

    </div>
    <div class="question">

          <div class="fraction" data-framework="2of3">
        <p>&#9711;</p>
        <img src={word1of3} height="100" width="100" alt=""/>
          </div>

          <div class="fraction" data-framework="1of2">
          <p>&#9711;</p>
          <img src={word1of2} height="100" width="100" alt=""/>
          </div>

          <div class="fraction" data-framework="3of4">
          <p>&#9711;</p>
          <img src={word1of4} height="100" width="100" alt=""/>
          </div>

    </div>
    
    <script type="text/javascript" src="./linking.js">
    </script>
  </div>
        </div>)
    }
}

export default mixandmatch;