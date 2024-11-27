"use client";
import React, { useEffect, useState } from "react";
import { getAllCountries } from "@/api/countries/actions.js"; // Import your API function

const CountryDropdown = () => {
  const [location, setLocation] = useState({ city: "", country: "" });
  const [selectedValue, setSelectedValue] = useState("");
  const [countries, setCountries] = useState([]);

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
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data); // Assuming data is an array of country objects
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "10px" }}>
      <label
        htmlFor="countryDropdown"
        style={{ marginBottom: "5px", display: "block" }}
      >
        Select Country:
      </label>
      <select
        id="countryDropdown"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "100%",
          maxWidth: "300px",
        }}
      >
        <option value="" disabled>
          -- Select a country --
        </option>
        {countries.map((country) => (
          <option key={country.countryId} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      {location.city && location.country && (
        <p style={{ marginTop: "10px", color: "#555" }}>
          Detected location:{" "}
          <strong>{`${location.city}, ${location.country}`}</strong>
        </p>
      )}
    </div>
  );
};

export default CountryDropdown;
