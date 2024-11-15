import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Routes for Event
router.post("/events", createEvent);
router.get("/events", getAllEvents);
router.get("/events/:eventId", getEventById);
router.put("/events/:eventId", updateEvent);
router.delete("/events/:eventId", deleteEvent);

export default router;
