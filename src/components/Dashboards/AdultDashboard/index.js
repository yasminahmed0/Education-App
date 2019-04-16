import React, { Component } from 'react';
import logo from '../../resources/css/img/logo.png';
import M from "materialize-css"; 
import firebase from '../../../firebase';
import store from '../../../store'
import '../../resources/refined.css'


//when a child is added cos back to store and output states, 
//why not just it in this file?

class AdultDashboard extends Component{ 

    constructor(props) {
        super(props);
       
        //initial account details
        let { account } = store.getState()
        this.state = {
            uid: account.acc.user.uid,
            email: account.acc.user.email,
            username: null,
            children:[],
            newValue: null, //new child to add
            childRemove: null,
            childrenNames: [], //list of children's names
            products: []
        }
    
        //data from database. Need to call getState again to get new dispatch called in store
        console.log("Parent Index.js "+account.acc.user.uid+" "+account.acc.user.email)
        store.subscribe(() => {
            const { data } = store.getState();
            console.log("this is data: "+JSON.stringify(data))
            if(data){
                this.setState({
                    username: data.name,
                    children: data.children,
                    childrenNames: data.childrenNames,
                    products: data.products
                })    
            }   
        })
        //console.log("state: "+this.state.childrenNames)
        this.addChild = this.addChild.bind(this)
        this.removeChild = this.removeChild.bind(this)
    }

    componentDidMount(){
        M.AutoInit();
    }

    //will need to change
    handleAdd = e => {
        e.preventDefault() //removed name
        const { name, value} = e.target //video
        if(name === "insert"){
            this.setState({
                newValue: value.trim()
            })  
            console.log("chaning childToAdd to: "+this.state.newValue)
        }
        else if(name === "remove"){
            this.setState({
                childRemove: value.trim()
            }) 
            console.log("chaning childToREmove to: "+this.state.childRemove)
        }
        else{
            this.setState({
                username: value
            })
            console.log("chaning username to: "+this.state.username)
        }
        
    }

    changeName = e => {
        e.preventDefault()
        if(this.state) 
        firebase.firestore().collection("Parent").doc(this.state.uid).update({
            name: this.state.username
        })
        .then(doc => {
            alert("Name successfully updated!")
            firebase.firestore().collection("Users").doc(this.state.uid).update({
                name: this.state.username
            })
        })
    }

    addChild() {
        if(this.state.uid != null ){
            if(this.state.newValue !== "" && this.state.newValue !== null){
                const db = firebase.firestore()
                //check if doc is present before adding
                db.collection("Children").doc(this.state.newValue).get()
                .then(doc => {
                    console.log(this.state.newValue)
                    if(doc.exists){
                        const ref = db.collection("Parent").doc(this.state.uid)
                        ref.update({
                            children: firebase.firestore.FieldValue.arrayUnion(this.state.newValue)
                        })
                    }
                    else{
                        console.log("index: child does not exist")
                        alert("index: child does not exist")
                    }
                })
            }
            else{
                alert("Please enter an ID value")
            }
        } 
        //window.location.reload(); this did not work. NEED TO REFRESH 
    }

    signOut(){
        firebase.auth().signOut()
        window.location.assign("/")
    }

    //if no children, if wrong name 
    removeChild(){
        if(this.state.childRemove !== "" && this.state.childRemove !== null){
            let i;
            let found = false
            if(this.state.children.length !== 0){
                for(i=0; i<this.state.childrenNames.length;  i++){
                    if(this.state.childRemove === this.state.childrenNames[i]){
                        const db = firebase.firestore()
                        const ref = db.collection("Parent").doc(this.state.uid)
                            ref.update({
                                children: firebase.firestore.FieldValue.arrayRemove(this.state.children[i])
                            })
                        console.log("children[i]: "+this.state.children[i])
                        console.log("childrenNames[i]: "+this.state.childrenNames[i])
                        found = true;
                        if(found){
                            alert("Remove succesfull, please refresh the page!")
                            break;
                        }
                    }
                }
                if(!found){
                    alert("No children with said name linked to your account, please try again")
                }
            }
            else{
                alert("No children to remove")
            }
        }
    }

    gameSeperator(subject,item){
 
        var gamePlay=[]
        for(var i=0;i<item.Games.length;i++){
            if(item.Games[i].Subject === subject){
                gamePlay.push(item.Games[i])
            }
        }
      
        return gamePlay
    }

