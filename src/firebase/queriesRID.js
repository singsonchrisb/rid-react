
// import { db, fb } from "./firestore2";
// import { db } from "./firebase"; // Ensure the path to your Firebase config is correct
import { db } from "./firestore";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { getDatabase, ref, set } from "firebase/database";
import { collection, doc, setDoc } from "firebase/firestore";

// import { toast } from "react-toastify";
// import { isValidDate } from "../functions/ChrisFunctions";
// import moment from "moment";

// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set } from "firebase/database";


// const firebaseConfig = {
//     apiKey: "AIzaSyC8ouPC4gTUhcXo08MuHJ4FBD8r41muG4I",
//     authDomain: "ticketing-booking-9cc08.firebaseapp.com",
//     projectId: "ticketing-booking-9cc08",
//     storageBucket: "ticketing-booking-9cc08.appspot.com",
//     messagingSenderId: "477927209090",
//     appId: "1:477927209090:web:314dbf28b43394a0dedc9b",
//     measurementId: "G-PNDC2XHNX4",
//     // https://ticketing-booking-9cc08-default-rtdb.asia-southeast1.firebasedatabase.app/

//   };
  
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);





function getSerriesNumber(tType) {
    if (tType=== 'DateTime') {
        let currDate=new Date();
        // alert(currDate.getDay())
        //  alert("seconds " + currDate.getSeconds()); // Outputs: 13
        let docId = "D"+currDate.getFullYear() + padLeft((currDate.getMonth()+1),2) + padLeft(currDate.getDate(),2) + padLeft(currDate.getHours(),2) + padLeft(currDate.getMinutes(),2)+ padLeft(currDate.getSeconds(),2);
        return docId;
    } else {
      return "None";
    }
  }
  
  export const getLoginIP = async () => {
    try {
      let data = [];
       // const docs = await db.collection('AccessControl').doc("LogInIP").get();
      // return db.collection('AccessControl').doc("Access").collection("LogInIP").doc(docId).set(newData);
      const snapshot = await db.collection('AccessControl').doc("Access").collection("LogInIP").get();
      // if (docs===undefined) {
      //   // alert('undefdfd')
      //   return "not exist";
      // }
      // console.log('docs1',docs)
      // snapshot.forEach(doc => {
        //  console.log("get:", doc.id, ' => ', doc.data());
      // });
      //  alert('etes')
          snapshot.forEach((doc) => {
            // console.log('get:',doc.id, ' => ', doc.data());
            data.push({ id: doc.id, ...doc.data() });
          });
  
      return data;
      
    } catch (error) {
      console.log(error);
      return error; //"Error API"
    }
    
  };
  
  export const addLoginIP = async (data) => {
    //  alert('data ' + data.ip + ", " + data.website)
    let newData = {
      dateCreated: new Date(),
      // email: 'admin',
      website: data.website,
      ip: data.ip,
      branchId: '',
      branchName: '',
      status: ''
    };
  
    try {
      // return db.collection('AccessControlDB').doc("LogInIP").add(newData);
      // return db.collection('AccessControl').doc("LogInIP").set(newData);
      let docId = getSerriesNumber('DateTime');
      // alert(docId)
      // return db.collection('AccessControl').doc("Access").collection("LogInIP").doc(docId).set(newData);
         db.collection('AccessControl').doc("Access").collection("LogInIP").doc(docId).set(newData);
      return docId;
    } catch (error) {
      console.log(error);
      return ""
    }
  };
  
  export const updateLoginIP = async (loginName, docId) => {
    console.log('update loginName : ',loginName, docId)
    // alert('update loginName : ' + loginName + ", doc id: " + docId)
  
    // let docs = await getLoginIP()
  
    try {
      // return await db
      //   .collection('AccessControl')
      //   .doc("Access")
      //   .collection("LogInIP")
      //   .doc(docId)
      //   .update(
      //     {
      //       lastUpdate: new Date(),
      //       loginName: loginName,
      //     },
      //     {merge: true}
      //     );
      let docUpdate= await db
        .collection('AccessControl')
        .doc("Access")
        .collection("LogInIP")
        .doc(docId)
        .update(
          {
            lastAccess: new Date(),
            loginName: loginName,
          },
          {merge: true}
          );
          // console.log('docUpdate',docUpdate);
          // alert('update loginName : ' + loginName + ", doc id: " + docId)
          return docUpdate;
  
          // let newData = {
          //           lastAccess: new Date(),
          //           loginName: loginName,
          //         };
          // await db.collection('AccessControl').doc("Access").collection("LogInIP").doc(docId).update(newData, {merge: true});
          // alert('update loginName : ' + loginName + ", doc id: " + docId)
          
          // return true ;
    } catch (error) {
      // console.log(error);
       console.error("Error updating document: ", error);
       alert("Error updating document: ", error)
    }
  
  //  const batch = db.batch();
  
  // // For each document to update
  // const docRef = db.collection('AccessControl').doc("Access").collection("LogInIP").doc(docId);
  // batch.update(docRef, { 
  //     // lastUpdate: new Date(),
  //     loginName: loginName,
  // });
  
  // // Commit the batch
  // await batch.commit();
  
    
  };
  
  export const getClientMessage = async () => {
    try {
      let data = [];
      const snapshot = await db.collection('AccessControl').doc("ClientInfo").collection("Message").get();
          snapshot.forEach((doc) => {
            // console.log('get:',doc.id, ' => ', doc.data());
            data.push({ id: doc.id, ...doc.data() });
          });
      return data;
      
    } catch (error) {
      console.log(error);
      return error; //"Error API"
    }
    
  };
