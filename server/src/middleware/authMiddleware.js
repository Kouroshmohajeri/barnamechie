import Event from "../models/Event.js"; // Assuming Event model is in the same location

// Middleware to authenticate user (check if the user is authenticated)
export const authenticate = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// Middleware to check if the user is the event creator
export const checkEventCreator = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId); // Find the event by its ID
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is the creator of the event (eventHolder should match user ID)
    if (event.eventHolder.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Permission denied: You are not the event creator" });
    }

    // If the user is the event creator, proceed to the next middleware
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking event creator", error });
  }
};

// Middleware to check if the user has the required roles or is the event creator
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming user role is available in req.user

    // Check if the user has one of the authorized roles
    if (roles.includes(userRole)) {
      return next(); // Admin or authorized role, continue to the next middleware
    }

    // If the user isn't an admin, check if they are the event creator
    checkEventCreator(req, res, next);
  };
};
