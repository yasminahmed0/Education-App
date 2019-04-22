import React, { Component } from 'react';
import logo from '../../resources/css/img/logo5.png';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import firebase from '../../../firebase'
import store from '../../../store'
import medal from '../../resources/css/img/medal1.png'
import toGames from'../../resources/css/img/gogames.png';
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
        //console.log(name + "  "  + value)
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
            medals.push(<div key={o}><img src={medal} alt="medal" className="medal" /></div>)
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
        var specPoints=[]
        if (subject ==="Maths"){
            specPoints.push("1.1 Addition and Subtraction")
            specPoints.push("1.2 Multiplication and Division")
            specPoints.push("1.3 Fractions")
        }
        else{
            specPoints.push("1.1 Full Stops")
            specPoints.push("1.2 Apostrophes")
            specPoints.push("1.3 Spelling")
        }
        if (gamePlay.length ===0){
            return "No game history"
        }
        for( var x=0; x<gamePlay.length ;x++){
            console.log("NCPP " + gamePlay[x].ncp.substring(0,3))
            if(gamePlay[x].ncp.toString().substring(0,3) === "1.1" ){
                specPoint11++
                score11= score11+ parseInt(gamePlay[x].score)
                
            }          
            else if(gamePlay[x].ncp.toString().substring(0,3)=== "1.2" ){
            
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
            if(st1===0 && st2===0 && st3===0 )
            {
                   return "Play some more games!" 
            }
            else if((st1>= st2 )&& (st1>=st3)){
                return specPoints[0]

            }
            else if ((st2 >= st1) && (st2>=st3)){
                return specPoints[1]

            }
            else{
                return specPoints[2]
            }
        }
        else{
            console.log("xxxxxx"+st1 + " "+ st2 +" "+ st3)
            if(st1===0 && st2===0 && st3===0 )
            {
                   return "Play some more games!" 
            }
            else if((st1<= st2 )&& (st1<=st3)){
                return specPoints[0]

            }
            else if ((st2 <= st1) && (st2<=st3)){
                return specPoints[1]

            }
            else{

                return specPoints[2]
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
///DELETE
    

    SeperateGames(subject,gameName){
        var onesubjectGames=this.gameSeperator(subject)
        var gameType=[]
        var count=0
        var GameTypeScore=0

       for (var i=0;i<onesubjectGames.length;i++){
           if(onesubjectGames[i].title===gameName){
            //console.log("LOOOK HURR does it werk")

               GameTypeScore=GameTypeScore+onesubjectGames[i].score
               count++
               gameType.push(onesubjectGames[i])
            }
        }
        //console.log("LOOOK HURR "+ GameTypeScore)
        if(GameTypeScore===0){
            return GameTypeScore
        }
        else{
        return GameTypeScore/count}
       //return gameType 
    }

    SubjectGames(subject){
    if(subject === "Maths"){
        return(["Operations", "Card Match","Platformer"])
    }
    else{
        return (["Can You Punctuate","Snake Game","Adventure"])
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
            <div className="dashBody">     
	            <header >  
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
                                                <div className= "col  childDashTitles">Average Scores:</div>
                                            </div>
                                            <div className="container adjustSize">
                                                <div className="row ">
                                                    <div className="col s11">
                                                        {this.SubjectGames(item).map((game1,index) => {
                                                        
                                                        return( <div className="gameProg" key={index}>
                                                                    <div className="games"> {game1.toString()} </div>
                                                                    {/* <div className="games"> {score} </div> */}

                                                                    <div className="games"><SemiCircleProgressBar  className="circle"stroke={"#FEAE35"} percentage={Math.round(this.SeperateGames(item,game1))} diameter={200} showPercentValue /></div>
                                                                </div>) 
                                                            })
                                                        }
                                                    </div>
                                                   
                                                    <div className="col s1  gameButtonDiv">
                                                    <a onClick={this.toGames}><img className="toGameimg"src={toGames}/></a>
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
                                        <div className="row childDashTitles">{item + " Stats!"}</div>  
                                                      
                                                <table>
                                                    <tbody className="statsTable" >
                                                    <tr>
                                                        <td>Games played:</td>
                                                        <td className="td">{gamesPlayed}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Highest Score:</td>
                                                        <td className="td">{highestScore}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{"Average "+item+" Score:"}</td>
                                                        <td className="td">{this.calculateaverage(item,score)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Points to next medal</td>
                                                        <td className="td">{this.pointToMedal(this.scoreCalculator(item))}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Strengths</td>
                                                        <td className="td"> {this.calculateStrength(item,"Strength")}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Area for improvement</td>
                                                        <td className="td" >{this.calculateStrength(item,"Weakness")}</td>
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


 