    calculateStrengthorWeakness(subject,item,stwk ){
        var gamePlay=this.gameSeperator(subject,item)
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

    
        var st1 =score11/specPoint11 //calc avergae score for each spec point 
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
       
        if(stwk==="Strength"){           //highest av score is a stength or weakness 

            if((st1> st2 )&& (st1>st3)){
                return "1.1"

            }
            else if ((st2 > st1) && (st2>st3)){
                console.log("helooooooooooo")
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
                console.log("helooooooooooo")
                return "1.2"

            }
            else{
                return "1.3"
            }

        }


    }

    calculateaverage(item,subject,score){
        var gamesPlayed=this.gameSeperator(subject,item).length
        var averageScore=score/gamesPlayed

        if (gamesPlayed ===0){
            return "No game history"
        }
        else {
            return Math.round(averageScore)
        }

    }


    render() {
        return (
            <div className="adultDashBody">
                <div className="adultSideNav">
                        <ul className="navList">
                        <li><img src={logo} alt="logo" className="logo"/></li>    
                        <li><a className="waves-effect" href="#howItWorks">How it works</a></li>
                            {this.state.childrenNames.map((item,key)=>{
                                    return(
                                         <li key={key}><a className ="adultNavText" href={"#"+item}>{item}</a></li>
                                    )
                                })}
                            <li><a  className=" waves-effect"href="#specification">Specification</a></li>     
                           <li><a  className=" waves-effect"href="#settings">Settings</a></li> 
                           <li><a onClick={this.signOut} className=" waves-effect"href="#!"><i className="material-icons sout right">power_settings_new</i>Sign Out</a></li> 
    
                        </ul>
                           
                    </div>
                        
                     
                 <div className=" col s10 adultDashContent">  
                    <div className="row" id="howItWorks"> 
                    <h3 className="teal-text h3">How it Works</h3>                        
                                <div className="col s4">
                                        <div className="card topCard large "> 
                                            <div className="card-image waves-effect waves-block waves-light">
                                
                                            </div> 
                                            <div className="card-content activator">
    
                                            <div><i className="material-icons large">help_outline</i></div>
                                            <span className="card-title grey-text text-darken-4"><div>How it Works</div></span>
                                            <br/>
                                            <div><p><a href="#!">Click here!</a></p></div>
                                            </div>
                                            <div className="card-reveal"> 
                                            <span className="card-title grey-text text-darken-4 cardcon">How it Works<i className="material-icons right">close</i></span>
                                                <ol>
                                                    <li className="cardInfo">Track the progress of all children linked to your account </li>
                                                    <li className="cardInfo">You can see each childs progress, game play and average scores on a single page</li>
                                                    <li className="cardInfo">Change user information or link additonal children to your account on the settings tab </li>
                                                </ol>
                                            </div>
                                        </div>
                
                                    </div>
                                    <div className="col s4">
                                        <div className="card topCard large"> 
                                            <div className="card-image waves-effect waves-block waves-light">
                                            
                                            </div> 
                                            <div className="card-content activator">
                                            <div><i className="material-icons large">thumbs_up_down</i></div>
                                            <span className="card-title grey-text text-darken-4">Calculating Strengths and Weaknesses</span>
                                            <div><p><a href="#!">Click here!</a></p></div>
    
                                            </div>
                                            <div className="card-reveal">
                                            <span className="card-title grey-text text-darken-4 cardcon">Strengths and Weaknesses<i className="material-icons right">close</i></span>
                                            <p className="cardInfo">We calculate stengths by calculating and average score for each game (each which targets a single specification point). This allows you to see the stronger and weaker areas in the UK national curriculum.</p>
                                            </div> 
                                        </div>
                
                                    </div>
                                    <div className="col s4">
                                        <div className="card topCard large"> 
                                            <div className="card-image waves-effect waves-block waves-light">
                                         
                                            </div>
                                            <div className="card-content activator">
                                            <div><i className="material-icons large">info_outline</i></div>
                                            <span className="card-title grey-text text-darken-4">Information on the National Curriculum </span>
                                            <div><p><a href="#!">Click here!</a></p></div>
                                            
                                            </div>
                                            <div className="card-reveal">
                                            <span className="card-title grey-text text-darken-4 cardcon">The British Curriculum</span>
                                            <ul>
                                                <li className="cardInfo">To download a copy of the national curriculum click <a href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/425601/PRIMARY_national_curriculum.pdf">here</a></li>
                                                <li className="cardInfo">Understanding how best to support your childs learning <a href="https://www.britishcouncil.org/english/timmy/resources/childs-learning">here</a></li>
                                                <li className="cardInfo">Third resource <a href="#!">Here</a></li> 
                                            </ul>                                 
                                            </div>
                                        </div>
                                    </div>                            
                               </div>  {/* cards  */}
                        <div className= "adultDashChildren">
                            {this.state.products.map((item,key) =>{      
                               return(
                                   <div key={key} id={item.childName}>
                                     <div className="row progressx">
                                     <h4 className="teal-text h3 ">{item.childName+"'s Progress"}</h4>
                                     </div>
                                     <div className="row">
    
                                         {['Maths','English'].map((subject,key)=>{
                                                var score=0
                                                var highestScore=0
                                                var gamesPlayed=this.gameSeperator(subject,item).length;
                                                var game=this.gameSeperator(subject,item)
                                                
                                                 for (var i=0;i<gamesPlayed;i++){
                                                    if(game[i].score> highestScore){
                                                        highestScore=game[i].score
                                                    }
                                                    score=score + parseInt(game[i].score)
    
                                                 }   
    
                                            
                                                 return( 
                                                       
                                                <div  key={key}className="col s6 ">
                                     
                                                      
                                                 <table>
                                                 <thead>
                                                    <tr>
                                                    <th colSpan="2"className="theader">{subject+ " progress"}</th>
                                                    </tr>
                                                </thead>
                                                     
                                                    <tbody className="row adultDashTbody">
                                                        <tr>
                                                            <td> Games played: </td>
                                                            <td>{gamesPlayed}</td>
                                                        </tr>
                                                        <tr>
                                                           <td>Highest Score:</td>
                                                           <td>{highestScore}</td>
                                                        </tr>
                                                        <tr>
                                                           <td>{"Average "+subject+" Score:"}</td>
                                                           <td>{this.calculateaverage(item,subject,score)}</td>
                                                        </tr>
                                                      
                                                        <tr>
                                                            <td>Strengths</td>
                                                            <td>{this.calculateStrengthorWeakness(subject,item,"Strength")}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Area for improvement</td>
                                                            <td>{this.calculateStrengthorWeakness(subject,item,"Weakness")} </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                 
                                            
                                                    
                                            <div className="recentPlayCon"> <strong><p className="recentPlaysAdult">{item.childName+"'s Recent "+subject +" Plays"}</p></strong></div>
                                       
                                                 <div className="parentDashSubj col s12">
                                                    {this.gameSeperator(subject,item).map((game,key)=>{
                                                        
                                                        return(
                                                            <div key={key} className="row">
    
                                                            <div className="col s12 ">
                                                              <div className="card">
                                                                <div className="card-content grey-text text-darken-3">
                                                                  
                                                                  <div className={subject+"games gameScores"}>                                    
                                                                    {/* <p className="games">GameID: {game.gameID}</p>  */}
                                                                    <p ><span className="cardTitle teal-text text-lighten-2">Subject: </span>{game.Subject}</p>
                                                                    <p ><span className="cardTitle teal-text text-lighten-2">Title: </span>{game.title}</p>
                                                                    <p ><span className="cardTitle teal-text text-lighten-2">Score: </span>{game.score}</p> 
                                                                    <p ><span className="cardTitle teal-text text-lighten-2">Date: </span>{game.date}</p> 
                                                                    {/* <p className="games">Date: {game.date}</p> 
                                                                     */}
                                                                </div>
                                                                
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>)  
                                                 })}
                                              </div> 
                                            </div>  
                            
                              //parent element for subject mapping      
                                )})}
                               
    
                          
                           </div>
                     
                                   </div>
                               )
                           })} 
    
    
                               </div> {/*children div  */}
                               <div id="specification" className="row">
                               <h4 className="teal-text h3 col s12 ">Specification</h4>
                               
                               <div className="col s6">
                               <div className="theader col s12">Maths Specification</div>
                               <table>
                              
                                   <tbody className="spectablebody">
                                       <tr>
                                           <td>2.1 </td>
                                           <td> Understanding Division and multiplication and being able to carry out mental arithmatic </td>
                                       </tr>
                                       <tr>
                                           <td>2.2 </td>
                                            <td> Understanding Division and multiplication and being able to carry out mental arithmatic </td>
                                       </tr>
                                       <tr>
                                           <td>2.3 </td>
                                           <td> Understanding Division and multiplication and being able to carry out mental arithmatic </td>
                                       </tr>
                                       <tr>
                                           <td>2.4 </td>
                                           <td> Understanding Division and multiplication and being able to carry out mental arithmatic </td>
                                       </tr>
                                       <tr>
                                           <td>2.5 </td>
                                           <td> Understanding Division and multiplication and being able to carry out mental arithmatic </td>
                                       </tr>
                                   </tbody>
                               </table>
                               </div>
                               <div className="col s6">
                               <div className="theader col s12">English Specification</div>
                               <table>                       
                                   <tbody className="spectablebody">
                                       <tr>
                                           <td>2.1 </td>
                                           <td> Understanding Division and multiplication and being able to carry out mental arithmatic </td>
                                       </tr>
                                       <tr>
                                           <td>2.2 </td>
                                            <td> Understanding Division and multiplication and being able to carry out mental arithmatic </td>
                                       </tr>
                                       <tr>
                                           <td>2.3 </td>
                                           <td> Understanding Division and multiplication and being able to carry out mental arithmatic </td>
                                       </tr>
                                       <tr>
                                           <td>2.4 </td>
                                           <td> Understanding Division and multiplication and being able to carry out mental arithmatic </td>
                                       </tr>
                                       <tr>
                                           <td>2.5 </td>
                                           <td> Understanding Division and multiplication and being able to carry out mental arithmatic </td>
                                       </tr>
                                   </tbody>
                               </table>
                               </div>
    
                               </div>
                               <div id="settings"className="row">
                               <h3 className="teal-text h4 ">Settings</h3>
                                    <form className="col s12" onSubmit={this.changeName}>
                                        <div className="row">
                                        <div className="input-field col s12">
                                            <input defaultValue={this.state.username} id="name" type="text" className="validate" onChange={this.handleAdd}/>
                                            <label className="active" htmlFor="first_name">Name</label>
                                        </div>
                                    </div>
    
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <input disabled defaultValue={this.state.email} id="disabled" type="text" className="validate"/>
                                        <label className="active" htmlFor="Email">Email</label>
                                        </div>
                                    </div>
                                
                                
                                    <div className="input-field col 2"><button className="btn waves-effect waves-light" type="submit" name="action">Submit<i className="material-icons right">chevron_right</i></button></div>
                             
                             
                                                            
                                <div className="input-field col s2.5">
                                    <button className="waves-effect waves-light btn modal-trigger" href="#addAChild" >Add Child
                                        <i className="material-icons right">person_add</i>
                                    </button>
                                </div>
                                <div id="addAChild" className="modal">
                                    <div className="modal-content">
                                        <label >Insert your childs ID</label>
                                        <input type="text" className="validate" name="insert" onChange={this.handleAdd}/>    
                                    </div>
                                    <div className="modal-footer col s12">
                                        <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6">Cancel</a>
                                        <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6" onClick={this.addChild}>Add</a>
                                    </div>
                                </div> 
                               
                                   <div className="input-field col s4">
                                       <button className="waves-effect waves-light btn modal-trigger" href={"#removex"}>Remove child
                                       <i className="material-icons right">remove_circle_outline</i>
                                       </button>
                                   </div>
                                   <div id={"removex" } className="modal">
                                    <div className="modal-content">
                                        <label >Enter ID of the child you wish to remove </label>
                                        <input type="text" className="validate" name="remove" onChange={this.handleAdd}/>  
                                    </div>
                                    <div className="modal-footer col 12">
                                        <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6">Cancel</a>
                                        <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6" onClick={this.removeChild}>Remove </a>
                                    </div>
                                </div> 
                            
                            
                                    </form> 
                                    
    
                               </div>{/*Settings Div */}
                         </div> {/* adult dash content */}
                         <div><br/><br/></div>
                    </div> //end Adult dash body 
                )
            }
        
}

