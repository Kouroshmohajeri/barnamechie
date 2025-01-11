"use client";
import React, { useContext, useEffect } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaArrowLeft } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import styles from "./Upload.module.css";
import { uploadImage } from "@/api/images/actions";
import { useUploadImagesContext } from "@/context/Upload/UploadContext.js";
import { useEventContext } from "@/context/Add/EventCategory/EventContext";
import { useBackContext } from "@/context/Back/BackContext";

const Upload = () => {
  const {
    selectedFiles,
    mainImageIndex,
    modalImage,
    handleFileSelection,
    handleRemoveImage,
    setAsMainImage,
    openModalImage,
    closeModalImage,
    resetUploadData,
  } = useUploadImagesContext();
  const { setSelectedEvent } = useEventContext();
  const { step } = useBackContext();
  const handleFileUpload = async () => {
    // try {
    //   if (selectedFiles.length === 0) {
    //     toast.error("لطفا یک فایل انتخاب کنید.");
    //     return;
    //   }

    //   const uploadPromises = selectedFiles.map((file) =>
    //     uploadImage(file.file)
    //   ); // Use the actual File object here
    //   await Promise.all(uploadPromises);
    //   toast.success("فایل‌ها با موفقیت آپلود شدند!");
    //   resetUploadData(); // Reset upload state after successful upload
    // } catch (error) {
    //   toast.error("آپلود فایل ناموفق بود. دوباره تلاش کنید.");
    //   console.error(error);
    // }
    setSelectedEvent("meetingPreview");
  };

  const handleBackClick = () => {
    setSelectedEvent(step);
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.header}>
        <FaArrowLeft
          className={styles.backButton}
          onClick={() => handleBackClick()}
        />
        <span className={styles.title}>برنامه چیه؟</span>
      </div>
      <div className={styles.content}>
        <div
          className={styles.uploadBox}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <span>برای آپلود کلیک کنید</span>
        </div>
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelection(e.target.files)}
          className={styles.hiddenFileInput}
        />
        <div className={styles.filePreview}>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className={styles.fileItem}
              onClick={() => openModalImage(index)}
            >
              <img
                src={file.file ? URL.createObjectURL(file.file) : ""}
                alt={file.name}
                className={styles.previewImage}
              />
              {index === mainImageIndex && (
                <MdVerified className={styles.mainBadge} />
              )}
              <HiOutlineXMark
                className={styles.removeIcon}
                onClick={(event) => {
                  event.stopPropagation(); // Prevent event bubbling
                  handleRemoveImage(index);
                }}
              />
            </div>
          ))}
        </div>
        <button
          className={styles.uploadButton}
          onClick={handleFileUpload}
          disabled={selectedFiles.length === 0}
        >
          بعدی
        </button>
      </div>

      {/* Modal */}
      {modalImage && (
        <div className={styles.modalOverlay} onClick={closeModalImage}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <HiOutlineXMark
              className={styles.closeModalIcon}
              onClick={closeModalImage}
            />
            <img
              src={
                modalImage.file.file
                  ? URL.createObjectURL(modalImage.file.file)
                  : ""
              }
              alt="Selected"
              className={styles.modalImage}
            />
            <div className={styles.modalActions}>
              <AiTwotoneDelete
                className={styles.modalDeleteIcon}
                onClick={() => handleRemoveImage(modalImage.index)}
              />
              <MdVerified
                className={styles.modalSetMainIcon}
                onClick={() => setAsMainImage(modalImage.index)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
