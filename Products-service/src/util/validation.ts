import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateProductBody = () => {
  return [
    check("code").trim().exists().withMessage("Code field is required"),
    check("name").exists().withMessage("Name field is required"),
    check("description")
      .exists()
      .withMessage("Description field is required")
      .isLength({ min: 10, max: 50 })
      .withMessage("Description must be in between 10 to 50 characters long"),
    check("price").exists().withMessage("Price field is required"),
    check("quantity").exists().withMessage("Quantity field is required"),
  ];
};
const validateOrderBody = () => {
  return [
    [
      check("user", "User field is required").notEmpty(),
      check("products", "Prosduct field is required").notEmpty(),
      check("totalPrice", "Please enter a Totalprice").notEmpty().isNumeric(),
      check("quantity", "Quantity field is required").notEmpty().isNumeric(),
    ],
  ];
};

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any = [];
  errors
    .array()
    .map((err: any) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validateProductBody,
  validateOrderBody,
  validate,
};
