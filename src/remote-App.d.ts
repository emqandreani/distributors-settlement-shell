declare module "remote/App" {
  import type { AccountInfo } from "@azure/msal-react";

  export interface IRemoteAppProps {
    account?: AccountInfo;
    store?: unknown;
  }

  export default function RemoteApp(_props: IRemoteAppProps): JSX.Element;
}
