import React, { Component } from 'react';
//import './components/resources/css/index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Base from './components/Base';
import English from "./components/Subject/English";
import Maths from "./components/Subject/Maths";
import Error from "./components/Error";
import ChildDash from "./components/Dashboards/ChildDashboard";
import AdultDashboard from './components/Dashboards/AdultDashboard';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Base} />
                    <Route path="/english" component={English} />
                    <Route path="/maths" component={Maths} />
                    <Route path="/childdash" component={ChildDash}/>
                    <Route path="/adultdash" component={AdultDashboard}/>
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>

        );
    }
}
export default App; 