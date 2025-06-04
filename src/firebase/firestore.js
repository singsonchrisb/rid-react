// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    
    // apiKey: "AIzaSyBV6qjVK_CvfA2fzq_o-VU22xWJCgZ-Dp0",
    // authDomain: "oro-business-group.firebaseapp.com",
    // projectId: "oro-business-group",
    // storageBucket: "oro-business-group.appspot.com",
    // messagingSenderId: "400977686036",
    // appId: "1:400977686036:web:678e87782d0a4895b68101",
    // measurementId: "G-HZJQ7MKFRM"
    // apiKey: "AIzaSyC8ouPC4gTUhcXo08MuHJ4FBD8r41muG4I",
    // authDomain: "ticketing-booking-9cc08.firebaseapp.com",
    // projectId: "ticketing-booking-9cc08",
    // storageBucket: "ticketing-booking-9cc08.appspot.com",
    // messagingSenderId: "477927209090",
    // appId: "1:477927209090:web:314dbf28b43394a0dedc9b",
    // measurementId: "G-PNDC2XHNX4"


    // apiKey: "AIzaSyANe3m7GmPIyOTy75Ea-ib-FfNZEwrLb3E",
    // authDomain: "rid-project-862b6.firebaseapp.com",
    // projectId: "rid-project-862b6",
    // storageBucket: "rid-project-862b6.appspot.com",
    // messagingSenderId: "525037755934",
    // appId: "1:525037755934:web:12e0de8ec0e1d5d2ead80f",
    // measurementId: "G-SCVRBKDR3J"

    apiKey: "AIzaSyAm6VK9G2wSp-8bCrRxBhkHdX1xVcWo-tk",
    authDomain: "chrich-rid.firebaseapp.com",
    projectId: "chrich-rid",
    storageBucket: "chrich-rid.appspot.com",
    messagingSenderId: "427361805537",
    appId: "1:427361805537:web:ef1d53833ebb2b2fc483a0"

  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const app2 = firebase.initializeApp(firebaseConfig, 'other');

export const fb = firebase;
export const st = app.storage();
export const storage = app.storage();
export const db = app.firestore();

export const auth = app.auth();
export const authForAdminUserCreation = app2.auth();

export default app;