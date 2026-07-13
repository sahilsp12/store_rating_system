const express = require("express");

const router = express.Router();

const storeOwnerController = require("../controllers/storeOwner.controller");

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const asyncHandler = require("../middleware/async.middleware");

const ROLES = require("../constants/roles");

router.use(authMiddleware);
router.use(authorize(ROLES.STORE_OWNER));

router.get(
  "/dashboard",
  asyncHandler(
    storeOwnerController.getDashboard.bind(storeOwnerController)
  )
);

module.exports = router;