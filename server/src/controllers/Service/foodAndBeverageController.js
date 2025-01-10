import {
  createFoodAndBeverage,
  getAllFoodAndBeverages,
  getFoodAndBeverageById,
  updateFoodAndBeverage,
  deleteFoodAndBeverage,
} from "../../repositories/Service/foodAndBeverageRepository.js";
import sendResponse from "../../services/response.js";

class FoodAndBeverageController {
  async createFoodAndBeverage(req, res) {
    try {
      const newFoodAndBeverage = await createFoodAndBeverage(req.body);
      sendResponse(res, 201, newFoodAndBeverage);
    } catch (error) {
      sendResponse(res, 500, null, "Error creating food and beverage", error);
    }
  }

  async getAllFoodAndBeverages(req, res) {
    try {
      const foodAndBeverages = await getAllFoodAndBeverages();
      sendResponse(res, 200, foodAndBeverages);
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching food and beverages", error);
    }
  }

  async getFoodAndBeverageById(req, res) {
    try {
      const foodAndBeverage = await getFoodAndBeverageById(req.params.id);
      foodAndBeverage
        ? sendResponse(res, 200, foodAndBeverage)
        : sendResponse(res, 404, null, "Food and beverage not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching food and beverage", error);
    }
  }

  async updateFoodAndBeverage(req, res) {
    try {
      const updatedFoodAndBeverage = await updateFoodAndBeverage(
        req.params.id,
        req.body
      );
      updatedFoodAndBeverage
        ? sendResponse(res, 200, updatedFoodAndBeverage)
        : sendResponse(res, 404, null, "Food and beverage not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error updating food and beverage", error);
    }
  }

  async deleteFoodAndBeverage(req, res) {
    try {
      const deletedFoodAndBeverage = await deleteFoodAndBeverage(req.params.id);
      deletedFoodAndBeverage
        ? sendResponse(res, 200, { message: "Deleted successfully" })
        : sendResponse(res, 404, null, "Food and beverage not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error deleting food and beverage", error);
    }
  }
}

export default new FoodAndBeverageController();
