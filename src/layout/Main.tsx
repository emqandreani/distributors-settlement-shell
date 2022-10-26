import { Button, Footer, Header, Sidebar, useToggle } from "@architecture-it/stylesystem";
import type { SidebarItemProps } from "@architecture-it/stylesystem";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import React from "react";
import { faBell, faUser } from "@fortawesome/pro-solid-svg-icons";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";
import type { IPublicClientApplication } from "@azure/msal-browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
  {
    item: "Administración",
    onClick: () => {
      navigate("/administracion");
      handleClose();
    },
    selected: pathname === "/administracion",
  },
  {
    item: "Liquidación",
    onClick: () => {
      navigate("/liquidacion");
      handleClose();
    },
    selected: pathname === "/liquidacion",
  },
  {
    item: "Catálogo",
    onClick: () => {
      navigate("/catalogo");
      handleClose();
    },
    selected: pathname === "/catalogo",
  },
];

const generateRoutesAuthenticated = ({
  instanceMsal,
  navigate,
  pathname,
  handleClose,
}: IGeneratorArguments): SidebarItemProps[] => [
  // {
  //   item: "Ver usuario",
  //   onClick: () => {
  //     if (pathname !== "/user") {
  //       navigate("user");
  //     }
  //     handleClose();
  //   },
  //   selected: pathname === "/user",
  // },
  {
    item: "Logout",
    onClick: () => {
      instanceMsal.logoutPopup({ postLogoutRedirectUri: "/", mainWindowRedirectUri: "/" });
      handleClose();
    },
  },
  // {
  //   item: "Logout con Redirect",
  //   onClick: () => {
  //     instanceMsal.logoutRedirect({ postLogoutRedirectUri: "/" });
  //     handleClose();
  //   },
  // },
];

const generateRoutesUnauthenticated = ({
  instanceMsal,
  handleClose,
}: IGeneratorArguments): SidebarItemProps[] => [
  {
    item: (
      <Button
        text="Login"
        variant="outlined"
        onClick={() => {
          instanceMsal.loginPopup(loginRequest);
          handleClose();
        }}
      />
    ),
  },
  // {
  //   item: (
  //     <Button
  //       text="Login con Redirect"
  //       variant="outlined"
  //       onClick={() => {
  //         instanceMsal.loginRedirect(loginRequest);
  //         handleClose();
  //       }}
  //     />
  //   ),
  // },
];

interface IMainProps {
  children: React.ReactNode;
}

export default function Main({ children }: IMainProps) {
  const [open, { handleOpen, handleClose }] = useToggle();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { instance: instanceMsal, accounts } = useMsal();
  const account = accounts[0];

  const isAuth = useIsAuthenticated();

  return (
    <div className={styles.container}>
      <Header onClickButton={handleOpen}>
        <div className={styles["header-content"]}>
          <h3 className={styles["header-title"]}>Sistema de liquidación</h3>
          {account && (
            <div className={styles["header-user-wrapper"]}>
              <FontAwesomeIcon icon={faBell as IconProp} />
              <p>{account.name}</p>
              <FontAwesomeIcon icon={faUser as IconProp} />
            </div>
          )}
        </div>
      </Header>
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
