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

module.exports = {
    findUserByEmail,
    createUser,
    findUserById
};