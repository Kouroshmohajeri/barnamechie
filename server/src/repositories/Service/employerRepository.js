import Employer from "../../models/Service/Employer.js";

export const createEmployer = async (data) => {
  const employer = new Employer(data);
  return await employer.save();
};

export const getAllEmployers = async () => {
  return await Employer.find()
    .populate("countryId")
    .populate("cityId")
    .populate("userId");
};

export const getEmployerById = async (id) => {
  return await Employer.findById(id)
    .populate("countryId")
    .populate("cityId")
    .populate("userId");
};

export const updateEmployer = async (id, data) => {
  return await Employer.findByIdAndUpdate(id, data, { new: true });
};

export const deleteEmployer = async (id) => {
  return await Employer.findByIdAndDelete(id);
};
