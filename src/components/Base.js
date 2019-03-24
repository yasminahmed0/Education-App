import React, { Component } from 'react'; //component is a function
import Header from './Header'
//import Footer from './Footer'
import Feedback from './Feedback'
import HowItWorks from './HowItWorks'
import Benefits from './Benefits'
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

    render() {
        return (
            <div>
                <Header />
                <SignIn />
                <HowItWorks />
                <Benefits />
                <SignUp />
                <Feedback />
                {/* <Footer /> */}
            </div>
        );
    }
}


export default Base;
