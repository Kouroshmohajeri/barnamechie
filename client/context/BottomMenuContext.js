"use client";
import React, { createContext, useState, useContext } from "react";

export const BottomMenuContext = createContext();
const BottomMenuProvider = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState(0); // Default page

  return (
    <BottomMenuContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </BottomMenuContext.Provider>
  );
};

export default BottomMenuProvider;
