import React, { Component } from 'react';

class Register extends Component {
    render(){
        return(
            <div>
                <p>Register</p>
            </div>
        )
    }
}

export default Register;
/*  constructor(props) {
    super(props)
    this.state = { 
      username: '',
      password: '',
      school: '',
    }
    //this.handleSubmit = this.handleSubmit.bind(this)
    //this.store 
    //onechange 
    //chnage two
  }

  store(){
    let account = [this.state.username, this.state.password]
    console.log("This is acc:" , account)
    console.log(localStorage.setItem(account, JSON.stringify(account)))
    console.log(JSON.parse(localStorage.getItem(account)))
  }

  handleSubmit(event) {
    this.setState({username: event.target.userBox.value})
    this.setState({password: event.target.pass.value})
    event.preventDefault()
    this.store()
  }

  login(){
    // <form onSubmit={this.handleSubmit}>
    //   <input name="userBox"  type="text" username={this.state.username}></input>
    //   <input name="pass" type="password" password={this.state.password}/>
    //   <input type="submit" value="Submit"/>
    //   </form>
  } */