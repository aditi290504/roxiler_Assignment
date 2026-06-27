const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

// Register
router.post(
    "/register",
    registerValidation,
    authController.register
);

// Login
router.post(
    "/login",
    loginValidation,
    authController.login
);

router.get(
    "/stores",
    authMiddleware,
    authController.getStores
);

router.post(
    "/rating",
    authMiddleware,
    authController.rateStore
);
module.exports = router;