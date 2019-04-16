import React, { Component } from 'react';
import M from "materialize-css";

class Error extends Component{ 
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }
    componentDidMount(){
        M.AutoInit(); 
    }

      routeChange() {
        let path = ``;
        this.props.history.push(path);
      }
   render(){

    return (
        <div className="errorBody">
          < h3 className="container header center teal-text text-lighten-2 errorText">Whoops..this page doesn't exist </h3>
          <div className="row">
            <div className="input-field col s3 offset-s4">
                  <button className="btn waves-effect waves-light offset-s3 btn-large homeButton" type="submit" name="action"onClick={this.routeChange} >Back to Homepage<i className="material-icons right">home</i></button>
            </div>
        </div>    
        </div>    
    );
   }


};
export default Error;