import { ServiceContext } from "@/context/Add/ServiceCategory/ServiceContext";
import React, { useContext } from "react";
import ChooseService from "./ChooseService/ChooseService";
import styles from "./Service.module.css";
const Service = () => {
  const { selectedService } = useContext(ServiceContext);

  return (
    <div className={styles.container}>
      {selectedService === null && <ChooseService />}
    </div>
  );
};

export default Service;
