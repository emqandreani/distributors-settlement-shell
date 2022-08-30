import React from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

import { loginRequest } from "../../authConfig";

import type { IClaimsAB2C, IUseTokenResult } from "./interfaces";

/**
 * Hook to get token and resolve simil SSO
 * @param {string} key The key with which the token will be stored in the localStorage
 * @param {"loginRedirect" | "loginPopup"} login type of login when require interaction
 *
 */
const useToken = (
  key: string = "token",
  login: "loginRedirect" | "loginPopup" = "loginRedirect"
): IUseTokenResult => {
  const { accounts, instance } = useMsal();
  const [isLoaded, setIsLoaded] = React.useState(() => Boolean(localStorage.getItem(key)));
  const [claims, setClaims] = React.useState<IClaimsAB2C | null>(null);

  React.useEffect(() => {
    if (instance) {
      (async function () {
        try {
          const { idToken, idTokenClaims } = await instance.ssoSilent({ account: accounts?.[0] });

          localStorage.setItem(key, idToken);
          setIsLoaded(true);
          setClaims(idTokenClaims as IClaimsAB2C);
        } catch (err) {
          if (err instanceof InteractionRequiredAuthError) {
            instance[login](loginRequest);
          }
        }
      })();
    }
  }, [instance, accounts, key, login]);

  return {
    isLoaded,
    claims,
  };
};

export default useToken;