export default AdultDashboard;

    /**
      </div>
            <div>
                <div><button onClick={this.signOut}>Sign Out </button></div>
                <div className="container childdashcon">
                    <div className="section">
                        <div className="row ">
                            <div className="col s2"><a id="logo-container x" href="#" ><img className="brand-logo left logo"src={logo} alt='logo'/></a></div>
                            <div className="col s2 offset-s2 adultDashTitle"> Parent Dashboard </div>
                        </div>
                        <div className="row dashboard xy">
                            <div className="col s3">
                                <ul id="slide-out" className="side-nav fixed">
                                    <li><div><a className="waves-effect links sidenavop" id="LinkWorks" data-showdiv={"DivWorks"}><i className="material-icons right">keyboard_arrow_right</i>How does it work?</a></div></li>
                                    <li><div className="divider"></div></li>
                                   
                                    {this.state.childrenNames.map((item,key) => {
                                        return (<div key={key}>
                                                    <li ><div ><a className="waves-effect links sidenavop" id={"Link"+key} data-showdiv={"Div"+key}><i className="material-icons right">person_outline</i>{item}</a></div></li> 
                                                    <li><div className="divider"></div></li>
                                                </div>  
                                            )})}
                                    <li><div><a className="waves-effect links sidenavop" id="LinkSettings" xs="true" data-showdiv={"DivSettings"}><i className="material-icons right">settings</i>Settings</a></div></li>
                                    <li><div className="divider"></div></li>
                                    <li><div><a className="waves-effect links sidenavop" id="LinkUsefulLink" data-showdiv={"DivUsefulLink"}><i className="material-icons right">links</i>Useful Links</a></div></li>
                                </ul>
                            </div>
                            <div className="col s9" >
                                        
                                    <div>
                                    {this.state.childrenNames.map((item,key) =>{
                                        return(
                                            <div   >
                                                
                                                <Tabs className="divs" >
                                                <div id={"Div"+key} style={{display:'none'}}>
                                                    <TabList >
                                                        <Tab>Math</Tab>
                                                        <Tab>English</Tab>
                                                    </TabList>
                                                
                                                    <TabPanel>
                                                        <h4>{item}'s Math Games</h4>
                                                    </TabPanel>

                                                    <TabPanel>
                                                        <h4>{item}'s English Games</h4>
                                                    </TabPanel>
                                                </div>
                                                   
                                               </Tabs>
                                            </div>  )})} 
                                        </div>
                                   
                                        
                                        <div id="DivWorks" className="divs"> 
                                            <p>Welcome to your Dashboard!</p>
                                        </div>
                                        <div id="DivSettings" className="divs" style={{display:'none'}}>
                                            <form className="col s12" onSubmit={this.changeName}>
                                                <div className="input-field col s12"><input placeholder={this.state.username} id="name" type="text" className="validate" onChange={this.handleAdd}/></div>
                                                
                                                <div className="input-field col s12"><input disabled value={email} id="disabled" type="text" className="validate"/>    </div>
                            
                                                <div className="input-field col s12"><input placeholder="update password" id="password" type="password" className="validate"/></div>
                                                
                                                <div className="input-field col 2"><button className="btn waves-effect waves-light" type="submit">Submit<i className="material-icons right">chevron_right</i></button></div>
                                                
                                                <div className="input-field col 2">
                                                    <button className="waves-effect waves-light btn modal-trigger" href="#addAChild" type="submit" name="action">Add a Child
                                                    <i className="material-icons right">person_add</i>
                                                    </button>
                                                </div>
                                            </form>
                                            <div id="addAChild" className="modal">
                                                <div className="modal-content">
                                                    <form><label htmlFor="childUserID">Insert your childs ID</label><input id="childUserID" type="text" className="validate" name="insert" onChange={this.handleAdd}/>  </form>   
                                                </div>
                                                    <div className="modal-footer col 12">
                                                        <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6">Cancel</a>
                                                        <button className="modal-close waves-effect waves-green btn-flat col 6" onClick={this.addChild}>Add</button>
                                                    </div>
                                            </div>
                                        </div> {/* id=DivSetting  
                                        <div id="DivUsefulLink" className="divs" style={{display:'none'}}>Useful Links</div>
                                    
                                        </div> {/* col s9 
                                    </div> {/* row dashboar xy div 
                                </div> {/* section div 
                            </div> {/* container div
                        </div> 
                    
     */
    /*  render() {
        const email=this.state.email
        // console.log("render call "+this.state.childrenNames)
        const kid = []
        const num  = this.state.childrenNames.length
        if(num !== 0){
            for(let i=0; i<this.state.childrenNames.length; i++){
                kid.push(this.state.childrenNames[i])
            }
        }

        if(this.state.childrenNames != null){
            return(<div>Loading</div>)
        }
        else{
            return(
       
                <div className="row container"> 
                <div className="signup">
                <div className="col s12 ">
                  <ul className="tabs">
                  {this.state.childrenNames.map((item) =>{
                      return(
                          
                    <li className="tab col s6 "><a  className="active " href={"#"+item}>{item}</a></li>
    
                      )})}
                </ul>
                </div>
                {this.state.childrenNames.map((item) => {
                                return (
                                    <div id={item} className="col s12 ">
                                    {item}
                                    
                                    </div>
                                )
                                })}
                  </div>
              </div>   
            )
        }
    }*/ 



