import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import React, { useEffect, useMemo } from "react";
import { Route, Routes, useParams } from "react-router";
import type { IRemoteAppProps } from "remote/App";
import { store } from "app/store";
import useToken from "hooks/use-sso";
import { dynamicImport, ErrorBoundary } from "@architecture-it/microfront-utils";
import { getLocalStorage } from "test-utils/localStorage";

import PrincipalSkeleton from "../skeletons/Principal";

const Home = React.lazy(() => import("../pages/Home"));
const User = React.lazy(() => import("../pages/User"));
const RemoteApp = React.lazy(() => dynamicImport<IRemoteAppProps>("administration/App"));

import ProtectedRoute from "./ProtectedRoute";
import { MFRoutes } from "./routes";

export default function AppRoutes() {
  const { accounts } = useMsal();
  const isAuth = useIsAuthenticated();
  const account = accounts?.[0];

  const { token } = useToken();

  const { pathname } = useMemo(() => window.location, []);

  useEffect(() => {
    if (Object.values(MFRoutes).some((el) => el === pathname)) {
      if (getLocalStorage("AUTH") === "true") {
        console.log("API AUTH");
      } else {
        console.log("API UNAUTH");
      }
    } else {
      console.log("MF NO AÑADIDO A LAS RUTAS");
    }
    token.length && localStorage.setItem("token", token);
  }, [token, pathname]);

  console.log(pathname);

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<PrincipalSkeleton />}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<User />} path="user" />
          </Route>
          <Route element={<ProtectedRoute />} path="administracion/*">
            <Route element={<RemoteApp account={account} store={store} />} path="*" />
          </Route>
          <Route index element={isAuth ? <Home /> : <h1>Inicia sesión para continuar</h1>} />
        </Routes>
      </React.Suspense>
    </ErrorBoundary>
  );
}
