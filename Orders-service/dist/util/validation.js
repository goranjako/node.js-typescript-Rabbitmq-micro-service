"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
//validateProduct
const validateProductBody = () => {
    return [
        (0, express_validator_1.check)("code").trim().exists().withMessage("Code field is required"),
        (0, express_validator_1.check)("name").exists().withMessage("Name field is required"),
        (0, express_validator_1.check)("description")
            .exists()
            .withMessage("Description field is required")
            .isLength({ min: 10, max: 50 })
            .withMessage("Description must be in between 10 to 50 characters long"),
        (0, express_validator_1.check)("price").exists().withMessage("Price field is required"),
        (0, express_validator_1.check)("quantity").exists().withMessage("Quantity field is required"),
    ];
};
//validateOrder
const validateOrderBody = () => {
    return [
        [
            (0, express_validator_1.check)("user", "User field is required").notEmpty(),
            (0, express_validator_1.check)("products", "Prosduct field is required").notEmpty(),
            (0, express_validator_1.check)("totalPrice", "Please enter a Totalprice").notEmpty().isNumeric(),
            (0, express_validator_1.check)("quantity", "Quantity field is required").notEmpty().isNumeric(),
        ],
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
    validateProductBody,
    validateOrderBody,
    validate,
};
//# sourceMappingURL=validation.js.map