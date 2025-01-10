import {
  createRepare,
  getAllRepare,
  getRepareById,
  updateRepare,
  deleteRepare,
} from "../../repositories/Service/repareRepository.js";
import sendResponse from "../../services/response.js";

class RepareController {
  async createRepare(req, res) {
    try {
      const { body, user } = req; // user contains the logged-in user's data
      body.userId = user.userId; // Assign the userId of the logged-in user
      const newRepare = await createRepare(body);
      sendResponse(res, 201, newRepare, "Repare service created successfully");
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error creating Repare service",
        error.message
      );
    }
  }

  async getAllRepare(req, res) {
    try {
      const services = await getAllRepare();
      if (services.length === 0) {
        sendResponse(res, 404, [], "No Repare services found");
        return;
      }
      sendResponse(
        res,
        200,
        services,
        "Repare services retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching Repare services",
        error.message
      );
    }
  }

  async getRepareById(req, res) {
    try {
      const { id } = req.params;
      const service = await getRepareById(id);
      if (!service) {
        sendResponse(res, 404, null, "Repare service not found");
        return;
      }
      sendResponse(res, 200, service, "Repare service retrieved successfully");
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching Repare service",
        error.message
      );
    }
  }

  async updateRepare(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedService = await updateRepare(id, body);
      if (!updatedService) {
        sendResponse(res, 404, null, "Repare service not found");
        return;
      }
      sendResponse(
        res,
        200,
        updatedService,
        "Repare service updated successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error updating Repare service",
        error.message
      );
    }
  }

  async deleteRepare(req, res) {
    try {
      const { id } = req.params;
      const deletedService = await deleteRepare(id);
      if (!deletedService) {
        sendResponse(res, 404, null, "Repare service not found");
        return;
      }
      sendResponse(res, 200, {
        message: "Repare service deleted successfully",
      });
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error deleting Repare service",
        error.message
      );
    }
  }
}

export default new RepareController();
