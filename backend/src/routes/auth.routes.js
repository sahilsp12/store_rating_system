const express = require("express");

const router = express.Router();

const { register } = require("../controllers/auth.controller");
const { registerValidator } = require("../validators/auth.validator");
const validateRequest = require("../middleware/validation.middleware");


router.post(
    "/register",
    registerValidator,
    validateRequest,
    register
);


router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth Route Working"
    });
});

module.exports = router;