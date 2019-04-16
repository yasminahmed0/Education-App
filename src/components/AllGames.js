import React, { Component } from 'react';
import M from "materialize-css";
import logo from './resources/css/img/l.png';
import smallestswan from './resources/css/img/logo2.png'
import matching  from './resources/css/img/logo3.png'
import operations  from './resources/css/img/logo5.png'

class AllGames extends Component{ 
    constructor(props) {
        super(props);
        this.state = {
          maths: [
            {
              title:'Smallest Swan',
              image: smallestswan,
              yearGroup: '1',
              Age: '5-6',
              URL:'/smallestswan'
            },
            {
              title:"Mix and Math",
              image: matching ,
              yearGroup: '2',
              Age: '6-7',
              URL:'/mixandmath'

            },
            {
              title: 'Operations',
              image: operations,
              yearGroup: '1-3',
              Age:'6-8',
              URL:'/operations'
            },
            {
              title:"Maths Platformer",
              image: matching ,
              yearGroup: '4-6',
              Age: '8-11',
              URL:'/unityMaths'

            },
            {
              title: 'Operations',
              image: operations,
              yearGroup: '1-3',
              Age:'6-8',
              URL:'/operations'
            }
          ],
          English:[
            {
              title:'Smallest Swan',
              image: smallestswan,
              yearGroup: '1',
              Age: '5-6',
              URL:'/smallestswan'
            },
            {
              title:"Mix and Math",
              image: matching ,
              yearGroup: '2',
              Age: '6-7',
              URL:'/mixandmath'

            },
            {
              title: 'Operations',
              image: operations,
              yearGroup: '1-3',
              Age:'6-8',
              URL:'/operations'
            },
            {
              title:"Mix and Math",
              image: matching ,
              yearGroup: '2',
              Age: '6-7',
              URL:'/mixandmath'

            },
            {
            title: 'Operations',
            image: operations,
            yearGroup: '1-3',
            Age:'6-8',
            URL:'/operations'
            }

          ]
        }
    }
    componentDidMount(){
        M.AutoInit();
       
          
    
    }
  

      // routeChange(URL) {
      //   let path = URL;
      //   this.props.history.push(path);
      // }
   render(){

    return (
        <div className="allGamesBody">
            <header>              
                    <div className="row childDashHeader">
                    <div className="col s3"><a id="logo-container x" href="#!" ><img className="brand-logo left logo"src={logo} alt='logo'/></a></div>
                    <div className="col s7 offset-s1  childDashTitle"> All Games</div>
                    <div className="col s1 signOut">
                    <div ><a onClick={this.signOut} href="#!" ><i className="material-icons signouticon ">power_settings_new</i></a></div>
                    </div>     
                    </div>   
            </header>
                  <div className="row container gamesList">
                        <div className="col s6">
                            <h4>Maths Games </h4>
                            {this.state.maths.map((item, key )=>
                              {
                                return(
                                  <div key={key} classname="row">
                                    <div className="col s4 gameInfo">
                                      <div>{item.title}</div>
                                      <a href={item.URL}> <img src={item.image} alt="gamepic" className="gameImages"/></a>
                                      <div>{"Year Group: "+item.yearGroup}</div>
                                      <div>{"Age: "+item.Age}</div>
                                    </div>
                                  </div>
                                )})
                            } 
                        </div>
                        <div class="col s6">
                          <h4>English Games</h4>
                            {this.state.English.map((item, key )=>
                              {
                                return(
                                  <div key={key} classname="row">
                                    <div className="col s4 gameInfo">
                                      <div>{item.title}</div>
                                      <a href="#!"><img src={item.image} alt="gamepic" className="gameImages"/></a>
                                      <div>{"Year Group: "+item.yearGroup}</div>
                                      <div>{"Age: "+item.Age}</div>
                                    </div>
                                  </div>
                                )})
                                } 
                        </div>
                  </div> 
                  
                  <br/>
                  </div>
        
    );
   }

};
export default AllGames;