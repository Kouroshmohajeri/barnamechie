"use client";
import BottomMenu from "@/components/BottomMenu/BottomMenu";
import Home from "@/components/home/Home";
import ParticlesBackground from "@/components/ParticlesBackground/ParticlesBackground";
import React, { useState } from "react";

const Page = () => {
  // Changed the component name to uppercase
  const [selectedPage, setSelectedPage] = useState(0);
  const handlePageChange = (page) => {
    setSelectedPage(page);
  };
  return (
    <div>
      <ParticlesBackground id="particles" />
      {selectedPage === 0 ? <Home /> : null}
      <BottomMenu onPageChange={handlePageChange} />
    </div>
  );
};

export default Page; // Ensure it matches the component name
