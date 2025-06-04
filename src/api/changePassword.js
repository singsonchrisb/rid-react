// api/changePassword.js
import { updatePassword } from "firebase/auth";
import { auth } from "../firebase/firestore";

export const changePassword = async (newPassword) => {
  const user = auth.currentUser;
  if (!user) {
    return { success: false, message: "No user is logged in." };
  }

  try {
    await updatePassword(user, newPassword);
    return { success: true, message: "Password updated successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
