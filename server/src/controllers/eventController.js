import Event from "../models/Event.js";
import sendResponse from "../services/response.js";

// Create an event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      longDescription,
      startDate,
      endDate,
      isCancelled,
      capacity,
      price,
      offer,
      subCategoryId,
      url,
      link,
      imageUrl,
      country,
      location,
      city,
      startTime,
      endTime,
      isOnline,
      currencyId,
    } = req.body;
    console.log(
      `title: ${title}\n`,
      `short description: ${shortDescription}\n`,
      `long des: ${longDescription}\n`,
      `start date: ${startDate}\n`,
      `end date: ${endDate}\n`,
      `is cancelled: ${isCancelled}\n`,
      `capacity: ${capacity}\n`,
      `price: ${price}\n`,
      `offer: ${offer}\n`,
      `sub cat ID: ${subCategoryId}\n`,
      `url: ${url}\n`,
      `link: ${link}\n`,
      `imageUrl: ${imageUrl}\n`,
      `country: ${country}\n`,
      `location: ${location}\n`,
      `city: ${city}\n`,
      `start time: ${startTime}\n`,
      `end time: ${endTime}\n`,
      `is online: ${isOnline}\n`,
      `currency: ${currencyId}\n`
    );
    // const userId = req.user.userId;
    const userId = 1;

    const newEvent = new Event({
      title,
      shortDescription,
      longDescription,
      userId,
      startDate,
      endDate,
      isCancelled,
      capacity,
      price,
      offer,
      subCategoryId,
      url,
      link,
      imageUrl,
      country,
      location,
      city,
      startTime,
      endTime,
      isOnline,
      currencyId,
    });

    const savedEvent = await newEvent.save();
    sendResponse(res, 201, "Event created successfully", savedEvent);
  } catch (error) {
    sendResponse(res, 500, "Error creating event", null, error);
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("userId")
      .populate("subCategoryId");
    sendResponse(res, 200, "Events fetched successfully", events);
  } catch (error) {
    sendResponse(res, 500, "Error fetching events", null, error);
  }
};

// Get a single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate("userId")
      .populate("subCategoryId");
    if (!event) {
      return sendResponse(res, 404, "Event not found");
    }
    sendResponse(res, 200, "Event fetched successfully", event);
  } catch (error) {
    sendResponse(res, 500, "Error fetching event", null, error);
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
    sendResponse(res, 500, "Error updating event", null, error);
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
    sendResponse(res, 500, "Error deleting event", null, error);
  }
};
