const db = require("../config/db");

const getDashboardStats = async () => {

    const [[users]] = await db.query(
        "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [[stores]] = await db.query(
        "SELECT COUNT(*) AS totalStores FROM stores"
    );

    const [[ratings]] = await db.query(
        "SELECT COUNT(*) AS totalRatings FROM ratings"
    );

    return {
        totalUsers: users.totalUsers,
        totalStores: stores.totalStores,
        totalRatings: ratings.totalRatings
    };
};


const bcrypt = require("bcrypt");

// Add User
const addUser = async (user) => {

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const [result] = await db.query(
        `INSERT INTO users
        (name, email, password, address, role)
        VALUES (?, ?, ?, ?, ?)`,
        [
            user.name,
            user.email,
            hashedPassword,
            user.address,
            user.role
        ]
    );

    return result;
};


// Add Store
const addStore = async (store) => {

    const [result] = await db.query(
        `INSERT INTO stores
        (name, email, address, owner_id)
        VALUES (?, ?, ?, ?)`,
        [
            store.name,
            store.email,
            store.address,
            store.owner_id
        ]
    );

    return result;
};

// Get all store owners
const getStoreOwners = async () => {

    const [rows] = await db.query(
        `SELECT id, name, email
         FROM users
         WHERE role = 'OWNER'`
    );

    return rows;
};

module.exports = {
    getDashboardStats,
    addUser
};
