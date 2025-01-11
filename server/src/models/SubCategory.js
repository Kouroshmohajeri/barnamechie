import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    subcategoryId: { type: String, required: true, unique: true },
    categoryId: { type: String, required: true }, // Relation to Category
    name: { type: String, required: true },
    isPaid: { type: Boolean, default: false }, // Indicates if the subcategory is paid
  },
  { collection: "subCategories" }
);

export default mongoose.model("SubCategory", subCategorySchema);
