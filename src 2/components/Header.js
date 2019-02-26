import React, { Component } from 'react'
import logo from './resources/css/img/logo.png';

export default class Header extends Component{
   
    constructor(props) {
        super(props)
        this.state = {
            info: ["Register", "About Us", "Feedback", "Sign-Up",],
            secondInfo: ["Learn More", "Play"]
        }
    }

    render(){
        return (
            <header className="header">
                    <nav>
                        <div className="row">
                            <img src={logo} alt="Swan Academics Logo" className="logo"></img>
                            <ul className="navigation">
                                {
                                    this.state.info.map((item) => {
                                        return <li key={item.toString()}><a href="#">{item}</a></li>;
                                    })}
                            </ul>
                        </div>
                    </nav>

                    <div className="hero-text-box">
                        <h1>Learning the fun way</h1> {
                            this.state.secondInfo.map((item) => <a className="button filled-button" href="#" key={item.toString()}>{item}</a>)
                        }
                    </div>
                </header>
        )
    }
}