const { getDashboardStats,
    addUser,
    addStore,
    getStoreOwners, findStoreByEmail, getAllUsers, getAllStores, getUserDetails } = require("../models/adminModel");
const { findUserByEmail } = require("../models/userModel");

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

exports.createStore = async (req, res) => {

    try {

        const {
            name,
            email,
            address,
            owner_id
        } = req.body;

        const owners = await getStoreOwners();

        const ownerExists = owners.find(
            owner => owner.id === owner_id
        );

        if (!ownerExists) {
            return res.status(404).json({
                success: false,
                message: "Store Owner not found."
            });
        }

        await addStore({
            name,
            email,
            address,
            owner_id
        });

        res.status(201).json({
            success: true,
            message: "Store added successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getUsers = async (req, res) => {

    try {

        const users = await getAllUsers(req.query);

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
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

        const stores = await getAllStores(req.query);

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