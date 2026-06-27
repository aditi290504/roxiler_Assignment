const db = require("../config/db");

// Find user by email
const findUserByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows;
};

// Create new user
const createUser = async (user) => {
    const [result] = await db.query(
        `INSERT INTO users
        (name, email, password, address, role)
        VALUES (?, ?, ?, ?, ?)`,
        [
            user.name,
            user.email,
            user.password,
            user.address,
            user.role
        ]
    );

    return result;
};

// Find user by ID
const findUserById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );

    return rows;
};


const getStores = async (userId, filters) => {

    let query = `
        SELECT

            s.id,
            s.name,
            s.address,

            IFNULL(ROUND(AVG(r.rating),2),0) AS overallRating,

            (
                SELECT rating
                FROM ratings
                WHERE store_id = s.id
                AND user_id = ?
            ) AS userRating

        FROM stores s

        LEFT JOIN ratings r
        ON s.id = r.store_id

        WHERE 1=1
    `;

    const values = [userId];

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
            s.address
    `;

    const allowedSort = [
        "name",
        "address"
    ];

    const sortBy = allowedSort.includes(filters.sortBy)
        ? filters.sortBy
        : "name";

    const order = filters.order === "DESC"
        ? "DESC"
        : "ASC";

    query += ` ORDER BY ${sortBy} ${order}`;

    const [rows] = await db.query(query, values);

    return rows;
};

const findUserRating = async (userId, storeId) => {

    const [rows] = await db.query(
        `SELECT * FROM ratings
         WHERE user_id = ?
         AND store_id = ?`,
        [userId, storeId]
    );

    return rows;
};

const submitRating = async (userId, storeId, rating) => {

    const [result] = await db.query(
        `INSERT INTO ratings
        (user_id, store_id, rating)
        VALUES (?, ?, ?)`,
        [userId, storeId, rating]
    );

    return result;
};

const updateRating = async (userId, storeId, rating) => {

    const [result] = await db.query(
        `UPDATE ratings
        SET rating = ?
        WHERE user_id = ?
        AND store_id = ?`,
        [rating, userId, storeId]
    );

    return result;
};

const getUserById = async (id) => {

    const [rows] = await db.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );

    return rows;
};

const changePassword = async (id, password) => {

    const [result] = await db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [password, id]
    );

    return result;
};

const findStoreById = async (storeId) => {

    const [rows] = await db.query(
        "SELECT * FROM stores WHERE id = ?",
        [storeId]
    );

    return rows;
};
module.exports = {
    findUserByEmail,
    createUser,
    getStores,
    findUserRating,
    submitRating,
    updateRating,
     getUserById,
    changePassword,
    findStoreById,
};