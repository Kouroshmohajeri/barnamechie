import React from "react";
import styles from "./DataCard.module.css";

const DataCard = () => {
  const data = [
    {
      title: "ترش و شیرین",
      description:
        "فروش انواع ترشی در بارسلونافروش انواع ترشی در بارسلونافروش انواع ترشی در بارسلونا",
      image: "/images/test/torshoshirin.jpg",
      category: "service",
    },
    {
      title: "ترش و شیرین",
      description: "فروش انواع ترشی در بارسلونا",
      image: "/images/test/torshoshirin.jpg",
      category: "product",
    },
    {
      title: "ترش و شیرین",
      description: "فروش انواع ترشی در بارسلونا",
      image: "/images/test/torshoshirin.jpg",
      category: "food",
    },
    {
      title: "ترش و شیرین",
      description: "فروش انواع ترشی در بارسلونا",
      image: "/images/test/torshoshirin.jpg",
      category: "service",
    },
    {
      title: "ترش و شیرین",
      description: "فروش انواع ترشی در بارسلونا",
      image: "/images/test/torshoshirin.jpg",
      category: "event",
    },
    {
      title: "ترش و شیرین",
      description: "فروش انواع ترشی در بارسلونا",
      image: "/images/test/torshoshirin.jpg",
      category: "service",
    },
    {
      title: "ترش و شیرین",
      description: "فروش انواع ترشی در بارسلونا",
      image: "/images/test/torshoshirin.jpg",
      category: "product",
    },
    {
      title: "ترش و شیرین",
      description: "فروش انواع ترشی در بارسلونا",
      image: "/images/test/torshoshirin.jpg",
      category: "event",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>به روز ترین ها</h1>
      <div className={styles.grid}>
        {data.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.textContent}>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.description}>{item.description}</p>
              <span className={styles.category}>{item.category}</span>
            </div>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} className={styles.image} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCard;
