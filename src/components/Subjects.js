import React, { Component } from 'react';
import English from './resources/css/img/englishboard.png';
import Math from './resources/css/img/mathsboard.png';
export default class Subjects extends Component{    
    render(){
        const subject = ['maths' ,'english']; //it is inside the render but outside the return section
        return(
            <section className="section-subjects">
            <div className="row">

               {[Math,English].map((item,index) => {  
                    const s = subject[index];
                    return (
                    <div key={item.toString()} className="col span-1-of-2 image">
                        <a href={'/'+ s}> 
                            <img src={item} alt="subject pictures"/>
                        </a>
                    </div>)
                })}
            </div>
            </section>
        )
    }
}