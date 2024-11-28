import axios from "axios";

const API = axios.create({
  baseURL: process.env.BASE_URL || "https://barnamechie.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json", // Add other headers if needed
  },
  timeout: 5000,
});

export default API;
