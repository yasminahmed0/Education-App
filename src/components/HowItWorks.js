import React, { Component } from 'react';

export default class HowItWorks extends Component{
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
                    [
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
                        },
                    ].map((item) => {
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
}