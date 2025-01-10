import Employee from "../../models/Service/Employee.js";

export const createEmployee = async (data) => {
  const employee = new Employee(data);
  return await employee.save();
};

export const getAllEmployees = async () => {
  return await Employee.find()
    .populate("cityId")
    .populate("countryId")
    .populate("userId");
};

export const getEmployeeById = async (id) => {
  return await Employee.findById(id)
    .populate("cityId")
    .populate("countryId")
    .populate("userId");
};

export const updateEmployee = async (id, data) => {
  return await Employee.findByIdAndUpdate(id, data, { new: true });
};

export const deleteEmployee = async (id) => {
  return await Employee.findByIdAndDelete(id);
};
