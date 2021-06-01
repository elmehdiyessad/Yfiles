import firebase from 'firebase/app';
import 'firebase/auth';
// require('firebase/auth')



// The SDK configuration from Firebase
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

const db = firebase.firestore()
const auth = app.auth()
const storage = firebase.storage()
const storageRef = storage.ref();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider()
export { auth, db, storage, storageRef , googleAuthProvider , FacebookAuthProvider , app}


