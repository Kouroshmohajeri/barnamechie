import Currency from "../../models/Service/Currency.js";

export const createCurrency = async (data) => {
  const currency = new Currency(data);
  return await currency.save();
};

export const getAllCurrencies = async () => {
  return await Currency.find()
    .populate("userId")
    .populate("cityId")
    .populate("countryId");
};

export const getCurrencyById = async (id) => {
  return await Currency.findById(id)
    .populate("userId")
    .populate("cityId")
    .populate("countryId");
};

export const updateCurrency = async (id, data) => {
  return await Currency.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCurrency = async (id) => {
  return await Currency.findByIdAndDelete(id);
};
