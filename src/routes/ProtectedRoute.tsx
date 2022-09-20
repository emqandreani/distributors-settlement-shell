import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuth = useIsAuthenticated();

  if (!isAuth) {
    return <Navigate replace to={"/"} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
