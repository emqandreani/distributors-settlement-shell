/**
 * dynamic import from mfe.
 * @param path
 * @returns
 *
 * @example
 *
 * remote@http
 * const AppRemote = React.lazy(() => dynamicImport<IAppRemoteProps>("remote/App"));
 */

const PREFIX_MFE = "REACT_APP_MFE_";

export default async function dynamicImport<T>(path: string) {
  const [remoteName, remoteUrl] = Object.entries(window.__ENV as Record<string, string>)
    .filter(([r]) => r.startsWith(PREFIX_MFE))
    .find(([r]) => {
      return path.startsWith(r.replace(PREFIX_MFE, "").toLowerCase());
    }) as string[];

  if (!remoteName) throw new Error(`URL not configured for remote '${path}'.`);
  if (remoteUrl.split("@").length !== 2) throw new Error(`URL misconfigured for remote '${path}'`);

  const [moduleName, moduleUrl] = remoteUrl.split("@");

  // si el contenedor comparte dependencias
  await __webpack_init_sharing__("default");

  await new Promise<void>((resolve, reject) => {
    const element = document.createElement("script");

    element.src = moduleUrl;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => {
      element!.parentElement!.removeChild(element);
      resolve();
    };

    element.onerror = (err) => {
      element!.parentElement!.removeChild(element);
      reject(err);
    };

    document.head.appendChild(element);
  });

  const container = window[moduleName] as Container; // or get the container somewhere else

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);

  let component = `.${path.replace(moduleName, "")}`;

  const factory = await container.get(component);
  const Module = factory<T>();

  console.log(Module);

  return Module;
}
