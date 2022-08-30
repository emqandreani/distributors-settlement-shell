import env from "@architecture-it/react-env";

const clientId = env("B2C_clientId") || "";
const authorityDomain = env("B2C_authorityDomain") || "";
const signUpSignIn = "B2C_1A_SIGNUP_SIGNINAAD";
const forgotPassword = "B2C_1A_PASSWORDRESET";
const editProfile = "B2C_1A_PROFILEEDIT";

export const b2cPolicies = {
  names: {
    signUpSignIn: signUpSignIn,
    forgotPassword: forgotPassword,
    editProfile: editProfile,
  },
  authorities: {
    signUpSignIn: {
      authority: authorityDomain.concat(signUpSignIn),
    },
    forgotPassword: {
      authority: authorityDomain.concat(forgotPassword),
    },
    editProfile: {
      authority: authorityDomain.concat(editProfile),
    },
  },
  authorityDomain: authorityDomain,
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    clientId: clientId, // Este es el único campo obligatorio que debe proporcionar.
    authority: b2cPolicies.authorities.signUpSignIn.authority, // Usar un flujo de usuario de registro/inicio de sesión como autoridad predeterminada
    knownAuthorities: [b2cPolicies.authorityDomain], // B2C tenant
    redirectUri: window.location.origin, // Punto al cual se redirecciona el usuario
    postLogoutRedirectUri: window.location.origin, // La página para navegar después de cerrar sesión.
    navigateToLoginRequestUrl: false, // Si es 'true', navegará de regreso a la ubicación de la solicitud original antes de procesar la respuesta del código de autenticación.
  },
  cache: {
    cacheLocation: "localStorage", // Configures cache location. 'sessionStorage' is more secure, but 'localStorage' gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to 'true' if you are having issues on IE11 or Edge
  },
  //descomentar para hacer debugging
  // system: {
  //   // loggerOptions: {
  //   // loggerCallback: (level, message, containsPii) => {
  //   //   if (containsPii) {
  //   //     return;
  //   //   }
  //        //ver LogLevel para ver que tipo de error es
  //   // },
  //   // },
  // },
};

/**
 * Por default se agrega (openid, profile, email) a cualquier request de login
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [],
};

export const silentRequest = {
  scopes: ["openid", "profile"],
  loginHint: "example@domain.net",
};
