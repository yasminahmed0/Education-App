import React, { Component } from 'react';
//import menu from '../../resources/css/img/menu.png';
import logo from '../../resources/css/img/logo.png';
import M from "materialize-css"; 
//import { fbApp, firestoreDB } from '../../../firebase';
//import * as firebase from 'firebase';
import firebase from '../../../firebase';
import store from '../../../store'
import $ from 'jquery';
//import SemiCircleProgressBar from "react-progressbar-semicircle";
//{/* https://www.npmjs.com/package/react-progressbar-semicircle */}
//import { FieldValue } from '@google-cloud/firestore'


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
            newValue: null,
            childrenNames: [],
            haveChildren: false
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
                    childrenNames: data.childrenNames
                })    
            }   
        })
        console.log("state: "+this.state.childrenNames)
        this.addChild = this.addChild.bind(this)
    }

    componentDidMount(){
        M.AutoInit();
        $(".links").click(function(){
            $(".divs:visible").hide();
            $("#"+$(this).attr("data-showdiv")).show();
        });
    }

    handleAdd = e => {
        e.preventDefault() //removed name
        const { value} = e.target //video
        console.log("e.target value: "+value)
        //if(value != null){
            this.setState({
                newValue: value
            })  
            console.log("State value: "+this.state.newValue)
       //}
        
    }

    addChild() {
        if(this.state.uid != null ){
            console.log("UID is not null " + this.state.uid)
            if(this.state.newValue != null){
                var ref = firebase.firestore().collection("Parent").doc(this.state.uid)
                ref.update({
                    children: firebase.firestore.FieldValue.arrayUnion(this.state.newValue)
                })
            }
            else{
                alert("Cannot be empty")
            }
        } 
        //window.location.reload(); this did not work. NEED TO REFRESH 
    }

    //signs user out then redirects them back to base page
    signOut(){
        firebase.auth().signOut()
        window.location.assign("/")
    }

    printChildren(){
        this.state.children.map((child,index) => {
            return (<div key={index.toString()}>
                <p>{child}</p>
            </div>)
        })
        //firebase.firestore().collection("Children").S
    }

    getChildren(){
        //query children from children column
        const list = []
        const ref = firebase.firestore().collection("Children")
        this.state.children.map((item, key) => {
            console.log("item: "+item)
            ref.doc(item).get().
            then(doc => {
                console.log("name "+doc.data().name)
                list.push(doc.data().name)
            })
        })
        //console.log("this is list: "+list)
        return list
        //then set state to name or return array of name
    }

    render() {
       // console.log("Function return: "+this.getChildren())
        //console.log("state: "+this.state.childrenNames)
        const email=this.state.email
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
                                    {this.state.childrenNames.map((item,key) => {
                                        return (<div>
                                                    <li><div ><a className="waves-effect links sidenavop" id={"Link"+key} data-showdiv={"Div"+key}><i className="material-icons right">person_outline</i>{item}</a></div></li>
                                                    <li><div className="divider"></div></li>
                                                </div>)})}
                                    <li><div ><a className="waves-effect links sidenavop" id="LinkSettings" xs data-showdiv={"DivSettings"}><i className="material-icons right">settings</i>Settings</a></div></li>
                                    <li><div className="divider"></div></li>
                                    <li><div ><a className="waves-effect links sidenavop" id="LinkUsefulLink" data-showdiv={"DivUsefulLink"}><i className="material-icons right">links</i>Useful Links</a></div></li>
                                </ul>
                            </div>
                            <div className="col s9">
                                {this.state.childrenNames.map((item,key) => {
                                    return (<div id={"Div"+key} className="divs" style={{display:'none'}}>{item}
                                                <div className="row ">
                                                    <div className="col s12">
                                                        <ul className="tabs">
                                                            <li className="tab col s6"><a href="#Maths">Maths</a></li>
                                                            <li className="tab col s6"><a href="#English">English</a></li>
                                                        </ul>
                                                        <div id="Maths" className="col s12" >{"Maths" }</div>
                                                        <div id="English" className="col s12">{"English"}</div>
                                                    </div>                                   
                                                </div>
                                                <div className="input-field col 2">
                                                    <button className="waves-effect waves-light btn modal-trigger" href="#removeAChild" type="submit" name="action"> Remove Child<i className="material-icons right">clear</i></button>
                                                </div>
                                        </div>)})}
                                    <div id="DivSettings" className="divs" style={{display:'none'}}>
                                        <form className="col s12">
                                            <div className="input-field col s12"><input placeholder="Edit name" id="name" type="text" className="validate"/></div>
                                            
                                            <div className="input-field col s12"><input disabled value={email} id="disabled" type="text" className="validate"/>    </div>
                        
                                            <div className="input-field col s12"><input placeholder="update password" id="password" type="password" className="validate"/></div>
                                            
                                            <div className="input-field col 2"><button className="btn waves-effect waves-light" type="submit" name="action">Submit<i className="material-icons right">chevron_right</i></button></div>
                                            
                                            <div className="input-field col 2">
                                                <button className="waves-effect waves-light btn modal-trigger" href="#addAChild" type="submit" name="action">Add a Child
                                                <i className="material-icons right">person_add</i>
                                                </button>
                                            </div>
                                        </form>
                                        <div id="addAChild" className="modal">
                                            <div className="modal-content">
                                                <form><label for="childUserID">Insert your childs ID</label><input id="childUserID" type="text" className="validate"/>  </form>   
                                            </div>
                                                <div className="modal-footer col 12">
                                                    <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6">Cancel</a>
                                                    <a href="#!" className="modal-close waves-effect waves-green btn-flat col 6">Add</a>
                                                </div>
                                        </div>
                                    </div> {/* id=DivSetting */}
                                <div id="DivUsefulLink" className="divs" style={{display:'none'}}>Useful Links</div>
                            </div> {/* col s9 */}
                        </div> {/* row dashboar xy div */}
                    </div> {/* section div */}
                </div> {/* container div */}
            </div> //return div
        );
    }
}

export default AdultDashboard;

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