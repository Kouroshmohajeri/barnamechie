import React, { useState, useEffect, useContext } from "react";
import { Formik, Field, Form } from "formik";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import { FaArrowLeft } from "react-icons/fa";
import styles from "./Meeting.module.css";
import { EventContext } from "@/context/Add/EventCategory/EventContext";
import { BottomMenuContext } from "@/context/BottomMenuContext";
import { getAllcurrency } from "@/api/currency/actions";
import { getAllCountries } from "@/api/countries/actions";
import { getAllCities } from "@/api/cities/actions";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useBackContext } from "@/context/Back/BackContext";

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
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#333333",
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

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const Meeting = () => {
  const [currencies, setCurrencies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const { selectedEvent, setSelectedEvent } = useContext(EventContext);
  const { setIsHidden } = useContext(BottomMenuContext);
  const [loading, setLoading] = useState(true);
  const { setStep } = useBackContext();
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    city: "",
    startDate: dayjs(),
    endDate: dayjs(),
    isOnline: false,
    address: "",
    eventLink: "",
    price: "",
    currency: "",
    shortDescription: "",
    longDescription: "",
    startTime: null,
    endTime: null,
  });
  useEffect(() => {
    // Load saved form data when component mounts
    const savedData = JSON.parse(localStorage.getItem("meetingFormData"));
    if (savedData) {
      setFormData({
        ...formData,
        ...savedData,
        startDate: savedData.startDate ? dayjs(savedData.startDate) : dayjs(),
        endDate: savedData.endDate ? dayjs(savedData.endDate) : dayjs(),
        startTime: savedData.startTime ? dayjs(savedData.startTime) : null,
        endTime: savedData.endTime ? dayjs(savedData.endTime) : null,
      });
    }
  }, []);
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const countriesResponse = await getAllCountries();
        const supportedCountries = countriesResponse.filter(
          (country) => country.isSupported
        );
        setCountries(supportedCountries);

        const currenciesResponse = await getAllcurrency();
        const currenciesData = currenciesResponse.message;
        if (Array.isArray(currenciesData)) {
          setCurrencies(currenciesData);
        } else {
          console.error(
            "Expected an array in the message, but got:",
            currenciesData
          );
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);
  const backButton = () => {
    setSelectedEvent(null);
  };
  const handleCountryChange = async (event) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);
    setCities([]); // Clear cities while loading new ones

    try {
      const citiesResponse = await getAllCities();
      const filteredCities = citiesResponse.filter(
        (city) => city.countryId === countryId
      );
      setCities(filteredCities);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const handleSubmit = (values) => {
    // Save form data to local storage
    localStorage.setItem("meetingFormData", JSON.stringify(values));
    const processedValues = {
      ...values,
      startDate: values.startDate ? values.startDate.toISOString() : null,
      endDate: values.endDate ? values.endDate.toISOString() : null,
      startTime: values.startTime ? values.startTime.format("HH:mm") : null,
      endTime: values.endTime ? values.endTime.format("HH:mm") : null,
    };

    if (processedValues.isOnline && !processedValues.eventLink) {
      toast.error("لطفا لینک ایونت آنلاین را وارد کنید");
      return;
    }
    if (processedValues.hasOffer && !processedValues.discount) {
      toast.error("لطفا درصد تخفیف را وارد کنید");
      return;
    }
    setSelectedEvent("upload");
    setStep("meeting");
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Formik
            initialValues={formData}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, handleChange, handleBlur, setFieldValue }) => (
              <Form className={styles.meetingContainer}>
                <div className={styles.header}>
                  <FaArrowLeft
                    className={styles.backButton}
                    onClick={() => backButton()}
                  />
                  <span className={styles.title}>برنامه چیه؟</span>
                </div>

                <Field name="title">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="عنوان"
                      variant="outlined"
                      fullWidth
                      required
                      className={styles.textField}
                    />
                  )}
                </Field>

                <div className={styles.row}>
                  <FormControl fullWidth className={styles.field}>
                    <InputLabel>کشور</InputLabel>
                    <Field
                      as={Select}
                      name="country"
                      required
                      label="کشور"
                      onChange={(event) => {
                        handleCountryChange(event);
                        handleChange(event);
                      }}
                    >
                      {countries.map((country) => (
                        <MenuItem
                          key={country.countryId}
                          value={country.countryId}
                        >
                          {country.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                  <FormControl fullWidth className={styles.field}>
                    <InputLabel>شهر</InputLabel>
                    <Field
                      as={Select}
                      name="city"
                      required
                      label="شهر"
                      disabled={!selectedCountry || cities.length === 0}
                      onChange={handleChange}
                    >
                      {cities.map((city) => (
                        <MenuItem key={city.cityId} value={city.cityId}>
                          {city.cityName}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </div>

                <div className={styles.row}>
                  <Field
                    name="startDate"
                    label="تاریخ شروع"
                    required
                    component={DatePicker}
                    value={values.startDate} // Ensure values are dayjs objects
                    onChange={(newValue) =>
                      setFieldValue("startDate", dayjs(newValue))
                    }
                    minDate={dayjs()} // Ensure dayjs object for minDate
                    className={styles.datePicker}
                  />

                  <Field
                    name="endDate"
                    label="تاریخ پایان"
                    component={DatePicker}
                    value={values.endDate} // Ensure values are dayjs objects
                    onChange={(newValue) =>
                      setFieldValue("endDate", dayjs(newValue))
                    }
                    minDate={values.startDate || dayjs()} // Ensure sequential dates
                    className={styles.datePicker}
                  />
                </div>

                <div className={styles.row}>
                  <Field
                    name="startTime"
                    label="ساعت شروع"
                    required
                    component={TimePicker}
                    value={values.startTime ? dayjs(values.startTime) : null}
                    onChange={(newValue) =>
                      setFieldValue("startTime", dayjs(newValue))
                    }
                    className={styles.timePicker}
                  />

                  <Field
                    name="endTime"
                    label="ساعت پایان"
                    component={TimePicker}
                    value={values.endTime ? dayjs(values.endTime) : null}
                    onChange={(newValue) =>
                      setFieldValue("endTime", dayjs(newValue))
                    }
                    className={styles.timePicker}
                  />
                </div>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.isOnline}
                      onChange={() => {
                        const newIsOnline = !values.isOnline;
                        setFieldValue("isOnline", newIsOnline);
                        setFieldValue(
                          "address",
                          newIsOnline ? "Online meeting" : ""
                        );
                      }}
                      sx={{ color: "white" }}
                    />
                  }
                  label="ایونت آنلاین"
                />
                <Field
                  name="address"
                  label="آدرس"
                  variant="outlined"
                  fullWidth
                  disabled={values.isOnline}
                  onChange={(event) =>
                    setFieldValue("address", event.target.value)
                  }
                  value={values.isOnline ? "Online meeting" : values.address}
                  className={`${styles.textField} ${
                    values.isOnline ? styles.fade : ""
                  }`}
                  component={TextField}
                />

                {values.isOnline && (
                  <div className={styles.row}>
                    <Field name="eventLink">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="لینک ایونت آنلاین"
                          variant="outlined"
                          fullWidth
                          required
                          className={styles.textField}
                        />
                      )}
                    </Field>
                  </div>
                )}

                <div className={styles.row}>
                  <Field name="price">
                    {({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="قیمت"
                        variant="outlined"
                        fullWidth
                        className={styles.field}
                      />
                    )}
                  </Field>
                  <FormControl fullWidth className={styles.field}>
                    <InputLabel>واحد پول</InputLabel>
                    <Field
                      as={Select}
                      name="currency"
                      value={values.currency || ""}
                      label="واحد پول"
                      disabled={currencies.length === 0}
                      required
                    >
                      {currencies.length > 0 ? (
                        currencies.map((currency) => (
                          <MenuItem
                            key={currency.currencyId}
                            value={currency.currencyId}
                          >
                            {`${currency.symbol} ${currency.name}`}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>در حال بارگذاری...</MenuItem>
                      )}
                    </Field>
                  </FormControl>
                  <Field name="capacity">
                    {({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="ظرفیت"
                        className={styles.field}
                      />
                    )}
                  </Field>
                </div>
                <div className={styles.row}>
                  <Field name="shortDescription">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="توضیح کوتاه"
                        variant="outlined"
                        fullWidth
                        className={styles.textField}
                      />
                    )}
                  </Field>
                </div>
                <div className={styles.row}>
                  <Field name="longDescription">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="دقیقا برنامه چیه؟"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        className={styles.textField}
                      />
                    )}
                  </Field>
                </div>

                <Button
                  variant="contained"
                  type="submit"
                  className={styles.button}
                  disabled={loading}
                >
                  بعدی
                </Button>
              </Form>
            )}
          </Formik>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Meeting;
