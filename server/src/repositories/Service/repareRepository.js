import Repare from "../../models/Service/Repare.js";

export const createRepare = async (data) => {
  const service = new Repare(data);
  return await service.save();
};

export const getAllRepare = async () => {
  return await Repare.find()
    .populate("cityId")
    .populate("countryId")
    .populate("userId"); // Populating userId to get user details
};

export const getRepareById = async (id) => {
  return await Repare.findById(id)
    .populate("cityId")
    .populate("countryId")
    .populate("userId"); // Populating userId to get user details
};

export const updateRepare = async (id, data) => {
  return await Repare.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRepare = async (id) => {
  return await Repare.findByIdAndDelete(id);
};
