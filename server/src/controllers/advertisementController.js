import AdvertisementRepository from "../repositories/advertisementRepository.js";
import sendResponse from "../services/response.js";

class AdvertisementController {
  async createAdvertisement(req, res) {
    try {
      const { _id: ownerId } = req.user; // Assuming `req.user` contains the authenticated user details
      const newAdvertisement =
        await AdvertisementRepository.createAdvertisement({
          ...req.body,
          ownerId, // Assign the authenticated user as the owner of the advertisement
        });
      sendResponse(
        res,
        201,
        newAdvertisement,
        "Advertisement created successfully"
      );
    } catch (error) {
      sendResponse(res, 500, null, "Error creating advertisement", error);
    }
  }

  async getAllAdvertisements(req, res) {
    try {
      const advertisements =
        await AdvertisementRepository.getAllAdvertisements();
      sendResponse(
        res,
        200,
        advertisements,
        "Advertisements retrieved successfully"
      );
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching advertisements", error);
    }
  }

  async getAdvertisementById(req, res) {
    try {
      const advertisement = await AdvertisementRepository.getAdvertisementById(
        req.params.id
      );
      advertisement
        ? sendResponse(
            res,
            200,
            advertisement,
            "Advertisement retrieved successfully"
          )
        : sendResponse(res, 404, null, "Advertisement not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching advertisement", error);
    }
  }

  async updateAdvertisement(req, res) {
    try {
      const { _id: userId, role } = req.user; // User details from authMiddleware
      const advertisement = await AdvertisementRepository.getAdvertisementById(
        req.params.id
      );

      if (!advertisement) {
        return sendResponse(res, 404, null, "Advertisement not found");
      }

      // Check if the user is the owner or an admin
      if (advertisement.ownerId.toString() !== userId && role !== "admin") {
        return sendResponse(
          res,
          403,
          null,
          "Unauthorized to update this advertisement"
        );
      }

      const updatedAdvertisement =
        await AdvertisementRepository.updateAdvertisement(
          req.params.id,
          req.body
        );

      sendResponse(
        res,
        200,
        updatedAdvertisement,
        "Advertisement updated successfully"
      );
    } catch (error) {
      sendResponse(res, 500, null, "Error updating advertisement", error);
    }
  }

  async deleteAdvertisement(req, res) {
    try {
      const { _id: userId, role } = req.user; // User details from authMiddleware
      const advertisement = await AdvertisementRepository.getAdvertisementById(
        req.params.id
      );

      if (!advertisement) {
        return sendResponse(res, 404, null, "Advertisement not found");
      }

      // Check if the user is the owner or an admin
      if (advertisement.ownerId.toString() !== userId && role !== "admin") {
        return sendResponse(
          res,
          403,
          null,
          "Unauthorized to delete this advertisement"
        );
      }

      const deletedAdvertisement =
        await AdvertisementRepository.deleteAdvertisement(req.params.id);

      sendResponse(res, 200, { message: "Advertisement deleted successfully" });
    } catch (error) {
      sendResponse(res, 500, null, "Error deleting advertisement", error);
    }
  }
}

export default new AdvertisementController();
