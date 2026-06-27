const db = require("../config/db");

const getStoreDashboard = async (ownerId) => {

    const [rows] = await db.query(
        `
        SELECT
            s.id,
            s.name,

            IFNULL(ROUND(AVG(r.rating),2),0) AS averageRating

        FROM stores s

        LEFT JOIN ratings r
        ON s.id = r.store_id

        WHERE s.owner_id = ?

        GROUP BY s.id, s.name
        `,
        [ownerId]
    );

    return rows;
};

const getUsersWhoRated = async (ownerId) => {

    const [rows] = await db.query(
        `
        SELECT
            u.name,
            u.email,
            r.rating

        FROM ratings r

        JOIN users u
        ON r.user_id = u.id

        JOIN stores s
        ON r.store_id = s.id

        WHERE s.owner_id = ?
        `,
        [ownerId]
    );

    return rows;
};

module.exports = {
    getStoreDashboard,
    getUsersWhoRated
};