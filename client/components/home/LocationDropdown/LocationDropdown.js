"use client";
import React, { useEffect, useState } from "react";
import { getAllCountries } from "@/api/countries/actions.js";
import { getAllCities } from "@/api/cities/actions.js";
import styles from "./LocationDropdown.module.css";

const CountryDropdown = () => {
  const [location, setLocation] = useState({ city: "", country: "" });
  const [selectedValue, setSelectedValue] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);

  // Fetch user's location using IP geolocation API
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const { city, country_name } = await response.json();
        setLocation({ city, country: country_name });
        setSelectedValue(`${city}, ${country_name}`);
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    };

    fetchLocation();
  }, []);

  // Fetch countries from the backend
  useEffect(() => {
    const fetchCountriesAndCities = async () => {
      try {
        // Fetch all countries
        const countriesData = await getAllCountries();
        // Filter supported countries (isSupported = true)
        const supportedCountries = countriesData.filter(
          (country) => country.isSupported === true
        );

        // Fetch all cities
        const citiesData = await getAllCities();

        // Combine cities and countries
        const combinedLocations = supportedCountries
          .map((country) => {
            // Get all cities for the current supported country
            const citiesInCountry = citiesData.filter(
              (city) => city.countryId === country.countryId
            );

            // Combine cities with country name
            return citiesInCountry.map(
              (city) => `${city.cityName}, ${country.name}`
            );
          })
          .flat(); // Flatten the nested array into a single array

        setLocationOptions(combinedLocations);
      } catch (error) {
        console.error("Failed to fetch countries or cities:", error);
      }
    };

    fetchCountriesAndCities();
  }, []);

  // Check if the detected location is in the list
  const isLocationAvailable = locationOptions.includes(
    `${location.city}, ${location.country}`
  );

  // If the location is available, set it as default
  useEffect(() => {
    if (isLocationAvailable) {
      setSelectedValue(`${location.city}, ${location.country}`);
    } else {
      setSelectedValue("");
    }
  }, [location, isLocationAvailable]);

  return (
    <div className={styles.container}>
      <select
        id="countryDropdown"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        className={styles.dropdown}
      >
        <option value="" disabled>
          -- Select a location --
        </option>
        {locationOptions.map((locationOption) => (
          <option key={locationOption} value={locationOption}>
            {locationOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
