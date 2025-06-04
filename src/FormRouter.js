// Form.js
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Form = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
  }, [navigate]);

  return <div>Protected Form Content Here</div>;
};

export default Form;
