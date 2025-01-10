import React from "react";
import { useEventContext } from "@/context/Add/EventCategory/EventContext";
import ChooseEvent from "./ChooseEvent/ChooseEvent";
import Meeting from "./Meeting/Meeting";
import Trip from "./Trip/Trip";
import Upload from "@/components/Upload/Upload";
import MeetingPreview from "./Meeting/MeetingPreview";

const Event = () => {
  const { selectedEvent, updateEventData, eventData } = useEventContext();

  return (
    <div>
      {selectedEvent === null && <ChooseEvent />}
      {selectedEvent === 0 && (
        <Meeting
          onSave={(data) => updateEventData("meeting", data)}
          savedData={eventData.meeting || {}}
        />
      )}
      {selectedEvent === 1 && (
        <Trip
          onSave={(data) => updateEventData("trip", data)}
          savedData={eventData.trip || {}}
        />
      )}
      {selectedEvent === 2 && <Upload />}
      {selectedEvent === 3 && <MeetingPreview />}
    </div>
  );
};

export default Event;
