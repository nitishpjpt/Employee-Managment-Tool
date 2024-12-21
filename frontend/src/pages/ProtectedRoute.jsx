import React from "react";
import { Navigate } from "react-router-dom";


// Admin Protected route
const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};



export default ProtectedRoute;
