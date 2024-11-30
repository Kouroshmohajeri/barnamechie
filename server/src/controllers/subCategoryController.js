import SubCategoryRepository from "../repositories/subCategoryRepository.js";
import sendResponse from "../services/response.js";

class SubCategoryController {
  async createSubCategory(req, res) {
    try {
      const newSubCategory = await SubCategoryRepository.createSubCategory(
        req.body
      );
      sendResponse(
        res,
        201,
        newSubCategory,
        "SubCategory created successfully"
      );
    } catch (error) {
      sendResponse(res, 500, null, "Error creating subcategory", error);
    }
  }

  async getSubCategoryById(req, res) {
    try {
      const subCategory = await SubCategoryRepository.getSubCategoryById(
        req.params.id
      );
      subCategory
        ? sendResponse(
            res,
            200,
            subCategory,
            "SubCategory retrieved successfully"
          )
        : sendResponse(res, 404, null, "SubCategory not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching subcategory", error);
    }
  }

  async updateSubCategory(req, res) {
    try {
      const updatedSubCategory = await SubCategoryRepository.updateSubCategory(
        req.params.id,
        req.body
      );
      updatedSubCategory
        ? sendResponse(
            res,
            200,
            updatedSubCategory,
            "SubCategory updated successfully"
          )
        : sendResponse(res, 404, null, "SubCategory not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error updating subcategory", error);
    }
  }

  async deleteSubCategory(req, res) {
    try {
      const deletedSubCategory = await SubCategoryRepository.deleteSubCategory(
        req.params.id
      );
      deletedSubCategory
        ? sendResponse(
            res,
            200,
            { message: "SubCategory deleted" },
            "SubCategory deleted successfully"
          )
        : sendResponse(res, 404, null, "SubCategory not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error deleting subcategory", error);
    }
  }

  async getAllSubCategories(req, res) {
    try {
      const subCategories = await SubCategoryRepository.getAllSubCategories();
      sendResponse(
        res,
        200,
        subCategories,
        "SubCategories retrieved successfully"
      );
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching subcategories", error);
    }
  }
}

export default new SubCategoryController();
