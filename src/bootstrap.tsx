import { TOKEN_KEY } from "constants/AUTH";

import React from "react";
import ReactDOM from "react-dom";
import { AuthenticationResult, EventType, PublicClientApplication } from "@azure/msal-browser";
import { StyleSystemProvider } from "@architecture-it/stylesystem";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { msalConfig, silentRequest } from "./authConfig";
import { subscribe } from "./events";
import "./index.css";

/**
 * Debe ser istanciado fuera del ciclo de vida de los componentes para evitar reisntanciar cuando rerenderice la app
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    const { idToken, account } = event.payload as AuthenticationResult;

    msalInstance.setActiveAccount(account);
    localStorage.setItem(TOKEN_KEY, idToken);
  }
});

const onUnauthorizedListener = async () => {
  try {
    const { idToken } = await msalInstance.acquireTokenSilent(silentRequest);

    localStorage.setItem(TOKEN_KEY, idToken);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

subscribe("onUnauthorized", onUnauthorizedListener);

ReactDOM.render(
  <BrowserRouter>
    <StyleSystemProvider>
      <CssBaseline />
      <App msalInstance={msalInstance} />
    </StyleSystemProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
