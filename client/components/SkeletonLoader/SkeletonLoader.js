import React from "react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./SkeletonLoader.module.css";

const SkeletonLoader = () => {
  return (
    <div className={styles.container}>
      <Skeleton variant="text" width="60%" height={40} />
      <div className={styles.grid}>
        <Skeleton variant="rectangular" width="45%" height={100} />
        <Skeleton variant="rectangular" width="45%" height={100} />
      </div>
      <Skeleton variant="text" width="80%" height={20} />
      <Skeleton variant="text" width="50%" height={20} />
      <Skeleton variant="rectangular" width="100%" height={80} />
      <Skeleton variant="text" width="100%" height={40} />
    </div>
  );
};

export default SkeletonLoader;
