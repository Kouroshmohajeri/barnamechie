import Teaching from "../../models/Service/Teaching.js";

export const createTeaching = async (data) => {
  const teaching = new Teaching(data);
  return await teaching.save();
};

export const getAllTeachings = async () => {
  return await Teaching.find().populate("cityId").populate("countryId");
};

export const getTeachingById = async (id) => {
  return await Teaching.findById(id).populate("cityId").populate("countryId");
};

export const updateTeaching = async (id, data) => {
  return await Teaching.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTeaching = async (id) => {
  return await Teaching.findByIdAndDelete(id);
};
