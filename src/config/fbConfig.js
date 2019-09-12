import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBIcUoZ_0EXuu4-0b3eghm4lG3k5Z7W_KM",
    authDomain: "onlinequiz-8c98f.firebaseapp.com",
    databaseURL: "https://onlinequiz-8c98f.firebaseio.com",
    projectId: "onlinequiz-8c98f",
    storageBucket: "onlinequiz-8c98f.appspot.com",
    messagingSenderId: "168963280679",
    appId: "1:168963280679:web:6c3f01930b77c2d3f06302"
};

firebase.initializeApp(firebaseConfig);


export default firebase;