import CategoryRepository from "../repositories/categoryRepository.js";
import sendResponse from "../services/response.js";

class CategoryController {
  async createCategory(req, res) {
    try {
      const newCategory = await CategoryRepository.createCategory(req.body);
      sendResponse(res, 201, newCategory);
    } catch (error) {
      sendResponse(res, 500, null, "Error creating category", error);
    }
  }

  async getCategoryById(req, res) {
    try {
      const category = await CategoryRepository.getCategoryById(req.params.id);
      category
        ? sendResponse(res, 200, category)
        : sendResponse(res, 404, null, "Category not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching category", error);
    }
  }

  async updateCategory(req, res) {
    try {
      const updatedCategory = await CategoryRepository.updateCategory(
        req.params.id,
        req.body
      );
      updatedCategory
        ? sendResponse(res, 200, updatedCategory)
        : sendResponse(res, 404, null, "Category not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error updating category", error);
    }
  }

  async deleteCategory(req, res) {
    try {
      const deletedCategory = await CategoryRepository.deleteCategory(
        req.params.id
      );
      deletedCategory
        ? sendResponse(res, 200, { message: "Category deleted" })
        : sendResponse(res, 404, null, "Category not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error deleting category", error);
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await CategoryRepository.getAllCategories();
      sendResponse(res, 200, categories);
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching categories", error);
    }
  }
}

export default new CategoryController();
