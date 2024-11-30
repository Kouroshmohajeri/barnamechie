"use client";
import Add from "@/components/Add/Add.js";
import BottomMenu from "@/components/BottomMenu/BottomMenu.js";
import CategoryList from "@/components/Category/CategoryList/CategoryList.js";
import Home from "@/components/Home/Home";
import ParticlesBackground from "@/components/ParticlesBackground/ParticlesBackground.js";
import { BottomMenuContext } from "@/context/BottomMenuContext.js";
import React, { useContext } from "react";

const Page = () => {
  // Changed the component name to uppercase
  const { selectedPage } = useContext(BottomMenuContext);
  return (
    <div>
      <ParticlesBackground id="particles" />
      {selectedPage === 0 ? <Home /> : null}
      {selectedPage === 1 ? <CategoryList /> : null}
      {selectedPage === 2 ? <Add /> : null}
      <BottomMenu />
    </div>
  );
};

export default Page;
