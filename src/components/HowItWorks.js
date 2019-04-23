
import React, { Component } from 'react'; //component is a function
import M from "materialize-css"; 
import './resources/refined.css'

class HowItWorks extends Component {
    componentDidMount(){
        M.AutoInit();
    }
    
        
    render() {
        return (
            <div className="container" id="About">
                    <div className="section">
                    <div className="row"><h4 className="grey-text text-darken-3">How it works</h4></div>

                    <div className="row">
                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className="medium material-icons">account_circle</i></h2>
                            <h5 className="center">Sign-Up</h5>

                            <p className="light">Sign-up or just go to the subject section and pick a subject. Signing up has more benefits!</p>
                        </div>
                        </div>

                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className="medium material-icons">group</i></h2>
                            <h5 className="center">Year Group</h5>

                            <p className="light">Now that you have selected the subject, pick a year group!</p>
                        </div>
                        </div>

                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className="medium material-icons">settings</i></h2>
                            <h5 className="center">Topic</h5>

                            <p className="light">"Now pick the topic you wish to learn and start learning the fun way. Don't forget to register to keep track of your progress."</p>
                        </div>
                        </div>
                    </div>

                    </div>
                    <div className="divider"></div>
                </div>    
        );
    }
  }
  export default HowItWorks;

