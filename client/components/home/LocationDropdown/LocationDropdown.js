"use client";
import React, { useEffect, useState } from "react";
import { getAllCountries } from "@/api/countries/actions.js";
import { getAllCities } from "@/api/cities/actions.js";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./LocationDropdown.module.css";

const LocationDropdown = () => {
  const [location, setLocation] = useState({ city: "", country: "" });
  const [selectedValue, setSelectedValue] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  // Fetch countries and cities from the backend
  useEffect(() => {
    const fetchCountriesAndCities = async () => {
      setLoading(true);
      try {
        const countriesData = await getAllCountries();
        const supportedCountries = countriesData.filter(
          (country) => country.isSupported === true
        );

        const citiesData = await getAllCities();

        const combinedLocations = supportedCountries
          .map((country) => {
            const citiesInCountry = citiesData.filter(
              (city) => city.countryId === country.countryId
            );

            return citiesInCountry.map(
              (city) => `${city.cityName}, ${country.name}`
            );
          })
          .flat();

        setLocationOptions(combinedLocations);
      } catch (error) {
        console.error("Failed to fetch countries or cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountriesAndCities();
  }, []);

  // Handle value change in the dropdown
  const handleSelectionChange = (event, newValue) => {
    setSelectedValue(newValue);
  };

  return (
    <div
      className={`${styles.container} ${
        isOpen ? styles.containerClose : styles.containerOpen
      }`}
    >
      <Autocomplete
        options={locationOptions}
        value={selectedValue}
        onChange={handleSelectionChange}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Start typing a city or country"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        loading={loading}
        isOptionEqualToValue={(option, value) => option === value}
      />
    </div>
  );
};

export default LocationDropdown;
