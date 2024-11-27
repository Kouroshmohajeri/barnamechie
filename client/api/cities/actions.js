import API from "../server.js";

// City Actions
export const createCity = async (cityData) => {
  const response = await API.post("/cities", cityData);
  return response.data;
};

export const getAllCities = async () => {
  const response = await API.get("/cities");
  return response.data;
};

export const getCityById = async (id) => {
  const response = await API.get(`/cities/${id}`);
  return response.data;
};

export const updateCity = async (id, cityData) => {
  const response = await API.put(`/cities/${id}`, cityData);
  return response.data;
};

export const deleteCity = async (id) => {
  const response = await API.delete(`/cities/${id}`);
  return response.data;
};
