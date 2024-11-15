// src/controllers/advertisementController.js
import AdvertisementRepository from "../repositories/advertisementRepository.js";
import sendResponse from "../services/sendResponse.js";

class AdvertisementController {
  async createAdvertisement(req, res) {
    try {
      const newAdvertisement =
        await AdvertisementRepository.createAdvertisement(req.body);
      sendResponse(res, 201, newAdvertisement);
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }

  async getAllAdvertisements(req, res) {
    try {
      const advertisements =
        await AdvertisementRepository.getAllAdvertisements();
      sendResponse(res, 200, advertisements);
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }

  async getAdvertisementById(req, res) {
    try {
      const advertisement = await AdvertisementRepository.getAdvertisementById(
        req.params.id
      );
      advertisement
        ? sendResponse(res, 200, advertisement)
        : sendResponse(res, 404, { message: "Advertisement not found" });
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
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
        : sendResponse(res, 404, { message: "Advertisement not found" });
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
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
        : sendResponse(res, 404, { message: "Advertisement not found" });
    } catch (error) {
      sendResponse(res, 500, { message: error.message });
    }
  }
}

export default new AdvertisementController();
