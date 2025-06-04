// // api/register.js
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firestore";

// api/registerUser.js
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firestore";

export const registerUser = async ({
  email,
  password, 
  displayName,
  photoURL,
  phoneNumber,
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update Firebase Auth profile
    await updateProfile(user, {
      displayName,
      photoURL,
    });

    // Send verification email
    await sendEmailVerification(user);

    // Save extra info to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      displayName,
      photoURL,
      phoneNumber,
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
      message: error.message,
    };
  }
};
