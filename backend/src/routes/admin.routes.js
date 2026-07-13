const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const asyncHandler = require("../middleware/async.middleware");
const validationMiddleware = require("../middleware/validation.middleware");

const ROLES = require("../constants/roles");

const {
  createUserValidator,
  createStoreValidator,
  listUsersValidator,
  listStoresValidator,
  userDetailsValidator,
} = require("../validators/admin.validator");


router.use(authMiddleware);
router.use(authorize(ROLES.ADMIN));

router.get(
  "/dashboard",
  asyncHandler(adminController.getDashboard.bind(adminController))
);

router.post(
  "/users",
  createUserValidator,
  validationMiddleware,
  asyncHandler(adminController.createUser.bind(adminController))
);

router.get(
  "/users",
  listUsersValidator,
  validationMiddleware,
  asyncHandler(adminController.getUsers.bind(adminController))
);

router.get(
  "/users/:id",
  userDetailsValidator,
  validationMiddleware,
  asyncHandler(adminController.getUserDetails.bind(adminController))
);

router.post(
  "/stores",
  createStoreValidator,
  validationMiddleware,
  asyncHandler(adminController.createStore.bind(adminController))
);

router.get(
  "/stores",
  listStoresValidator,
  validationMiddleware,
  asyncHandler(adminController.getStores.bind(adminController))
);

module.exports = router;