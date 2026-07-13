const userService = require("../services/user.service");
const response = require("../utils/response");
const messages = require("../constants/messages");

class UserController {
  async getStores(req, res) {
    const result = await userService.getStores(
      req.user.id,
      req.query
    );

    return response.success(
      res,
      200,
      messages.STORE.STORES_FETCHED,
      result
    );
  }

  async getStoreDetails(req, res) {
    const result = await userService.getStoreDetails(
      req.params.id,
      req.user.id
    );

    return response.success(
      res,
      200,
      messages.STORE.STORE_DETAILS_FETCHED,
      result
    );
  }

  async submitRating(req, res) {
    const result = await userService.submitRating(
      req.user.id,
      req.body
    );

    return response.success(
      res,
      201,
      messages.RATING.SUBMITTED,
      result
    );
  }

  async updateRating(req, res) {
    const result = await userService.updateRating(
      req.user.id,
      req.params.storeId,
      req.body.rating
    );

    return response.success(
      res,
      200,
      messages.RATING.UPDATED,
      result
    );
  }
}

module.exports = new UserController();