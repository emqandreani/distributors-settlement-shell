import { Button } from "@architecture-it/stylesystem";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

const LoginPage = () => {
  const isAuthenticated = useIsAuthenticated();
  const {accounts} = useMsal()
  const account = accounts[0];
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        text={isAuthenticated ? "Cerrar Sesión" : "Iniciar Sesión"}
        variant="contained"
      />
    </div>
  );
}