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
            break;
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
        firebase.firestore().collection("Users").doc(user.uid).get()
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
                    db.collection("Children").doc(user.uid).get()
                    .then(doc => {
                        const goal = doc.data().goal;
                        const age = doc.data().age;
                        const name = doc.data().name;
                        let data = {goal,age,name}
                        console.log("children doc")
                        store.dispatch({
                            type: "DATA",
                            payload: { data }
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
                    db.collection("Parent").doc(user.uid)
                    .onSnapshot(function(doc){
                        const name = doc.data().name;
                        const children = doc.data().children
                        const childrenNames = []
                        const ref = firebase.firestore().collection("Children")
                        children.forEach((item, key, arr) => { //for each, loop needs to finish 
                            console.log(" s item: "+item)
                            ref.doc(item).get().
                            then(doc => {
                               //console.log("name "+doc.data().name)
                                childrenNames.push(doc.data().name)
                                console.log("CS: "+childrenNames)
                                if(key == arr.length-1){
                                    let data = {name,children,childrenNames}
                                    console.log("store js: parent doc")
                                    store.dispatch({
                                        type: "DATA",
                                        payload: { data }
                                    })
                                }
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