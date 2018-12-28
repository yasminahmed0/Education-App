import React, { Component } from 'react';

export default class Benefits extends Component{
    render(){
        return(
            <section className="section-benefits-of-signing-up">
            <div className="row">
                <h2>Benefits of signing-up</h2>
            </div>
            <div className="row">
                {
                   [
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
                    ].map((item) => {
                        return <div key={item.val.toString()} className="col span-1-of-3 box">
                                <ion-icon name={item.icon}></ion-icon>
                                <h3>{item.h3}</h3>
                                    <p>
                                        {item.p}
                                    </p>
                                </div>
                        })
                }
                </div>
        </section> 
        )
    }
}