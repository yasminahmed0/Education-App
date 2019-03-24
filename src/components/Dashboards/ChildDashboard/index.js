import React, { Component } from 'react';
import menu from '../../resources/css/img/menu.png';
import logo from '../../resources/css/img/logo.png';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import firebase from '../../../firebase'
import store from '../../../store'
//import { fbApp, auth} from '../../../firebase';
//import * as firebase from 'firebase' //tomorrow try
//{/* https://www.npmjs.com/package/react-progressbar-semicircle */}


class ChildDashboard extends Component{
    constructor(props) {
        super(props);
    
        let { account } = store.getState()
        this.state = { 
            uid: account.acc.user.uid,
            email: account.acc.user.email,
            username: null,
            goal: null,
            age: null,
            currentPassword: "",
            repeatedPassword: "",
            updatedPassword: ""
        }

        console.log("Child Index.js "+account.acc.user.uid+" "+account.acc.user.email)
        store.subscribe(() => {
            const { data } = store.getState();
            console.log("this is data: "+JSON.stringify(data))
            if(data){
                this.setState({
                    username: data.name,
                    age: data.age,
                    goal: data.goal 
                })    
            }   
        })

        this.handleChange = this.handleChange.bind(this)
    }
        
    signOut(){
        firebase.auth().signOut()
        window.location.assign("/")
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }) //check if the same
    }

    changePassword = () => {
        var user = firebase.auth().currentUser 
        var credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.currentPassword)
         
        user.reauthenticateAndRetrieveDataWithCredential(credential).then(function(user) {
            user.updatePassword(this.state.updatedPassword).then(() => {
                alert("Password succesfully changed")
            }).catch((error) => {
                alert("Cannot update :"+error.message)
            })    
        }).catch(function(error) {
            alert(user.uid)
            alert("second catch: "+error.message)
        });
        //second catch: Cannot read property 'state' of undefined
    }

    age(){
        if(this.state.age === 0){
           return "-"                     
        }
        else{
            return this.state.age
        }
    }

    goal(){
        if(this.state.goal === ""){
           return "Add a goal!"                     
        }
        else{
            return this.state.goal
        }
    }

	render(){
        const subjectdash = ['mathsdash' ,'englishdash']; //it is inside the render but outside the return section
        const gamescore=['5','60'];// have all the games theyve played with progress??/ score 
        const highScore=[456,100];
        var totalScore=0;

        return(
            <div>     
	            <header> 
                    <div className="row xx">
                        <div className="col span-1-of-4">
                            <img className="logo" src={logo} alt="Swan academics"></img>
                        </div>
                        <div className="col span-2-of-4 subjectTitle">
                            {this.state.username}'s Dashboard
                        </div>
                        <div><button onClick={this.signOut}>Sign Out </button></div>
                        <div className="col span-1-of-4">
                            <div className="dropdown">
                                <button className="dropbtn"><img alt="sunl" id="sunny" src={menu}></img></button>
                                <div className="dropdown-content">
                                <a href="App.js">Progress Tracker</a>
                                </div>
                            </div>
                        </div>
                    </div>          
                </header>
                
                <main>
                    <div className="dashContainer">
                    <div className="xxx">

                        <div>UID: {this.state.uid}</div>
                        <div>NAME: {this.state.username}</div>
                        <div>EMAIL: {this.state.email}</div>
                        <div>GOAL: {this.goal()}</div>
                        <div>AGE: {this.age()}</div>
                        
                        <div>
                            <form>
                            <input type="password" name="currentPassword" placeholder="current password" onChange={this.handleChange}></input>
                            <input type="password" name="repeatedPassword" placeholder="new password" onChange={this.handleChange}></input>
                            <input type="password" name="updatedPassword"  placeholder="re-enter new password" onChange={this.handleChange}></input>
                            <button onClick={this.changePassword}>Update Password</button>
                            </form>
                        </div>
                    </div>

                    <section className="dashboard-subjects">
                        <div className="row boards">

                            {["Maths Progress","English Progress"].map((item,index) => {  
                                const x = subjectdash[index];
                                const y= highScore[index];
                                totalScore=totalScore+y;
                                
                                return (<div key={item.toString()} className={"col span-1-of-2 image " + x}>
                                        <div className="subjectProgress"><p>{item.toString()} </p> </div>
                                        {['game a','game b'].map((item,index) => {
                                            const z =gamescore[index]
                                            return( <div className="gameProg">
                                                        <div className="game"> {item.toString()} </div>
                                                        <div className="score"> {y} </div>

                                                        <div className="prog"> <SemiCircleProgressBar  percentage={z/* Load in percent of game completed*/} diameter={150} showPercentValue /></div>
                                                    </div>) 
                                                })
                                            }
                                        </div>)
                                    })
                                }

                        </div>
            
                        <div className="row medals">
                            <h3>Medals!</h3>
                            <div className="medalRow">
                                {totalScore}
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                        </div>
                    </section>
                </div>
    </main>
    <footer className="ft">
        <div className="row ">
            <div className="col span-1-of-1">
                <ul className="footer-nav">
                    <li><a href="App.js">About us</a></li>
                    <li><a href="App.js">Contact us</a></li>
                    <li><a href="App.js">Terms of service</a></li>
                    <li><a href="App.js">Privacy policy</a></li>
                </ul>
            </div>
        </div>
        <div className="row">
            <p>
                Copyright &copy; 2018 by Swan academics. All rights reserved.
            </p>
        </div>
        
    </footer>
   </div>
    )
}
}

export default ChildDashboard;


    //https://www.youtube.com/watch?v=2neoCVCrJYw



        //return table
        // var user = fbApp.auth().currentUser;

        // if (user) {
        //   // User is signed in.
        //     console.log(user)
        // } else {
        //     console.log("NO")
        //   // No user is signed in.
        // }

        // firebase.auth().onAuthStateChanged(function(user) {  
        //     if(user){
        //         // console.log(user)
        //         var currentuser = firebase.auth().currentUser; //user
        //         var uid = currentuser.uid
        //         console.log("UID: "+uid)
        //         this.setState({
        //             uid: uid,
        //             email: currentuser.email
        //         }) 

        //     }
        //     else{
        //         window.location.assign("/")
        //         // this.setState({
        //         //     uid: "NO ID, NOT SIGNED IN OR BROKEN"
        //         // })  
        //     } 
        // }.bind(this))

        // getUser
        // .then(user => {
        //     console.log("UID: "+user.uid)
        //     this.setState({
        //         uid: user.uid,
        //         email: user.email
        //     })
            
        // })
        // .catch((reject) => {
        //     window.location.assign('/')
        // })