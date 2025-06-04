// api/updateUserProfile.js
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    query, 
    where, 
    or
  } from 'firebase/firestore';
// import { updateProfile } from "firebase/auth";
// import { doc, updateDoc } from "firebase/firestore";
// import { query, where, or } from 'firebase/firestore';
import { auth, db } from "../firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

export const registerUserProfile = async ({
  email,
  password, 
  lastName,
  firstName,
  userName,
  companyId,
  phoneNumber,
  photoURL,
}) => {
  console.log(email,
    password, 
    lastName,
    firstName,
    userName,
    companyId,
    phoneNumber,
    photoURL)
    // alert("user; " + userName)
    // let uidUsers =userName; // +"224466";
    try {
    const existing = await getDoc(doc(db, "users", userName));
    if (existing.exists()) {
      return {
        success: false,
        message: "Username already taken.",
      };
    }


  
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update Firebase Auth profile
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
      // photoURL: photoURL || null,
    });

    // Send verification email
    await sendEmailVerification(user);

    // Save extra info to Firestore
    // await setDoc(doc(db, "users", user.uid), {
      await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      lastName,
      firstName,
      userName,
      companyId,
      phoneNumber,
      photoURL,
      emailVerified: false, // initially false
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Registration successful. Please verify your email.",
      uid: user.uid,
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      messageOrg: error.message,
      message: "The email address is already in use by another account.",
    };
  }
};


export const updateUserProfile = async ({ userName, lastName, firstName, email, companyId, photoURL, phoneNumber }) => {
    const user = auth.currentUser;
    console.log(user);
    if (!user) {
      return { success: false, message: "No user is logged in." };
    }
   console.log(userName, lastName, firstName,email, companyId, phoneNumber,user.uid);

    try {
      // Update Firebase Authentication profile
      await updateProfile(user, {
        displayName: userName || user.displayName,
      });
      // await updateProfile(user, {
      //   userName: userName || user.userName,
      //   lastName: lastName || user.lastName,
      //   firstName: firstName || user.firstName,
      //   email: email || user.email,
      //   companyId: companyId || user.companyId,
      //   photoURL: photoURL || user.photoURL,
      //   phoneNumber: phoneNumber || user.phoneNumber
      // });
  
      // Update Firestore user profile user.uid
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        userName,
        lastName,
        firstName,
        email,
        companyId,
        photoURL,
        phoneNumber,
        updatedAt: new Date(),
      });
  
      return { success: true, message: "Profile updated successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
 
  export const updateUserPhotoAndName = async (userName, url) => {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, message: "No user is logged in." };
    }
    // alert(user.uid);
    // alert(url);
    // alert(userName)
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        photoURL: url,
        updatedAt: new Date(),
      });
      return { success: true, message: userName + " Photo updated successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

export const getUsers = async (tUser, tFieldType) => {
  const user = auth.currentUser;
  if (!user) {
    return { success: false, message: "No user is logged in." };
  }
    const usersCollection = collection(db, "users");

    let q;
    if (tUser && tUser.trim() !== "") {
        if (tFieldType==='userName') {
          q = query(usersCollection, where("userName", "==", tUser));
        } else {
          q = query(usersCollection, where("email", "==", tUser));
        }
    } else {
        q = usersCollection; // no filter
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
    