import Trip from "../models/Trip.js";

export const createTripInDb = async (tripData) => {
  const trip = new Trip(tripData);
  return await trip.save();
};

export const getAllTripsFromDb = async () => {
  return await Trip.find()
    .populate("userId")
    .populate("subCategoryId")
    .populate("currencyId");
};

export const getTripByIdFromDb = async (tripId) => {
  return await Trip.findById(tripId)
    .populate("userId")
    .populate("subCategoryId")
    .populate("currencyId");
};

export const updateTripInDb = async (tripId, updateData) => {
  return await Trip.findByIdAndUpdate(tripId, updateData, { new: true });
};

export const deleteTripFromDb = async (tripId) => {
  return await Trip.findByIdAndDelete(tripId);
};