/*
      <div><button onClick={this.signOut}>Sign Out </button></div>
                <div className="container childdashcon">
                    <div className="section"></div>
                        <div className="row ">
                            <div className="col s2"><a id="logo-container x" href="#" ><img className="brand-logo left logo"src={logo} alt='logo'/></a></div>
                            <div className="col s2 offset-s2 adultDashTitle"> Parent Dashboard </div>
                        </div>
                        <div className="row dashboard xy"> 
                       
                        <Tabs>
                        <TabList>
                        <Tab>Welcome</Tab>   
                        {this.state.childrenNames.map((item,key) =>{
                            return <Tab>{item}</Tab>
                        })}   
                        <Tab><i className="material-icons right">settings</i>Settings</Tab>
                        </TabList>
                        <TabPanel>
                            Heres how it works 
                        </TabPanel>
                        {this.state.childrenNames.map((item,key) =>{
                            return(
                                <TabPanel>
                                    <Tabs>
                                        <TabList>
                                        <Tab>Math</Tab>
                                        <Tab>English</Tab>
                                        </TabList>
                                    
                                        <TabPanel>
                                            <h4>{item}'s Math Games</h4>
                                        </TabPanel>

                                        <TabPanel>
                                            <h4>{item}'s English Games</h4>
                                        </TabPanel>
                                    </Tabs>
                                </TabPanel>
                            )
                        })} 
                        <TabPanel>
                        <form className="col s12">
                            <div className="input-field col s12"><input placeholder="Edit name" id="name" type="text" className="validate"/></div>
                                                        
                            <div className="input-field col s12"><input disabled value="email" id="disabled" type="text" className="validate"/>    </div>
                                    
                            <div className="input-field col s12"><input placeholder="update password" id="password" type="password" className="validate"/></div>
                                                        
                            <div className="input-field col 2"><button className="btn waves-effect waves-light" type="submit" name="action">Submit<i className="material-icons right">chevron_right</i></button></div>
                                                        
                            <div className="input-field col 2">
                                <button className="waves-effect waves-light btn modal-trigger" href="#addAChild" >Add a Child
                                    <i className="material-icons right">person_add</i>
                                </button>
                                </div>
                                
                                </form> 
                                
                        </TabPanel>
                        </Tabs>
                            <div id="addAChild" className="modal">
                                <div className="modal-content">
                                    <form><label >Insert your childs ID</label><input type="text" className="validate" name="insert" onChange={this.handleAdd}/>  </form>   
                                </div>
                                <div className="modal-footer col 12">
                                    <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6">Cancel</a>
                                    <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6" onClick={this.addChild}>Add</a>
                                </div>
                            </div>
            </div>
            </div>
            
            </div>
             */



