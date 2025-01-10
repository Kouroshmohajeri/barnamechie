"use client";
import React, { createContext, useState, useContext } from "react";

// Create the context
export const EventContext = createContext();

// Provider component
const EventProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(null); // Tracks the currently selected event
  const [eventData, setEventData] = useState({}); // Stores data for all events
  const [globalImageDirectories, setGlobalImageDirectories] = useState([]); // Tracks selected image directories

  // Function to update data for a specific event type
  const updateEventData = (eventType, data) => {
    setEventData((prevData) => ({
      ...prevData,
      [eventType]: data,
    }));
  };

  // Function to add image directories
  const addImageDirectories = (directories) => {
    setGlobalImageDirectories((prevDirectories) => [
      ...prevDirectories,
      ...directories,
    ]);
  };

  // Function to reset all event data
  const resetEventData = () => {
    setEventData({});
    setGlobalImageDirectories([]);
  };

  return (
    <EventContext.Provider
      value={{
        selectedEvent,
        setSelectedEvent,
        eventData,
        updateEventData,
        resetEventData,
        globalImageDirectories,
        addImageDirectories,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useEventContext = () => useContext(EventContext);

export default EventProvider;
