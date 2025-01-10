import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import styles from "./RestaurantAndCafe.module.css";
import { getAllCountries } from "@/api/countries/actions.js";
import { getAllCities } from "@/api/cities/actions.js";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "white",
            opacity: 1,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: "white",
        },
        icon: {
          color: "white",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

const RestaurantAndCafe = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [restaurantType, setRestaurantType] = useState("رستوران");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");

  useEffect(() => {
    getAllCountries().then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getAllCities().then((data) => {
        const filteredCities = data.filter(
          (city) => city.countryId === selectedCountry
        );
        setCities(filteredCities);
      });
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleTypeChange = (event) => {
    setRestaurantType(event.target.value);
  };

  const hours = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2)
      .toString()
      .padStart(2, "0");
    const minute = index % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <form className={styles.tripContainer}>
          <div className={styles.header}>
            <span className={styles.title}>رستوران و کافه</span>
          </div>

          <TextField
            placeholder="اسم رستوران / کافه"
            variant="outlined"
            fullWidth
            required
            className={styles.textField}
          />

          <div className={styles.row}>
            <FormControl fullWidth className={styles.field}>
              <InputLabel>کشور</InputLabel>
              <Select value={selectedCountry} onChange={handleCountryChange}>
                {countries.map((country) => (
                  <MenuItem key={country.countryId} value={country.countryId}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              className={styles.field}
              disabled={!selectedCountry}
            >
              <InputLabel>شهر</InputLabel>
              <Select>
                {cities.map((city) => (
                  <MenuItem key={city.cityId} value={city.cityId}>
                    {city.cityName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <FormControl fullWidth className={styles.textField}>
            <InputLabel>نوع</InputLabel>
            <Select value={restaurantType} onChange={handleTypeChange}>
              <MenuItem value="رستوران">رستوران</MenuItem>
              <MenuItem value="کافه">کافه</MenuItem>
            </Select>
          </FormControl>

          <TextField
            placeholder="منو"
            variant="outlined"
            fullWidth
            className={styles.textField}
          />

          <div className={styles.row}>
            <FormControl fullWidth className={styles.field}>
              <InputLabel>از ساعت</InputLabel>
              <Select
                value={openingHour}
                onChange={(e) => setOpeningHour(e.target.value)}
              >
                {hours.map((hour) => (
                  <MenuItem key={hour} value={hour}>
                    {hour}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth className={styles.field}>
              <InputLabel>تا ساعت</InputLabel>
              <Select
                value={closingHour}
                onChange={(e) => setClosingHour(e.target.value)}
              >
                {hours.map((hour) => (
                  <MenuItem key={hour} value={hour}>
                    {hour}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <TextField
            placeholder={`آدرس ${restaurantType}`}
            variant="outlined"
            fullWidth
            className={styles.textField}
          />

          <TextField
            placeholder="توضیحات"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            inputProps={{ maxLength: 1000 }}
            className={styles.textField}
          />

          <FormControlLabel
            control={<Checkbox sx={{ color: "white" }} />}
            label={`رزرو در این ${restaurantType} الزامی است`}
            className={styles.label}
          />

          <Button
            variant="contained"
            fullWidth
            className={styles.button}
            type="submit"
          >
            بعدی
          </Button>
        </form>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default RestaurantAndCafe;
