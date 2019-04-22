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
            },
            forgot_error: {
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

    // signOut(){
    //     firebase.auth().signOut()
    //     window.location.assign("/")
    // }

    forgotPassword = e => {
        e.preventDefault()
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(this.state.email).then(function() {
            console.log("success")
        })
        .catch(error => {
            this.setState({forgot_error: error})
        })
    }

    render() {
        return (
            <div className="container" id="Sign-in">
                <div className="section">
                    <div className="row">
                        <div id="login-page" className="row">
                            <div className="col s12">
                                <form className="login-form" onSubmit={this.handleSubmit}>
                                    <div className="row"><h4 className="grey-text text-darken-3 ">Sign In</h4></div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <i className="material-icons prefix icon-dark-green">mail_outline</i>
                                        <input className="validate" type="email" name="email" onChange={this.handleChange}/>
                                        <label htmlFor="email" data-error="wrong" data-success="right">Email</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <i className=" material-icons prefix icon-dark-green">lock_outline</i>
                                        <input id="password" type="password" name="password" onChange={this.handleChange}/>
                                        <label htmlFor="password">Password</label>
                                        <div className="input-field col 1">
                                        <small>Forgot Password? Click <a className="teal-text text-lighten-2 modal-trigger" href="#forgot">here</a></small>
                                        </div>  
                                        </div>
                                        
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s4 offset-s4">
                                        <button className="btn waves-effect waves-light offset-s4" type="submit" name="action">Submit<i className="material-icons right">send</i></button>
                                        </div>
                                               
                                    </div>
                                    {this.state.error.message}
                                </form>
                                <div id="forgot" className="modal">
                                    <div className="modal-content">
                                        <form onSubmit={this.forgotPassword}>
                                            <label htmlFor="email" data-error="wrong" data-success="right">Please enter your email address to reset your password</label>
                                            <input className="validate" type="email" name="email" onChange={this.handleChange}/>
                                            <small>{this.state.forgot_error.message}</small>
                                            <br></br>
                                            <button className="btn waves-effect waves-light btn-flat" type="submit">Submit</button>
                                            <a className="modal-close waves-effect waves-green btn-flat">Close</a>
                                            
                                        </form>
                                    </div>
                                    
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div className="divider"></div>
            </div>  
        )
    }
}

