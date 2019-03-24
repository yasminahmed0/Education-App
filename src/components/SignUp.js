import React, { Component } from 'react';
//import { fbApp, firestoreDB } from '../firebase';
import firebase from '../firebase'
import M from "materialize-css"; 
import './resources/refined.css'

export default class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: null,
            email: null,
            password: null,
            userType: 'child',
            //id: null,
            error: {
                message: '' 
            }
        }
        this.submitForm = this.submitForm.bind(this)   
    }
    componentDidMount(){
        M.AutoInit();
    }

    submitForm(e){
        e.preventDefault();
        const { username, email, password, userType } = this.state;
        //var db = firebase.firestore()
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(UserCredential => {
            //auth state changes here so what is user doc not finished and strore tries  to get data?
             firebase.firestore().collection("Users").doc(UserCredential.user.uid).set({
                name: username,
                Type: userType
            }) //can this cause issue if the if statements are executed before User db is filled
            if(userType === "child"){
                firebase.firestore().collection("Children").doc(UserCredential.user.uid).set({
                    name: username,
                    email: email,
                    age: 0,
                    goal: ""
                }).then(() => {
                    window.location.assign("/dashboard")
                })
            }
            else{
                firebase.firestore().collection("Parent").doc(UserCredential.user.uid).set({
                    name: username,
                    email: email,
                    children: []
                }).then(() => {
                    window.location.assign("/dashboard")
                })
            }   
        })
        .catch(error => {
            this.setState({ error })
        })        
    }  
        
    signOut(){
        firebase.auth().signOut()
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
    }
    
    render() {
       
        return (


            <div className="row container"> 
                <div className="col s12 signup" >
                     <form onSubmit={this.submitForm}>
                                
                                <table className="signtable">
                                <th><div className="row">
                                <p>Sign Up</p>
                                <p>Signing up allows you to save progress and for parents to monitor childrens process<br />Nice quick and easy!</p>
                                </div></th>
                                    <tr>
                                  <td><label htmlFor="username">Name</label></td> 
                                  <td> <input name="username" type="text" onChange={this.handleChange} /> <br /></td> 
                                   </tr>
                                   <tr>
                                   <td> <label htmlFor="email">Email</label></td>
                                   <td><input name="email" type="email" onChange={this.handleChange} /> <br /></td>
                                   </tr>
                                   <tr>
                                   <td><label htmlFor="password">Password</label></td>
                                   <td><input name="password" type="password" onChange={this.handleChange} /> <br /></td>
                                   </tr>
                                   
                                   <tr>
                                   <td><label>Account Type:</label></td> 
                                    <td>
                                    <select onChange={this.handleAdd}>
                                        <option value="Child">Child</option>
                                       <option value="Parent">Parent</option>
                                    </select>
                                        </td>
                                   </tr>
                                   
                                   <div className="createAccount">
                                   <td> <button className="btn waves-effect waves-light" type="submit" name="action">Submit<i className="material-icons right">send</i></button></td>
                                   <td>  <small>Already Have an Account? Click here</small><br /></td>

                                    <p>{this.state.error.message}</p> 
                                   </div>
                               </table>
                          </form>
                          </div>
                      
          </div> //one

        
        )
        /*return (
            <div>
                <p></p>
                <section className="sign-up">
                    <div className="row">
                        <h2>Sign Up</h2>
                        <p>Signing up allows you to save progress and for parents to monitor childrens process<br />Nice quick and easy!</p>
                    </div>
                    <div className="row">
                        <div className="col span-2-of-2 box">
                            <form onSubmit={this.submitForm}>
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
                            <button onClick={this.signOut}>Sign Out </button> 
                        </div>
                    </div>
                </section>
            </div>
        )*/
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

        
        //this.signOut = this.signOut.bind(this)
        //https://us-central1-education-app-976ac.cloudfunctions.net/helloWorld
        //fetch()

            //showID = () => {
      //  return fbApp.auth.UserInfo.id
    //}

    // async handleSubmit(e) {
    //     e.preventDefault();//return promises (firecast utube video)
    //     const { username, email, password, userType } = this.state;

    //     let UserCredential = await fbApp.auth().createUserWithEmailAndPassword(email, password)
    //     .catch(error => {
    //         this.setState({ error })
    //     });
    //     //if error then try to sign up you can't sign up
    //     if(this.state.error.message == null){
    //         let bob = await firestoreDB.collection("Users").doc(UserCredential.user.uid).set({
    //             Type: userType,
    //             name: username //might make it display name
    //         })
    //         if(this.state.userType == "child"){
    //             let yas = await firestoreDB.collection("Children").doc(UserCredential.user.uid).set({
    //                 name: username,
    //                 email: email,
    //                 age: null
    //             })
    //         }
    //         else{
    //             let sid = await firestoreDB.collection("Parent").doc(UserCredential.user.uid).set({
    //                 name: username,
    //                 email: email,
    //                 children: []
    //             })
    //         }
    //         try{
    //             var doc = await fbApp.auth().onAuthStateChanged(function(user) {
    //                 if(user) {
    //                     var account = firestoreDB.collection("Users").doc(user.uid);
    //                     account.get()
    //                     .then(function(doc){
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
    //                         } 
    //                         else {
    //                             // doc.data() will be undefined in this case
    //                             console.log("No such document!");
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //         catch(error){
    //             console.log('NO CHANGE IN AUTH STATE') 
    //         }
    //     }
    // }