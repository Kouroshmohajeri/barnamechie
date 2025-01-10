import {
  createTeammate,
  getAllTeammates,
  getTeammateById,
  updateTeammate,
  deleteTeammate,
} from "../../repositories/Service/teammateRepository.js";
import sendResponse from "../../services/response.js";

class TeammateController {
  async createTeammate(req, res) {
    try {
      const { body, user } = req; // user contains the logged-in user's data
      body.userId = user.userId; // Assign the userId of the logged-in user
      const newTeammate = await createTeammate(body);
      sendResponse(
        res,
        201,
        newTeammate,
        "Teammate service created successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error creating Teammate service",
        error.message
      );
    }
  }

  async getAllTeammates(req, res) {
    try {
      const services = await getAllTeammates();
      if (services.length === 0) {
        sendResponse(res, 404, [], "No Teammate services found");
        return;
      }
      sendResponse(
        res,
        200,
        services,
        "Teammate services retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching Teammate services",
        error.message
      );
    }
  }

  async getTeammateById(req, res) {
    try {
      const { id } = req.params;
      const service = await getTeammateById(id);
      if (!service) {
        sendResponse(res, 404, null, "Teammate service not found");
        return;
      }
      sendResponse(
        res,
        200,
        service,
        "Teammate service retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching Teammate service",
        error.message
      );
    }
  }

  async updateTeammate(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedService = await updateTeammate(id, body);
      if (!updatedService) {
        sendResponse(res, 404, null, "Teammate service not found");
        return;
      }
      sendResponse(
        res,
        200,
        updatedService,
        "Teammate service updated successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error updating Teammate service",
        error.message
      );
    }
  }

  async deleteTeammate(req, res) {
    try {
      const { id } = req.params;
      const deletedService = await deleteTeammate(id);
      if (!deletedService) {
        sendResponse(res, 404, null, "Teammate service not found");
        return;
      }
      sendResponse(res, 200, {
        message: "Teammate service deleted successfully",
      });
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error deleting Teammate service",
        error.message
      );
    }
  }
}

export default new TeammateController();
