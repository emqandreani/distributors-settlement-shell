import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorage } from "test-utils/localStorage";

const ProtectedRoute = () => {
  const [, setAuthMsg] = useState<string | null>(null);
  const isAuth = useIsAuthenticated();

  const handleUpdate = () => {
    setAuthMsg(getLocalStorage("AUTH"));
    console.log("FOUND:", getLocalStorage("AUTH"));
  };

  useEffect(() => {
    window.addEventListener("storage", handleUpdate, false);

    return window.removeEventListener("storage", handleUpdate, false);
    // window.addEventListener('storage', checkApiAuth)

    // return window.removeEventListener('storage', checkApiAuth)
  }, []);

  if (!isAuth) {
    return <Navigate replace to={"/"} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
