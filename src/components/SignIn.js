import React, { Component } from 'react';
//import { getUser } from '../firebase';
import firebase from 'firebase'
//import store from '../store'
import './resources/refined.css'
import M from "materialize-css"; 
export default class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            error: {
                message: '' 
            }
        }
    }
    componentDidMount(){
        M.AutoInit();
    }
    handleSubmit = e => {
        e.preventDefault();//return promises (firecast utube video)
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            //user = firebase.auth().currentUser
            window.location.assign("/dashboard")          
        })
        .catch(error => {
            this.setState({ error }) 
        })
    }

    handleChange = e => {
        e.preventDefault(); //stops data appearing in url
        const { name, value } = e.target; //name=firstname or email etc
        this.setState({ [name]: value })  //[name] means name is a key -> becomes email: value and password: value
        //console.log(this.state)
    }

    render() {
        return (
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div id="login-page" className="row">
                            <div className="col s12 z-depth-6 card-panel">
                                <form className="login-form" onSubmit={this.handleSubmit}>
                                    <div className="row">Sign up</div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <i className="material-icons prefix">mail_outline</i>
                                        <input className="validate" id="email" type="email" name="email" onChange={this.handleChange}/>
                                        <label for="email" data-error="wrong" data-success="right">Email</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <i className="material-icons prefix">lock_outline</i>
                                        <input id="password" type="password" name="password" onChange={this.handleChange}/>
                                        <label for="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <button className="btn waves-effect waves-light col s12 btn" type="submit" name="submit">Login</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6 m6 l6">
                                        <p className="margin right-align medium-small">>Forgot password?</p>
                                        </div>          
                                    </div>
                                    {this.state.error.message}
                                </form>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>  
            /*<div>
                <section className="sign-up">
                    <div className="row">
                        <h2>SIGN IN</h2>
                    </div>
                    <div className="row">
                        <div className="col span-2-of-2 box">
                            <form onSubmit={this.handleSubmit} noValidate>
                                <label htmlFor="email">Email</label>
                                <input name="email" type="email" onChange={this.handleChange} /> <br />

                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" onChange={this.handleChange} /> <br />

                                <div className="createAccount">
                                    <button type="submit">SIGN IN</button><br />
                                </div>
                            </form>
                            <button onClick={this.signOut}>Sign Out </button> 
                            <p>{this.state.error.message}</p>
                        </div>
                    </div>
                </section>


            </div>*/
        )
    }
}

// try{
//     fbApp.auth().onAuthStateChanged(function(user) {
//        if(user) {
//            var account = firestoreDB.collection("Users").doc(user.uid);
//            account.get()
//            .then(function(doc){
//                if (doc.exists) {
//                    var accType = doc.data().Type 
//                    if(accType === "child"){
//                        window.location.assign("/childdash")
//                    }
//                    else if(accType == "parent"){
//                        window.location.assign("/adultdash")
//                    }
//                    else{
//                        console.log("ERROR")
//                    }
//                    //console.log("Document data:", doc.data());
//                } 
//                else {
//                    // doc.data() will be undefined in this case
//                    console.log("No such document!");
//                }
//            })
//        }
//    })  
// }
// catch(error){
//    console.log('Error - no user logged in lol ') 
// }

//getUser 
            //.then((user) => {
                // firebase.firestore().collection("Users").doc(user.uid).get()
                // .then(function (doc) {
                //     if(doc.exists){
                //         var accType = doc.data().Type 
                //         console.log("accType = "+accType)
                //             if(accType == "parent"){
                //                 window.location.assign("/adultdash")
                //             }
                //             else if(accType == "child"){
                //                 window.location.assign("/childdash")
                //             } //if i swap goes to error page
                //             else{
                //                 console.log("ERROR")
                //             }
                //         //acc == "child" ? window.location.assign("/childdash") : window.location.assign("/adultdash")
                //     }
                //     else{
                //         console.log("doc does not exist")
                //     }
                // })
                // .catch((error) => {
                //     console.log("3rd then: "+error)
                // })
            //})
            // .catch((error) => {
            //     console.log("2nd then (catch of getUser): "+error)
            // })