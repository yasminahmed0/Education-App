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
    <form onSubmit={this.handleSubmit}>
      <input name="userBox"  type="text" username={this.state.username}></input>
      <input name="pass" type="password" password={this.state.password}/>
      <input type="submit" value="Submit"/>
      </form>
  }

  render() {
    return(
      <div>
      <header>
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"/>
        <link rel="stylesheet" type="text/css" href="resources/css/normalize.css"/>
        <link rel="stylesheet" type="text/css" href="resources/css/grid.css"/>
        <link rel="stylesheet" type="text/css" href="resources/css/style.css"/>
        <title> Swan Academics </title>
    </header>
        
    <body>
        {/*  HEADER SECTION */}
        {/* <!--Header will have everything in our landing page (Image background one)--> */}
        <header>
            <nav>
                <div className="row">
                    <img src="resources/css/img/logo.png" alt="Swan Academics Logo" className="logo"></img>
                    <ul className="navigation">
                        <li><a href="#">Register</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Feedback</a></li>
                        <li><a href="#">Sign-Up</a></li>
                    </ul>
                </div>
            </nav>
            <div className="hero-text-box">
                <h1>Try learning the fun way</h1>
                <a className= "button filled-button" href="#">Learn More</a>
                <a className= "button filled-button" href="#">Play</a>
            </div>
        </header>
        
        {/* <!-- HOW IT WORKS SECTION --> */}
        <section className="section-How-it-works">
            <div className="row">
                <h2>How does it work&#63;</h2>
                <p className="explanation">
                    Welcome, below you will find quick steps on how to use our website and start learning.
                </p>
            </div>
            
            <div className="row">
                <div className="col span-1-of-3 box">
                    <ion-icon name="contact"></ion-icon>
                    <h3>Sign-Up</h3>
                        <p>
                            Sign-up or just go to the subject section and pick a subject. Signing up has more benefits!
                        </p>
                </div>

                <div className="col span-1-of-3 box">
                    <ion-icon name="people"></ion-icon>
                    <h3>Year Group</h3>
                        <p>
                            Now that you have selected the subject, pick a year group!
                        </p>
                </div>
            
                <div className="col span-1-of-3 box">
                    <ion-icon name="calculator"></ion-icon>
                    <h3>Topic</h3>
                        <p>
                            Now pick the topic you wish to learn and start learning the fun way. Don't forget to register to keep track of your progress. 
                        </p>
                </div>
            </div>
        </section>
        
        {/* BENEFITS OF SIGNING-UP SECTION  */}
        <section className="section-benefits-of-signing-up">
            <div className="row">
                <h2>Benefits of signing-up</h2>
            </div>
            
            <div className="row">
                <div className="col span-1-of-3 box">
                    <ion-icon name="pie"></ion-icon>
                    <h3>Strengths</h3>
                        <p>
                            See your strengths for all the topics combined in the chosen subject. These are based on how well you did in each topic game that you've played.
                        </p>
                </div>

                <div className="col span-1-of-3 box">
                    <ion-icon name="trending-up"></ion-icon>
                    <h3>Progress</h3>
                        <p>
                            You, your teacher and parent can see your progress over time. 
                        </p>
                </div>
            
                <div className="col span-1-of-3 box">
                    <ion-icon name="list-box"></ion-icon>
                    <h3>Feedback Report</h3>
                        <p>
                            Get a written feedback report which you can print off to see what you need to work on. 
                        </p>
                </div>
            </div>
        </section>
        
        {/* SUBJECTS SECTION  */}
        <section className="section-subjects">
            <div className="row">
                <div className="col span-1-of-2 image">
                    <a href="#"><img src="resources/css/img/math.png" alt="Math"/></a>
                </div>

                <div className="col span-1-of-2 image">
                    <a href="#"><img src="resources/css/img/english.jpg" alt="English"/></a>
                </div>
            </div>
        </section>
        
        {/* FEEDBACK SECTION  */}
        <section className="section-feedback">
            <div className="row">
                <h2>feedback</h2>
            </div>
            
            <div className="row">
                <div className="col span-1-of-3">
                <blockquote> After the children played the games these student's had created for them, they understood the topics much better than before. I'm geniunely impressed with their website.</blockquote> <cite> <img src="resources/css/img/Jane.jpg" alt="jane"/><strong>Jane (Year 3)</strong> &nbsp; Kingsbury Primary School</cite>
                </div>
                
                <div className="col span-1-of-3">
                <blockquote> I must say, I did not think that games would be as effective as they were for children in year 6. They learnt things in a different way and sometimes all it takes is a different point of view for something to sink in. </blockquote> <cite><img src="resources/css/img/Katie.png" alt="Katie"/> <strong>Katie (Year 6)</strong> &nbsp; Sudbury Primary School</cite>
                </div>
                
                <div className="col span-1-of-3">
                <blockquote> They really do make learning fun. The children are having a great time and still learning the topics. Their games allow a new change that is much required in our traditional teaching methodologies.</blockquote> <cite> <img src="resources/css/img/John.jpg" alt="john"/> <strong>John (Year 2)</strong> &nbsp; Wembley Primary School</cite>
                </div>
            </div>
            
        </section>
         {/* FOOTER  */}
        <footer>
            <div className="row">
                <div className="col span-1-of-2">
                    <ul className="footer-nav">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Board Games</a></li>
                        <li><a href="#">Work Sheets</a></li>
                        <li><a href="#">Schools</a></li>
                    </ul>
                </div>
                <div className="col span-1-of-2">
                    <ul className="social-links">
                        <li><a href="#"><ion-icon name="logo-snapchat"></ion-icon></a></li>
                        <li><a href="#"><ion-icon name="logo-github"></ion-icon></a></li>
                        <li><a href="#"><ion-icon name="logo-twitter"></ion-icon></a></li>
                        <li><a href="#"><ion-icon name="logo-instagram"></ion-icon></a></li>
                    </ul>
                </div>
            </div>
            
            <div className="row">
                <p> Copyright &copy; 2018 by Swan Academics. All rights reserved.</p>
            </div>
        </footer>
        <script src="https://unpkg.com/ionicons@4.4.6/dist/ionicons.js"></script>
    </body>
    </div>
    ); //end of return
  } //end of render function
} //closes app class
  

    

export default App;
//after pressing submit, username and pass values are set in
//local storage
//teacher = [{student1 ID, name, results}, 
            //{student1 ID, name, results}, {student1 ID, name, results}]
//different login or teacher and student.
//login generates an ID which is created with hash