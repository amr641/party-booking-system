import express from "express";
import { body, param, validationResult } from "express-validator";
import { AppError } from "../../utils/appError";
const SignupValidator = [
  body("name").exists({ checkFalsy: true }).isLength({ min: 3 }),
  body("email").exists({ checkFalsy: true }).isEmail(),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("password length must be atleast 5"),
  body("role").isLength({ max: 5 }),
];
const loginValidator = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email is required")
    .isEmail()
    .withMessage("this field must be in in an email form"),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("password is required"),
];
const updateUserValidator = param("id")
  .exists({ checkFalsy: true })
  .withMessage("id is required")
  .isHexadecimal()
  .withMessage(" id must be in hex format");
const deleteUserValidator = param("id")
  .exists({ checkFalsy: true })
  .withMessage("id is required")
  .isHexadecimal()
  .withMessage(" id must be in hex format");

const validateRequest: any = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }
  next();
};
export { SignupValidator, loginValidator, validateRequest,updateUserValidator,deleteUserValidator };
