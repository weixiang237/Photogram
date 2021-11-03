import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDjjTc9OwEjyX7JbhyWxzSLWtIHQLZHh0w",
    authDomain: "photogram-e79db.firebaseapp.com",
    projectId: "photogram-e79db",
    storageBucket: "photogram-e79db.appspot.com",
    messagingSenderId: "202369877237",
    appId: "1:202369877237:web:e0f3c098d4048f0da771bc"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}