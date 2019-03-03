import React, { Component } from 'react';
import menu from '../../resources/css/img/menu.png';
import logo from '../../resources/css/img/logo.png';
import { fbApp, firestoreDB } from '../../../firebase';
import * as firebase from 'firebase';
//import SemiCircleProgressBar from "react-progressbar-semicircle";
//{/* https://www.npmjs.com/package/react-progressbar-semicircle */}
//import { FieldValue } from '@google-cloud/firestore'



//current user object 
//printing children out 
//adding children 

class AdultDashboard extends Component{ 

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            uid: null,
            email: null,
            children:[],
            newValue: null,
            haveChildren: false
        }
        
        //this.setInformation = this.setInformation.bind(this)
        
        fbApp.auth().onAuthStateChanged(function(user) {  
            if(user){
                console.log(user)
                var currentuser = fbApp.auth().currentUser; 
                console.log("UID: "+currentuser.uid)
                var id = currentuser.uid
                firestoreDB.collection("Parent").doc(id).get()
                .then(function(doc){
                    this.setState({
                        uid: currentuser.uid,
                        email: currentuser.email
                    })
                    if(doc.exists) {
                        console.log("doc found and setting states")
                        this.setState({
                            username: doc.data().name,
                            children: doc.data().children,
                            haveChildren: true
                        })
                    }
                    else{
                        console.log("doc  does not exist")
                    }
                }.bind(this)) //stackover flow worked dw why https://stackoverflow.com/questions/31045716/react-this-setstate-is-not-a-function
            }
            else{
                //REDIRECT BACK TO PAGE SAYING USER NOT SIGNED IN
                window.location.assign("/")
            } 
        }.bind(this))
        this.addChild = this.addChild.bind(this)
    }

    handleAdd = e => {
        e.preventDefault()
        const { name, value} = e.target //video
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
            if( this.state.newValue != null){
                var ref = firestoreDB.collection("Parent").doc(this.state.uid)
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
        fbApp.auth().signOut()
        console.log("User has been signed out")
    }

	render(){
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
                            Dashboard
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
                    <div>Add Child:
                        <input type="text" onChange={this.handleAdd}></input>
                        {<button onClick={this.addChild}>Add Child</button>}
                    </div>

                    {childs.map((item,index) => {  
                        return (<div className="row">
                                <div key={item.toString()} className={"col span-1-of-2 image "}>
                                    <div className="ChildP"><p>{item.toString()+"'s Progress"} </p> 
                                        console.log(arr[i]); }
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
    }
}

 


export default AdultDashboard;

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