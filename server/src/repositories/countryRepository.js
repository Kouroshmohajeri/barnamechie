import Country from "../models/Country.js";

export const createCountry = async (data) => await Country.create(data);

export const getAllCountries = async () => await Country.find();

export const getCountryById = async (id) =>
  await Country.findOne({ countryId: id });

export const updateCountry = async (id, data) =>
  await Country.findOneAndUpdate({ countryId: id }, data, { new: true });

export const deleteCountry = async (id) =>
  await Country.findOneAndDelete({ countryId: id });
