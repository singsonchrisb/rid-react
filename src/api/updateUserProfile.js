// api/updateUserProfile.js
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firestore";

export const updateUserProfile = async ({ displayName, photoURL, phoneNumber }) => {
  const user = auth.currentUser;
  if (!user) {
    return { success: false, message: "No user is logged in." };
  }

  try {
    // Update Firebase Authentication profile
    await updateProfile(user, {
      displayName: displayName || user.displayName,
      photoURL: photoURL || user.photoURL,
    });

    // Update Firestore user profile
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      displayName,
      photoURL,
      phoneNumber,
      updatedAt: new Date(),
    });

    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
