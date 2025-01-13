import {
  createTripInDb,
  getAllTripsFromDb,
  getTripByIdFromDb,
  updateTripInDb,
  deleteTripFromDb,
} from "../repositories/tripRepository.js";
import sendResponse from "../services/response.js";

export const createTrip = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      longDescription,
      startDate,
      endDate,
      capacity,
      price,
      subCategoryId,
      currencyId,
      url,
      imageUrl,
      origin,
      destination,
      country,
      mainImage,
    } = req.body;

    const userId = req.user.userId; // Assuming the user ID comes from the authenticated user

    const tripData = {
      title,
      shortDescription,
      longDescription,
      startDate,
      endDate,
      capacity,
      price,
      subCategoryId,
      currencyId,
      url,
      imageUrl,
      origin,
      destination,
      country,
      mainImage,
      userId,
      dateOfPublish: new Date(),
      isCancelled: false,
    };

    const savedTrip = await createTripInDb(tripData);

    sendResponse(res, 201, "Trip created successfully", savedTrip);
  } catch (error) {
    sendResponse(res, 500, "Error creating trip", null, error);
  }
};

// Get all trips
export const getAllTrips = async (req, res) => {
  try {
    const trips = await getAllTripsFromDb();
    sendResponse(res, 200, "Trips fetched successfully", trips);
  } catch (error) {
    sendResponse(res, 500, "Error fetching trips", null, error);
  }
};

// Get a trip by ID
export const getTripById = async (req, res) => {
  try {
    const trip = await getTripByIdFromDb(req.params.tripId);
    if (!trip) {
      return sendResponse(res, 404, "Trip not found");
    }
    sendResponse(res, 200, "Trip fetched successfully", trip);
  } catch (error) {
    sendResponse(res, 500, "Error fetching trip", null, error);
  }
};

// Update a trip
export const updateTrip = async (req, res) => {
  try {
    const updatedTrip = await updateTripInDb(req.params.tripId, req.body);
    if (!updatedTrip) {
      return sendResponse(res, 404, "Trip not found");
    }
    sendResponse(res, 200, "Trip updated successfully", updatedTrip);
  } catch (error) {
    sendResponse(res, 500, "Error updating trip", null, error);
  }
};

// Delete a trip
export const deleteTrip = async (req, res) => {
  try {
    const deletedTrip = await deleteTripFromDb(req.params.tripId);
    if (!deletedTrip) {
      return sendResponse(res, 404, "Trip not found");
    }
    sendResponse(res, 200, "Trip deleted successfully");
  } catch (error) {
    sendResponse(res, 500, "Error deleting trip", null, error);
  }
};
