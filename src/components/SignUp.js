import React, { Component } from 'react';
import { fbApp } from '../firebase';

export default class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: null,
            email: null,
            password: null,
            error: {
                message: '' //doesnt work with response_message
            }
        }
    }
    //always variable => {}
    handleSubmit = e => {
        e.preventDefault();//return promises (firecast utube video)
        const { username, email, password } = this.state //es6 something notation. Might not be actually -> check blog post
        fbApp.auth().createUserWithEmailAndPassword(email, password)
            .then(data => {
                const { user } = data //what is deconstructing and why do i need to do it?

            })
            .catch(error => this.setState({ error })) //apparently swallowing promise rejections

    }

    handleChange = e => {
        e.preventDefault(); //stops data appearing in url
        const { name, value } = e.target; //name=firstname or email etc

        this.setState({ [name]: value }, () => {
            console.log(this.state)
        }); //[name] means name is a key -> becomes email: value and password: value
    }

    render() {
        return (
            <div>
                <section className="sign-up">
                    <div className="row">
                        <h2>Sign Up</h2>
                        <p>Signing up allows you to save progress and for parents to monitor childrens process<br />Nice quick and easy!</p>
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
                                    <button type="submit">Create Account</button>
                                    <small>Already Have an Account? Click here</small><br />

                                    <p>{this.state.error.message}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>


            </div>
        )
    }
}