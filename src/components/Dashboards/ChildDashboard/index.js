import React, { Component } from 'react';
import logo from '../../resources/css/img/logo5.png';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import firebase from '../../../firebase'
import store from '../../../store'
import medal from '../../resources/css/img/medal1.png'
import {Tab,Tabs,TabList,TabPanel} from 'react-tabs';
import $ from 'jquery'
import M from "materialize-css"
import ReactChartkick, { LineChart} from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)
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
            gameData: []
        }

        $(document).ready(function() {
            M.updateTextFields();
        });

        console.log("Child Index.js "+account.acc.user.uid+" "+account.acc.user.email)
        store.subscribe(() => {
            const { data } = store.getState();
            console.log("this is data: "+JSON.stringify(data))
            if(data){
                this.setState({
                    username: data.name,
                    age: data.age,
                    goal: data.goal,
                    gameData: data.gameProgress
                })    
            }   
        })
        this.handleChange = this.handleChange.bind(this)
        // this.updateChildSetting = this.updateChildSetting.bind(this)
    }
    
    componentDidMount(){
        M.AutoInit();
    }

    signOut(){
        firebase.auth().signOut()
        window.location.assign("/")
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }) //check if the same
        console.log(name + "  "  + value)
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

    //SID
    toGames() {
        window.location.assign("/allgames")
    }

    printIcon(item){
        
        if(item==="English")
        {
            return <i className="material-icons icontabs right">book</i>
        }
        else{
            return <i className="material-icons icontabs right">assessment</i>
        }  
    }     

    printmedals(score,item){
        
        var o= 0
        var medals=[]
        if(score===0)
        {
            for( var i=0;i<5;i++){
                //console.log("Y NO"+score)
                medals.push(<div key={o} className="circle"></div>)
                o++
            }
        }
        else if( 0 < score && score < 100){
            medals.push(<div ><img src={medal} alt="medal" className="medal" /></div>)
            for(  i=0;i<4;i++){
                medals.push(<div key={o} className="circle"></div>)
                o++
            }
        }
        else if(100<score && score <250){
            for( i=0;i<2;i++){
                medals.push(<div key={o}  ><img src={medal} alt="medal" className="medal" /></div>)
                o++
            }
            for( i=0;i<3;i++){
                medals.push(<div key={o} className="circle"></div>)
                o++
            }

        }
        else if(250< score && score <500){
            for( i=0;i<3;i++){
                medals.push(<div key={o} ><img src={medal} alt="medal" className="medal" /></div>)
                o++
            }
            for(i =0;i<2;i++){
                medals.push(<div key={o} className="circle"></div>)
                o++

            } 

        }
        else if(500<score && score<1000){
            for( i=0;i<4;i++){
                medals.push(<div key={o} ><img src={medal} alt="medal" className="medal"/></div>)
                o++
            }
             medals.push(<div key={o}className="circle"></div>)
        }
        else {
           
            for( i=0;i<5;i++){
                medals.push(<div key = {o} ><img src={medal} alt="medal" className="medal"/></div>)
                o++
            }
        }
      
      return medals;  

    }

    gameSeperator(subject){
        var gamePlay=[]
        for(var i =0;i<this.state.gameData.length;i++){
            if(this.state.gameData[i].Subject === subject ){
               gamePlay.push(this.state.gameData[i])
            }
        }
        return gamePlay
    }

    calculateStrength(subject,stwk ){
        var gamePlay=this.gameSeperator(subject)
        var specPoint11=0
        var score11 = 0
        var specPoint12=0
        var score12 = 0
        var specPoint13=0
        var score13 = 0
        if (gamePlay.length ===0){
            return "No game history"
        }
        for( var x=0; x<gamePlay.length ;x++){
            if(gamePlay[x].ncp === 1.1 ){
                specPoint11++
                score11= score11+ parseInt(gamePlay[x].score)
            }          
            else if(gamePlay[x].ncp.toString() === "Placeholder 1.2" ){
            
                specPoint12++
                score12= score12+ parseInt(gamePlay[x].score)
            }
            else{
                specPoint13++
                score13= score13+ parseInt(gamePlay[x].score)

            
            }
        }

        var st1 =score11/specPoint11
        if(isNaN(st1)){
            st1=0
        }
        var st2 =score12/specPoint12
        if(isNaN(st2)){
            st2=0
        }  
        var st3 =score13/specPoint13
        if(isNaN(st3)){
            st3=0
        }

        if(stwk==="Strength"){
            if((st1> st2 )&& (st1>st3)){
                return "1.1"

            }
            else if ((st2 > st1) && (st2>st3)){
                return "1.2"

            }
            else{
                return "1.3"
            }
        }
        else{
            if((st1< st2 )&& (st1<st3)){
                return "1.1"

            }
            else if ((st2 < st1) && (st2<st3)){
                return "1.2"

            }
            else{
                return "1.3"
            }
   
        }


    }

    chartData(subject){
        //have all the diff game types here and sort them into diff Arrays
        var data=[]
       var gamePlay=this.gameSeperator(subject)
       for(var i =0;i<gamePlay.length;i++){
            var singleGame=[]
            singleGame.push(gamePlay[i].date)
            singleGame.push(gamePlay[i].score)
            data.push(singleGame)
            
        }
            return data 
    }
    
    scoreCalculator(subject){
        var score=0
        var game= this.gameSeperator(subject)
        for(var i=0; i<game.length ;i++){
            score= score + parseInt(game[i].score)
        }        
        return score

    }

    calculateaverage(subject,score){
        var gamesPlayed=this.gameSeperator(subject).length
        var averageScore=score/gamesPlayed

        if (gamesPlayed ===0){
            return "No game history"
        }
        else {
            return Math.round(averageScore)
        }

    }

    pointToMedal(score){
        
      
        if( 0 < score && score < 100){
            return 100-score;
        }
        else if(100<score && score <250){
            return 250-score;

        }
        else if(250< score && score <500){
           return 500-score;

        }
        else if(500<score && score<1000){
          return 1000-score
        }
        else if(score<1000){
            
           return 0
        }
        else{
            return "No game history"

        }

    }

    calculateProgress(score,maxscore){
        if(maxscore===0){
            return 0
        }
        else{
        return Math.round((score/maxscore)*100)
        
        }
    }

    allGames(subject){
        if(subject==="Maths"){
        
                 
           return( <div>
            <div className="input-field col 2">
            <button className="waves-effect waves-light btn modal-trigger" href="#Maths" > All Game Plays 
                <i className="material-icons right">person_add </i>
            </button>
        </div>    
           <div id="Maths" className="modal">
            <div className="modal-content">
            {this.gameSeperator(subject).map((item,key)=>{
                //score= score + item.score
                
            
                return(<div key={key} className="row">
                <div className=" col s12 ">
                
                <p>Game: {item.title}</p>
                    <p>Score: {item.score}</p>
                     <p>NCP: {item.ncp}</p>
                    <p>Date: {item.date}</p>
                    <hr></hr>
                    </div>
                </div>)
                     } 
                )}


                 
            </div>
            <div className="modal-footer col 12">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6">Cancel</a>
               
            </div>
           </div>   </div>)
        }
        else{
            return( <div>
                <div className="input-field col 2">
                <button className="waves-effect waves-light btn modal-trigger" href="#English" > All Game Plays 
                    <i className="material-icons right">person_add </i>
                </button>
            </div>    
               <div id="English" className="modal">
                <div className="modal-content">
                {this.gameSeperator(subject).map((item,key)=>{
                    //score= score + item.score
                    
                
                    return(<div key={key} className="row">
                    <div className=" col s12 ">
                    
                    <p>Game: {item.title}</p>
                        <p>Score: {item.score}</p>
                         <p>NCP: {item.ncp}</p>
                        <p>Date: {item.date}</p>
                        <hr></hr>
                        </div>
                    </div>)
                         } 
                    )}
    
    
                     
                </div>
                <div className="modal-footer col 12">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6">Cancel</a>
                   
                </div>
               </div>   </div>)
            
        }
        
    }

    updateChildSetting = e => {
        e.preventDefault()
        let ref = firebase.firestore().collection("Children").doc(this.state.uid)
        ref.update({
            name: this.state.username,
            age: this.state.age,
            goal: this.state.goal
        }).then(() => {
            alert("Document successfully updated!");
        }).catch(error => {
            alert("Error updating document: ", error);
        })
        
    }

	render(){
        const subject=["Maths", "English"]         
        return(
            <div className=" dashBody">     
	            <header>  
                            <div className="row childDashHeader">
                            <div className="col s2"><a id="logo-container x" href="#!" ><img className="brand-logo left logo"src={logo} alt='logo'/></a></div>
                            <div className="col s7 offset-s1  childDashTitle"> {this.state.username}'s Dashboard </div>
                            <div className="col s2 signOut">
                            <a onClick={this.signOut} href="#!" ><i className="material-icons signouticon ">power_settings_new</i></a>
                            {/* <div className="signOutText">Sign Out</div>   */}
                            </div>     
                            </div>   
                </header>
                <main className="container childdashcon">
                
                <Tabs>
                    <TabList>
                        {subject.map((item,key)=>{
                            
                            return(
                                <Tab key= {key}>{this.printIcon(item)}{item}</Tab>

                            )
                        })}
                        <Tab><i className="material-icons icontabs  right">trending_up</i>Achievements</Tab>
                        <Tab><i className="material-icons icontabs  right">settings</i>Settings</Tab>
                        
                   
                    </TabList>
                        <div className="row">
                        
                        
                        {subject.map((item,key) =>{
                            var score=0
                            var highestScore=0
                            var gamesPlayed=this.gameSeperator(item).length
                            var eachGame=this.gameSeperator(item)
                            var maxscore=gamesPlayed * 100
                            for(var i=0; i<gamesPlayed ;i++){
                                
                                if (eachGame[i].score>highestScore){
                                    highestScore=eachGame[i].score
                                }
                                score= score + parseInt(eachGame[i].score)
                                
                            }        
                            return(
                                <TabPanel key={key} className={item+"content TabPanel "}>
                                    <div className="gamesPlayed">
                                            <div className="row">
                                                <div className= "col s2 childDashTitles">Average Scores:</div>
                                            </div>
                                            <div className="container adjustSize">
                                                <div className="row ">
                                                    <div className="col">
                                                        {['Mix and Math',"Card Match","Blank Fill","Swan multup "].map((item,index) => {
                                                        
                                                        return( <div className="gameProg" key={index}>
                                                                    <div className="games"> {item.toString()} </div>
                                                                    {/* <div className="games"> {score} </div> */}

                                                                    <div className="games"><SemiCircleProgressBar  className="circle"stroke={"#FEAE35"} percentage={this.calculateProgress(score,maxscore)} diameter={200} showPercentValue /></div>
                                                                </div>) 
                                                            })
                                                        }
                                                    </div>
                                                    <div className="col gameButtonDiv">
                                                        <button className="gameButtonStyle" onClick={this.toGames}>
                                                       Click For Games -></button>
                                                    </div>
                                                </div>  
                                            </div>
                                                
                                            
                                    </div>
                                <hr/>
                                        
                                        <div className="row">    
                                       <div className="col s6 ">
                                       <div className="row childDashTitles">{item + " Plays!"}</div>  
                                       <div className="graphDisplay"><LineChart  download={true} colors={["#FEAE35", "#666"]} xtitle="Date" ytitle="Score" messages={{empty: "No Games Played"}} data={this.chartData(item)} /></div>
                                       
                                
                                        </div> 
                                                                 
                                        <div className="col s6 ">
                                        <div className="row childDashTitles">{item + " 's Stats!"}</div>  
                                                      
                                                <table>
                                                    <tbody className="statsTable" >
                                                    <tr>
                                                        <td>Games played:</td>
                                                        <td>{gamesPlayed}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Highest Score:</td>
                                                        <td>{highestScore}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{"Average "+item+" Score:"}</td>
                                                        <td>{this.calculateaverage(item,score)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Points to next medal</td>
                                                        <td>{this.pointToMedal(this.scoreCalculator(item))}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Strengths</td>
                                                        <td>{this.calculateStrength(item,"Strength")}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Area for improvement</td>
                                                        <td>{this.calculateStrength(item,"Weakness")}</td>
                                                    </tr>
                                                    </tbody>
                                                   
                                                </table>

                                        </div> {/*end cos s6 */}
                                                    
                                        </div>
                                        

                                 </TabPanel>

                            ) 
                        }
                        )}
                    <TabPanel className="TabPanel" >
                    <div className="achievements">
                        <br/>
                        <div className="row achievementTitle">{this.state.username + "'s Achievements!"}</div>

                        <div className="row enclosingRow">
                            <div className="col childDashTitles">{this.state.username+"'s goal!"}</div>  
                            <div className=" col medalRow">{this.state.goal}</div>
                        </div>

                        {subject.map((item,key) =>{
                            return(
                                
                                <div key={key+item} className="row enclosingRow">
                                <div className="col childDashTitles">{this.state.username+"'s "+item +" Medals!"}</div>  
                                
                                <div key = {key} className="medalRow col">
                                {this.printmedals(this.scoreCalculator(item),item)}
                                </div>
                                </div>
                                
    
                            )
                            
                        })}
                        
                    
                    </div>   

                    </TabPanel>
                   
                    <TabPanel className="TabPanel">
                        <form className="col s12 settings" onSubmit={this.updateChildSetting}>
                        
                        <div className="row">
                            <div className="input-field col s12">
                            <input defaultValue={this.state.username} id="username" name="username" type="text" className="validate" onChange={this.handleChange}/>
                            <label className="active" htmlFor="username">First Name</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                            <input disabled value={this.state.uid} id="UID" type="text" className="validate"/>
                            <label className="active" htmlFor="UID">User ID</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                            <input disabled value={this.state.email} id="email" type="text" className="validateTabPanel"/>
                            <label className="active" htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input defaultValue={this.age()} id="age" name="age" type="text" className="validate" onChange={this.handleChange}/>
                            <label className="active" htmlFor="age">Age</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                            <input defaultValue={this.goal()}id="goal" type="text" name="goal" className="validate" onChange={this.handleChange}/>
                            <label className="active" htmlFor="goal">Goal</label>
                            </div>
                        </div>

                           <div className="input-field col 2">
                           <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                           <i className="material-icons right">chevron_right</i>
                           </button>
                           </div>
  
                       </form>
                      

                        

                    </TabPanel>
                    
                    </div>
                    
                </Tabs>
                
                
    </main>
    <footer className="childFooter"><br/>
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

/**
 *  changePassword = () => {
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


*/

/*
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
                        <div>Game Data: {this.state.gameData.map((item, key) => {
                                return(<div key={key}>
                                        <p>Game ID: {item.gameID}</p>
                                        <p>Subject: {item.Subject}</p>
                                        <p>score: {item.score}</p>
                                        <p>NCP: {item.ncp}</p>
                                        <p>date: {item.date}</p>
                                        <hr></hr>
                                    </div>)
                            })}
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

                                                        <div className="prog"> <SemiCircleProgressBar  percentage= diameter={150} showPercentValue /></div>
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
            <div className="row">
                <p>
                    Copyright &copy; 2018 by Swan academics. All rights reserved.
                </p>
            </div>
            
        </footer>
       </div>
        )











*/