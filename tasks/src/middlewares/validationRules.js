const { body } = require('express-validator');

const taskValidationRules = {
    createTask: [
        body('title')
            .isString()
            .withMessage('Title must be a string.')
            .isLength({ min: 3 })
            .withMessage('Title must be at least 3 characters long.'),
        body('description')
            .isString()
            .withMessage('Description must be a string.')
            .optional(),
        body('dueDate')
            .isISO8601()
            .toDate()
            .withMessage('Due date must be a valid date.'),
        body('status')
            .isString()
            .withMessage('Status must be a string.')
            .isIn(['pending', 'completed'])
            .withMessage('Status must be either "pending" or "completed".'),
    ],
    updateTask: [
        body('title')
            .optional()
            .isString()
            .withMessage('Title must be a string.')
            .isLength({ min: 3 })
            .withMessage('Title must be at least 3 characters long.'),
        body('description')
            .optional()
            .isString()
            .withMessage('Description must be a string.'),
        body('dueDate')
            .optional()
            .isISO8601()
            .toDate()
            .withMessage('Due date must be a valid date.'),
        body('status')
            .optional()
            .isString()
            .withMessage('Status must be a string.')
            .isIn(['pending', 'completed'])
            .withMessage('Status must be either "pending" or "completed".'),
    ]
};

module.exports = { taskValidationRules };