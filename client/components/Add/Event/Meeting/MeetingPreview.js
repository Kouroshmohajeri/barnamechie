import React, { useEffect, useState } from "react";
import styles from "./MeetingPreview.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useEventContext } from "@/context/Add/EventCategory/EventContext";
import CardSwiper from "@/components/CardSwiper/CardSwiper";
import Details from "@/components/Details/Details";

const MeetingPreview = ({ onBack }) => {
  const meetingFormData = JSON.parse(localStorage.getItem("meetingFormData"));
  const uploadData = JSON.parse(localStorage.getItem("uploadData"));
  const { setSelectedEvent } = useEventContext();
  const mainImage =
    uploadData?.selectedFiles[uploadData?.mainImageIndex]?.preview;

  const [titleAnimated, setTitleAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mainImageHeight = document.querySelector(
        `.${styles.img}`
      ).offsetHeight;
      if (window.scrollY > mainImageHeight + 5) {
        // Trigger animation after scrolling a few pixels past the image
        setTitleAnimated(true);
      } else {
        setTitleAnimated(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backButton = () => {
    setSelectedEvent(2);
  };
  const handlePublish = () => {
    // Add logic for publish action here
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <FaArrowLeft
          className={styles.backButton}
          onClick={() => backButton()}
        />
        <span className={styles.title}>خلاصش چیه؟</span>
      </div>

      {/* Main Image */}
      <CardSwiper />
      <Details />
      {/* Publish Button */}
      <div className={styles.buttonContainer}>
        <button className={styles.publishButton} onClick={handlePublish}>
          انتشار
        </button>
      </div>
    </div>
  );
};

export default MeetingPreview;
