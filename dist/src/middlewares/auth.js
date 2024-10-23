"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedTo = exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const catchErrors_1 = require("./catchErrors");
const appError_1 = require("../utils/appError");
// user signing up
const signUp = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_model_1.User.findOne({ email: req.body.email });
    if (user)
        return next(new appError_1.AppError("email already exist please login", 403));
    req.body.password = bcrypt_1.default.hashSync(req.body.password, 10);
    user = yield user_model_1.User.create(req.body);
    let token = jsonwebtoken_1.default.sign({
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }, "secret");
    return res.status(201).json({ message: "success", token });
}));
exports.signUp = signUp;
const login = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_model_1.User.findOne({ email: req.body.email });
    if (!user || !bcrypt_1.default.compare(req.body.password, user.password))
        return next(new appError_1.AppError("incorrect email or password", 403));
    // sign a token
    let token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name, email: user.email, role: user.role }, "secret");
    return res
        .status(201)
        .json({ message: `welcome back ${user.name}`, token });
}));
exports.login = login;
const allowedTo = function (...roles) {
    return (0, catchErrors_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (!roles.includes(req.user.role))
            return next(new appError_1.AppError('you are not authorized', 401));
        next();
    }));
};
exports.allowedTo = allowedTo;
