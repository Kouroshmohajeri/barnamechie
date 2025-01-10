import API from "../server.js"; // Ensure this points to your Axios instance

// Event Actions
export const createEvent = async (eventData) => {
  const response = await API.post("/events", eventData);
  return response.data;
};

export const getAllEvents = async () => {
  const response = await API.get("/events");
  return response.data;
};

export const getEventById = async (eventId) => {
  const response = await API.get(`/events/${eventId}`);
  return response.data;
};

export const updateEvent = async (eventId, eventData) => {
  const response = await API.put(`/events/${eventId}`, eventData);
  return response.data;
};

export const deleteEvent = async (eventId) => {
  const response = await API.delete(`/events/${eventId}`);
  return response.data;
};
