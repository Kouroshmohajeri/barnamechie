import Accommodation from "../../models/Service/Accommodation.js";

export const createAccommodation = async (data) => {
  const accommodation = new Accommodation(data);
  return await accommodation.save();
};

export const getAllAccommodations = async () => {
  return await Accommodation.find()
    .populate("countryId")
    .populate("cityId")
    .populate("userId");
};

export const getAccommodationById = async (id) => {
  return await Accommodation.findById(id)
    .populate("countryId")
    .populate("cityId")
    .populate("userId");
};

export const updateAccommodation = async (id, data) => {
  return await Accommodation.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAccommodation = async (id) => {
  return await Accommodation.findByIdAndDelete(id);
};
