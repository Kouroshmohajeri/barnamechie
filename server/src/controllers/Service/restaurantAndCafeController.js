import {
  createRestaurantAndCafe,
  getAllRestaurantsAndCafes,
  getRestaurantAndCafeById,
  updateRestaurantAndCafe,
  deleteRestaurantAndCafe,
} from "../../repositories/Service/restaurantAndCafeRepository.js";
import sendResponse from "../../services/response.js";

class RestaurantAndCafeController {
  async createRestaurantAndCafe(req, res) {
    try {
      const { body } = req;

      // Validate the `type` field
      if (!body.type || !["رستوران", "کافه"].includes(body.type)) {
        return sendResponse(
          res,
          400,
          null,
          "Invalid type. Must be 'رستوران' or 'کافه'."
        );
      }

      const newRestaurantAndCafe = await createRestaurantAndCafe(body);
      sendResponse(
        res,
        201,
        newRestaurantAndCafe,
        "Restaurant or cafe created successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error creating restaurant or cafe",
        error.message
      );
    }
  }

  async getAllRestaurantsAndCafes(req, res) {
    try {
      const { type } = req.query;

      // Optional filter by `type`
      const filter = type && ["رستوران", "کافه"].includes(type) ? { type } : {};

      const restaurantsAndCafes = await getAllRestaurantsAndCafes(filter);
      if (restaurantsAndCafes.length === 0) {
        sendResponse(res, 404, [], "No restaurants or cafes found");
        return;
      }
      sendResponse(
        res,
        200,
        restaurantsAndCafes,
        "Restaurants and cafes retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching restaurants and cafes",
        error.message
      );
    }
  }

  async getRestaurantAndCafeById(req, res) {
    try {
      const { id } = req.params;
      const restaurantAndCafe = await getRestaurantAndCafeById(id);
      if (!restaurantAndCafe) {
        sendResponse(res, 404, null, "Restaurant or cafe not found");
        return;
      }
      sendResponse(
        res,
        200,
        restaurantAndCafe,
        "Restaurant or cafe retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching restaurant or cafe",
        error.message
      );
    }
  }

  async updateRestaurantAndCafe(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;

      // Validate the `type` field if provided
      if (body.type && !["رستوران", "کافه"].includes(body.type)) {
        return sendResponse(
          res,
          400,
          null,
          "Invalid type. Must be 'رستوران' or 'کافه'."
        );
      }

      const updatedRestaurantAndCafe = await updateRestaurantAndCafe(id, body);
      if (!updatedRestaurantAndCafe) {
        sendResponse(res, 404, null, "Restaurant or cafe not found");
        return;
      }
      sendResponse(
        res,
        200,
        updatedRestaurantAndCafe,
        "Restaurant or cafe updated successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error updating restaurant or cafe",
        error.message
      );
    }
  }

  async deleteRestaurantAndCafe(req, res) {
    try {
      const { id } = req.params;
      const deletedRestaurantAndCafe = await deleteRestaurantAndCafe(id);
      if (!deletedRestaurantAndCafe) {
        sendResponse(res, 404, null, "Restaurant or cafe not found");
        return;
      }
      sendResponse(res, 200, null, "Restaurant or cafe deleted successfully");
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error deleting restaurant or cafe",
        error.message
      );
    }
  }
}

export default new RestaurantAndCafeController();
