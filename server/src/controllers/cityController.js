// src/controllers/city.controller.js
import * as CityRepository from "../repositories/cityRepository.js";

export const createCity = async (req, res) => {
  try {
    const city = await CityRepository.createCity(req.body);
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCities = async (req, res) => {
  try {
    const cities = await CityRepository.getAllCities();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCityById = async (req, res) => {
  try {
    const city = await CityRepository.getCityById(req.params.id);
    if (!city) return res.status(404).json({ message: "City not found" });
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCity = async (req, res) => {
  try {
    const updatedCity = await CityRepository.updateCity(
      req.params.id,
      req.body
    );
    if (!updatedCity)
      return res.status(404).json({ message: "City not found" });
    res.status(200).json(updatedCity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCity = async (req, res) => {
  try {
    const deletedCity = await CityRepository.deleteCity(req.params.id);
    if (!deletedCity)
      return res.status(404).json({ message: "City not found" });
    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
