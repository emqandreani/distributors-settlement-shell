import React from "react";
import Skeleton from "@mui/material/Skeleton";

import styles from "./Principal.module.scss";

export default function Principal() {
  return (
    <main className={styles.container}>
      <Skeleton
        classes={{ root: styles.root }}
        data-testid="main-skeleton"
        height={"3rem"}
        variant="text"
        width="50vw"
      />
    </main>
  );
}
