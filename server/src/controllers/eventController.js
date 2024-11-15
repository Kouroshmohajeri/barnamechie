import Event from "../models/Event.js";
import { sendResponse } from "../services/response.js"; // You can create this to handle success and error responses

// Create an event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      longDescription,
      eventHolder,
      eventStartDate,
      eventEndDate,
      isCancelled,
      limit,
      price,
      offer,
      categoryId,
      url,
      imageUrl,
      country,
      location,
      city,
      time,
    } = req.body;

    const newEvent = new Event({
      title,
      shortDescription,
      longDescription,
      eventHolder,
      eventStartDate,
      eventEndDate,
      isCancelled,
      limit,
      price,
      offer,
      categoryId,
      url,
      imageUrl,
      country,
      location,
      city,
      time,
    });

    const savedEvent = await newEvent.save();
    sendResponse(res, 201, "Event created successfully", savedEvent);
  } catch (error) {
    sendResponse(res, 500, "Error creating event", error);
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("eventHolder")
      .populate("categoryId");
    sendResponse(res, 200, "Events fetched successfully", events);
  } catch (error) {
    sendResponse(res, 500, "Error fetching events", error);
  }
};

// Get a single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate("eventHolder")
      .populate("categoryId");
    if (!event) {
      return sendResponse(res, 404, "Event not found");
    }
    sendResponse(res, 200, "Event fetched successfully", event);
  } catch (error) {
    sendResponse(res, 500, "Error fetching event", error);
  }
};

// Update event details
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return sendResponse(res, 404, "Event not found");
    }
    sendResponse(res, 200, "Event updated successfully", updatedEvent);
  } catch (error) {
    sendResponse(res, 500, "Error updating event", error);
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
    if (!deletedEvent) {
      return sendResponse(res, 404, "Event not found");
    }
    sendResponse(res, 200, "Event deleted successfully");
  } catch (error) {
    sendResponse(res, 500, "Error deleting event", error);
  }
};
