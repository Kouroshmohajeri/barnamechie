import FoodAndBeverage from "../../models/Service/FoodAndBeverage.js";

export const createFoodAndBeverage = async (data) => {
  const foodAndBeverage = new FoodAndBeverage(data);
  return await foodAndBeverage.save();
};

export const getAllFoodAndBeverages = async () => {
  return await FoodAndBeverage.find()
    .populate("userId")
    .populate({ path: "countryId", model: "Country" })
    .populate({ path: "cityId", model: "City" });
};

export const getFoodAndBeverageById = async (id) => {
  return await FoodAndBeverage.findById(id)
    .populate("userId")
    .populate({ path: "countryId", model: "Country" })
    .populate({ path: "cityId", model: "City" });
};

export const updateFoodAndBeverage = async (id, data) => {
  return await FoodAndBeverage.findByIdAndUpdate(id, data, { new: true });
};

export const deleteFoodAndBeverage = async (id) => {
  return await FoodAndBeverage.findByIdAndDelete(id);
};
