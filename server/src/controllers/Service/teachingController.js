import {
  createTeaching,
  getAllTeachings,
  getTeachingById,
  updateTeaching,
  deleteTeaching,
} from "../../repositories/Service/teachingRepository.js";
import sendResponse from "../../services/response.js";

class TeachingController {
  async createTeaching(req, res) {
    try {
      const { body } = req;
      const newTeaching = await createTeaching(body);
      sendResponse(
        res,
        201,
        newTeaching,
        "Teaching service created successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error creating teaching service",
        error.message
      );
    }
  }

  async getAllTeachings(req, res) {
    try {
      const teachings = await getAllTeachings();
      if (teachings.length === 0) {
        sendResponse(res, 404, [], "No teaching services found");
        return;
      }
      sendResponse(
        res,
        200,
        teachings,
        "Teaching services retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching teaching services",
        error.message
      );
    }
  }

  async getTeachingById(req, res) {
    try {
      const { id } = req.params;
      const teaching = await getTeachingById(id);
      if (!teaching) {
        sendResponse(res, 404, null, "Teaching service not found");
        return;
      }
      sendResponse(
        res,
        200,
        teaching,
        "Teaching service retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching teaching service",
        error.message
      );
    }
  }

  async updateTeaching(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedTeaching = await updateTeaching(id, body);
      if (!updatedTeaching) {
        sendResponse(res, 404, null, "Teaching service not found");
        return;
      }
      sendResponse(
        res,
        200,
        updatedTeaching,
        "Teaching service updated successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error updating teaching service",
        error.message
      );
    }
  }

  async deleteTeaching(req, res) {
    try {
      const { id } = req.params;
      const deletedTeaching = await deleteTeaching(id);
      if (!deletedTeaching) {
        sendResponse(res, 404, null, "Teaching service not found");
        return;
      }
      sendResponse(res, 200, {
        message: "Teaching service deleted successfully",
      });
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error deleting teaching service",
        error.message
      );
    }
  }
}

export default new TeachingController();
