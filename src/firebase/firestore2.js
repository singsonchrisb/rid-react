// firebase addional help
// https://www.makeuseof.com/firebase-react-authentication/
//   crud add, edit, delete https://www.youtube.com/watch?v=zEdI9L1MZU8

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


import "firebase/firestore";
// import "firebase/auth";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/database';



// AIzaSyA9P9IkVb2pzfjpdfHPEGsaRekym1rEFXA

const firebaseConfig = {
    // apiKey: "AIzaSyC8ouPC4gTUhcXo08MuHJ4FBD8r41muG4I",
    // authDomain: "ticketing-booking-9cc08.firebaseapp.com",
    // databaseURL: "https://ticketing-booking-9cc08.asia-southeast1.firebasedatabase.app/",
    // projectId: "ticketing-booking-9cc08",
    // storageBucket: "ticketing-booking-9cc08.appspot.com",
    // messagingSenderId: "477927209090",
    // appId: "1:477927209090:web:314dbf28b43394a0dedc9b",
    // measurementId: "G-PNDC2XHNX4",
    // https://ticketing-booking-9cc08-default-rtdb.asia-southeast1.firebasedatabase.app/

    apiKey: "AIzaSyAm6VK9G2wSp-8bCrRxBhkHdX1xVcWo-tk",
    authDomain: "chrich-rid.firebaseapp.com",
    projectId: "chrich-rid",
    storageBucket: "chrich-rid.appspot.com",
    messagingSenderId: "427361805537",
    appId: "1:427361805537:web:ef1d53833ebb2b2fc483a0"

  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const database = getDatabase(app);
  const storage = getStorage(app);
  
  
  export { db, storage,database };