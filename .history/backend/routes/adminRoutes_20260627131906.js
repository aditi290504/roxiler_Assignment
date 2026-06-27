const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("ADMIN"),
    adminController.dashboard
);

router.post(
    "/users",
    authMiddleware,
    roleMiddleware("ADMIN"),
    adminController.createUser
);

router.post(
    "/stores",
    authMiddleware,
    roleMiddleware("ADMIN"),
    adminController.createStore
);

router.get(
    "/users",
    authMiddleware,
    roleMiddleware("ADMIN"),
    adminController.getUsers
);

router.get(
    "/stores",
    authMiddleware,
    roleMiddleware("ADMIN"),
    adminController.getStores
);
module.exports = router;