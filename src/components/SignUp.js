import React, { Component } from 'react';
import { fbApp, firestoreDB } from '../firebase';



export default class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: null,
            email: null,
            password: null,
            userType: 'child',
            id: null,
            error: {
                message: '' 
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        //this.signOut = this.signOut.bind(this)
        //https://us-central1-education-app-976ac.cloudfunctions.net/helloWorld
        //fetch()
    }
    

    async handleSubmit(e) {
        e.preventDefault();//return promises (firecast utube video)
        const { username, email, password, userType } = this.state;

        
        let UserCredential = await fbApp.auth().createUserWithEmailAndPassword(email, password)
        .catch(error => {
            this.setState({ error })
            
        });
        
        if(this.state.error.message == null){
            // console.log(UserCredential);
            let bob = await firestoreDB.collection("Users").doc(UserCredential.user.uid).set({
                Type: userType,
                name: username //might make it display name
            })

            //maybe put into then statement 
            //add Goal
            if(this.state.userType == "child"){
                let yas = await firestoreDB.collection("Children").doc(UserCredential.user.uid).set({
                    name: username,
                    email: email,
                    age: null
                })
            }
            else{
                let sid = await firestoreDB.collection("Parent").doc(UserCredential.user.uid).set({
                    name: username,
                    email: email,
                    children: []
                })
            }
            
            //each function with then use awit instead
            //try catch from first await, try to catch the entire function
            try{
                var doc = await fbApp.auth().onAuthStateChanged(function(user) {
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
    }      
        
    handleChange = e => {
        e.preventDefault(); //stops data appearing in url
        const { name, value } = e.target; //name=firstname or email etc
        this.setState({ [name]: value })  //[name] means name is a key -> becomes email: value and password: value
        console.log(this.state)
    }

    handleAdd = e => {
        e.preventDefault();
        //console.log("e.target.value "+e.target.value.toLowerCase())
        //const valueG  = e.target.value;   
        this.setState({
            userType: e.target.value.toLowerCase()
        })  
        //console.log("Dropdown: "+this.state.userType)
    }

    //showID = () => {
      //  return fbApp.auth.UserInfo.id
    //}
    
    render() {
        return (
            <div>
                <p></p>
                <section className="sign-up">
                    <div className="row">
                        <h2>Sign Up</h2>
                        <p>Signing up allows you to save progress and for parents to monitor childrens process<br />Nice quick and easy!</p>
                    </div>
                    <div className="row">
                        <div className="col span-2-of-2 box">
                            <form onSubmit={this.handleSubmit}>
                                <label htmlFor="username">Username</label>
                                <input name="username" type="username" onChange={this.handleChange} /> <br />

                                <label htmlFor="email">Email</label>
                                <input name="email" type="email" onChange={this.handleChange} /> <br />

                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" onChange={this.handleChange} /> <br />
                                <label>Account Type:</label>
                                <select onChange={this.handleAdd}>
                                    <option value="Child">Child</option>
                                    <option value="Parent">Parent</option>
                                </select>
                                <br />
                                <div className="createAccount">
                                    <button type="submit">Create Account</button>
                                    <small>Already Have an Account? Click here</small><br />

                                    <p>{this.state.error.message}</p>
                                </div>
                            </form>
                            {/* <button onClick={this.signOut}>Sign Out </button> */}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

//always variable => {}
    //turn into function
    /*handleSubmit = e => {
        e.preventDefault();//return promises (firecast utube video)
        const { username, email, password } = this.state //es6 something notation. Might not be actually -> check blog post
        fbApp.auth().createUserWithEmailAndPassword(email, password)
            .then(UserCredential => {  //returned user object, alternative is using fbApp.auth.currentUser
                const { currentUser } = UserCredential.user //what is deconstructing and why do i need to do it?
                console.log("Current user is: "+UserCredential.user.uid)
                
                    dbRefObject.ref('users/').child(UserCredential.user.uid).set({ //confused here
                        username: username,
                        email: email
                    })
            })
            .catch(error => this.setState({ error })) //apparently swallowing promise rejections
    }*/

    /*------------------------------------------------------------------------------------------------------------------------------------------------
    -> handleAdd(), handleChange() updates the state object.
    -> handleSubmit() add to db after submit button pressed, this function will need to call another function which will route to either a child or 
    parent dashboard page.
    -> to check whether child or parent type check the UserType state. if(this.state.userType)

    -------------------------------------------------------------------------------------------------------------------------------------------------*/

    //console.log(value)
        
        // fbApp.auth().createUserWithEmailAndPassword(email, password)
        //     .then(UserCredential => {
        //         //this.setState({id: UserCredential.user.uid})
        //         firestoreDB.collection("Users").doc(UserCredential.user.uid).set({
        //         Type: userType,
        //         name: username //might change to display name
        //         })
        //         .then(() => {
        //             fbApp.auth().onAuthStateChanged(function(user) {
        //                 if(user) {
        //                     var account = firestoreDB.collection("Users").doc(user.uid);
        //                     account.get()
        //                     .then(function(doc) {
        //                         if (doc.exists) {
        //                             var accType = doc.data().Type 
        //                             if(accType === "child"){
        //                                 //console.log('new person signed up')
        //                                 window.location.assign("/childdash")
        //                             }
        //                             else if(accType == "parent"){
        //                                 window.location.assign("/adultdash")
        //                             }
        //                             else{
        //                                 console.log("ERROR")
        //                             }
            
        //                             //console.log("Document data:", doc.data());
        //                         } else {
        //                             // doc.data() will be undefined in this case
        //                             console.log("No such document!");
        //                         }
        //                     })
        //                     .catch(function(error) {
        //                         console.log("Error getting document:", error);
        //                     });
        //                 } else {
        //                     console.log('NO CHANGE IN AUTH STATE') //GOES INSIDE THIS STATEMENT HENCE DOES NOT SET CURRENT USER
        //                 }
        //             })
        //         })
        //   
        // })            
        // .catch(function(error) {
        //     console.error("Error, user account not created or user account not written into document: ", error);
        // });