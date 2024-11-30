import SubCategory from "../models/SubCategory.js";

class SubCategoryRepository {
  async createSubCategory(subCategoryData) {
    return await SubCategory.create(subCategoryData);
  }

  async getAllSubCategories() {
    return await SubCategory.find();
  }

  async getSubCategoryById(id) {
    return await SubCategory.findOne({ subcategoryId: id });
  }

  async updateSubCategory(id, updateData) {
    return await SubCategory.findOneAndUpdate(
      { subcategoryId: id },
      updateData,
      { new: true }
    );
  }

  async deleteSubCategory(id) {
    return await SubCategory.findOneAndDelete({ subcategoryId: id });
  }
}

export default new SubCategoryRepository();
