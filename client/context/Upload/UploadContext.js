"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
export const UploadImagesContext = createContext();

const UploadImagesProvider = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Tracks selected files
  const [mainImageIndex, setMainImageIndex] = useState(0); // Tracks the main image index
  const [modalImage, setModalImage] = useState(null); // Tracks the modal image

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("uploadData"));
    if (savedData) {
      const reconstructedFiles = savedData.selectedFiles.map((file) => ({
        ...file,
      }));
      setSelectedFiles(reconstructedFiles || []);
      setMainImageIndex(savedData.mainImageIndex || 0);
      setModalImage(savedData.modalImage || null);
    }
  }, []);

  // Save data to localStorage whenever the state changes
  useEffect(() => {
    const saveData = {
      selectedFiles: selectedFiles.map(({ name, type, size, preview }) => ({
        name,
        type,
        size,
        preview, // Save the preview URL
      })),
      mainImageIndex,
      modalImage,
    };
    localStorage.setItem("uploadData", JSON.stringify(saveData));
  }, [selectedFiles, mainImageIndex, modalImage]);

  // Clean up blob URLs on component unmount
  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [selectedFiles]);

  // Function to handle file selection
  const handleFileSelection = (files) => {
    const filesArray = Array.from(files);

    if (selectedFiles.length + filesArray.length > 10) {
      throw new Error("حداکثر 10 تصویر مجاز است.");
    }

    const newFiles = filesArray.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      file,
      preview: URL.createObjectURL(file), // Generate a fresh Blob URL for preview
    }));

    // Combine old and new files, re-generating previews for all files
    setSelectedFiles((prevFiles) => [
      ...prevFiles.map((file) => ({
        ...file,
        preview: file.file ? URL.createObjectURL(file.file) : file.preview,
      })),
      ...newFiles,
    ]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedFiles((prevFiles) => {
      const fileToRemove = prevFiles[indexToRemove];
      if (fileToRemove.preview) URL.revokeObjectURL(fileToRemove.preview); // Clean up URL
      const updatedFiles = prevFiles.filter(
        (_, index) => index !== indexToRemove
      );
      return updatedFiles.map((file) => ({
        ...file,
        preview: file.file ? URL.createObjectURL(file.file) : file.preview, // Refresh URLs
      }));
    });

    // Adjust main image if it's removed
    if (mainImageIndex === indexToRemove) {
      setMainImageIndex(0); // Default to the first image
    } else if (indexToRemove < mainImageIndex) {
      setMainImageIndex((prev) => prev - 1);
    }

    setModalImage(null);
  };

  const setAsMainImage = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      const [selected] = updatedFiles.splice(index, 1); // Remove the selected file
      updatedFiles.unshift(selected); // Add it to the beginning
      return updatedFiles.map((file) => ({
        ...file,
        preview: file.file ? URL.createObjectURL(file.file) : file.preview, // Refresh URLs
      }));
    });
    setMainImageIndex(0); // New main image is always at index 0
    setModalImage(null);
  };

  // Function to open a modal for a specific image
  const openModalImage = (index) => {
    setModalImage({ index, file: selectedFiles[index] });
  };

  // Function to close the modal
  const closeModalImage = () => {
    setModalImage(null);
  };

  // Function to reset all upload data
  const resetUploadData = () => {
    selectedFiles.forEach((file) => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
    setSelectedFiles([]);
    setMainImageIndex(0);
    setModalImage(null);
  };

  return (
    <UploadImagesContext.Provider
      value={{
        selectedFiles,
        mainImageIndex,
        modalImage,
        handleFileSelection,
        handleRemoveImage,
        setAsMainImage,
        openModalImage,
        closeModalImage,
        resetUploadData,
      }}
    >
      {children}
    </UploadImagesContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useUploadImagesContext = () => useContext(UploadImagesContext);

export default UploadImagesProvider;
