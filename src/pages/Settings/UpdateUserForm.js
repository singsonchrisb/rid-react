// components/UpdateUserForm.js
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { updateUserProfile } from "../api/updateUserProfile";

const UpdateUserForm = () => {
  const [form, setForm] = useState({
    displayName: "",
    photoURL: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");

  // Load current data from Firestore on mount
  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setForm({
          displayName: data.displayName || "",
          photoURL: data.photoURL || "",
          phoneNumber: data.phoneNumber || "",
        });
      }
    };

    loadUserData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await updateUserProfile(form);
    setMessage(result.message);
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Profile</h2>
      <input
        name="displayName"
        placeholder="Full Name"
        value={form.displayName}
        onChange={handleChange}
      />
      <input
        name="photoURL"
        placeholder="Photo URL"
        value={form.photoURL}
        onChange={handleChange}
      />
      <input
        name="phoneNumber"
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
      <p>{message}</p>
    </form>
  );
};

export default UpdateUserForm;
