import {
  createOther,
  getAllOthers,
  getOtherById,
  updateOther,
  deleteOther,
} from "../../repositories/Service/otherRepository.js";
import sendResponse from "../../services/response.js";

class OtherController {
  async createOther(req, res) {
    try {
      const { body, user } = req; // user contains the logged-in user's data
      body.userId = user.userId; // Assign the userId of the logged-in user
      const newOther = await createOther(body);
      sendResponse(res, 201, newOther, "Other service created successfully");
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error creating Other service",
        error.message
      );
    }
  }

  async getAllOthers(req, res) {
    try {
      const services = await getAllOthers();
      if (services.length === 0) {
        sendResponse(res, 404, [], "No Other services found");
        return;
      }
      sendResponse(res, 200, services, "Other services retrieved successfully");
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching Other services",
        error.message
      );
    }
  }

  async getOtherById(req, res) {
    try {
      const { id } = req.params;
      const service = await getOtherById(id);
      if (!service) {
        sendResponse(res, 404, null, "Other service not found");
        return;
      }
      sendResponse(res, 200, service, "Other service retrieved successfully");
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching Other service",
        error.message
      );
    }
  }

  async updateOther(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedService = await updateOther(id, body);
      if (!updatedService) {
        sendResponse(res, 404, null, "Other service not found");
        return;
      }
      sendResponse(
        res,
        200,
        updatedService,
        "Other service updated successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error updating Other service",
        error.message
      );
    }
  }

  async deleteOther(req, res) {
    try {
      const { id } = req.params;
      const deletedService = await deleteOther(id);
      if (!deletedService) {
        sendResponse(res, 404, null, "Other service not found");
        return;
      }
      sendResponse(res, 200, { message: "Other service deleted successfully" });
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error deleting Other service",
        error.message
      );
    }
  }
}

export default new OtherController();
