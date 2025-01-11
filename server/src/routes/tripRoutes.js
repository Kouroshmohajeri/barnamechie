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
router.post("/", createTrip);
router.get("/", getAllTrips);
router.get("/:tripId", getTripById);
router.put("/:tripId", updateTrip);
router.delete("/:tripId", deleteTrip);

export default router;
