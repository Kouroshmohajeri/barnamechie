import AdvertisementRepository from "../repositories/advertisementRepository.js";
import sendResponse from "../services/response.js";

class AdvertisementController {
  async createAdvertisement(req, res) {
    try {
      const newAdvertisement =
        await AdvertisementRepository.createAdvertisement(req.body);
      sendResponse(res, 201, newAdvertisement);
    } catch (error) {
      sendResponse(res, 500, null, "Error creating advertisement", error);
    }
  }

  async getAllAdvertisements(req, res) {
    try {
      const advertisements =
        await AdvertisementRepository.getAllAdvertisements();
      sendResponse(res, 200, advertisements);
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
        ? sendResponse(res, 200, advertisement)
        : sendResponse(res, 404, null, "Advertisement not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching advertisement", error);
    }
  }

  async updateAdvertisement(req, res) {
    try {
      const updatedAdvertisement =
        await AdvertisementRepository.updateAdvertisement(
          req.params.id,
          req.body
        );
      updatedAdvertisement
        ? sendResponse(res, 200, updatedAdvertisement)
        : sendResponse(res, 404, null, "Advertisement not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error updating advertisement", error);
    }
  }

  async deleteAdvertisement(req, res) {
    try {
      const deletedAdvertisement =
        await AdvertisementRepository.deleteAdvertisement(req.params.id);
      deletedAdvertisement
        ? sendResponse(res, 200, {
            message: "Advertisement deleted successfully",
          })
        : sendResponse(res, 404, null, "Advertisement not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error deleting advertisement", error);
    }
  }
}

export default new AdvertisementController();
