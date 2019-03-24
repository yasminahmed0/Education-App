
import React, { Component } from 'react'; //component is a function
import M from "materialize-css"; 
import './resources/refined.css'

class HowItWorks extends Component {
    componentDidMount(){
        M.AutoInit();
    }
    
        
    render() {
        return (
            <div className="container">
                    <div className="section">

                    <div className="row">
                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                            <h5 className="center">Sign-Up</h5>

                            <p className="light">Sign-up or just go to the subject section and pick a subject. Signing up has more benefits!</p>
                        </div>
                        </div>

                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                            <h5 className="center">Year Group</h5>

                            <p className="light">Now that you have selected the subject, pick a year group!</p>
                        </div>
                        </div>

                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
                            <h5 className="center">Topic</h5>

                            <p className="light">"Now pick the topic you wish to learn and start learning the fun way. Don't forget to register to keep track of your progress."</p>
                        </div>
                        </div>
                    </div>

                    </div>
                </div>


                
        );
    }
  }
  export default HowItWorks;

/*import React, { Component } from 'react';

export default class HowItWorks extends Component{
    constructor(props){
        super(props)
        this.state = {
            info: [
                {
                    val: 1,
                    icon: "contact",
                    h3: "Sign-Up",
                    p: "Sign-up or just go to the subject section and pick a subject. Signing up has more benefits!",
                },
                {
                    val: 2,
                    icon: "people",
                    h3: "Year Group",
                    p: "Now that you have selected the subject, pick a year group!",
                },
                {
                    val: 3,
                    icon: "calculator",
                    h3: "Topic",
                    p: "Now pick the topic you wish to learn and start learning the fun way. Don't forget to register to keep track of your progress.",
                }
            ]
        }
    }
    render(){
        return (
            <section className="section-How-it-works">
            <div className="row">
                <h2>How does it work&#63;</h2>
                <p className="explanation">
                    Welcome, below you will find quick steps on how to use our website and start learning.
                </p>
            </div>
            
            <div className="row">
                {
                    this.state.info.map((item) => {
                        return <div key={item.val.toString()} className="col span-1-of-3 box">
                                    <ion-icon name={item.icon}></ion-icon>
                                    <h3>{item.h3}</h3>
                                        <p>{item.p}</p>
                                </div>})
                }
            </div>
        </section>   
        )
    }
}*/