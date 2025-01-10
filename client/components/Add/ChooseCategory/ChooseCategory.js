"use client";
import React, { useContext, useState } from "react";
import styles from "./ChooseCategory.module.css";
import EventIcon from "@mui/icons-material/Event";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LuggageIcon from "@mui/icons-material/Luggage";
import { CategoryContext } from "@/context/Add/ChooseCategory/CategoryContext";

const ChooseCategory = () => {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);

  // Handle category selection
  const handleCategorySelect = (category, step) => {
    setSelectedCategory(category);
    localStorage.setItem("firstStep", step);
  };

  return (
    <div className={styles.container}>
      <div className={styles.categoryGrid}>
        <div
          className={styles.categoryBox}
          onClick={() => handleCategorySelect(0, "event")}
        >
          <div className={styles.boxWrapper}>
            <EventIcon fontSize="large" />
            <p>ایونت</p>
          </div>
        </div>
        <div
          className={styles.categoryBox}
          onClick={() => handleCategorySelect(1, "service")}
        >
          <div className={styles.boxWrapper}>
            <LocalDiningIcon fontSize="large" />
            <p>خدمات</p>
          </div>
        </div>
        <div
          className={styles.categoryBox}
          onClick={() => handleCategorySelect(2, "product")}
        >
          <div className={styles.boxWrapper}>
            <PhoneIphoneIcon fontSize="large" />
            <p>محصولات</p>
          </div>
        </div>
        <div
          className={styles.categoryBox}
          onClick={() => handleCategorySelect(3, "shipping")}
        >
          <div className={styles.boxWrapper}>
            <LuggageIcon fontSize="large" />
            <p>حمل بار</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseCategory;
