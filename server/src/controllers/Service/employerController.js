import {
  createEmployer,
  getAllEmployers,
  getEmployerById,
  updateEmployer,
  deleteEmployer,
} from "../../repositories/Service/employerRepository.js";
import sendResponse from "../../services/response.js";

class EmployerController {
  async createEmployer(req, res) {
    try {
      const { body } = req;
      const newEmployer = await createEmployer(body);
      sendResponse(res, 201, newEmployer, "Employer created successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error creating employer", error.message);
    }
  }

  async getAllEmployers(req, res) {
    try {
      const employers = await getAllEmployers();
      if (employers.length === 0) {
        sendResponse(res, 404, [], "No employers found");
        return;
      }
      sendResponse(res, 200, employers, "Employers retrieved successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching employers", error.message);
    }
  }

  async getEmployerById(req, res) {
    try {
      const { id } = req.params;
      const employer = await getEmployerById(id);
      if (!employer) {
        sendResponse(res, 404, null, "Employer not found");
        return;
      }
      sendResponse(res, 200, employer, "Employer retrieved successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching employer", error.message);
    }
  }

  async updateEmployer(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedEmployer = await updateEmployer(id, body);
      if (!updatedEmployer) {
        sendResponse(res, 404, null, "Employer not found");
        return;
      }
      sendResponse(res, 200, updatedEmployer, "Employer updated successfully");
    } catch (error) {
      sendResponse(res, 500, null, "Error updating employer", error.message);
    }
  }

  async deleteEmployer(req, res) {
    try {
      const { id } = req.params;
      const deletedEmployer = await deleteEmployer(id);
      if (!deletedEmployer) {
        sendResponse(res, 404, null, "Employer not found");
        return;
      }
      sendResponse(res, 200, { message: "Employer deleted successfully" });
    } catch (error) {
      sendResponse(res, 500, null, "Error deleting employer", error.message);
    }
  }
}

export default new EmployerController();
