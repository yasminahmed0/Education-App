import React, { Component } from 'react';

export default class Footer extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            info: ["About Us","Board Game","Work Sheets","Schools"],
            secondInfo: ["logo-snapchat","logo-github","logo-twitter","logo-instagram"]
        }
    }
    render(){
        return (
            <footer>    
                <div className="footer-copyright  teal lighten-2  footer">
                    <h6 className="grey-text text-darken-3 footertext">© 2019 Swan Academics </h6> 
                </div>
            </footer>
        )
    }
}

/*
<footer>
            <div className="row">
                <div className="col span-1-of-2">
                    <ul className="footer-nav">
                        {
                            this.state.info.map((item) =>
                                {
                                    return <li key={item.toString()}>{item}</li>
                                } 
                            )
                        }
                    </ul>
                </div>
                <div className="col span-1-of-2">
                    <ul className="social-links">
                        {
                            this.state.secondInfo.map((item) =>
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
            </footer> */