/*
return (
            <div>
                <div><button onClick={this.signOut}>Sign Out </button></div>
                <div className="container childdashcon">
                    <div className="section">
                        <div className="row ">
                            <div className="col s2"><a id="logo-container x" href="#" ><img className="brand-logo left logo"src={logo} alt='logo'/></a></div>
                            <div className="col s2 offset-s2 adultDashTitle"> Parent Dashboard </div>
                        </div>
                        <div className="row dashboard xy">
                            <div className="col s3">
                                <ul id="slide-out" className="side-nav fixed">
                                    <li><div><a className="waves-effect links sidenavop" id="LinkWorks" data-showdiv={"DivWorks"}><i className="material-icons right">keyboard_arrow_right</i>How does it work?</a></div></li>
                                    <li><div className="divider"></div></li>
                                   
                                    {kid.map((item,key) => {
                                        return (<div key={key}>
                                                    <li ><div ><a className="waves-effect links sidenavop" id={"Link"+key} data-showdiv={"Div"+key}><i className="material-icons right">person_outline</i>{item}</a></div></li> 
                                                    <li><div className="divider"></div></li>
                                                </div>  
                                            )})}
                                    <li><div><a className="waves-effect links sidenavop" id="LinkSettings" xs="true" data-showdiv={"DivSettings"}><i className="material-icons right">settings</i>Settings</a></div></li>
                                    <li><div className="divider"></div></li>
                                    <li><div><a className="waves-effect links sidenavop" id="LinkUsefulLink" data-showdiv={"DivUsefulLink"}><i className="material-icons right">links</i>Useful Links</a></div></li>
                                </ul>
                            </div>
                            <div className="col s9" >
                                        {this.state.childrenNames.map((item,key) => {
                                            return <div key={key} id={"Div"+key} className="divs" style={{display:'none'}}> {item}
                                                 <div className="row" > 
                                                    <div className="col s12" >
                                                        <ul className="tabs" > 
                                                            <li className="tab col s6"><a href="#Maths">Maths</a></li>
                                                            <li className="tab col s6"><a href="#English">English</a></li>
                                                        </ul>
                                                        <div id="Maths" className="col s12" >Maths</div>
                                                        <div id="English" className="col s12">English</div>
                                                    </div>    
                                                </div>
                                            </div>
                                            })
                                        }
                                    <div>
                                         {/* {this.state.childrenNames.map((item,key) => {
                                            return (<div key={key} id={"Div"+key} className="divs" style={{display:'none'}}> {item}
                                                <div className="row" > 
                                                    <div className="col s12" >
                                                        <ul className="tabs" > 
                                                            <li className="tab col s6"><a href="#Maths">Maths</a></li>
                                                            <li className="tab col s6"><a href="#English">English</a></li>
                                                        </ul>
                                                        <div style={{display:'none'}}>
                                                        <div id="Maths" className="col s12" >Maths</div>
                                                        <div id="English" className="col s12">English</div>
                                                        </div>
                                                    </div>                                   
                                                </div>
                                                <div className="input-field col 2">
                                                    <button className="waves-effect waves-light btn modal-trigger" href="#removeAChild" type="submit" name="action"> Remove Child<i className="material-icons right">clear</i></button>
                                                </div>
                                        </div>)})} 
                                        </div>
                                   
                                        
                                        <div id="DivWorks" className="divs"> {/*style={{display:'none'}}
                                            <p>Welcome to your Dashboard!</p>
                                        </div>
                                        <div id="DivSettings" className="divs" style={{display:'none'}}>
                                            <form className="col s12" onSubmit={this.changeName}>
                                                <div className="input-field col s12"><input placeholder={this.state.username} id="name" type="text" className="validate" onChange={this.handleAdd}/></div>
                                                
                                                <div className="input-field col s12"><input disabled value={email} id="disabled" type="text" className="validate"/>    </div>
                            
                                                <div className="input-field col s12"><input placeholder="update password" id="password" type="password" className="validate"/></div>
                                                
                                                <div className="input-field col 2"><button className="btn waves-effect waves-light" type="submit">Submit<i className="material-icons right">chevron_right</i></button></div>
                                                
                                                <div className="input-field col 2">
                                                    <button className="waves-effect waves-light btn modal-trigger" href="#addAChild" type="submit" name="action">Add a Child
                                                    <i className="material-icons right">person_add</i>
                                                    </button>
                                                </div>
                                            </form>
                                            <div id="addAChild" className="modal">
                                                <div className="modal-content">
                                                    <form><label htmlFor="childUserID">Insert your childs ID</label><input id="childUserID" type="text" className="validate" name="insert" onChange={this.handleAdd}/>  </form>   
                                                </div>
                                                    <div className="modal-footer col 12">
                                                        <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6">Cancel</a>
                                                        <button className="modal-close waves-effect waves-green btn-flat col 6" onClick={this.addChild}>Add</button>
                                                    </div>
                                            </div>
                                        </div> {/* id=DivSetting 
                                    <div id="DivUsefulLink" className="divs" style={{display:'none'}}>Useful Links</div>
                                    
                                </div> {/* col s9 
                            </div> {/* row dashboar xy div 
                        </div> {/* section div 
                    </div> {/* container div
                </div> 
            );
*/



