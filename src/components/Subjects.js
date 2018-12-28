import React, { Component } from 'react';
import english from './resources/css/img/english.jpg';
import math from './resources/css/img/math.png';

export default class Subjects extends Component{
    render(){
        return(
            <section className="section-subjects">
            <div className="row">
                {[math,english].map((item) => {
                    return <div key={item.toString()} className="col span-1-of-2 image">
                        <a href="#"><img src={item} alt="subject pictures"/></a>
                    </div>
                })}
            </div>
            </section>
        )
    }
}