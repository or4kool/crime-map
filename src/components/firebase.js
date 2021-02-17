import firebase from "firebase/app"
import "firebase/auth"

// FIREBASE CONFIG
firebase.initializeApp({

    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: "crime-map-7c3d9",
    storageBucket: process.env.REACT_APP_STORE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MSG_ID,
    appId: process.env.REACT_APP_API_ID

})

export const fireAuth = firebase.auth();
export const fireProvider = new firebase.auth.GoogleAuthProvider()