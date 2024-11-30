import API from "../server.js";

// Create a new category
export const createCategory = async (categoryData) => {
  const response = await API.post("/categories", categoryData);
  return response.data;
};

// Get all categories
export const getAllCategories = async () => {
  const response = await API.get("/categories");
  return response.data;
};

// Get a category by its ID
export const getCategoryById = async (id) => {
  const response = await API.get(`/categories/${id}`);
  return response.data;
};

// Update a category
export const updateCategory = async (id, categoryData) => {
  const response = await API.put(`/categories/${id}`, categoryData);
  return response.data;
};

// Delete a category
export const deleteCategory = async (id) => {
  const response = await API.delete(`/categories/${id}`);
  return response.data;
};
