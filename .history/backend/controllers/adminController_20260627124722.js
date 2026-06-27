const { getDashboardStats, addUser } = require("../models/adminModel");

exports.dashboard = async (req, res) => {

    try {

        const stats = await getDashboardStats();

        res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.createUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            address,
            role
        } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        if (!["ADMIN", "USER", "OWNER"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role."
            });
        }

        await addUser({
            name,
            email,
            password,
            address,
            role
        });

        res.status(201).json({
            success: true,
            message: "User created successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};