import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBDSnafQWcyQj7QRALMcweRWku6Bn1dUAw",
    authDomain: "desafiopractico3.firebaseapp.com",
    databaseURL: "https://desafiopractico3.firebaseio.com",
    projectId: "desafiopractico3",
    storageBucket: "desafiopractico3.appspot.com",
    messagingSenderId: "899313677058",
    appId: "1:899313677058:web:c04fe8393c8cb2dc7b881b",
    measurementId: "G-WF8NBBS6E5"
  };

// Initialize Firebase
export const fire = firebase.initializeApp(firebaseConfig);
export const db = fire.firestore();