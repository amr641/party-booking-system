"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.loginValidator = exports.SignupValidator = void 0;
const express_validator_1 = require("express-validator");
const SignupValidator = [
    (0, express_validator_1.body)("name").exists({ checkFalsy: true }).isLength({ min: 3 }),
    (0, express_validator_1.body)("email").exists({ checkFalsy: true }).isEmail(),
    (0, express_validator_1.body)("password")
        .exists({ checkFalsy: true })
        .withMessage("password is required")
        .isLength({ min: 5 })
        .withMessage("password length must be atleast 5"),
    (0, express_validator_1.body)("role").isLength({ max: 5 }),
];
exports.SignupValidator = SignupValidator;
const loginValidator = [
    (0, express_validator_1.body)("email")
        .exists({ checkFalsy: true })
        .withMessage("email is required")
        .isEmail()
        .withMessage("this field must be in in an email form"),
    (0, express_validator_1.body)("password")
        .exists({ checkFalsy: true })
        .withMessage("password is required"),
];
exports.loginValidator = loginValidator;
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }
    next();
};
exports.validateRequest = validateRequest;
