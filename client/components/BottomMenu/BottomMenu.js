"use client";
import React, { useContext } from "react";
import styles from "./BottomMenu.module.css";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { BottomMenuContext } from "@/context/BottomMenuContext";

const BottomMenu = () => {
  const { selectedPage, setSelectedPage, isHidden } =
    useContext(BottomMenuContext);

  const handleClick = (index) => {
    setSelectedPage(index);
  };
  return (
    <div
      className={`${styles.bottomMenu} ${
        isHidden ? styles.hidden : styles.slideIn
      }`}
    >
      <div className={styles.menuItems}>
        {/* Home Button */}
        <div
          className={`${styles.menuItem} ${
            selectedPage === 0 ? styles.active : ""
          }`}
          onClick={() => handleClick(0)}
        >
          <HomeIcon className={styles.icon} />
          {selectedPage === 0 && <div className={styles.indicator} />}
        </div>

        {/* Categories Button */}
        <div
          className={`${styles.menuItem} ${
            selectedPage === 1 ? styles.active : ""
          }`}
          onClick={() => handleClick(1)}
        >
          <ClearAllIcon className={styles.icon} />
          {selectedPage === 1 && <div className={styles.indicator} />}
        </div>

        {/* Add Button */}
        <div
          className={`${styles.menuItem} ${
            selectedPage === 2 ? styles.active : ""
          }`}
          onClick={() => handleClick(2)}
        >
          <AddCircleOutlineIcon className={styles.icon} />
          {selectedPage === 2 && <div className={styles.indicator} />}
        </div>

        {/* Notifications Button */}
        <div
          className={`${styles.menuItem} ${
            selectedPage === 3 ? styles.active : ""
          }`}
          onClick={() => handleClick(3)}
        >
          <NotificationsNoneIcon className={styles.icon} />
          {selectedPage === 3 && <div className={styles.indicator} />}
        </div>

        {/* Profile Button */}
        <div
          className={`${styles.menuItem} ${
            selectedPage === 4 ? styles.active : ""
          }`}
          onClick={() => handleClick(4)}
        >
          <PermIdentityIcon className={styles.icon} />
          {selectedPage === 4 && <div className={styles.indicator} />}
        </div>
      </div>

      {/* Divider */}
      <hr className={styles.divider} />

      {/* Footer with your name */}
      <p className={styles.footer}>Designed by Kourosh Mohajeri</p>
    </div>
  );
};

export default BottomMenu;
