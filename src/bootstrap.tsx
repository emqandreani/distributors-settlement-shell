import React from "react";
import ReactDOM from "react-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { StyleSystemProvider } from "@architecture-it/stylesystem";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { msalConfig } from "./authConfig";

/**
 * Debe ser istanciado fuera del ciclo de vida de los componentes para evitar reisntanciar cuando rerenderice la app
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <BrowserRouter>
    <StyleSystemProvider>
      <CssBaseline />
      <App msalInstance={msalInstance} />
    </StyleSystemProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
