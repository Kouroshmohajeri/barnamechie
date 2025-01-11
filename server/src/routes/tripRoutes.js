import express from "express";
import {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} from "../controllers/tripController.js";

const router = express.Router();

// Routes for Trip
router.post("/trips", createTrip);
router.get("/trips", getAllTrips);
router.get("/trips/:tripId", getTripById);
router.put("/trips/:tripId", updateTrip);
router.delete("/trips/:tripId", deleteTrip);

export default router;
