import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute1: React.FC<{
  element: React.ReactElement;
}> = ({ element }) => {
  // Replace this with your actual authentication logic
  const refreshToken = localStorage.getItem("refreshToken");
  const roleId = localStorage.getItem("roleId");
  const isAuthenticated = Boolean(refreshToken) && roleId === "1";

  return isAuthenticated ? (
    // If roleId is 1, render the element
    element
  ) : roleId === "3" ? (
    // If roleId is 3, redirect to the admin page
    <Navigate to="/view" replace={true} state={{ from: "/" }} />
  ) : (
    // If not authenticated and not roleId 3, redirect to sign-in page
    <Navigate to="/sign-in" replace={true} state={{ from: "/" }} />
  );
};

export default ProtectedRoute1;
