import {
  createCurrency,
  getAllCurrencies,
  getCurrencyById,
  updateCurrency,
  deleteCurrency,
} from "../../repositories/Service/currencyRepository.js";
import sendResponse from "../../services/response.js";

class CurrencyController {
  async createCurrency(req, res) {
    try {
      const { body } = req;
      const newCurrency = await createCurrency(body);
      sendResponse(res, 201, newCurrency, "Currency created successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error creating currency", error.message);
    }
  }

  async getAllCurrencies(req, res) {
    try {
      const currencies = await getAllCurrencies();
      if (currencies.length === 0) {
        sendResponse(res, 404, [], "No currencies found");
        return;
      }
      sendResponse(res, 200, currencies, "Currencies retrieved successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching currencies", error.message);
    }
  }

  async getCurrencyById(req, res) {
    try {
      const { id } = req.params;
      const currency = await getCurrencyById(id);
      if (!currency) {
        sendResponse(res, 404, null, "Currency not found");
        return;
      }
      sendResponse(res, 200, currency, "Currency retrieved successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching currency", error.message);
    }
  }

  async updateCurrency(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedCurrency = await updateCurrency(id, body);
      if (!updatedCurrency) {
        sendResponse(res, 404, null, "Currency not found");
        return;
      }
      sendResponse(res, 200, updatedCurrency, "Currency updated successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error updating currency", error.message);
    }
  }

  async deleteCurrency(req, res) {
    try {
      const { id } = req.params;
      const deletedCurrency = await deleteCurrency(id);
      if (!deletedCurrency) {
        sendResponse(res, 404, null, "Currency not found");
        return;
      }
      sendResponse(res, 200, { message: "Currency deleted successfully" });
    } catch (error) {
      sendResponse(res, 500, null, "Error deleting currency", error.message);
    }
  }
}

export default new CurrencyController();
