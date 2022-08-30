import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button, useToggle } from "@architecture-it/stylesystem";
import { Typography } from "@mui/material";

import IdTokenClaims from "../../components/IdTokenClaims";

import styles from "./User.module.scss";

const User = () => {
  const { accounts } = useMsal();

  const [show, { toggle }] = useToggle();

  const account = accounts[0];

  if (!account) {
    return null;
  }

  return (
    <section className={styles.container}>
      <Typography className={styles.message} variant="h1">
        <span className={styles.span}>Bienvenido</span> {account.name}
      </Typography>
      {show && account?.idTokenClaims && <IdTokenClaims idTokenClaims={account.idTokenClaims} />}
      <Button
        text={`${show ? "Ocultar" : "Mostrar"} claims del token`}
        variant="contained"
        onClick={toggle}
      />
    </section>
  );
};

export default User;
