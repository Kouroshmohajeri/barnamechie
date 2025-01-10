import Other from "../../models/Service/Other.js";

export const createOther = async (data) => {
  const service = new Other(data);
  return await service.save();
};

export const getAllOthers = async () => {
  return await Other.find()
    .populate("cityId")
    .populate("countryId")
    .populate("userId"); // Populating userId to get user details
};

export const getOtherById = async (id) => {
  return await Other.findById(id)
    .populate("cityId")
    .populate("countryId")
    .populate("userId"); // Populating userId to get user details
};

export const updateOther = async (id, data) => {
  return await Other.findByIdAndUpdate(id, data, { new: true });
};

export const deleteOther = async (id) => {
  return await Other.findByIdAndDelete(id);
};
