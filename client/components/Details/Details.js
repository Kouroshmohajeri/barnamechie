import React, { useEffect, useState } from "react";
import { BsCalendar2RangeFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { RxGlobe } from "react-icons/rx";
import { GiMoneyStack } from "react-icons/gi";
import { getCityById } from "@/api/cities/actions";
import { getCountryById } from "@/api/countries/actions";
import { getCurrencyById } from "@/api/currency/actions";
import styles from "./Details.module.css";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";

const Details = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [meetingData, setMeetingData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("meetingFormData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMeetingData(parsedData);
      setIsVisible(true);

      // Fetch city, country, and currency symbols
      fetchLocationData(parsedData.city, parsedData.country);
      fetchCurrencyData(parsedData.currency);
    }
  }, []);

  const fetchLocationData = async (cityId, countryId) => {
    try {
      if (cityId) {
        const cityData = await getCityById(cityId);
        setCityName(cityData.cityName);
      }
      if (countryId) {
        const countryData = await getCountryById(countryId);
        setCountryName(countryData.name);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const fetchCurrencyData = async (currencyId) => {
    try {
      if (currencyId) {
        const currencyData = await getCurrencyById(currencyId);
        setCurrencySymbol(currencyData.message.symbol);
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  if (isLoading || !meetingData) {
    return <SkeletonLoader />;
  }

  const {
    title,
    longDescription,
    startDate,
    startTime,
    endDate,
    endTime,
    address,
    price,
  } = meetingData;

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-CA", options);
  };

  const formatTime = (time) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(time).toLocaleTimeString("en-US", options);
  };

  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : ""}`}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.grid}>
        <div className={styles.gridItem}>
          <div className={styles.row}>
            <BsCalendar2RangeFill className={styles.icon} />
            <span>شروع</span>
          </div>
          <div className={styles.row}>
            <span>{formatDate(startDate)}</span>
          </div>
          <div className={styles.row}>
            <span>{formatTime(startTime)}</span>
          </div>
        </div>
        <div className={styles.gridItem}>
          <div className={styles.row}>
            <BsCalendar2RangeFill className={styles.icon} />
            <span>پایان</span>
          </div>
          <div className={styles.row}>
            <span>{formatDate(endDate)}</span>
          </div>
          <div className={styles.row}>
            <span>{formatTime(endTime)}</span>
          </div>
        </div>
      </div>
      <div className={styles.singleRow}>
        <RxGlobe className={styles.icon} />
        <span>{`${countryName}, ${cityName}`}</span>
      </div>
      <div className={styles.addressRow}>
        <IoLocationSharp className={styles.icon} />
        <span>{address}</span>
      </div>
      <div className={styles.singleRow}>
        <GiMoneyStack className={styles.icon} />
        <span>
          {currencySymbol} {price}
        </span>
      </div>
      <p className={styles.description}>{longDescription}</p>
    </div>
  );
};

export default Details;
