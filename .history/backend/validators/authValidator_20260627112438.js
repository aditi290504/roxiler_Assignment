const { body } = require("express-validator");

exports.registerValidation = [

    body("name")
        .trim()
        .isLength({ min: 20, max: 60 })
        .withMessage("Name must be between 20 and 60 characters."),

    body("email")
        .isEmail()
        .withMessage("Enter a valid email."),

    body("address")
        .isLength({ max: 400 })
        .withMessage("Address cannot exceed 400 characters."),

    body("password")
        .isLength({ min: 8, max: 16 })
        .withMessage("Password must be 8 to 16 characters.")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter.")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password must contain at least one special character.")
];

exports.loginValidation = [

    body("email")
        .isEmail()
        .withMessage("Invalid Email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];