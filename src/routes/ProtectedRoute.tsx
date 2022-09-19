import { useIsAuthenticated } from "@azure/msal-react";
import { setAuthtenticated } from "app/slices/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { MFRoutes } from "./routes";

const ProtectedRoute = () => {
  const isAuth = useIsAuthenticated();
  const dispatch = useDispatch();

  useEffect(() => {
    function checkApiAuth () {
      const { pathname } = window.location;
      const localAuth = localStorage.getItem("AUTH");

      if (Object.values(MFRoutes).some((el) => el === pathname)) {
        dispatch(setAuthtenticated(localAuth === 'true'));
      }
    }

    checkApiAuth();

    // window.addEventListener('storage', checkApiAuth)

    // return window.removeEventListener('storage', checkApiAuth)

  }, [dispatch])

  if (!isAuth) {
    return <Navigate replace to={"/"} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
