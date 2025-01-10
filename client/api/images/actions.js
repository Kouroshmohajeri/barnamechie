import API from "../server.js";
// Upload an image
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await API.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // Returns the uploaded image details
};

// Get all images
export const getImages = async () => {
  const response = await API.get("/images");
  return response.data; // Returns an array of image paths
};

// Delete an image by filename
export const deleteImage = async (filename) => {
  const response = await API.delete(`/images/${filename}`);
  return response.data; // Returns a success message
};

// Update/Replace an image by filename
export const updateImage = async (filename, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await API.put(`/images/${filename}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // Returns the updated image details
};
