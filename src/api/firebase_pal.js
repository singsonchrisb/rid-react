// firebase addional help
// https://www.makeuseof.com/firebase-react-authentication/
//   crud add, edit, delete https://www.youtube.com/watch?v=zEdI9L1MZU8


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import "firebase/firestore";
// import "firebase/auth";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8ouPC4gTUhcXo08MuHJ4FBD8r41muG4I",
    authDomain: "ticketing-booking-9cc08.firebaseapp.com",
    projectId: "ticketing-booking-9cc08",
    storageBucket: "ticketing-booking-9cc08.appspot.com",
    messagingSenderId: "477927209090",
    appId: "1:477927209090:web:314dbf28b43394a0dedc9b",
    measurementId: "G-PNDC2XHNX4"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  export const storage = getStorage(app);