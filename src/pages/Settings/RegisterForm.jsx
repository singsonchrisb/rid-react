// components/RegisterForm.js
import React, { useState } from "react";
import { registerUser } from "../../api/register";
// import { registerUser } from "../api/register";

const RegisterForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    displayName: "",
    photoURL: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await registerUser(form);
    setMessage(result.message);
  };

  return (
    <form onSubmit={handleRegister}>
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <input name="displayName" onChange={handleChange} placeholder="Full Name" />
      <input name="photoURL" onChange={handleChange} placeholder="Photo URL" />
      <input name="phoneNumber" onChange={handleChange} placeholder="Phone Number" />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
};

export default RegisterForm;
