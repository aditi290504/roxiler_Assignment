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

module.exports = {
    getDashboardStats
};