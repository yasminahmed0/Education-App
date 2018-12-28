import React, { Component } from 'react'; //component is a function
import './App.css';
import './components/resources/css/grid.css';
import './components/resources/css/normalize.css';
import './components/resources/css/style.css';

import logo from './components/resources/css/img/logo.png';

import Footer from './components/Footer'
import Feedback from './components/Feedback'
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Subjects from './components/Subjects';

//constructor is triggered by default.
//this.state a way to keep track of variables
class App extends Component {
    verify = (event) => {
        var username = localStorage.getItem('username')
        var password = localStorage.getItem('password')
        var uInput = event.target.elements.userBox.value
        if (username === uInput) {
            console.log("same")
        }
        else {
            console.log("fail")
        }

    }
    render() {
        return (
            <div>
                {/*  HEADER SECTION */}
                    <header>
                        <nav>
                            <div className="row">
                                <img src={logo} alt="Swan Academics Logo" className="logo"></img>
                                <ul className="navigation">
                                    {
                                        ["Register", "About Us", "Feedback", "Sign-Up",].map((item) => {
                                            return <li key={item.toString()}><a href="#">{item}</a></li>;
                                        })}
                                </ul>
                            </div>
                        </nav>
                        
                        <div className="hero-text-box">
                            <h1>Try learning the fun way</h1>
                            <a className="button filled-button" href="#">Learn More</a>
                            <a className="button filled-button" href="#">Play</a>
                        </div>
                    </header> 

                    {/* <!-- HOW IT WORKS SECTION --> */}
                    <HowItWorks />

                    {/* BENEFITS OF SIGNING-UP SECTION  */}
                    <Benefits />

                    {/* SIGN UP */}
                    {/* CSS NEEDS TO BE APPLIEDS */}
                    <section className="sign-up">
                        <div className="row">
                            <h2>Sign Up</h2>
                        </div>
                        <div className="row">
                            <div className="col span-2-of-2 box">
                                <form id="SignUp" method="POST" onSubmit={this.verify}>
                                    <input name="userBox" type="text" placeholder="Type username..."></input><br></br>
                                    <input name="pass" type="password" /><br></br>
                                    <button type="submit">Submit</button>
                                </form>
                                <p>Redirect:
                    
                                    {/* (() => <div>{ (JSON.parse(localStorage.getItem('user'))) }</div>)() */}
                                </p>
                                <p>Password: </p>
                            </div>
                        </div>
                    </section>

                    {/* SUBJECTS SECTION  */}
                    <Subjects />

                    {/* FEEDBACK SECTION  */}
                    <Feedback />

                    {/* FOOTER  */}
                    <Footer />
            </div>
        );
    }
}


export default App;
