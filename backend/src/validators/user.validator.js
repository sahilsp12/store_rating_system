const { body, param, query } = require("express-validator");

const listStoresValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  query("sortBy")
    .optional()
    .isIn(["name", "email", "address", "createdAt"])
    .withMessage("Invalid sort field."),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc."),
];

const storeDetailsValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Invalid store id."),
];

const submitRatingValidator = [
  body("storeId")
    .isInt({ gt: 0 })
    .withMessage("Invalid store id."),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5."),
];

const updateRatingValidator = [
  param("storeId")
    .isInt({ gt: 0 })
    .withMessage("Invalid store id."),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5."),
];

module.exports = {
  listStoresValidator,
  storeDetailsValidator,
  submitRatingValidator,
  updateRatingValidator,
};