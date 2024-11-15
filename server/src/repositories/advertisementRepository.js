// src/repositories/advertisementRepository.js
import Advertisement from "../models/Advertisement.js";

class AdvertisementRepository {
  async createAdvertisement(data) {
    return await Advertisement.create(data);
  }

  async getAllAdvertisements() {
    return await Advertisement.find();
  }

  async getAdvertisementById(advertismentId) {
    return await Advertisement.findById(advertismentId);
  }

  async updateAdvertisement(advertismentId, data) {
    return await Advertisement.findByIdAndUpdate(advertismentId, data, {
      new: true,
    });
  }

  async deleteAdvertisement(advertismentId) {
    return await Advertisement.findByIdAndDelete(advertismentId);
  }
}

export default new AdvertisementRepository();
