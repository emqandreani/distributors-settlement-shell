import { Button, Footer, Header, Sidebar, useToggle } from "@architecture-it/stylesystem";
import type { SidebarItemProps } from "@architecture-it/stylesystem";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";
import type { IPublicClientApplication } from "@azure/msal-browser";

import { loginRequest } from "../authConfig";

import styles from "./Main.module.scss";

interface IGeneratorArguments {
  navigate: NavigateFunction;
  pathname: string;
  handleClose: VoidFunction;
  instanceMsal: IPublicClientApplication;
}

const defaultRoutes = ({
  navigate,
  pathname,
  handleClose,
}: IGeneratorArguments): SidebarItemProps[] => [
  {
    item: "Home",
    onClick: () => {
      if (pathname !== "/") {
        navigate("");
      }
      handleClose();
    },
    selected: pathname === "/",
  },
];

const generateRoutesAuthenticated = ({
  instanceMsal,
  navigate,
  pathname,
  handleClose,
}: IGeneratorArguments): SidebarItemProps[] => [
  {
    item: "Ver usuario",
    onClick: () => {
      if (pathname !== "/user") {
        navigate("user");
      }
      handleClose();
    },
    selected: pathname === "/user",
  },
  {
    item: "Logout con Popup",
    onClick: () => {
      instanceMsal.logoutPopup({ postLogoutRedirectUri: "/", mainWindowRedirectUri: "/" });
      handleClose();
    },
  },
  {
    item: "Logout con Redirect",
    onClick: () => {
      instanceMsal.logoutRedirect({ postLogoutRedirectUri: "/" });
      handleClose();
    },
  },
];

const generateRoutesUnauthenticated = ({
  instanceMsal,
  handleClose,
}: IGeneratorArguments): SidebarItemProps[] => [
  {
    item: (
      <Button
        text="Login con Popup"
        variant="outlined"
        onClick={() => {
          instanceMsal.loginPopup(loginRequest);
          handleClose();
        }}
      />
    ),
  },
  {
    item: (
      <Button
        text="Login con Redirect"
        variant="outlined"
        onClick={() => {
          instanceMsal.loginRedirect(loginRequest);
          handleClose();
        }}
      />
    ),
  },
];

interface IMainProps {
  children: React.ReactNode;
}

export default function Main({ children }: IMainProps) {
  const [open, { handleOpen, handleClose }] = useToggle();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { instance: instanceMsal } = useMsal();
  const isAuth = useIsAuthenticated();

  return (
    <div className={styles.container}>
      <Header onClickButton={handleOpen} />
      <Sidebar
        open={open}
        routes={[
          ...defaultRoutes({ navigate, pathname, handleClose, instanceMsal }),
          ...(isAuth
            ? generateRoutesAuthenticated({ instanceMsal, navigate, pathname, handleClose })
            : generateRoutesUnauthenticated({ instanceMsal, navigate, pathname, handleClose })),
        ]}
        onClose={handleClose}
        onOpen={handleOpen}
      />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.element,
};
