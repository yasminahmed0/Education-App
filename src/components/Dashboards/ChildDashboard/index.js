import React, { Component } from 'react';
import menu from '../../resources/css/img/menu.png';
import logo from '../../resources/css/img/logo.png';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { fbApp } from '../../../firebase';
//{/* https://www.npmjs.com/package/react-progressbar-semicircle */}



class ChildDashboard extends Component{
    constructor(props) {
        super(props);
        this.state ={
            uid: null,
            email: null
        }
        fbApp.auth().onAuthStateChanged(function(user) {  
            if(user){
                console.log(user)
                var currentuser = fbApp.auth().currentUser; //user
                var uid = currentuser.uid
                console.log("UID: "+uid)
                this.setState({
                    uid: uid,
                    email: currentuser.email
                })  
            }
            else{
                window.location.assign("/")
                // this.setState({
                //     uid: "NO ID, NOT SIGNED IN OR BROKEN"
                // })  
            } 
        }.bind(this))
    }
    
    componentWillMount(){   
    }
  
    
    signOut(){
        fbApp.auth().signOut()
        console.log("User has been signed out")
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
                            {"Siddika"/* Load students name into the title  */}  's Dashboard
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
                    <div className="xxx">{this.state.uid}</div>

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


        //return table
        // var user = fbApp.auth().currentUser;

        // if (user) {
        //   // User is signed in.
        //     console.log(user)
        // } else {
        //     console.log("NO")
        //   // No user is signed in.
        // }