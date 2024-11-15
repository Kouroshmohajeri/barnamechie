import Category from "../models/Category.js";

class CategoryRepository {
  async createCategory(categoryData) {
    return await Category.create(categoryData);
  }

  async getAllCategories() {
    return await Category.find();
  }

  async getCategoryById(id) {
    return await Category.findOne({ categoryId: id });
  }

  async updateCategory(id, updateData) {
    return await Category.findOneAndUpdate({ categoryId: id }, updateData, {
      new: true,
    });
  }

  async deleteCategory(id) {
    return await Category.findOneAndDelete({ categoryId: id });
  }
}

export default new CategoryRepository();
