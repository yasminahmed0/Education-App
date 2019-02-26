import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDpb7NxQ2830SHaYevUihpaBZrdvbGQ6eM", 
    authDomain: "education-app-976ac.firebaseapp.com",
    databaseURL: "https://education-app-976ac.firebaseio.com",
    projectId: "education-app-976ac",
    storageBucket: "education-app-976ac.appspot.com",
    messagingSenderId: "904489894939"
};

export const fbApp = firebase.initializeApp(config);

