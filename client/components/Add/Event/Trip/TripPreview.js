import React, { useEffect, useState } from "react";
import styles from "./TripPreview.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { BsFillHouseFill } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";
import { useEventContext } from "@/context/Add/EventCategory/EventContext";
import CardSwiper from "@/components/CardSwiper/CardSwiper";
import { useBackContext } from "@/context/Back/BackContext";

const TripPreview = ({ onBack }) => {
  const tripFormData = JSON.parse(localStorage.getItem("tripFormData"));
  const uploadData = JSON.parse(localStorage.getItem("uploadData"));
  const { setSelectedEvent } = useEventContext();
  const { step } = useBackContext();
  const mainImage =
    uploadData?.selectedFiles[uploadData?.mainImageIndex]?.preview;

  const [titleAnimated, setTitleAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mainImageHeight = document.querySelector(
        `.${styles.img}`
      )?.offsetHeight;
      if (window.scrollY > (mainImageHeight || 0) + 5) {
        setTitleAnimated(true);
      } else {
        setTitleAnimated(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backButton = () => {
    setSelectedEvent(step);
  };

  const handlePublish = () => {
    console.log("Publish action triggered.");
  };

  if (!tripFormData) {
    return <div className={styles.container}>No trip data available.</div>;
  }

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
      {mainImage && (
        <img src={mainImage} alt="Main trip" className={styles.img} />
      )}

      {/* Animated Title */}
      <div
        className={`${styles.scrollTitle} ${
          titleAnimated ? styles.animated : ""
        }`}
      >
        {tripFormData.tripName}
      </div>

      {/* Trip Details */}
      <div className={styles.details}>
        <div className={styles.row}>
          <div className={styles.detailItem}>
            <GiAirplaneDeparture className={styles.icon} />
            <span>
              <strong>مبدا:</strong> {tripFormData.origin}
            </span>
          </div>
          <div className={styles.detailItem}>
            <GiAirplaneArrival className={styles.icon} />
            <span>
              <strong>مقصد:</strong> {tripFormData.destination}
            </span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.detailItem}>
            <BsFillHouseFill className={styles.icon} />
            <span>
              <strong>محل اقامت:</strong> {tripFormData.accommodation}
            </span>
          </div>
          <div className={styles.detailItem}>
            <MdPeopleAlt className={styles.icon} />
            <span>
              <strong>ظرفیت:</strong> {tripFormData.capacity}
            </span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.detailItem}>
            <strong>تاریخ شروع:</strong>{" "}
            {new Date(tripFormData.startDate).toLocaleDateString("fa-IR")}
          </div>
          <div className={styles.detailItem}>
            <strong>تاریخ پایان:</strong>{" "}
            {new Date(tripFormData.endDate).toLocaleDateString("fa-IR")}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.detailItem}>
            <strong>قیمت:</strong> {tripFormData.price}{" "}
            {tripFormData.currency && <span>{tripFormData.currency}</span>}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.detailItem}>
            <strong>توضیح کوتاه:</strong> {tripFormData.shortDescription}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.detailItem}>
            <strong>توضیح کامل:</strong> {tripFormData.longDescription}
          </div>
        </div>
      </div>

      {/* Publish Button */}
      <div className={styles.buttonContainer}>
        <button className={styles.publishButton} onClick={handlePublish}>
          انتشار
        </button>
      </div>
    </div>
  );
};

export default TripPreview;
