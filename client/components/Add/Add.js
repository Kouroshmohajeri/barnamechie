import React, { useContext } from "react";
import ChooseCategory from "./ChooseCategory/ChooseCategory";
import { CategoryContext } from "@/context/Add/ChooseCategory/CategoryContext";
import Meeting from "./Event/Meeting/Meeting";
import styles from "./Add.module.css";
import { EventContext } from "@/context/Add/EventCategory/EventContext";
import Event from "./Event/Event";
import Service from "./Service/Service";

const Add = () => {
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const { selectedEvent, setSelectedEvent } = useContext(EventContext);

  return (
    <div className={styles.container}>
      {selectedCategory === null && <ChooseCategory />}
      {selectedCategory === 0 && <Event />}
      {selectedCategory === 1 && <Service />}
    </div>
  );
};

export default Add;
