import Event from "../models/Event.js";

export const createEventInDb = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

export const getAllEventsFromDb = async () => {
  return await Event.find().populate("eventHolder").populate("categoryId");
};

export const getEventByIdFromDb = async (eventId) => {
  return await Event.findById(eventId)
    .populate("eventHolder")
    .populate("categoryId");
};

export const updateEventInDb = async (eventId, updateData) => {
  return await Event.findByIdAndUpdate(eventId, updateData, { new: true });
};

export const deleteEventFromDb = async (eventId) => {
  return await Event.findByIdAndDelete(eventId);
};
