// firebase addional help
// https://www.makeuseof.com/firebase-react-authentication/
//   crud add, edit, delete https://www.youtube.com/watch?v=zEdI9L1MZU8


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import "firebase/firestore";
// import "firebase/auth";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/database';



// AIzaSyA9P9IkVb2pzfjpdfHPEGsaRekym1rEFXA

const app = initializeApp({
    // apiKey: "AIzaSyAZKeGfa9s8aX_H7ofdJLo5jfpbXcZaTiY",
    // authDomain: "react-contact-1ea2c.firebaseapp.com",
    // databaseURL: "https://react-contact-1ea2c-default-rtdb.firebaseio.com",
    // projectId: "react-contact-1ea2c",
    // storageBucket: "react-contact-1ea2c.appspot.com",
    // messagingSenderId: "146017583992",
    // appId: "1:146017583992:web:abe0e5ffe51b31fd557e8d",
    // measurementId: "G-QK4ZJVE7MK"

    // apiKey: "AIzaSyBV6qjVK_CvfA2fzq_o-VU22xWJCgZ-Dp0",
    // authDomain: "oro-business-group.firebaseapp.com",
    // projectId: "oro-business-group",
    // storageBucket: "oro-business-group.appspot.com",
    // messagingSenderId: "400977686036",
    // appId: "1:400977686036:web:678e87782d0a4895b68101",
    // measurementId: "G-HZJQ7MKFRM",

    apiKey: "AIzaSyC8ouPC4gTUhcXo08MuHJ4FBD8r41muG4I",
    authDomain: "ticketing-booking-9cc08.firebaseapp.com",
    projectId: "ticketing-booking-9cc08",
    storageBucket: "ticketing-booking-9cc08.appspot.com",
    messagingSenderId: "477927209090",
    appId: "1:477927209090:web:314dbf28b43394a0dedc9b",
    measurementId: "G-PNDC2XHNX4"
});


// const firebaseConfig = {
//     apiKey: "AIzaSyBV6qjVK_CvfA2fzq_o-VU22xWJCgZ-Dp0",
//     authDomain: "oro-business-group.firebaseapp.com",
//     projectId: "oro-business-group",
//     storageBucket: "oro-business-group.appspot.com",
//     messagingSenderId: "400977686036",
//     appId: "1:400977686036:web:678e87782d0a4895b68101",
//     measurementId: "G-HZJQ7MKFRM",
// };


  

// firebase.initializeApp(firebaseConfig);
// export const dataref = firebase.database();
// export default firebase


const storage = getStorage(app);
export default storage;