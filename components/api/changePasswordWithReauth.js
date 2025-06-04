// api/changePasswordWithReauth.js
import {
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword,
  } from "firebase/auth";
  import { auth } from "../firebase/firestore";
  
  export const changePasswordWithReauth = async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      return { success: false, message: "User not logged in." };
    }
  
    try {
      // Step 1: Re-authenticate
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
  
      // Step 2: Update password
      await updatePassword(user, newPassword);
  
      return { success: true, message: "Password changed successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  