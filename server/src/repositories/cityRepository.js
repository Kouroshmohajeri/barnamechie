import City from "../models/City.js";
import Country from "../models/Country.js";

export const createCity = async (data) => await City.create(data);

export const getAllCities = async () => {
  const cities = await City.find();

  // No need to append country details, return cities as-is
  return cities.map((city) => city.toObject());
};

export const getCityById = async (id) => {
  const city = await City.findOne({ cityId: id });
  if (!city) return null;

  // Return the city without country details
  return city.toObject();
};

export const updateCity = async (id, data) =>
  await City.findOneAndUpdate({ cityId: id }, data, { new: true });

export const deleteCity = async (id) =>
  await City.findOneAndDelete({ cityId: id });
