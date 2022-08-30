import { useMsal } from "@azure/msal-react";
import React from "react";
import { Route, Routes } from "react-router";
import type { IRemoteAppProps } from "remote/App";

import dynamicImport from "../lib/dynamicImport";
import PrincipalSkeleton from "../skeletons/Principal";

const Home = React.lazy(() => import("../pages/Home"));
const User = React.lazy(() => import("../pages/User"));
const RemoteApp = React.lazy(() => dynamicImport<IRemoteAppProps>("remote/App"));

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  const { accounts } = useMsal();
  const account = accounts?.[0];

  return (
    <React.Suspense fallback={<PrincipalSkeleton />}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<User />} path="user" />
        </Route>
        <Route element={<ProtectedRoute />} path="module/*">
          <Route element={<RemoteApp account={account} />} path="*" />
        </Route>
        <Route index element={<Home />} />
      </Routes>
    </React.Suspense>
  );
}
