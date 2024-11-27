import City from "../models/city.model.js";

export const createCity = async (data) => await City.create(data);

export const getAllCities = async () =>
  await City.find().populate("countryId", "name");

export const getCityById = async (id) =>
  await City.findOne({ cityId: id }).populate("countryId", "name");

export const updateCity = async (id, data) =>
  await City.findOneAndUpdate({ cityId: id }, data, { new: true });

export const deleteCity = async (id) =>
  await City.findOneAndDelete({ cityId: id });
