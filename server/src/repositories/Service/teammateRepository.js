import Teammate from "../../models/Service/Teammate.js";

export const createTeammate = async (data) => {
  const service = new Teammate(data);
  return await service.save();
};

export const getAllTeammates = async () => {
  return await Teammate.find()
    .populate("cityId")
    .populate("countryId")
    .populate("userId"); // Populating userId to get user details
};

export const getTeammateById = async (id) => {
  return await Teammate.findById(id)
    .populate("cityId")
    .populate("countryId")
    .populate("userId"); // Populating userId to get user details
};

export const updateTeammate = async (id, data) => {
  return await Teammate.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTeammate = async (id) => {
  return await Teammate.findByIdAndDelete(id);
};
