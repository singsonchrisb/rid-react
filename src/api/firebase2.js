import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAZKeGfa9s8aX_H7ofdJLo5jfpbXcZaTiY",
    authDomain: "react-contact-1ea2c.firebaseapp.com",
    databaseURL: "https://react-contact-1ea2c-default-rtdb.firebaseio.com",
    projectId: "react-contact-1ea2c",
    storageBucket: "react-contact-1ea2c.appspot.com",
    messagingSenderId: "146017583992",
    appId: "1:146017583992:web:abe0e5ffe51b31fd557e8d",
    measurementId: "G-QK4ZJVE7MK"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage, auth };