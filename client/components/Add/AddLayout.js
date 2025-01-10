import CategoryProvider from "@/context/Add/ChooseCategory/CategoryContext";
import React from "react";
import Add from "./Add";
import EventProvider from "@/context/Add/EventCategory/EventContext";
import ServiceProvider from "@/context/Add/ServiceCategory/ServiceContext";
import UploadImagesProvider from "@/context/Upload/UploadContext";

const AddLayout = () => {
  return (
    <>
      <CategoryProvider>
        <UploadImagesProvider>
          <EventProvider>
            <ServiceProvider>
              <Add />
            </ServiceProvider>
          </EventProvider>
        </UploadImagesProvider>
      </CategoryProvider>
    </>
  );
};

export default AddLayout;
