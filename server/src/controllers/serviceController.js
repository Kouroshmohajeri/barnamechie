import {
  createService,
  getServiceById,
  updateService,
  deleteService,
  getAllServices,
} from "../repositories/serviceRepository.js";
import sendResponse from "../services/response.js";

class ServiceController {
  async createService(req, res) {
    try {
      const newService = await createService(req.body);
      sendResponse(res, 201, newService);
    } catch (error) {
      sendResponse(res, 500, null, "Error creating service", error);
    }
  }

  async getServiceById(req, res) {
    try {
      const service = await getServiceById(req.params.id);
      service
        ? sendResponse(res, 200, service)
        : sendResponse(res, 404, null, "Service not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching service", error);
    }
  }

  async updateService(req, res) {
    try {
      const updatedService = await updateService(req.params.id, req.body);
      updatedService
        ? sendResponse(res, 200, updatedService)
        : sendResponse(res, 404, null, "Service not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error updating service", error);
    }
  }

  async deleteService(req, res) {
    try {
      const deletedService = await deleteService(req.params.id);
      deletedService
        ? sendResponse(res, 200, { message: "Service deleted successfully" })
        : sendResponse(res, 404, null, "Service not found");
    } catch (error) {
      sendResponse(res, 500, null, "Error deleting service", error);
    }
  }

  async getAllServices(req, res) {
    try {
      const services = await getAllServices();
      sendResponse(res, 200, services);
    } catch (error) {
      sendResponse(res, 500, null, "Error fetching services", error);
    }
  }
}

export default new ServiceController();
