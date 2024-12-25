import Currency from "../models/Currency.js";

// Create a new currency
export const createCurrencyInDb = async (currencyData) => {
  const currency = new Currency(currencyData);
  return await currency.save();
};

// Fetch all currencies
export const getAllCurrenciesFromDb = async () => {
  return await Currency.find();
};

// Fetch a currency by ID
export const getCurrencyByIdFromDb = async (currencyId) => {
  return await Currency.findOne({ currencyId });
};

// Update a currency by ID
export const updateCurrencyInDb = async (currencyId, updateData) => {
  return await Currency.findOneAndUpdate({ currencyId }, updateData, {
    new: true,
  });
};

// Delete a currency by ID
export const deleteCurrencyFromDb = async (currencyId) => {
  return await Currency.findOneAndDelete({ currencyId });
};
