import React, { Component } from 'react';
import menu from '../../resources/css/img/menu.png';
import logo from '../../resources/css/img/logo.png';
import SemiCircleProgressBar from "react-progressbar-semicircle";
{/* https://www.npmjs.com/package/react-progressbar-semicircle */}



class AdultDashboard extends Component{
constructor(props) {
    super(props);
}




	render(){
        const children=['Alice','Ben','Caleb'];
        var game =['game a', 'game b'];
        var gameScore=['234','676'];
        var progress=['45','78'];
        var gamelength= game.length;

        return(
            <div>     
	            <header> 
                   <div className="row">
                   <div className="col span-1-of-4">
                        <img className="logo" src={logo} alt="Swan academics"></img>
                     </div>
                    <div className="col span-2-of-4 subjectTitle">
                         Dashboard
                     </div>
                    < div className="col span-1-of-4">
                    <div className="dropdown">
                    <button className="dropbtn"><img alt="sunl" id="sunny" src={menu}></img></button>
                    <div className="dropdown-content">
                     <a href="App.js">Progress Tracker</a>
                    </div>
              </div>

                   </div> 

                   </div>
      
                </header>

                <main>

            {children.map((item,index) => {  
            
                    
                    return (
                        <div className="row">
                            <div key={item.toString()} className={"col span-1-of-2 image "}>
                             <div className="ChildP"><p>{item.toString()+"'s Progress"} </p> 
                             
    console.log(arr[i]);
  }
                             
                             
                             </div>
                     </div>
                     </div>)
                })}
                

      
     
                </main>
                <footer className="ft">
                <div className="row">
                   </div> 
      

                </footer>
   </div>
    
    
  
        )
  

	}
}

 


export default AdultDashboard;