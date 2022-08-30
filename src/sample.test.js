import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { screen, act } from "@testing-library/react";

import { renderWithProviders } from "./test-utils";
import App from "./App";
import { msalConfig } from "./authConfig.js";

describe("Sanitize configuration object", () => {
  beforeAll(() => {
    global.msalConfig = require("./authConfig.js").msalConfig;
  });

  it("should define the config object", () => {
    expect(msalConfig).toBeDefined();
  });

  it("should contain credentials", () => {
    const regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(regexGuid.test(msalConfig.auth.clientId)).toBe(true);
  });

  it("should contain authority uri", () => {
    const regexUri =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    expect(regexUri.test(msalConfig.auth.authority)).toBe(true);
  });

  it("should define a redirect uri", () => {
    expect(msalConfig.auth.redirectUri).toBeDefined();
  });
});

describe("Ensure that the app starts", () => {
  beforeAll(() => {
    global.crypto = require("crypto");
    global.msalConfig = require("./authConfig.js").msalConfig;
    global.msalInstance = new PublicClientApplication(msalConfig);

    expect(msalInstance).toBeDefined();
    expect(msalInstance).toBeInstanceOf(PublicClientApplication);
  });

  it("should render the unauthorized message", async () => {
    act(() => {
      renderWithProviders(<App msalInstance={msalInstance} />);
    });
    expect(
      await screen.findByText("Por favor logeate para ver la información de usuario.")
    ).toBeInTheDocument();
  });
});
