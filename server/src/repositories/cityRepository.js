import City from "../models/City.js";
import Country from "../models/Country.js";

export const createCity = async (data) => await City.create(data);

export const getAllCities = async () => {
  const cities = await City.find();
  const countries = await Country.find();

  // Map countries by countryId for fast lookup
  const countryMap = countries.reduce((map, country) => {
    map[country.countryId] = {
      name: country.name,
      countryId: country.countryId,
    };
    return map;
  }, {});

  // Append country details to each city
  return cities.map((city) => ({
    ...city.toObject(),
    country: countryMap[city.countryId] || null, // Add country details
  }));
};

export const getCityById = async (id) => {
  const city = await City.findOne({ cityId: id });
  if (!city) return null;

  const country = await Country.findOne({ countryId: city.countryId });

  return {
    ...city.toObject(),
    country: country
      ? { name: country.name, countryId: country.countryId }
      : null,
  };
};

export const updateCity = async (id, data) =>
  await City.findOneAndUpdate({ cityId: id }, data, { new: true });

export const deleteCity = async (id) =>
  await City.findOneAndDelete({ cityId: id });
