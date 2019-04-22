import React, { Component } from 'react'
import logo5 from './resources/css/img/logo5.png';
import M from "materialize-css"; 
import './resources/refined.css'


export default class Header extends Component {
    componentDidMount(){
        M.AutoInit();
    }
    constructor(props) {
        super(props)
        this.state = {
            info: ["About","Benefits","Testimonials","Sign-in"],
            secondInfo: ["Sign-Up"],
            hide: true
        }}
        

    render() {
        return (
            <div>
                <nav className="teal lighten-2">
                    <div className="nav-wrapper">
                    <a href="#!" className="brand-logo"><img className="logo"src={logo5} alt='logo'/></a>
                    <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a> {/*warning, so added !*/}
                     <ul className="right hide-on-med-and-down x">
                    {this.state.info.map((item,key) => {
                            return <li key={key}><a href={"#"+ item}>{item} &nbsp; &nbsp; &nbsp; </a> </li> 
                    })}
                    </ul>
                    
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                {this.state.info.map((item,key) => {
                            return <li key={key}><a href={"#"+ item} teal-text="true" text-lighten-2="true">{item}</a></li>
                    })}
                </ul>

                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                    <div className="container">
                        <br/>
                        <h1 className="header center teal-text text-lighten-2">Swan Academics</h1>
                        <div className="row center">
                        <h5 className="header col s12 light">Learning the fun way</h5>
                        </div>
                        <div className="row center">
                        <a href="#Sign-Up" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">Sign Up</a>
                        </div>
                        <br/>

                    </div>
                    </div>
                    <div className="parallax"><img src="./background2.png" alt="Unsplashed background img 1"/></div>
                </div>
            </div>
            
        );
    }
  }


