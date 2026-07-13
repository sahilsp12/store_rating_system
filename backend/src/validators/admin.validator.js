const { body, query, param } = require("express-validator");

const ROLES = require("../constants/roles");

const createUserValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 20, max: 60 })
    .withMessage("Name must be between 20 and 60 characters."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required.")
    .isLength({ max: 400 })
    .withMessage("Address cannot exceed 400 characters."),

  body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isIn([
      ROLES.ADMIN,
      ROLES.USER,
      ROLES.STORE_OWNER,
    ])
    .withMessage("Invalid role."),
];

const createStoreValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Store name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Store name must be between 3 and 100 characters."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Store email is required.")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Store address is required.")
    .isLength({ max: 400 })
    .withMessage("Address cannot exceed 400 characters."),

  body("ownerId")
    .notEmpty()
    .withMessage("Owner is required.")
    .isInt({ gt: 0 })
    .withMessage("Invalid owner id."),
];

const listUsersValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 }),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 }),

  query("role")
    .optional()
    .isIn([
      ROLES.ADMIN,
      ROLES.USER,
      ROLES.STORE_OWNER,
    ]),

  query("sortBy")
    .optional()
    .isIn([
      "name",
      "email",
      "address",
      "role",
      "createdAt",
    ]),

  query("order")
    .optional()
    .isIn(["asc", "desc"]),
];

const listStoresValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 }),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 }),

  query("sortBy")
    .optional()
    .isIn([
      "name",
      "email",
      "address",
      "createdAt",
    ]),

  query("order")
    .optional()
    .isIn(["asc", "desc"]),
];

const userDetailsValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Invalid user id."),
];

module.exports = {
  createUserValidator,
  createStoreValidator,
  listUsersValidator,
  listStoresValidator,
  userDetailsValidator,
};