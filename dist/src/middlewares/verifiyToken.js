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
exports.verfifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../utils/appError");
const user_model_1 = require("../modules/user/user.model");
const verfifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.token;
    jsonwebtoken_1.default.verify(token, "secret", (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return next(new appError_1.AppError("inavlid token", 401));
        let user = yield user_model_1.User.findById(decoded.userId);
        // console.log(user);
        if (!user)
            return next(new appError_1.AppError("user not found", 404));
        req.user = decoded;
        next();
    }));
};
exports.verfifyToken = verfifyToken;
