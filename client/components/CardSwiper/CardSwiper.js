"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCards, Pagination } from "swiper/modules";
import styles from "./CardSwiper.module.css";
import { useUploadImagesContext } from "@/context/Upload/UploadContext";

const CardSwiper = () => {
  const paginationRef = useRef(null); // Reference for custom pagination
  const swiperRef = useRef(null); // Reference to Swiper instance
  const { selectedFiles } = useUploadImagesContext(); // Use the context to get selected files

  // Ensure Swiper updates when `selectedFiles` changes
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [selectedFiles]);

  // Reinitialize Swiper pagination on component render or changes
  useEffect(() => {
    if (swiperRef.current && paginationRef.current) {
      const swiper = swiperRef.current;
      swiper.params.pagination.el = paginationRef.current; // Assign custom pagination element
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();
    }
  }, [paginationRef]);

  const shouldLoop = selectedFiles.length > 2; // Enable loop only if there are more than 2 slides

  return (
    <div className={styles.container}>
      <Swiper
        effect="cards"
        grabCursor
        centeredSlides={true}
        slideToClickedSlide={true}
        loop={shouldLoop} // Dynamically enable/disable looping
        modules={[EffectCards, Pagination]}
        pagination={{
          el: paginationRef.current, // Use the custom pagination container
          clickable: true,
        }}
        className={styles.mySwiper}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Save Swiper instance
      >
        {selectedFiles.map((file, index) => (
          <SwiperSlide
            key={`${file.name}-${index}`}
            className={styles.swiperSlide}
          >
            <img src={file.preview} alt={file.name} className={styles.image} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Pagination Container */}
      {selectedFiles.length > 1 && (
        <div className={styles.customPagination}>
          <div className={styles.inPagination} ref={paginationRef}></div>
        </div>
      )}
    </div>
  );
};

export default CardSwiper;
