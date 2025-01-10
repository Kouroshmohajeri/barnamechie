import {
  createSupermarket,
  getAllSupermarkets,
  getSupermarketById,
  updateSupermarket,
  deleteSupermarket,
} from "../../repositories/Service/supermarketRepository.js";
import sendResponse from "../../services/response.js";

class SupermarketController {
  async createSupermarket(req, res) {
    try {
      const { body } = req;
      const newSupermarket = await createSupermarket(body);
      sendResponse(
        res,
        201,
        newSupermarket,
        "Supermarket created successfully"
      );
    } catch (error) {
      sendResponse(res, 500, null, "Error creating supermarket", error.message);
    }
  }

  async getAllSupermarkets(req, res) {
    try {
      const supermarkets = await getAllSupermarkets();
      if (supermarkets.length === 0) {
        sendResponse(res, 404, [], "No supermarkets found");
        return;
      }
      sendResponse(
        res,
        200,
        supermarkets,
        "Supermarkets retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching supermarkets",
        error.message
      );
    }
  }

  async getSupermarketById(req, res) {
    try {
      const { id } = req.params;
      const supermarket = await getSupermarketById(id);
      if (!supermarket) {
        sendResponse(res, 404, null, "Supermarket not found");
        return;
      }
      sendResponse(res, 200, supermarket, "Supermarket retrieved successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching supermarket", error.message);
    }
  }

  async updateSupermarket(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedSupermarket = await updateSupermarket(id, body);
      if (!updatedSupermarket) {
        sendResponse(res, 404, null, "Supermarket not found");
        return;
      }
      sendResponse(
        res,
        200,
        updatedSupermarket,
        "Supermarket updated successfully"
      );
    } catch (error) {
      sendResponse(res, 500, null, "Error updating supermarket", error.message);
    }
  }

  async deleteSupermarket(req, res) {
    try {
      const { id } = req.params;
      const deletedSupermarket = await deleteSupermarket(id);
      if (!deletedSupermarket) {
        sendResponse(res, 404, null, "Supermarket not found");
        return;
      }
      sendResponse(res, 200, { message: "Supermarket deleted successfully" });
    } catch (error) {
      sendResponse(res, 500, null, "Error deleting supermarket", error.message);
    }
  }
}

export default new SupermarketController();
