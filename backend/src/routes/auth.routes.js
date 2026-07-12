const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const asyncHandler = require("../middleware/async.middleware");

const {
  registerValidator,
  loginValidator,
  changePasswordValidator,
} = require("../validators/auth.validator");

const validationMiddleware = require("../middleware/validation.middleware");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/register",
  registerValidator,
  validationMiddleware,
  asyncHandler(authController.register.bind(authController))
);

router.post(
  "/login",
  loginValidator,
  validationMiddleware,
  asyncHandler(authController.login.bind(authController))
);

router.put(
  "/change-password",
  authMiddleware,
  changePasswordValidator,
  validationMiddleware,
  asyncHandler(authController.changePassword.bind(authController))
);

router.get(
  "/me",
  authMiddleware,
 asyncHandler(authController.getCurrentUser.bind(authController))
);

module.exports = router;