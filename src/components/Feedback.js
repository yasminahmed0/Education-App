import React, { Component } from 'react'; //component is a function
import M from "materialize-css"; 
import './resources/refined.css'

export default class feedback extends Component {
    componentDidMount(){
        M.AutoInit();
    }
    constructor(props) {
        super(props)
        this.state = {
            info: [
                {
                    val: 1,
                    bq: '"I started using this website to better engage in my sons learning, it\'s been very helpful!"',
                    person: "Zeinab",
                    
                },
                {
                    val: 2,
                    bq: '"I must say, my daughter really enjoys playing these educational games! A fantastic approach to learning."',
                    person: "Michael",
                  
                },
                {
                    val: 3,
                    bq: '"I like Swan Academics because it helps me learn in a fun way! All my friends use it too."',
                    person: "Sophie",
                
                }
            ]
        } 
    }



    render(){
        return(
            <div className="container" id="Testimonials">
            <div className="section">
            <div className="row"><h4 className="grey-text text-darken-3" >User Testimonials</h4></div>

            <div className="row">

            {
                this.state.info.map((item,key) => {
                    return (
                        <div key={key} className="col s12 m4">
                            <div className="icon-block">
                            
                             <p className="light feedbackFont"><em>{item.bq}</em></p>
                             
                             <br />
                             <em><span className="teal-text">{"-"+item.person}</span> </em>
                         </div>
                        </div>
                    )
               
                })
            }
                

            </div>

            </div>
            <div className="divider"></div>
        </div>
            
            
        )
    }
}