/*render(){
        const childs=['Alice','Ben','Caleb'];
        //var game =['game a', 'game b']; var gameScore=['234','676']; var progress=['45','78']; var gamelength= game.length;
        return(
            <div>     
	            <header> 
                    <div className="row">
                        <div className="col span-1-of-4">
                            <img className="logo" src={logo} alt="Swan academics"></img>
                        </div>
                        <div className="col span-2-of-4 subjectTitle">
                        {this.state.username}'s Dashboard
                        </div>
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
                    <div>Parent ID: {this.state.uid}</div>
                    <div>List of children: {this.state.children.map((child,index) => {
                        return (<div key={index.toString()}>
                            <p>{child}</p>
                        </div>)
                    })}</div>
                    <div>
                        Names: {this.printChildren()}
                    </div> 
                    <div><br></br></div>
                    <div>Add Child:
                        <input type="text" onChange={this.handleAdd}></input>
                        {<button onClick={this.addChild}>Add Child</button>}
                    </div>

                    <div>UID: {this.state.uid}</div>
                    <div>NAME: {this.state.username}</div>
                    <div>EMAIL: {this.state.email}</div>

                    
                    {childs.map((item,index) => {  
                        return (<div className="row">
                                <div key={item.toString()} className={"col span-1-of-2 image "}>
                                    <div className="ChildP"><p>{item.toString()+"'s Progress"} </p> 
                                        
                                    </div>
                                </div>
                            </div>)
                    })}
                    <div><button onClick={this.signOut}>Sign Out </button></div>
                </main>
                <footer className="ft">
                    <div className="row">
                    </div> 
                </footer>
            </div>
        )
    }*/





