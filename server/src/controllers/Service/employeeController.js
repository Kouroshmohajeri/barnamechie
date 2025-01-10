import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../../repositories/Service/employeeRepository.js";
import sendResponse from "../services/response.js";

class EmployeeController {
  async createEmployee(req, res) {
    try {
      const { body } = req;
      const newEmployee = await createEmployee(body);
      sendResponse(res, 201, newEmployee, "Employee created successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error creating employee", error.message);
    }
  }

  async getAllEmployees(req, res) {
    try {
      const employees = await getAllEmployees();
      if (employees.length === 0) {
        sendResponse(res, 404, [], "No employees found");
        return;
      }
      sendResponse(res, 200, employees, "Employees retrieved successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching employees", error.message);
    }
  }

  async getEmployeeById(req, res) {
    try {
      const { id } = req.params;
      const employee = await getEmployeeById(id);
      if (!employee) {
        sendResponse(res, 404, null, "Employee not found");
        return;
      }
      sendResponse(res, 200, employee, "Employee retrieved successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching employee", error.message);
    }
  }

  async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedEmployee = await updateEmployee(id, body);
      if (!updatedEmployee) {
        sendResponse(res, 404, null, "Employee not found");
        return;
      }
      sendResponse(res, 200, updatedEmployee, "Employee updated successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error updating employee", error.message);
    }
  }

  async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      const deletedEmployee = await deleteEmployee(id);
      if (!deletedEmployee) {
        sendResponse(res, 404, null, "Employee not found");
        return;
      }
      sendResponse(res, 200, { message: "Employee deleted successfully" });
    } catch (error) {
      sendResponse(res, 500, null, "Error deleting employee", error.message);
    }
  }
}

export default new EmployeeController();
