import React, { Component } from 'react';

export default class Footer extends Component{
    render(){
        return (
            <footer>
            <div className="row">
                <div className="col span-1-of-2">
                    <ul className="footer-nav">
                        {
                            ["About Us","Board Game","Work Sheets","Schools"].map((item) =>
                                {
                                    return <li key={item.toString()}><a href="#">{item}</a></li>
                                } 
                            )
                        }
                    </ul>
                </div>
                <div className="col span-1-of-2">
                    <ul className="social-links">
                        {
                            ["logo-snapchat","logo-github","logo-twitter","logo-instagram"].map((item) =>
                                {
                                    return <li key={item.toString()}><a href="#"><ion-icon name={item}></ion-icon></a></li>
                                } 
                            )
                        }
                       
                    </ul>
                </div>
            </div>
            
            <div className="row">
                <p> Copyright &copy; 2018 by Swan Academics. All rights reserved.</p>
            </div>
            </footer>
        )
    }
}

