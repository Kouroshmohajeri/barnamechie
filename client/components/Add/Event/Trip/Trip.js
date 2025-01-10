import React, { useState, useEffect, useContext } from "react";
import { Formik, Field, Form } from "formik";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FaArrowLeft } from "react-icons/fa";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import styles from "./Trip.module.css";
import { BottomMenuContext } from "@/context/BottomMenuContext";
import { getAllcurrency } from "@/api/currency/actions";
import SkeletonLoader from "@/components/SkeletonLoader/SkeletonLoader";
import { useEventContext } from "@/context/Add/EventCategory/EventContext";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
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

const Trip = () => {
  const [currencies, setCurrencies] = useState([]);

  const { setSelectedEvent } = useEventContext();
  const { setIsHidden } = useContext(BottomMenuContext);
  const [initialValues, setInitialValues] = useState({
    tripName: "",
    startDate: null,
    endDate: null,
    origin: "",
    destination: "",
    accommodation: "",
    shortDescription: "",
    longDescription: "",
    price: "",
    currency: "",
    capacity: "",
  });

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await getAllcurrency();
        if (response.success) {
          setCurrencies(
            response.message.map((cur) => ({
              value: cur.currencyId,
              label: `${cur.symbol} ${cur.name}`,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const loadSavedData = () => {
      const savedData = JSON.parse(localStorage.getItem("tripFormData"));
      if (savedData) {
        setInitialValues({
          ...initialValues,
          ...savedData,
          startDate: savedData.startDate ? dayjs(savedData.startDate) : null,
          endDate: savedData.endDate ? dayjs(savedData.endDate) : null,
        });
      }
    };

    fetchCurrencies();
    loadSavedData();
  }, []);

  useEffect(() => {
    // Load saved form data from local storage
    const savedData = JSON.parse(localStorage.getItem("tripFormData"));
    if (savedData) {
      setInitialValues({
        ...initialValues,
        ...savedData,
        startDate: savedData.startDate ? dayjs(savedData.startDate) : null,
        endDate: savedData.endDate ? dayjs(savedData.endDate) : null,
      });
    }
  }, []);

  const backButton = () => {
    setSelectedEvent(null);
    setIsHidden(false);
  };

  const handleSubmit = (values) => {
    localStorage.setItem("tripFormData", JSON.stringify(values));
    setSelectedEvent(2);
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange, setFieldValue }) => (
              <Form className={styles.tripContainer}>
                <div className={styles.header}>
                  <FaArrowLeft
                    className={styles.backButton}
                    onClick={backButton}
                  />
                  <span className={styles.title}>سفر چیه؟</span>
                </div>

                <Field name="tripName">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="اسم سفر"
                      variant="outlined"
                      fullWidth
                      required
                      className={styles.textField}
                    />
                  )}
                </Field>

                <div className={styles.row}>
                  <DatePicker
                    label="تاریخ شروع"
                    value={values.startDate}
                    onChange={(date) => setFieldValue("startDate", date)}
                    minDate={dayjs()}
                    className={styles.datePicker}
                  />
                  <DatePicker
                    label="تاریخ پایان"
                    value={values.endDate}
                    onChange={(date) => setFieldValue("endDate", date)}
                    minDate={values.startDate || dayjs()}
                    className={styles.datePicker}
                  />
                </div>

                <div className={styles.row}>
                  <Field name="origin">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="مبدا"
                        variant="outlined"
                        fullWidth
                        required
                        className={styles.textField}
                      />
                    )}
                  </Field>
                  <Field name="destination">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="مقصد"
                        variant="outlined"
                        fullWidth
                        required
                        className={styles.textField}
                      />
                    )}
                  </Field>
                </div>
                <div className={styles.row}>
                  <Field name="accommodation">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="محل اقامت"
                        variant="outlined"
                        fullWidth
                        className={styles.textField}
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
                        label="دقیقا سفر چیه؟"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        className={styles.textField}
                      />
                    )}
                  </Field>
                </div>

                <div className={styles.row}>
                  <Field name="price">
                    {({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="قیمت"
                        className={styles.field}
                      />
                    )}
                  </Field>
                  <FormControl className={styles.field}>
                    <InputLabel>واحد پول</InputLabel>
                    <Select
                      value={values.currency}
                      onChange={handleChange}
                      name="currency"
                    >
                      {currencies.map((currency) => (
                        <MenuItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </MenuItem>
                      ))}
                    </Select>
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

                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  className={styles.button}
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

export default Trip;
