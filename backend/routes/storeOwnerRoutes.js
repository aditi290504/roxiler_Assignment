const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const storeOwnerController = require("../controllers/storeOwnerController");

router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("OWNER"),
    storeOwnerController.dashboard
);

module.exports = router;