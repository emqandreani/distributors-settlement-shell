const { dependencies } = require("./package.json");

module.exports = {
  name: "host",
  // remotes ignored because are dynamics (run-time)
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
    "@mui/material": {
      singleton: true,
      requiredVersion: dependencies["@mui/material"],
    },
    "@emotion/react": {
      singleton: true,
      requiredVersion: dependencies["@emotion/react"],
    },
    "@emotion/styled": {
      singleton: true,
      requiredVersion: dependencies["@emotion/styled"],
    },
    "react-redux": {
      singleton: true,
      requiredVersion: dependencies["react-redux"],
    },
    "react-router-dom": {
      singleton: true,
      requiredVersion: dependencies["react-router-dom"],
    },
    "@azure/msal": {
      singleton: true,
      requiredVersion: dependencies["@azure/msal"],
    },
    "@azure/msal-browser": {
      singleton: true,
      requiredVersion: dependencies["@azure/msal-browser"]
    },
    "@azure/msal-react": {
      singleton: true,
      requiredVersion: dependencies["@azure/msal-react"]
    },
  },
};
