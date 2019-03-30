
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
/*import React, { Component } from 'react';

export default class Benefits extends Component {

    constructor(props) {
        super(props)
        this.state = {
            info: [
                {
                    val: 1,
                    icon: "pie",
                    h3: "Strengths",
                    p: "See your strengths for all the topics combined in the chosen subject. These are based on how well you did in each topic game that you've played."
                },
                {
                    val: 2,
                    icon: "trending-up",
                    h3: "Progress",
                    p: "You, your teacher and parent can see your progress over time. "
                },
                {
                    val: 3,
                    icon: "pie",
                    h3: "Feedback Reports",
                    p: "Get a written feedback report which you can print off to see what you need to work on."
                }
            ]
        }
    }
    render() {
        return (
            <section className="section-benefits-of-signing-up">
                <div className="row">
                    <h2>Benefits of signing-up</h2>
                </div>
                <div className="row">
                    {this.state.info.map((item) => {
                        return <div key={item.val.toString()} className="col span-1-of-3 box">
                            <ion-icon name={item.icon}></ion-icon>
                            <h3>{item.h3}</h3>
                            <p>
                                {item.p}
                            </p>
                        </div>
                    })}

                </div>
            </section>
        )
    }
}


<div className="container" >
                    <div className="section">

                    <div className="row">
                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                            <h5 className="center">Strengths</h5>

                            <p className="light">"See your strengths for all the topics combined in the chosen subject. These are based on how well you did in each topic game that you've played."</p>
                        </div>
                        </div>

                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                            <h5 className="center">Progress</h5>

                            <p className="light">"You, your teacher and parent can see your progress over time. "</p>
                        </div>
                        </div>

                        <div className="col s12 m4">
                        <div className="icon-block">
                            <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
                            <h5 className="center">Feedback Reports</h5>

                            <p className="light">"Get a written feedback report which you can print off to see what you need to work on."
                            </p>
                        </div>
                        </div>
                    </div>

                    </div>
                </div>


*/