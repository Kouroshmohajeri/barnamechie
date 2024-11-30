import API from "../server.js";

// Country Actions
export const createCountry = async (countryData) => {
  const response = await API.post("/countries", countryData);
  return response.data;
};

export const getAllCountries = async () => {
  const response = await API.get("/countries");
  return response.data;
};

export const getCountryById = async (id) => {
  const response = await API.get(`/countries/${id}`);
  return response.data;
};

export const updateCountry = async (id, countryData) => {
  const response = await API.put(`/countries/${id}`, countryData);
  return response.data;
};

export const deleteCountry = async (id) => {
  const response = await API.delete(`/countries/${id}`);
  return response.data;
};
