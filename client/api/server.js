import axios from "axios";

const API = axios.create({
  baseURL: process.env.BASE_URL || "https://barnamechie.es/api",
});

export default API;
