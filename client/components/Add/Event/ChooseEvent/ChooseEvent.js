"use client";
import React, { useContext, useState } from "react";
import styles from "./ChooseEvent.module.css";
import PeopleIcon from "@mui/icons-material/People";
import FlightIcon from "@mui/icons-material/Flight";
import { EventContext } from "@/context/Add/EventCategory/EventContext";
import { FaArrowLeft } from "react-icons/fa";
import { CategoryContext } from "@/context/Add/ChooseCategory/CategoryContext";
import { BottomMenuContext } from "@/context/BottomMenuContext";
import { useBackContext } from "@/context/Back/BackContext";

const ChooseEvent = () => {
  const { selectedEvent, setSelectedEvent } = useContext(EventContext);
  const { setSelectedCategory } = useContext(CategoryContext);
  const { setIsHidden } = useContext(BottomMenuContext);
  const { setStep } = useBackContext();

  // Handle event selection
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setStep(event);
    setIsHidden(true);
  };
  const backButton = () => {
    setSelectedCategory(null);
    setIsHidden(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.eventGrid}>
        <div className={styles.eventBox} onClick={() => handleEventSelect(0)}>
          <div className={styles.boxWrapper}>
            <PeopleIcon fontSize="large" />
            <p>برنامه</p>
          </div>
        </div>
        <div className={styles.eventBox} onClick={() => handleEventSelect(1)}>
          <div className={styles.boxWrapper}>
            <FlightIcon fontSize="large" />
            <p>سفر</p>
          </div>
        </div>
      </div>
      {/* New Row Below */}
      <div className={styles.backRow} onClick={() => backButton()}>
        <FaArrowLeft className={styles.backButton} />
      </div>
    </div>
  );
};

export default ChooseEvent;
