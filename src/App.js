import React, { Component } from 'react';
//import './components/resources/css/index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Base from './components/Base';
import English from "./components/Subject/English";
import Maths from "./components/Subject/Maths";
import Error from "./components/Error"; 
import ChildDash from "./components/Dashboards/ChildDashboard";
import AdultDashboard from './components/Dashboards/AdultDashboard';
//import mixandmath from './components/Games/mixandmath/mixandmath'
import Quiz from './components/Games/smallestSwan/QuizContainer'
import store from './store'
import math2D from './components/Games/mathsPlatformer/math2D'
import operation from './components/Games/operations/OperandContainer'
import cardmatch from './components/Games/cardmatch/GameContainer'
import operationEnglish from './components/Games/canyoupunctuate/OperandContainer'
import snakeGame from './components/Games/snakeGame/SnakeContainer'
import adventureGame from './components/Games/adventure/adventureGame'
import AllGames from './components/AllGames';

class App extends Component {
//how many times is this refreshed and when it does, is the constructor refreshed too
//whenever i sign out, this page is refreshed fully so contructor is called again

//might need to place get store before this.state. check other componenent that use
    constructor(props){
        super(props)
        
        this.state = {
            id: null,
            type: null
        }

        store.subscribe(() => { //previously in const unsubsribe
            const { account } = store.getState();
            //console.log("State: "+ JSON.stringify(store.getState()))
            //console.log("App.js user: "+JSON.stringify(account))
            if(account){
                this.setState({
                    id: account.acc.user.uid,
                    type: account.acc.type
                })
            }
            else{ //not always doin
                if(window.location.pathname !== "/"){
                    window.location.href = "/"
                }
            }  
        })
    }

    render() {
        var toDisplay
        if(this.state.type !== null ){
            toDisplay = this.state.type === "child" ? ChildDash : AdultDashboard
        }

        return (
            //since app renders once, the constructor is called again
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Base} />  
                    <Route path="/english" component={English} />
                    <Route path="/maths" component={Maths} />
                    <Route path="/dashboard" component={toDisplay} />
                    {/* {this.state.type == "parent"  ? <Route path="/adultdash" component={AdultDashboard}/> : <Route path="/childdash" component={ChildDash}/>} */}
                    
                    <Route path="/operations" component={operation}/>
                    <Route path="/cardmatch" component={cardmatch}/>
                    <Route path="/adventure" component={math2D}/>
                    <Route path="/smallestSwan" component={Quiz}/>
                    
                    <Route path="/canyoupunctuate" component={operationEnglish}/>
                    <Route path="/snake" component={snakeGame}/>
                    <Route path="/adventure" component={adventureGame}/>

                    
                    <Route path="/allgames" component={AllGames} />
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>

        );
    }
}
export default App;  

//we can check if someone is signed in, then their account type. Then route them to correct page 

// console.log("console log from App.js "+getUser)
        
        // getUser
        // .then(((user) => {
        //     this.setState({id: user.uid})
        //     //console.log(this.state.id)
        //     firebase.firestore().collection("Users").doc(this.state.id).get()
        //     .then(function(doc){
        //         if(doc.exists){
        //             this.setState({
        //                 type: doc.data().Type
        //             })
        //         }
        //         else{
        //             console.log(this.state.id)
        //             console.log("App.js: document does not exist")
        //         }
        //     }.bind(this))
        // }).bind(this))
        // .catch(error => {
        //     //one you sign out and log in again then auth state is null
        //     if(window.location.pathname !== "/"){
        //         window.location.href = "/"
        //     }
        // })