const authService = require("../services/auth.service");
const messages = require("../constants/messages");
const response = require("../utils/response");

class AuthController {
  async register(req, res) {
    const user = await authService.register(req.body);

    return response.success(
      res,
      201,
      messages.AUTH.REGISTER_SUCCESS,
      user
    );
  }

  async login(req, res) {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return response.success(
      res,
      200,
      messages.AUTH.LOGIN_SUCCESS,
      result
    );
  }

  async changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;

    await authService.changePassword(
      req.user.id,
      currentPassword,
      newPassword
    );

    return response.success(
      res,
      200,
      messages.AUTH.PASSWORD_CHANGED
    );
  }

  async getCurrentUser(req, res) {
    const user = await authService.getCurrentUser(req.user.id);

    return response.success(
      res,
      200,
      messages.AUTH.PROFILE_FETCHED,
      user
    );
  }
}

module.exports = new AuthController();