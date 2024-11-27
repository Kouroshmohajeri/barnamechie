import express from "express";
import * as CountryController from "../controllers/countryController.js";

const router = express.Router();

router.post("/", CountryController.createCountry);
router.get("/", CountryController.getAllCountries);
router.get("/:id", CountryController.getCountryById);
router.put("/:id", CountryController.updateCountry);
router.delete("/:id", CountryController.deleteCountry);

export default router;
