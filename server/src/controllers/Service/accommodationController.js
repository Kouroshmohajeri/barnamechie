import {
  createAccommodation,
  getAllAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
} from "../../repositories/Service/accommodationRepository.js";
import sendResponse from "../../services/response.js";

class AccommodationController {
  async createAccommodation(req, res) {
    try {
      const { body } = req;
      const newAccommodation = await createAccommodation(body);
      sendResponse(
        res,
        201,
        newAccommodation,
        "Accommodation created successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error creating accommodation",
        error.message
      );
    }
  }

  async getAllAccommodations(req, res) {
    try {
      const accommodations = await getAllAccommodations();
      if (accommodations.length === 0) {
        sendResponse(res, 404, [], "No accommodations found");
        return;
      }
      sendResponse(
        res,
        200,
        accommodations,
        "Accommodations retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching accommodations",
        error.message
      );
    }
  }

  async getAccommodationById(req, res) {
    try {
      const { id } = req.params;
      const accommodation = await getAccommodationById(id);
      if (!accommodation) {
        sendResponse(res, 404, null, "Accommodation not found");
        return;
      }
      sendResponse(
        res,
        200,
        accommodation,
        "Accommodation retrieved successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error fetching accommodation",
        error.message
      );
    }
  }

  async updateAccommodation(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedAccommodation = await updateAccommodation(id, body);
      if (!updatedAccommodation) {
        sendResponse(res, 404, null, "Accommodation not found");
        return;
      }
      sendResponse(
        res,
        200,
        updatedAccommodation,
        "Accommodation updated successfully"
      );
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error updating accommodation",
        error.message
      );
    }
  }

  async deleteAccommodation(req, res) {
    try {
      const { id } = req.params;
      const deletedAccommodation = await deleteAccommodation(id);
      if (!deletedAccommodation) {
        sendResponse(res, 404, null, "Accommodation not found");
        return;
      }
      sendResponse(res, 200, { message: "Accommodation deleted successfully" });
    } catch (error) {
      sendResponse(
        res,
        500,
        null,
        "Error deleting accommodation",
        error.message
      );
    }
  }
}

export default new AccommodationController();
