import HealthAndBeauty from "../../models/Service/HealthAndBeauty.js";

export const createHealthAndBeauty = async (data) => {
  const service = new HealthAndBeauty(data);
  return await service.save();
};

export const getAllHealthAndBeauty = async () => {
  return await HealthAndBeauty.find()
    .populate("cityId")
    .populate("countryId")
    .populate("userId"); // Populating userId to get user details
};

export const getHealthAndBeautyById = async (id) => {
  return await HealthAndBeauty.findById(id)
    .populate("cityId")
    .populate("countryId")
    .populate("userId"); // Populating userId to get user details
};

export const updateHealthAndBeauty = async (id, data) => {
  return await HealthAndBeauty.findByIdAndUpdate(id, data, { new: true });
};

export const deleteHealthAndBeauty = async (id) => {
  return await HealthAndBeauty.findByIdAndDelete(id);
};
