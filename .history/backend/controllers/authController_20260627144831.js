

const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const {
    findUserByEmail,
    createUser,
    getStores,
    findUserRating,
    submitRating,
    updateRating,
    findStoreById,
    getUserById,
    changePassword
} = require("../models/userModel");

const generateToken = require("../utils/generateToken");

// ================= REGISTER =================

exports.register = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, email, password, address } = req.body;

        // Check if email already exists
        const existingUser = await findUserByEmail(email);

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already registered."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create normal user
        await createUser({
            name,
            email,
            password: hashedPassword,
            address,
            role: "USER"
        });

        res.status(201).json({
            success: true,
            message: "Registration successful."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ================= LOGIN =================

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const users = await findUserByEmail(email);

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getStores = async (req, res) => {

    try {

        const stores = await getStores(
            req.user.id,
            req.query
        );

        res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.rateStore = async (req, res) => {

    try {

        const { storeId, rating } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5."
            });
        }

        const existingRating = await findUserRating(
            req.user.id,
            storeId
        );

        if (existingRating.length > 0) {

            await updateRating(
                req.user.id,
                storeId,
                rating
            );

            return res.status(200).json({
                success: true,
                message: "Rating updated successfully."
            });

        }

        await submitRating(
            req.user.id,
            storeId,
            rating
        );

        res.status(201).json({
            success: true,
            message: "Rating submitted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.updatePassword = async (req, res) => {

    try {

        const { oldPassword, newPassword } = req.body;

        const user = await getUserById(req.user.id);

        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const isMatch = await bcrypt.compare(
            oldPassword,
            user[0].password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect."
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await changePassword(
            req.user.id,
            hashedPassword
        );

        res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};