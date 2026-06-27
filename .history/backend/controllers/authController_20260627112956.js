const db = require("../config/db");

const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
);
