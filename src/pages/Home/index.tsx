import React from "react";
import liquidacionIcon from "assets/icons/liquidacion_linea-rojo-relleno.svg";
import reportesIcon from "assets/icons/balance_linea-rojo-relleno.png";
import tarifarioIcon from "assets/icons/tarifario_linea-rojo-relleno.svg";
import administracionIcon from "assets/icons/contactos-linea-rojo.svg";
import PageLayout from "layout/PageLayout";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";

const HOME_CARDS = [
  {
    name: "Administración de roles",
    path: "/administracion",
    svg: administracionIcon,
  },
  {
    name: "Liquidación",
    path: "/liquidacion",
    svg: liquidacionIcon,
  },
  {
    name: "Generación de reportes",
    path: "/",
    svg: reportesIcon,
  },
  {
    name: "Libros de precios",
    path: "/catalogo",
    svg: tarifarioIcon,
  },
];

const HomePage = () => {
  return (
    <PageLayout pageName="Inicio">
      <div className={styles["home-container"]}>
        <div className={styles["cards-wrapper"]}>
          {HOME_CARDS.map((item, index) => (
            <Link key={item.name + index} className={styles["home-card"]} to={item.path}>
              <img alt={item.name} className={styles["card-img"]} src={item.svg} />
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