export const addClientMessage = async (dtRead) => {
    // alert('data ' + data.name + ", " + data.website + ", email: " + data.email + ", message: " + data.message)
    let newData = {
        dateCreated: new Date(),
        website: dtRead.website,
        name: dtRead.name,
        email: dtRead.email,
        contactNo: '',
        message: dtRead.message,
    };

    // console.log('newData:',newData)
    let data = {
      status: 500,
      data: 'none'
    };
  try {
    let docId = getSerriesNumber('DateTime');
    //  alert(docId)
    let docs = db.collection('AccessControl').doc("ClientInfo").collection('Message').doc(docId).set(newData);
    data = {
        status: 200,
        data: docs
    }
    return data;
  } catch (error) {
    console.log(error);
    data ={
        status: 400,
        error: error
    }
    return error;
  }
};

export const getRIDImagesFile = async () => {
    try {
      let data = [];
      const snapshot = await db.collection('ridimagesfile').get();
          snapshot.forEach((doc) => {
            // console.log('get:',doc.id, ' => ', doc.data());
            data.push({ id: doc.id, ...doc.data() });
          });
      return data;
      
    } catch (error) {
      console.log(error);
      return error; //"Error API"
    }
    
  };

  export const insertRIDImagesFile = async (dtRead) => {
    const newData = {
      dateCreated: new Date(),
      loginName: dtRead.loginName,
      description: dtRead.description,
      imageUrl: dtRead.imageUrl,
    };
    console.log('new data',newData)
  
    let data = {
      status: 500,
      data: 'none'
    };
  
    try {
      const docId = "POP" + dtRead.loginName;
      const docRef = doc(collection(db, 'ridimagesfile'), docId);
  
      await setDoc(docRef, newData);
      data = {
        status: 200,
        data: 'Document successfully written!'
      };
    } catch (error) {
      console.error('Error writing document:', error);
      data = {
        status: 400,
        error: error.message
      };
    }
  
    return data;
  };

export const TestinsertRIDImagesFile = async (dtRead) => {
    // alert('data ' + data.name + ", " + data.website + ", email: " + data.email + ", message: " + data.message)
    let newData = {
        dateCreated: new Date(),
        loginName: dtRead.loginName,
        description: dtRead.description,
        // email: dtRead.email,
        imageUrl: dtRead.imageUrl,
    };

    // console.log('newData:',newData)
    let data = {
      status: 500,
      data: 'none'
    };
  try {
    let docId = "proofPayment" + dtRead.loginName
    let docs = db.collection('ridimagesfile').doc(docId).set(newData);
    data = {
        status: 200,
        data: docs
    }
    return data;
    // return { status: 200, data: 'Data saved successfully' };
  } catch (error) {
    console.log(error);
    data ={
        status: 400,
        error: error
    }
    return error;
    // return { status: 400, error: error.message };
  }
};

export const insertRIDImagesFile12222 = async (loginName,imageUrl) => {
    try {
        // const docRef = await db.collection('ridimagesfile').add({
        //     loginName,
        //     description: 'Proof of Payment',
        //     imageUrl,
        //   });
        //   console.log("Document written with ID: ", docRef.id);

        return await setDoc(doc(db, "ridimagesfile"  ), {
            loginName,
            description: 'Proof of Payment',
            imageUrl,
        });
    } catch (error) {
      console.log(error);
      // alert("chris testing error")
    }
  };


  export const addDataToFirebase = async (data) => {
    // const databaseURL= "https://ticketing-booking-9cc08.asia-southeast1.firebasedatabase.app/"
    // const db = getDatabase();
    // const database
    // const newDataRef = ref(db, 'path/to/data'); // Replace 'path/to/data' with your desired path in the database
    const newDataRef = ref(database, 'data'); // Replace 'path/to/data' with your desired path in the database
    alert('test') 
  
    try {
      await set(newDataRef, data);
      console.log('Data saved successfully');
      return { status: 200, data: 'Data saved successfully' };
    } catch (error) {
      console.error('Error saving data:', error);
      return { status: 400, error: error.message };
    }
  };    

  function padLeft(number, width) {
    return number.toString().padStart(width, '0');
  }
  