// repositories/restaurantAndCafeRepository.js
import RestaurantAndCafe from "../../models/Service/RestaurantAndCafe.js";

export const createRestaurantAndCafe = async (data) => {
  const restaurantAndCafe = new RestaurantAndCafe(data);
  return await restaurantAndCafe.save();
};

export const getAllRestaurantsAndCafes = async () => {
  return await RestaurantAndCafe.find()
    .populate("userId")
    .populate({ path: "countryId", model: "Country" })
    .populate({ path: "cityId", model: "City" });
};

export const getRestaurantAndCafeById = async (id) => {
  return await RestaurantAndCafe.findById(id)
    .populate("userId")
    .populate({ path: "countryId", model: "Country" })
    .populate({ path: "cityId", model: "City" });
};

export const updateRestaurantAndCafe = async (id, data) => {
  return await RestaurantAndCafe.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRestaurantAndCafe = async (id) => {
  return await RestaurantAndCafe.findByIdAndDelete(id);
};
