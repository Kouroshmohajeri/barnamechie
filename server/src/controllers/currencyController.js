import {
  createCurrencyInDb,
  getAllCurrenciesFromDb,
  getCurrencyByIdFromDb,
  updateCurrencyInDb,
  deleteCurrencyFromDb,
} from "../repositories/currencyRepository.js";
import sendResponse from "../services/response.js";

// Create a new currency
export const createCurrency = async (req, res) => {
  try {
    const { currencyId, name, symbol } = req.body;

    const newCurrency = await createCurrencyInDb({ currencyId, name, symbol });
    sendResponse(res, 201, "Currency created successfully", newCurrency);
  } catch (error) {
    sendResponse(res, 500, "Error creating currency", null, error);
  }
};

// Fetch all currencies
export const getAllCurrencies = async (req, res) => {
  try {
    const currencies = await getAllCurrenciesFromDb();
    sendResponse(res, 200, "Currencies fetched successfully", currencies);
  } catch (error) {
    sendResponse(res, 500, "Error fetching currencies", null, error);
  }
};

// Fetch a currency by ID
export const getCurrencyById = async (req, res) => {
  try {
    const { currencyId } = req.params;

    const currency = await getCurrencyByIdFromDb(currencyId);
    if (!currency) {
      return sendResponse(res, 404, "Currency not found");
    }

    sendResponse(res, 200, "Currency fetched successfully", currency);
  } catch (error) {
    sendResponse(res, 500, "Error fetching currency", null, error);
  }
};

// Update a currency by ID
export const updateCurrency = async (req, res) => {
  try {
    const { currencyId } = req.params;
    const updateData = req.body;

    const updatedCurrency = await updateCurrencyInDb(currencyId, updateData);
    if (!updatedCurrency) {
      return sendResponse(res, 404, "Currency not found");
    }

    sendResponse(res, 200, "Currency updated successfully", updatedCurrency);
  } catch (error) {
    sendResponse(res, 500, "Error updating currency", null, error);
  }
};

// Delete a currency by ID
export const deleteCurrency = async (req, res) => {
  try {
    const { currencyId } = req.params;

    const deletedCurrency = await deleteCurrencyFromDb(currencyId);
    if (!deletedCurrency) {
      return sendResponse(res, 404, "Currency not found");
    }

    sendResponse(res, 200, "Currency deleted successfully");
  } catch (error) {
    sendResponse(res, 500, "Error deleting currency", null, error);
  }
};
