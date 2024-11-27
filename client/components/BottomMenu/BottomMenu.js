import React, { useState } from "react";
import styles from "./BottomMenu.module.css";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const BottomMenu = ({ onPageChange }) => {
  const [selected, setSelected] = useState(null); // Track selected menu item

  const handleClick = (index) => {
    setSelected(index);
    onPageChange(index);
  };

  return (
    <div className={styles.bottomMenu}>
      <div className={styles.menuItems}>
        {/* Home Button */}
        <div
          className={`${styles.menuItem} ${
            selected === 0 ? styles.active : ""
          }`}
          onClick={() => handleClick(0)}
        >
          <HomeIcon className={styles.icon} />
          {selected === 0 && <div className={styles.indicator} />}
        </div>

        {/* Categories Button */}
        <div
          className={`${styles.menuItem} ${
            selected === 1 ? styles.active : ""
          }`}
          onClick={() => handleClick(1)}
        >
          <ClearAllIcon className={styles.icon} />
          {selected === 1 && <div className={styles.indicator} />}
        </div>

        {/* Add Button */}
        <div
          className={`${styles.menuItem} ${
            selected === 2 ? styles.active : ""
          }`}
          onClick={() => handleClick(2)}
        >
          <AddCircleOutlineIcon className={styles.icon} />
          {selected === 2 && <div className={styles.indicator} />}
        </div>

        {/* Notifications Button */}
        <div
          className={`${styles.menuItem} ${
            selected === 3 ? styles.active : ""
          }`}
          onClick={() => handleClick(3)}
        >
          <NotificationsNoneIcon className={styles.icon} />
          {selected === 3 && <div className={styles.indicator} />}
        </div>

        {/* Profile Button */}
        <div
          className={`${styles.menuItem} ${
            selected === 4 ? styles.active : ""
          }`}
          onClick={() => handleClick(4)}
        >
          <PermIdentityIcon className={styles.icon} />
          {selected === 4 && <div className={styles.indicator} />}
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
