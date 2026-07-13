const storeOwnerService = require("../services/storeOwner.service");
const response = require("../utils/response");
const messages = require("../constants/messages");

class StoreOwnerController {
  async getDashboard(req, res) {
    const dashboard = await storeOwnerService.getDashboard(req.user.id);

    return response.success(
      res,
      200,
      messages.STORE_OWNER.DASHBOARD_FETCHED,
      dashboard
    );
  }
}

module.exports = new StoreOwnerController();