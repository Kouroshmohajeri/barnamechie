import API from "../server.js";

// Currency Actions
export const createCurrency = async (currencyData) => {
  const response = await API.post("/currency", currencyData);
  return response.data;
};

export const getAllcurrency = async () => {
  const response = await API.get("/currency");
  return response.data;
};

export const getCurrencyById = async (currencyId) => {
  const response = await API.get(`/currency/${currencyId}`);
  return response.data;
};

export const updateCurrency = async (currencyId, currencyData) => {
  const response = await API.put(`/currency/${currencyId}`, currencyData);
  return response.data;
};

export const deleteCurrency = async (currencyId) => {
  const response = await API.delete(`/currency/${currencyId}`);
  return response.data;
};
