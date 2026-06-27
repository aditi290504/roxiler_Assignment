const db = require("../config/db");

// Find user by email
const findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
};

// Create new user
const createUser = (user, callback) => {
    const sql = `
        INSERT INTO users(name, email, password, address, role)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user.name,
            user.email,
            user.password,
            user.address,
            user.role
        ],
        callback
    );
};

// Find user by ID
const findUserById = (id, callback) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [id], callback);
};

module.exports = {
    findUserByEmail,
    createUser,
    findUserById
};