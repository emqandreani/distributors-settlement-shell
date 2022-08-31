import { useIsAuthenticated } from "@azure/msal-react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuth = useIsAuthenticated();

  if (!isAuth) {
    return <Navigate replace to={"/login"} />;
  }
  

  return <Outlet />;
};

export default ProtectedRoute;
