"use client";
import React, { useContext } from "react";
import styles from "./ChooseService.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { CategoryContext } from "@/context/Add/ChooseCategory/CategoryContext";
import {
  MdRestaurant,
  MdFastfood,
  MdHotel,
  MdShoppingCart,
  MdWork,
  MdBuild,
  MdSchool,
  MdGroup,
} from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { ServiceContext } from "@/context/Add/ServiceCategory/ServiceContext";

const services = [
  { id: 0, label: "رستوران و کافه", icon: <MdRestaurant size={30} /> },
  { id: 1, label: "غذا و نوشیدنی", icon: <MdFastfood size={30} /> },
  { id: 2, label: "اقامت", icon: <MdHotel size={30} /> },
  { id: 3, label: "سوپرمارکت", icon: <MdShoppingCart size={30} /> },
  { id: 4, label: "ارز", icon: <FaDollarSign size={30} /> },
  { id: 5, label: "کار", icon: <MdWork size={30} /> },
  { id: 6, label: "تعمیرات", icon: <MdBuild size={30} /> },
  { id: 7, label: "آموزش", icon: <MdSchool size={30} /> },
  { id: 8, label: "هم تیمی", icon: <MdGroup size={30} /> },
];

const ChooseService = () => {
  const { setSelectedCategory } = useContext(CategoryContext);
  const { setSelectedService } = useContext(ServiceContext);

  const handleServiceSelect = (id) => {
    setSelectedService(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.serviceGrid}>
        {services.map((service) => (
          <div
            key={service.id}
            className={`${styles.serviceBox} ${
              service.id % 2 !== 0 ? styles.rightBox : styles.leftBox
            }`}
            onClick={() => handleServiceSelect(service.id)}
          >
            <div className={styles.boxWrapper}>
              {service.icon}
              <p>{service.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.backRow}>
        <FaArrowLeft
          className={styles.backButton}
          onClick={() => setSelectedCategory(null)}
        />
      </div>
    </div>
  );
};

export default ChooseService;
