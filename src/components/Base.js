import React, { Component } from 'react'; //component is a function
import Header from './Header'
import Footer from './Footer'
import Feedback from './Feedback'
import HowItWorks from './HowItWorks'
import Benefits from './Benefits'
import SignUp from './SignUp'
import SignIn from './SignIn'


class Base extends Component {
    
   
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            info: ["Register", "About Us", "Feedback", "Sign-Up",]
        }
    }

    render() {
        return (
            <div>
                <Header />
                <SignIn />
                <HowItWorks />
                <Benefits />
                <Feedback />
                <SignUp />
                <Footer />
            </div>
        );
    }
}


export default Base;
