import { createStore } from 'redux';
import firebase from './firebase'
import 'firebase/firestore';
import 'firebase/auth';

//if state is null then this what it will be initalised as 
const initialState = {
    user: null,
    account: null,
    data: null
}

//if state not given then = initialState
const reducer = (state = initialState, action) => {
    //console.log("store, reducer, action: "+ JSON.stringify(action))
    switch(action.type){
        case "USER_ACCOUNT":
            return{
                ...state,
                account: action.payload
            }
        case "DATA":
            return{
                ...state,
                data: action.payload.data
            }
        default:
            console.log("Unknown action....: " + action.type)
    }
}

//why is this here?
const store = createStore(reducer);

//order
//REducer, auth until , 
//as soon as someone signs in
firebase.auth().onAuthStateChanged(user => {
    if(user){
        console.log("setting user")
        // store.dispatch({
        //     type:"USER", //does it need to be capital?
        //     payload: { user } 
        // })
        //goes to reducer 
        //console.log("here")
        //console.log(JSON.stringify(firebase.firebase()))
        let db = firebase.firestore()
        firebase.firestore().collection("").doc(user.uid).get()
        .then(function(doc) {
            if(doc.exists){
                console.log(`if doc.exist -> user type: ${doc.data().Type}`)
                //CHILD
                if(doc.data().Type === "child"){
                    const type = "child"
                    let acc = {user,type}
                    store.dispatch({
                        type: "USER_ACCOUNT",
                        payload: { acc }
                    })
                    //SETTING DATA
                    const ref = db.collection("").doc(user.uid)
                    ref.get().then(doc => {
                        const goal = doc.data().goal;
                        const age = doc.data().age;
                        const name = doc.data().name;
                        const gameProgress = []
                        ref.collection("").orderBy("date", "desc").get()
                        .then(function(querySnapshot) { //each game iteration push data into gameProgress array
                            querySnapshot.forEach((doc) => {
                                gameProgress.push({
                                    gameID: doc.id,
                                    Subject: doc.data().Subject,
                                    title: doc.data().title,
                                    score: doc.data().score,
                                    ncp: doc.data().ncp,
                                    date: doc.data().date
                                })
                            })
                            let data = {goal,age,name,gameProgress}
                            console.log("children doc")
                            store.dispatch({
                                type: "DATA",
                                payload: { data }
                            })
                        })
                    })
                }
                else{
                    const type = "parent"
                    let acc = {user,type}
                    store.dispatch({
                        type: "USER_ACCOUNT",
                        payload: { acc }
                    })
                    //SETTING PARENT DATA
                    db.collection("").doc(user.uid)
                    .onSnapshot(function(doc){
                        const name = doc.data().name;
                        const children = doc.data().children
                        const childrenNames = []
                        const ref = firebase.firestore().collection("")
                        //const gameData = []
                        const products = [] //holds info for all children
                        children.forEach((item, key, arr) => { //for each, loop needs to finish aysha,sid
                            ref.doc(item).onSnapshot(function(doc)
                            {
                                const gameData = [] //new array for each child
                                if(doc.exists){
                                    const childName = doc.data().name //childs name
                                    const cID = doc.id
                                    childrenNames.push(doc.data().name)
                                    //go into db
                                
                                    ref.doc(item).collection("").orderBy("date", "desc").get().then(function(querySnapshot) { //each game iteration push data into gameData array
                                        querySnapshot.forEach((doc, key2, arr2) => {
                                            gameData.push({
                                                gameID: doc.id,
                                                Subject: doc.data().Subject,
                                                title: doc.data().title,
                                                score: doc.data().score,
                                                ncp: doc.data().ncp,
                                                date: doc.data().date
                                                //data: doc.data()
                                            })
                                            console.log("gameData = "+ JSON.stringify(gameData))
                                            //console.log(doc.id, " => ", doc.data());
                                        });
                                        //if(key2 === arr2.length-1){
                                            //let allGames = [games]
                                            products.push({ //after each children iterations done then push into product array which holds all info
                                                childID: cID,
                                                childName: childName,
                                                Games: gameData
                                            })
                                            //let data = {name,products}
                                            console.log("inside 1")
                                            console.log("products inside 1: "+JSON.stringify(products))
                                        //}
                                        if(key === arr.length-1)  {
                                            //let allGames = [games]
                                            //let data = {name,products}
                                            console.log("inside 2")
                                            console.log("Product value inside IF 2: "+JSON.stringify(products))
                                            let data = {name,children,childrenNames,products}
                                            store.dispatch({
                                                type: "DATA",
                                                payload: { data }
                                            })
                                        }
                                    });
                                    
                                }
                                //previously else here with dispatch
                            })

                        })

                    })
                    
                }
            }
            else{
                console.log("Doc does not exist in user collection")
            }
        })        
    }
    else{
        console.log("Store.js: No current user")
    }
})

//subscribe and unsubscribe

export default store;

        // case "USER":
        //     return{
        //         ...state,
        //        user: action.payload.user
        //     } 


//Examples:
// store.dispatch({ //will be outside store.js, a way to update the state
//     type:"INCREMENT",
//     payload: 4
// })

// store.getStore()

// const reducer = (state = initialState, action) => {
//     console.log(action)
//     switch(action.type){
//         case "INCREMENT":
//             return {
//                 ...state,
//                 count: state.count + action.payload
//             }
//         case "USER":
//             return{
//                 ...state,
//                 user: action.payload.user
//             }    
//         default:
//             console.log("Unknown action....: " + action.type)
//             break;
//     }
// }

