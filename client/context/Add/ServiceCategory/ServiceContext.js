"use client";
import React, { createContext, useState } from "react";

export const ServiceContext = createContext();
const ServiceProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <ServiceContext.Provider value={{ selectedService, setSelectedService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;
