import React, { Component } from 'react';
import '../../resources/css/index.css';
import YearGroups from '../../yearGroup';

class Maths extends Component {
    constructor(props){
        super(props)
        let yearGroups = []
        let yearGroup = <YearGroups/>
        yearGroups.push(yearGroup)
        this.state = {
            years:yearGroups
        }
    }
    
  render() {
    return (
       /* <BrowserRouter>
       For st that you need to be diplayed on every page e.g. teh naviagetion it need to be written outside the switch , again needs to be wrapped in a div 

       ***NAV**
       in navigation JS file 
       import {Navlink } from "react-router-dom";

       in the file cont Navigation = () => {
           return(
               <NavLink to ="/"> Home </NavLink>// To contains name of URl's defined in Route when home is clicke it will go with url taht has nt after 
               <NavLink to ="/about"> About </NavLink>
           );
       };
       ******
       When using multiple routers we need to wrap all Rout tags in a div as the BrowserRouter can only have one child elemnt 
       In the path that is just '/' need keyword exact else it will render on every page 
       <Switch> < used to replace div 
        <Route path="/" component="{Home} exact"/>
        <Route path="/about" component="{About}"/>
         for URLs that dont exist dont specify path 
        <Route  component="{Error}"/> <-file that needs to be created
        </Switch
        </BrowserRouter>*/

      <div className="App">
      <header>
        <div className="row ">
            <div className="col span-1-of-4">
                <img className="logo" src="/images/templogo" alt="Swan academics"></img>
            </div>
            <div className="col span-2-of-4 title">
                <h1> Math</h1>
            </div>
            <div className="col span-1-of-4">
              <div className="dropdown">
                <button className="dropbtn"><img alt="sunl" id="sunny" src={"../../resources/css/img/a"}></img></button>
                <div className="dropdown-content">
                  <a href="App.js">Progress Tracker</a>
                </div>
              </div>
            </div>

        </div>
    </header>
    {this.state.years.map((item) => {
        return item;
    })}
  
    {/* <main>
        <div className="wrapper">
            <div className="row">
             <div className="col span 1-of-2 c1"> <img className="cloud hvr-bob button" src="images/tempcloud.png" width="290px" height="auto"alt="year 1"></img> </div>
             <div className="col span 1-of-2 c2"> <img className="cloud hvr-bob button " src="images/tempcloud2.png" width="300px" height="auto" alt="year 2"></img> </div>
            </div>
            <div className="row">
                <div className="col span 1-of-2 c3"> <img className="cloud hvr-bob button" src="images/tempcloud3.png" width="295px" height="auto" alt="year 3"></img></div>
                <div className="col span 1-of-2 c4"> <img className="cloud hvr-bob button "src="images/tempcloud4.png" width="310px" height="auto" alt="year 4"></img></div>
            </div>
            <div className="row">
                <div className="col span 1-of-2 c5"> <img className="cloud hvr-bob button " src="images/tempcloud5.png" width="300px" height="auto" alt="year 5"></img></div>
                <div className="col span 1-of-2 c6"> <img className="cloud hvr-bob button " src="images/tempcloud6.png" width="295px" height="auto" alt="year 6"></img> </div>
            </div>
        </div> 
    </main> */}

    <footer>
        <div className="ft">
        <div className="row ">
            <div className="col span-1-of-1">
                <ul className="footer-nav">
                    <li><a href="App.js">About us</a></li>
                    <li><a href="App.js">Contact us</a></li>
                    <li><a href="App.js">Terms of service</a></li>
                    <li><a href="App.js">Privacy policy</a></li>
                </ul>
            </div>
        </div>
        <div className="row">
            <p>
                Copyright &copy; 2018 by Swan academics. All rights reserved.
            </p>
        </div>
        </div>
    </footer>
     </div>
    );
  }
}

export default Maths;