"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateRegistrationBody = () => {
    return [
        (0, express_validator_1.check)("userName")
            .trim()
            .exists()
            .withMessage("userName field is required")
            .isLength({ min: 3 })
            .withMessage("name must be greater than 3 letters"),
        (0, express_validator_1.check)("email")
            .exists()
            .withMessage("email field is required")
            .isEmail()
            .withMessage("Email is invalid"),
        (0, express_validator_1.check)("password")
            .exists()
            .withMessage("password field is required")
            .isLength({ min: 8, max: 12 })
            .withMessage("password must be in between 8 to 12 characters long"),
    ];
};
const validateLoginBody = () => {
    return [
        (0, express_validator_1.check)("email")
            .trim()
            .exists()
            .withMessage("email field is required")
            .isEmail()
            .withMessage("Email is invalid"),
        (0, express_validator_1.check)("password")
            .exists()
            .withMessage("password field is required")
            .isLength({ min: 8, max: 12 })
            .withMessage("password must be in between 8 to 12 characters long"),
    ];
};
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
    });
};
module.exports = {
    validateRegistrationBody,
    validateLoginBody,
    validate,
};
//# sourceMappingURL=validation.js.map