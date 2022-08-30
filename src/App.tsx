import React from "react";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import PropTypes from "prop-types";

import Main from "./layout/Main";
import AppRoutes from "./routes";

interface IAppProps {
  msalInstance: IPublicClientApplication;
}

export default function App({ msalInstance }: IAppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <Main>
        <AppRoutes />
      </Main>
    </MsalProvider>
  );
}

App.propTypes = {
  msalInstance: PropTypes.any.isRequired,
};
