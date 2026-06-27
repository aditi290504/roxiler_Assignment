const { body } = require("express-validator");

exports.registerValidation = [

    body("name")
        .isLength({ min: 20, max: 60 })
        .withMessage("Name must be between 20 and 60 characters"),

    body("email")
        .isEmail()
        .withMessage("Invalid Email"),

    body("address")
        .isLength({ max: 400 })
        .withMessage("Address cannot exceed 400 characters"),

    body("password")
        .isLength({ min: 8, max: 16 })
        .matches(/[A-Z]/)
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage(
            "Password must contain 8-16 characters, one uppercase letter and one special character."
        )
];