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

const findStoreByEmail = async (email) => {

    const [rows] = await db.query(
        "SELECT * FROM stores WHERE email = ?",
        [email]
    );

    return rows;
};

const getAllUsers = async (filters) => {

    let query = `
        SELECT
            id,
            name,
            email,
            address,
            role
        FROM users
        WHERE 1=1
    `;

    let values = [];

    if (filters.name) {
        query += " AND name LIKE ?";
        values.push(`%${filters.name}%`);
    }

    if (filters.email) {
        query += " AND email LIKE ?";
        values.push(`%${filters.email}%`);
    }

    if (filters.address) {
        query += " AND address LIKE ?";
        values.push(`%${filters.address}%`);
    }

    if (filters.role) {
        query += " AND role = ?";
        values.push(filters.role);
    }

    const allowedSortFields = ["name", "email", "address", "role"];
    const sortBy = allowedSortFields.includes(filters.sortBy)
        ? filters.sortBy
        : "name";

    const order = filters.order === "DESC" ? "DESC" : "ASC";

    query += ` ORDER BY ${sortBy} ${order}`;

    const [rows] = await db.query(query, values);

    return rows;
};


const getAllStores = async (filters) => {

    let query = `
        SELECT
            s.id,
            s.name,
            s.email,
            s.address,

            IFNULL(ROUND(AVG(r.rating),2),0) AS overallRating

        FROM stores s

        LEFT JOIN ratings r
        ON s.id = r.store_id

        WHERE 1=1
    `;

    const values = [];

    if (filters.name) {
        query += " AND s.name LIKE ?";
        values.push(`%${filters.name}%`);
    }

    if (filters.address) {
        query += " AND s.address LIKE ?";
        values.push(`%${filters.address}%`);
    }

    query += `
        GROUP BY
        s.id,
        s.name,
        s.email,
        s.address
    `;

    const allowedSortFields = ["name", "email", "address"];

    const sortBy = allowedSortFields.includes(filters.sortBy)
        ? filters.sortBy
        : "name";

    const order = filters.order === "DESC" ? "DESC" : "ASC";

    query += ` ORDER BY ${sortBy} ${order}`;

    const [rows] = await db.query(query, values);

    return rows;
};
module.exports = {
    getDashboardStats,
    addUser,
    addStore,
    getStoreOwners, findStoreByEmail ,getAllUsers
};
