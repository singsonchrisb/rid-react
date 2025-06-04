// ProtectedRoute.js
import { auth } from "../firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => { 
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  if (!authChecked) return null;
  return loggedIn ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
