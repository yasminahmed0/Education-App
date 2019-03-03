import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; //if commented out then fonts change
import App from './App';
import * as serviceWorker from './serviceWorker';
//import { fbApp } from './firebase'; //imports const fbApp 

//looking at the auth status
//returns a promise which can be handled with a user variable
//we can use this user var to check is at this point there is an actual user
//useful bcos if user is signed in we cna navigate them dashbord
//else user can be redirected to sign in page
/*fbApp.auth().onAuthStateChanged(function(user){
    if(user) {
        console.log('user signed in or up', user)
    } else {
        console.log('user signed out or needs to sign in')
    }
})*/


ReactDOM.render(
    <App />, 
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

