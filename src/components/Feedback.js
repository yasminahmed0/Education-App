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
                             <em><strong>{item.person}</strong> </em>
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

/*import React, { Component } from 'react';
import Jane from './resources/css/img/Jane.jpg';
import John from './resources/css/img/John.jpg';
import Katie from './resources/css/img/Katie.png';

export default class Feedback extends Component{
    constructor(props) {
        super(props)
        this.state = {
            info: [
                {
                    val: 1,
                    bq: "After the children played the games these student's had created for them, they understood the topics much better than before. I'm geniunely impressed with their website.",
                    image: Jane,
                    person: "Jane",
                    school: "Kingsbury Primary School"
                },
                {
                    val: 2,
                    bq: "I must say, I did not think that games would be as effective as they were for children in year 6. They learnt things in a different way and sometimes all it takes is a different point of view for something to sink in.",
                    image: Katie,
                    person: "Katie",
                    school: "Mile End Primary School."
                },
                {
                    val: 3,
                    bq: "They really do make learning fun. The children are having a great time and still learning the topics. Their games allow a new change that is much required in our traditional teaching methodologies.",
                    image: John,
                    person: "John",
                    school: "Firs Farm Primary School"
                }
            ]
        }
    }

    render(){
        return (
            <section className="section-feedback" id="Feedback">
            <div className="row">
                <h2>feedback</h2>
            </div>
            <div className="row">
            {
                this.state.info.map((item) => {
                    return <div key={item.val.toString()} className="col span-1-of-3">
                    <blockquote> {item.bq} </blockquote> <cite><img src={item.image} alt="person"/> <strong>{item.person}</strong> &nbsp; {item.school}</cite>
                </div> 
                })
            }
            </div>
            
        </section>
        )
    }
}*/