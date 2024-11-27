import * as CountryRepository from "../repositories/countryRepository.js";

export const createCountry = async (req, res) => {
  try {
    const country = await CountryRepository.createCountry(req.body);
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCountries = async (req, res) => {
  try {
    const countries = await CountryRepository.getAllCountries();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCountryById = async (req, res) => {
  try {
    const country = await CountryRepository.getCountryById(req.params.id);
    if (!country) return res.status(404).json({ message: "Country not found" });
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCountry = async (req, res) => {
  try {
    const updatedCountry = await CountryRepository.updateCountry(
      req.params.id,
      req.body
    );
    if (!updatedCountry)
      return res.status(404).json({ message: "Country not found" });
    res.status(200).json(updatedCountry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCountry = async (req, res) => {
  try {
    const deletedCountry = await CountryRepository.deleteCountry(req.params.id);
    if (!deletedCountry)
      return res.status(404).json({ message: "Country not found" });
    res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