//OTHER ADMIN STUFF
    // showChildren(){
    //     //console.log("This is uid "+this.state.uid);
    //     var  r = this.state.uid
    //     //return r
    //     firestoreDB.collection("Parent").doc(r).get()
    //     .then(function(doc){
    //         if(doc.exits) {
    //             this.setState({
    //                 children : doc.data().children
    //             })
    //             console.log("if")
    //         }
    //         else{
    //             this.setState({
    //                 children : ["nada"]
    //             })
    //         }
    //     })
    // }

            //this.setInformation = this.setInformation.bind(this)
        
        // firebase.auth().onAuthStateChanged(function(user) {  
        //     if(user){
        //         console.log(user)
        //         var currentuser = firebase.auth().currentUser; 
        //         console.log("UID: "+currentuser.uid)
        //         var id = currentuser.uid
        //         firebase.firestore().collection("Parent").doc(id).get()
        //         .then(function(doc){
        //             this.setState({
        //                 uid: currentuser.uid,
        //                 email: currentuser.email
        //             })
        //             if(doc.exists) {
        //                 console.log("doc found and setting states")
        //                 this.setState({
        //                     username: doc.data().name,
        //                     children: doc.data().children,
        //                     haveChildren: true
        //                 })
        //             }
        //             else{
        //                 console.log("doc  does not exist")
        //             }
        //         }.bind(this)) //stackover flow worked dw why https://stackoverflow.com/questions/31045716/react-this-setstate-is-not-a-function
        //     }
        //     else{
        //         //REDIRECT BACK TO PAGE SAYING USER NOT SIGNED IN
        //         window.location.assign("/")
        //     } 
        // }.bind(this))

