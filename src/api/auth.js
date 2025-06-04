// api/auth.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firestore";
import { doc, getDoc } from "firebase/firestore";


export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Load additional user profile from Firestore user.uid
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    let userProfile = {};
    if (userDocSnap.exists()) {
      userProfile = userDocSnap.data();
    }
    console.log('photoURL:',userProfile.photoURL)
    return {
      success: true,
      uid: user.uid,
      email: user.email,
      token: await user.getIdToken(),
      userName: userProfile.userName || "",
      lastName: userProfile.lastName || "",
      firstName: userProfile.firstName || "",
      photoURL: userProfile.photoURL || "",
    };
  } catch (error) {
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
};

export const loginWithEmailBasic = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return {
      success: true,
      uid: user.uid,
      email: user.email,
      token: await user.getIdToken(),
    };
  } catch (error) {
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    };
  }
};
