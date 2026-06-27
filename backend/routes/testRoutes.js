const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected Route Accessed Successfully",
        user: req.user
    });
});

module.exports = router;