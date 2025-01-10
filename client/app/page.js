"use client";
import AddLayout from "@/components/Add/AddLayout";
import BottomMenu from "@/components/BottomMenu/BottomMenu.js";
import CategoryList from "@/components/Category/CategoryList/CategoryList.js";
import Home from "@/components/Home/Home";
import ParticlesBackground from "@/components/ParticlesBackground/ParticlesBackground.js";
import { BottomMenuContext } from "@/context/BottomMenuContext.js";
import React, { useContext } from "react";
import styles from "./page.module.css";
import { Toaster } from "react-hot-toast";
const Page = () => {
  // Changed the component name to uppercase
  const { selectedPage } = useContext(BottomMenuContext);
  return (
    <div className={styles.container}>
      <ParticlesBackground id="particles" />
      {selectedPage === 0 ? <Home /> : null}
      {selectedPage === 1 ? <CategoryList /> : null}
      {selectedPage === 2 ? <AddLayout /> : null}
      <Toaster />
      <BottomMenu />
    </div>
  );
};

export default Page;
