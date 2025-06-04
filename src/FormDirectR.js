// Form.js
import React, { useEffect, useState } from "react";
import { auth } from "./firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        navigate("/login"); // Redirect to login if not logged in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return null;

  return (
    <div>
      <h2>Protected Form</h2>
      {/* Your protected form content here */}
    </div>
  );
};

export default Form;
