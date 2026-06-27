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

module.exports = {
    getDashboardStats,
    addUser
};
