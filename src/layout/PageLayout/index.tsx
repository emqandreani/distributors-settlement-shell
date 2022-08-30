import React from "react";
import banner from "assets/images/banners-liquidacion.png";

import styles from "./index.module.scss";

export interface PageLayoutProps {
  children: JSX.Element;
  pageName: string;
}

const PageLayout = ({ children, pageName }: PageLayoutProps) => {
  return (
    <div className={styles["page-layout"]}>
      <div className={styles["banner-top"]}>
        <p className={styles["banner-title"]}>{pageName}</p>
        <img alt="Banner" className={styles["banner-logo"]} src={banner} />
      </div>
      {children}
    </div>
  );
};

export default PageLayout;
