import { Routes, Route } from "react-router-dom";
import Form from "./FormRouter";
import Login from "./Settings/Login";
import ProtectedRoute from "./ProtectedRoute";

<Routes>
  <Route path="/login" element={<Login />} />
  <Route
    path="/form"
    element={
      <ProtectedRoute>
        <Form />
      </ProtectedRoute>
    }
  />
</Routes>
