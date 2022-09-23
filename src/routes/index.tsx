import { TOKEN_KEY } from "constants/AUTH";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import type { IRemoteAppProps } from "remote/App";
import { store } from "app/store";
import useToken from "hooks/use-sso";
import { dynamicImport, ErrorBoundary } from "@architecture-it/microfront-utils";
import { setLocalStorage } from "test-utils/localStorage";

import PrincipalSkeleton from "../skeletons/Principal";

const Home = React.lazy(() => import("../pages/Home"));
const RemoteApp = React.lazy(() => dynamicImport<IRemoteAppProps>("administration/App"));

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  const { accounts } = useMsal();
  const isAuth = useIsAuthenticated();
  const account = accounts?.[0];

  const { token } = useToken();

  useEffect(() => {
    token.length && setLocalStorage(TOKEN_KEY, token);
  }, [token]);

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<PrincipalSkeleton />}>
        <Routes>
          <Route index element={isAuth ? <Home /> : <h1>Inicia sesión para continuar</h1>} />
          <Route element={<ProtectedRoute />} path="administracion/*">
            <Route element={<RemoteApp account={account} store={store} />} path="*" />
          </Route>
        </Routes>
      </React.Suspense>
    </ErrorBoundary>
  );
}
