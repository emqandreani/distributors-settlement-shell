/* eslint-disable no-unused-vars */
export {};
import * as React from "react";

declare global {
  interface Window {
    /**
     * environment variables available on runtime
     */
    __ENV: Record<string, string>; // its posible define your env file
    [moduleKey: string]: unknown;
  }

  const __webpack_init_sharing__: any;
  const __webpack_share_scopes__: any;

  interface Container {
    init: (module: unknown) => Promise<unknown>;
    get: (componentName: string) => <T>() => { default: React.ComponentType<T> };
  }
}
