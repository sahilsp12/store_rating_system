const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validationMiddleware = require("../middleware/validation.middleware");
const asyncHandler = require("../middleware/async.middleware");

const ROLES = require("../constants/roles");

const {
  listStoresValidator,
  storeDetailsValidator,
  submitRatingValidator,
  updateRatingValidator,
} = require("../validators/user.validator");

router.use(authMiddleware);
router.use(authorize(ROLES.USER));

router.get(
  "/stores",
  listStoresValidator,
  validationMiddleware,
  asyncHandler(userController.getStores.bind(userController))
);

router.get(
  "/stores/:id",
  storeDetailsValidator,
  validationMiddleware,
  asyncHandler(userController.getStoreDetails.bind(userController))
);

router.post(
  "/ratings",
  submitRatingValidator,
  validationMiddleware,
  asyncHandler(userController.submitRating.bind(userController))
);

router.put(
  "/ratings/:storeId",
  updateRatingValidator,
  validationMiddleware,
  asyncHandler(userController.updateRating.bind(userController))
);

module.exports = router;