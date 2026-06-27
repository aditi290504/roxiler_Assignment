const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

require("./config/db");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Store Rating API Running Successfully"
    });
});

app.use("/api/auth", authRoutes);
module.exports = app;