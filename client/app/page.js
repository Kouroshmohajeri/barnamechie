"use client";
import Add from "@/components/Add/Add";
import BottomMenu from "@/components/BottomMenu/BottomMenu";
import CategoryList from "@/components/Category/CategoryList/CategoryList";
import Home from "@/components/Home/Home";
import ParticlesBackground from "@/components/ParticlesBackground/ParticlesBackground";
import { BottomMenuContext } from "@/context/BottomMenuContext";
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
