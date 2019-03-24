import React, { Component } from 'react'
import logo from './resources/css/img/l.png';
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
                <nav className="cyan darken-1" role="navigation">
                    <div className="nav-wrapper container">
                    <div id="logo-container x" ><img className="brand-logo left logo"src={logo} alt='logo'/></div>
                    <ul className="right hide-on-med-and-down x">
                    {this.state.info.map((item) => {
                            return <li>{item} &nbsp; &nbsp; &nbsp;  </li> 
                    })}
                    </ul>
                    <ul id="nav-mobile" className="sidenav">
                    {this.state.info.map((item) => {
                            return <li>{item}</li>
                    })}
                    </ul>
                    <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    </div>
                </nav>

                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                    <div className="container">
                        <br/>
                        <h1 className="header center teal-text text-lighten-2">Swan Academics</h1>
                        <div className="row center">
                        <h5 className="header col s12 light">Learning the fun way</h5>
                        </div>
                        <div className="row center">
                        <a href="http://materializecss.com/getting-started.html" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">Sign Up</a>
                        </div>
                        <br/>

                    </div>
                    </div>
                    <div className="parallax"><img src="./background2.jpg" alt="Unsplashed background img 1"/></div>
                </div>
              </div>
        );
    }
  }


/*export default class Header extends Component{
    componentDidMount(){
        $('a').on('click', function(e){
            e.preventDefault();
            var targetID = $(this).attr('href')
            var elementPosition = $(targetID).offset().top
            $('html,body').animate({scrollTop: elementPosition},'slow');
        }); 
    }
   
    constructor(props) {
        super(props)
        this.state = {
            info: ["Register", "About Us", "Feedback", "Sign-Up",],
            secondInfo: ["Learn More", "Play"]
        }
    }

    render(){
        return (
            <header className="header base">
                    <nav>
                        <div className="row">
                        <script src="./slide.js"></script>
                            <img src={logo} alt="Swan Academics Logo" className="logo"></img>
                            <ul className="navigation">
                                {
                                    this.state.info.map((item) => {
                                        return <li key={item.toString()}><a href={"#"+ item}>{item}</a></li>;
                                    })}
                            </ul>
                        </div>
                    </nav>

                    <div className="hero-text-box">
                        <h1>Learning the fun way</h1> {
                            this.state.secondInfo.map((item) => <a className="button filled-button" href="#" key={item.toString()}>{item}</a>)
                        }
                    </div>
                </header>
        )
    }
}*/