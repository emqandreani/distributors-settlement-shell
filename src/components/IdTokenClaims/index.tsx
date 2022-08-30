import React from "react";
import { Typography } from "@mui/material";
import type { TokenClaims } from "@azure/msal-common";

interface IIdTokenClaimsProps {
  idTokenClaims: TokenClaims & {
    [key: string]: string | number | string[] | object | undefined | unknown;
  };
}

const IdTokenClaims = ({ idTokenClaims }: IIdTokenClaimsProps) => {
  return (
    <div id="token-div" style={{ color: "var(--gray-600)" }}>
      <Typography display="flex">
        <strong>Audience: </strong> {idTokenClaims.aud}
      </Typography>
      <Typography display="flex">
        <strong>Issuer: </strong> {idTokenClaims.iss}
      </Typography>
      <Typography display="flex">
        {/** En algunos casos el claim es una clave compuesta, es decir, con caracteres especiales como '.' */}
        <strong>Email</strong> {idTokenClaims?.["signInNames.emailAddress"]}
      </Typography>
    </div>
  );
};

export default IdTokenClaims;
