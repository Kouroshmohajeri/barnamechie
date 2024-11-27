import React from "react";
import Carousel from "./Carousel/Carousel";
import DataCard from "./DataCard/DataCard";
import styles from "./Home.module.css";
import CountryDropdown from "./LocationDropdown/LocationDropdown";

const Home = () => {
  return (
    <div className={styles.home}>
      <Carousel />
      <CountryDropdown />
      <hr className={styles.hr} />
      <DataCard />
    </div>
  );
};

export default Home;
