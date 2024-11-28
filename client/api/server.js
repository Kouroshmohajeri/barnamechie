import axios from "axios";

const API = axios.create({
  baseURL: process.env.BASE_URL || "https://barnamechie.es/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json", // Add other headers if needed
  },
});

export default API;
