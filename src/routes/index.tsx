import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import React, { useEffect, useMemo } from "react";
import { Route, Routes } from "react-router";
import type { IRemoteAppProps } from "remote/App";
import dynamicImport from "lib/dynamicImport";
import { store } from "app/store";
import useToken from "hooks/use-sso";

import PrincipalSkeleton from "../skeletons/Principal";

const Home = React.lazy(() => import("../pages/Home"));
const User = React.lazy(() => import("../pages/User"));
const RemoteApp = React.lazy(() => dynamicImport<IRemoteAppProps>("administration/App"));

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  const { accounts } = useMsal();
  const isAuth = useIsAuthenticated();
  const account = accounts?.[0];

  const { token } = useToken();

  useEffect(() => {
    token.length && localStorage.setItem("token", token);
  }, [token]);

  return (
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
  );
}
