import React, { Component } from 'react';
import { fbApp, firestoreDB } from '../firebase';

export default class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //username: null,
            email: null,
            password: null,
            error: {
                message: '' 
            }
        }
    }

    handleSubmit = e => {
        //could change to username to display name in order to allow children to sign in with username
        e.preventDefault();//return promises (firecast utube video)
        const { email, password } = this.state;
        fbApp.auth().signInWithEmailAndPassword(email, password).catch(error => {
            this.setState({ error }) 
            //alert(error.message)
        });

        try{
             fbApp.auth().onAuthStateChanged(function(user) {
                if(user) {
                    var account = firestoreDB.collection("Users").doc(user.uid);
                    account.get()
                    .then(function(doc){
                        if (doc.exists) {
                            var accType = doc.data().Type 
                            if(accType === "child"){
                                //console.log('new person signed up')
                                window.location.assign("/childdash")
                            }
                            else if(accType == "parent"){
                                window.location.assign("/adultdash")
                            }
                            else{
                                console.log("ERROR")
                            }
            
                            //console.log("Document data:", doc.data());
                        } 
                        else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    })
                }
            })
        }
        catch(error){
            console.log('NO CHANGE IN AUTH STATE') 
        }
    }

    handleChange = e => {
        e.preventDefault(); //stops data appearing in url
        const { name, value } = e.target; //name=firstname or email etc
        this.setState({ [name]: value })  //[name] means name is a key -> becomes email: value and password: value
        //console.log(this.state)
    }

    render() {
        return (
            <div>
                <section className="sign-up">
                    <div className="row">
                        <h2>SIGN IN</h2>
                    </div>
                    <div className="row">
                        <div className="col span-2-of-2 box">
                            <form onSubmit={this.handleSubmit} noValidate>
                                <label htmlFor="username">Username</label>
                                <input name="username" type="username" onChange={this.handleChange} /> <br />

                                <label htmlFor="email">Email</label>
                                <input name="email" type="email" onChange={this.handleChange} /> <br />

                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" onChange={this.handleChange} /> <br />

                                <div className="createAccount">
                                    <button type="submit">SIGN IN</button><br />
                                    
                                </div>
                            </form>
                            {/* <button onClick={this.signOut}>Sign Out </button> */}
                            <p>{this.state.error.message}</p>
                        </div>
                    </div>
                </section>


            </div>
        )
    }
}