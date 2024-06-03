const { body } = require('express-validator');

const userValidationRules = {
    register: [
        body('username')
            .isString()
            .withMessage('Username must be a string.')
            .isLength({ min: 3 })
            .withMessage('Username must be at least 3 characters long.'),
        body('email')
            .isEmail()
            .withMessage('Email must be valid.'),
        body('password')
            .isStrongPassword({
                minLength: 8,
                maxLength: 16,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
            .withMessage('Password must be between 8-16 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character.')
    ],
    login: [
        body('username')
            .notEmpty()
            .withMessage('Username is required.'),
        body('password')
            .notEmpty()
            .withMessage('Password is required.')
    ]
};


module.exports = { userValidationRules };