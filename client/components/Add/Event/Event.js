import React from "react";
import { useEventContext } from "@/context/Add/EventCategory/EventContext";
import ChooseEvent from "./ChooseEvent/ChooseEvent";
import Meeting from "./Meeting/Meeting";
import Trip from "./Trip/Trip";
import Upload from "@/components/Upload/Upload";
import EventPreview from "./EventPreview/EventPreview";

const Event = () => {
  const { selectedEvent, updateEventData, eventData } = useEventContext();

  return (
    <div>
      {selectedEvent === null && <ChooseEvent />}
      {selectedEvent === "meeting" && (
        <Meeting
          onSave={(data) => updateEventData("meeting", data)}
          savedData={eventData.meeting || {}}
        />
      )}
      {selectedEvent === "trip" && (
        <Trip
          onSave={(data) => updateEventData("trip", data)}
          savedData={eventData.trip || {}}
        />
      )}
      {selectedEvent === "upload" && <Upload />}
      {selectedEvent === "meetingPreview" && <EventPreview />}
    </div>
  );
};

export default Event;
