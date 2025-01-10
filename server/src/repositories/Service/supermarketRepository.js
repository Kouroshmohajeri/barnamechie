import SuperMarket from "../../models/Service/Supermarket.js";

export const createSupermarket = async (data) => {
  const supermarket = new Supermarket(data);
  return await supermarket.save();
};

export const getAllSupermarkets = async () => {
  return await SuperMarket.find()
    .populate("userId")
    .populate({ path: "countryId", model: "Country" })
    .populate({ path: "cityId", model: "City" });
};

export const getSupermarketById = async (id) => {
  return await Supermarket.findById(id)
    .populate("userId")
    .populate({ path: "countryId", model: "Country" })
    .populate({ path: "cityId", model: "City" });
};

export const updateSupermarket = async (id, data) => {
  return await Supermarket.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSupermarket = async (id) => {
  return await Supermarket.findByIdAndDelete(id);
};
