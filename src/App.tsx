import React from "react";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { store } from "app/store";

import Main from "./layout/Main";
import AppRoutes from "./routes";

interface IAppProps {
  msalInstance: IPublicClientApplication;
}

export default function App({ msalInstance }: IAppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <Main>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </Main>
    </MsalProvider>
  );
}

App.propTypes = {
  msalInstance: PropTypes.any.isRequired,
};
