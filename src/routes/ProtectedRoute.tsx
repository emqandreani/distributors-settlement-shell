import { useIsAuthenticated } from "@azure/msal-react";
import { setAuthtenticated } from "app/slices/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { MFRoutes } from "./MFRoutes";

const ProtectedRoute = () => {
  const isAuth = useIsAuthenticated();
  const dispatch = useDispatch();

  useEffect(() => {
    const { pathname } = window.location;

    function checkApiAuth (pathname: string) {
      if (Object.values(MFRoutes).some((el) => el === pathname)) {
        const localAuth = (localStorage.getItem("AUTH") === 'true');
        dispatch(setAuthtenticated(localAuth))
        console.log(localAuth)
      }
    }

    checkApiAuth(pathname)
  }, [dispatch])

  if (!isAuth) {
    return <Navigate replace to={"/"} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
