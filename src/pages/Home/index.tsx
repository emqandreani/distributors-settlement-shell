import React from "react";
import Typography from "@mui/material/Typography";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

import styles from "./Home.module.scss";

export default function Home() {
  const isAuth = useIsAuthenticated();

  const { accounts } = useMsal();
  const account = accounts?.[0];

  if (isAuth && account) {
    return (
      <>
        <Typography variant="h1">
          <span className={styles.span}>Bienvenido</span> {account.name}
        </Typography>
      </>
    );
  }

  return (
    <Typography variant="h1">Por favor logeate para ver la información de usuario.</Typography>
  );
}
