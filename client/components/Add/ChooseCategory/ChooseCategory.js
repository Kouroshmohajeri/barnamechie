"use client";

import React, { useState } from "react";
import styles from "./ChooseCategory.module.css";

// Icons (You can replace these with your own icons)
import EventIcon from "@mui/icons-material/Event";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

const ChooseCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("firstStep", category); // Save the selection to localStorage
  };

  return (
    <div className={styles.container}>
      <div className={styles.categoryGrid}>
        <div
          className={styles.categoryBox}
          onClick={() => handleCategorySelect("Event")}
        >
          <EventIcon fontSize="large" />
          <p>Event</p>
        </div>
        <div
          className={styles.categoryBox}
          onClick={() => handleCategorySelect("Service")}
        >
          <LocalDiningIcon fontSize="large" />
          <p>Service</p>
        </div>
        <div
          className={styles.categoryBox}
          onClick={() => handleCategorySelect("Product")}
        >
          <PhoneIphoneIcon fontSize="large" />
          <p>Product</p>
        </div>
      </div>
    </div>
  );
};

export default ChooseCategory;
