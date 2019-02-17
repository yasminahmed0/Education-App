import React, { Component } from 'react'; //component is a function
import { fbApp } from '../firebase'; //imports const fbApp 

import './resources/css/grid.css';
import './resources/css/normalize.css';
import './resources/css/style.css';

import Header from './Header'
import Footer from './Footer'
import Feedback from './Feedback'
import HowItWorks from './HowItWorks'
import Benefits from './Benefits'
import Subjects from './Subjects'
import SignUp from './SignUp'
import SignIn from './SignIn'

//constructor is triggered by default.
//this.state a way to keep track of variables
//this refers to the Component (called App), state is the state of component
//each component needs a render method. render is a function 
//return can only return one thing all wrapped in jsx file 
class Base extends Component {
    
    //SMH dont need to check if logged in or not bcos if they are user is redirected !!!! istupiddddd
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            info: ["Register", "About Us", "Feedback", "Sign-Up",]
        }
    }

    firebaseApp = fbApp.auth().onAuthStateChanged(user => {
        if (user) {
            this.setState({
                isLoggedIn: true
            })
        }
    })


    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let componentToDisplay;

        componentToDisplay = isLoggedIn ? <SignUp /> : <SignUp />

        return (
            <div>
                {/*  HEADER SECTION */}
                <Header />

                {/* <!-- HOW IT WORKS SECTION --> */}
                <HowItWorks />

                {/* BENEFITS OF SIGNING-UP SECTION  */}
                <Benefits />

                {/* SIGN IN OR SIGN UP */}
                {componentToDisplay}

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


export default Base;
