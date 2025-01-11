import React, { useEffect, useState } from "react";
import { BsCalendar2RangeFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { RxGlobe } from "react-icons/rx";
import { GiMoneyStack } from "react-icons/gi";
import { getCityById } from "@/api/cities/actions";
import { getCountryById } from "@/api/countries/actions";
import { getCurrencyById } from "@/api/currency/actions";
import styles from "./EventDetails.module.css";
import SkeletonLoader from "../../../SkeletonLoader/SkeletonLoader";
import { useBackContext } from "@/context/Back/BackContext";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { BsFillHouseFill } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";

const EventDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [meetingData, setMeetingData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { step } = useBackContext();

  useEffect(() => {
    const storedData = localStorage.getItem(`${step}FormData`);
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
    origin,
    destination,
    startTime,
    capacity,
    endDate,
    endTime,
    accommodation,
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
            <GiAirplaneDeparture className={styles.icon} />
            <span>شروع</span>
          </div>
          <div className={styles.row}>
            <span>{formatDate(startDate)}</span>
          </div>
          {step === "meeting" && (
            <div className={styles.row}>
              <span>{formatTime(startTime)}</span>
            </div>
          )}
        </div>
        <div className={styles.gridItem}>
          <div className={styles.row}>
            <BsCalendar2RangeFill className={styles.icon} />
            <span>پایان</span>
          </div>
          <div className={styles.row}>
            <span>{formatDate(endDate)}</span>
          </div>
          {step === "meeting" && (
            <div className={styles.row}>
              <span>{formatTime(endTime)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Arrival and Departure */}
      {step === "trip" && (
        <div className={styles.grid}>
          <div className={styles.gridItem}>
            <div className={styles.row}>
              <BsCalendar2RangeFill className={styles.icon} />
              <span>مبدا</span>
            </div>
            <div className={styles.row}>
              <span>{origin}</span>
            </div>
            {step === "meeting" && (
              <div className={styles.row}>
                <span>{formatTime(startTime)}</span>
              </div>
            )}
          </div>
          <div className={styles.gridItem}>
            <div className={styles.row}>
              <GiAirplaneArrival className={styles.icon} />
              <span>مقصد</span>
            </div>
            <div className={styles.row}>
              <span>{destination}</span>
            </div>
            {step === "meeting" && (
              <div className={styles.row}>
                <span>{formatTime(endTime)}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.singleRow}>
        {step === "meeting" ? (
          <>
            <RxGlobe className={styles.icon} />
            <span>{`${countryName}, ${cityName}`}</span>
          </>
        ) : (
          <>
            <BsFillHouseFill className={styles.icon} />
            <span>{accommodation}</span>
          </>
        )}
      </div>
      {step === "meeting" && (
        <div className={styles.addressRow}>
          <IoLocationSharp className={styles.icon} />
          <span>{address}</span>
        </div>
      )}
      {/* <div className={styles.singleRow}> */}
      <div className={styles.grid}>
        <div className={styles.gridItem}>
          <div className={styles.row}>
            <GiMoneyStack className={styles.icon} />
            <span>
              {currencySymbol} {price}
            </span>
          </div>
        </div>
        <div className={styles.gridItem}>
          <div className={styles.row}>
            <MdPeopleAlt className={styles.icon} />
            <span>{capacity}</span>
          </div>
        </div>
      </div>
      {/* </div> */}
      <p className={styles.description}>{longDescription}</p>
    </div>
  );
};

export default EventDetails;
