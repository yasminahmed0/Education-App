import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      username: '',
      password: '',
      school: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    //this.store 
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

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
      <input name="userBox"  type="text" username={this.state.username}></input>
      <input name="pass" type="password" password={this.state.password}/>
      <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default App;
//after pressing submit, username and pass values are set in
//local storage
//teacher = [{student1 ID, name, results}, 
            //{student1 ID, name, results}, {student1 ID, name, results}]
//different login or teacher and student.
//login generates an ID which is created with hash