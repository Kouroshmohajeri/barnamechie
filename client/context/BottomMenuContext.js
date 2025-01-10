"use client";
import React, { createContext, useState } from "react";

export const BottomMenuContext = createContext();
const BottomMenuProvider = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  return (
    <BottomMenuContext.Provider
      value={{ selectedPage, setSelectedPage, isHidden, setIsHidden }}
    >
      {children}
    </BottomMenuContext.Provider>
  );
};

export default BottomMenuProvider;
