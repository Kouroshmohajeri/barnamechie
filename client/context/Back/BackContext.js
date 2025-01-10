"use client";
import React, { createContext, useState, useContext } from "react";

// Create the context
const BackContext = createContext();

// Create the provider
const BackProvider = ({ children }) => {
  const [step, setStep] = useState(0); // Default value for step is 0

  return (
    <BackContext.Provider value={{ step, setStep }}>
      {children}
    </BackContext.Provider>
  );
};

// Create a custom hook for consuming the context
export const useBackContext = () => useContext(BackContext);

export default BackProvider;
