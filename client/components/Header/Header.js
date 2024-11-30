"use client";
import React, { useContext, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Header.module.css";
import { BottomMenuContext } from "@/context/BottomMenuContext";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const { setSelectedPage } = useContext(BottomMenuContext);

  const toggleSearch = () => {
    if (searchOpen) {
      setClosing(true);
      setTimeout(() => {
        setClosing(false);
        setSearchOpen(false);
      }, 300);
    } else {
      setSearchOpen(true);
    }
  };

  return (
    <div
      className={`${styles.header} ${searchOpen ? styles.searchActive : ""} ${
        closing ? styles.searchClosing : ""
      }`}
    >
      {!searchOpen && !closing && (
        <>
          <div className={styles.headerLeft}></div>

          <Typography
            variant="h6"
            component="span"
            className={styles.headerText}
            onClick={() => {
              setSelectedPage(0);
            }}
          >
            برنامه چیه؟
          </Typography>

          <div className={styles.headerRight}>
            <IconButton onClick={toggleSearch}>
              <SearchIcon sx={{ color: "white" }} />
            </IconButton>
          </div>
        </>
      )}
      {(searchOpen || closing) && (
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="جستجو کنید..."
            className={styles.searchField}
          />
          <IconButton onClick={toggleSearch} className={styles.closeButton}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Header;
