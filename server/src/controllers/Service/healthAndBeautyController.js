import {
  createHealthAndBeauty,
  getAllHealthAndBeauty,
  getHealthAndBeautyById,
  updateHealthAndBeauty,
  deleteHealthAndBeauty,
} from "../../repositories/Service/healthAndBeautyRepository.js";
import sendResponse from "../../services/response.js";

class HealthAndBeautyController {
  async createHealthAndBeauty(req, res) {
    try {
      const { body, user } = req; // user is added here to get userId from the logged-in user
      body.userId = user.userId; // Assign the userId of the logged-in user (String type)
      const newHealthAndBeauty = await createHealthAndBeauty(body);
      sendResponse(
        res,
        201,
        newHealthAndBeauty,
        "Health and Beauty service created successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error creating Health and Beauty service",
        error.message
      );
    }
  }

  async getAllHealthAndBeauty(req, res) {
    try {
      const services = await getAllHealthAndBeauty();
      if (services.length === 0) {
        sendResponse(res, 404, [], "No Health and Beauty services found");
        return;
      }
      sendResponse(
        res,
        200,
        services,
        "Health and Beauty services retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching Health and Beauty services",
        error.message
      );
    }
  }

  async getHealthAndBeautyById(req, res) {
    try {
      const { id } = req.params;
      const service = await getHealthAndBeautyById(id);
      if (!service) {
        sendResponse(res, 404, null, "Health and Beauty service not found");
        return;
      }
      sendResponse(
        res,
        200,
        service,
        "Health and Beauty service retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching Health and Beauty service",
        error.message
      );
    }
  }

  async updateHealthAndBeauty(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedService = await updateHealthAndBeauty(id, body);
      if (!updatedService) {
        sendResponse(res, 404, null, "Health and Beauty service not found");
        return;
      }
      sendResponse(
        res,
        200,
        updatedService,
        "Health and Beauty service updated successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error updating Health and Beauty service",
        error.message
      );
    }
  }

  async deleteHealthAndBeauty(req, res) {
    try {
      const { id } = req.params;
      const deletedService = await deleteHealthAndBeauty(id);
      if (!deletedService) {
        sendResponse(res, 404, null, "Health and Beauty service not found");
        return;
      }
      sendResponse(res, 200, {
        message: "Health and Beauty service deleted successfully",
      });
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error deleting Health and Beauty service",
        error.message
      );
    }
  }
}

export default new HealthAndBeautyController();
