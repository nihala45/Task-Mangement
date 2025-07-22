import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserLoginRedirect = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (isAuthenticated && user ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserLoginRedirect;