
import React, { Component } from 'react'; //component is a function
import M from "materialize-css"; 
import './resources/refined.css'

class Benefits extends Component {
    componentDidMount(){
        M.AutoInit();
    }
   
    render() {
        return (
            <div className="container" id="Benefits" >
                    <div  className="section">
                    <div className="row"><h4 className="grey-text text-darken-3">Benefits</h4></div>

                    <div className="row">
                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className=" medium material-icons">flash_on</i></h2>
                            <h5 className="center">Strengths</h5>

                            <p className="light">"See your strengths for all the topics combined in the chosen subject.</p>
                        </div>
                        </div>

                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className="medium material-icons">assessment</i></h2>
                            <h5 className="center">Progress</h5>

                            <p className="light">"You, your teacher and parent can see your progress over time. "</p>
                        </div>
                        </div>

                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className="medium material-icons">feedback</i></h2>
                            <h5 className="center">Feedback Reports</h5>

                            <p className="light">"Get a written feedback report which you can print off to see what you need to work on."
                            </p>
                        </div>
                        </div>
                    </div>

                    </div>
                    <div className="divider"></div>
                </div> 
        );
    }
  }
  export default Benefits;
