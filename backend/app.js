const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeOwnerRoutes = require("./routes/storeOwnerRoutes");

require("./config/db");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/test", testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/store-owner", storeOwnerRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Store Rating API Running Successfully"
    });
});

app.use("/api/auth", authRoutes);
module.exports = app;