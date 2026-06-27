const {
    getStoreDashboard,
    getUsersWhoRated
} = require("../models/storeOwnerModel");

exports.dashboard = async (req, res) => {

    try {

        const dashboard = await getStoreDashboard(req.user.id);
        const users = await getUsersWhoRated(req.user.id);

        res.status(200).json({
            success: true,
            store: dashboard[0],
            ratings: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};