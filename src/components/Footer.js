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