/*
<div>
            <div><button onClick={this.signOut}>Sign Out </button></div>
            <div>
                {console.log("dash: "+JSON.stringify(this.state.products))}
                {this.state.products.map((item,key)=>{
                    return <div key={key}>
                        <hr></hr>
                        <div>Child ID: {item.childID}</div>
                        <div>Child Name: {item.childName}</div>
                        <div>{item.Games.map((item2, key) => {
                            return <div key={key}>
                                    
                                    <p>GameID: {item2.gameID}</p>
                                    <p>Subject: {item2.Subject}</p>
                                    <p>Title: {item2.title}</p>
                                    <p>Score: {item2.score}</p>
                                    <p>NCP: {item2.ncp}</p>  
                                    </div>
                                })}</div>
                                
                            </div>
                            
                        })}
                        <hr></hr>
                        </div>
                        <div className="container childdashcon">
                            <div className="section"></div>
                                <div className="row ">
                                    <div className="col s2"><a id="logo-container x" href="#!" ><img className="brand-logo left logo"src={logo} alt='logo'/></a></div>
                                    <div className="col s2 offset-s2 adultDashTitle"> Parent Dashboard </div>
                                </div>
                                <div className="row dashboard xy"> 
                               
                                <Tabs>
                                <TabList>
                                <Tab>Welcome</Tab>   
                                {this.state.childrenNames.map((item,key) =>{
                                    return <Tab>{item}</Tab>
                                })}   
                                <Tab><i className="material-icons right">settings</i>Settings</Tab>
                                </TabList>
                                <TabPanel>
                                    Heres how it works 
                                </TabPanel>
                                
                                    
                                
                                {this.state.childrenNames.map((item,key) =>{
                                    return(
                                        <TabPanel>
                                             <div>{item}</div>
                                        </TabPanel>
                                    )
                                })} 
                                <TabPanel>
                                <form className="col s12">
                                    <div className="input-field col s12"><input placeholder="Edit name" id="name" type="text" className="validate"/></div>
                                                                
                                    <div className="input-field col s12"><input disabled value="email" id="disabled" type="text" className="validate"/>    </div>
                                            
                                    <div className="input-field col s12"><input placeholder="update password" id="password" type="password" className="validate"/></div>
                                                                
                                    <div className="input-field col 2"><button className="btn waves-effect waves-light" type="submit" name="action">Submit<i className="material-icons right">chevron_right</i></button></div>
                                                                
                                    <div className="input-field col 2">
                                        <button className="waves-effect waves-light btn modal-trigger" href="#addAChild" >Add a Child
                                            <i className="material-icons right">person_add</i>
                                        </button>
                                        </div>
                                        
                                </form> 
                                        
                                </TabPanel>
                                </Tabs>
                                    <div id="addAChild" className="modal">
                                        <div className="modal-content">
                                            <form><label >Insert your childs ID</label><input type="text" className="validate" name="insert" onChange={this.handleAdd}/>  </form>   
                                        </div>
                                        <div className="modal-footer col 12">
                                            <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6">Cancel</a>
                                            <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6" onClick={this.addChild}>Add</a>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                 )
*/