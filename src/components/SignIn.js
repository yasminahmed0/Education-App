import React, { Component } from 'react';
import { fbApp } from '../firebase';

export default class SignIn extends Component {

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


    render() {
        return (
            <div>
                <section className="sign-up">
                    <div className="row">
                        <h2>SIGN IN</h2>
                        <p>SIGN IN NOWWWWWWWWWWWWWWWWWWWWW YESSSS BLUD IT WOKRING HAHAHAHAHAHA</p>
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