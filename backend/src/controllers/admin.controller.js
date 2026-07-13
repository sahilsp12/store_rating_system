const adminService = require("../services/admin.service");
const response = require("../utils/response");
const messages = require("../constants/messages");

class AdminController {
  async getDashboard(req, res) {
    const dashboard = await adminService.getDashboard();

    return response.success(
      res,
      200,
      messages.ADMIN.DASHBOARD_FETCHED,
      dashboard
    );
  }

  async createUser(req, res) {
    const user = await adminService.createUser(req.body);

    return response.success(
      res,
      201,
      messages.ADMIN.USER_CREATED,
      user
    );
  }

  async createStore(req, res) {
    const store = await adminService.createStore(req.body);

    return response.success(
      res,
      201,
      messages.ADMIN.STORE_CREATED,
      store
    );
  }

  async getUsers(req, res) {
    const users = await adminService.getUsers(req.query);

    return response.success(
      res,
      200,
      messages.ADMIN.USERS_FETCHED,
      users
    );
  }

  async getUserDetails(req, res) {
    const user = await adminService.getUserDetails(Number(req.params.id));

    return response.success(
      res,
      200,
      messages.ADMIN.USER_DETAILS_FETCHED,
      user
    );
  }

  async getStores(req, res) {
    const stores = await adminService.getStores(req.query);

    return response.success(
      res,
      200,
      messages.ADMIN.STORES_FETCHED,
      stores
    );
  }
}

module.exports = new AdminController();