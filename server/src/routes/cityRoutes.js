import express from "express";
import * as CityController from "../controllers/cityController.js";

const router = express.Router();

router.post("/", CityController.createCity);
router.get("/", CityController.getAllCities);
router.get("/:id", CityController.getCityById);
router.put("/:id", CityController.updateCity);
router.delete("/:id", CityController.deleteCity);

export default router;
