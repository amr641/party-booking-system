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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = void 0;
const catchErrors_1 = require("../../middlewares/catchErrors");
const user_model_1 = require("./user.model");
const appError_1 = require("../../utils/appError");
const Roles_1 = require("./Roles");
// get all users whose the roles is user and owner
const getAllUsers = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield user_model_1.User.find({
        $or: [{ role: Roles_1.Roles.OWNER }, { role: Roles_1.Roles.USER }],
    });
    res.status(200).json({ message: "success", users });
}));
exports.getAllUsers = getAllUsers;
const getUser = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_model_1.User.findById(req.params.id);
    user || next(new appError_1.AppError("user not found", 404));
    !user || res.status(200).json({ message: "success", user });
}));
exports.getUser = getUser;
const updateUser = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_model_1.User.findById(req.params.id);
    if ((user === null || user === void 0 ? void 0 : user.role) == Roles_1.Roles.ADMIN)
        return next(new appError_1.AppError("not allowed", 405));
    yield user_model_1.User.updateOne({ _id: user === null || user === void 0 ? void 0 : user._id }, req.body);
    user.password = undefined;
    res.status(200).json({ message: "success", user });
}));
exports.updateUser = updateUser;
const deleteUser = (0, catchErrors_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield user_model_1.User.findById(req.params.id);
    if ((user === null || user === void 0 ? void 0 : user.role) == Roles_1.Roles.ADMIN)
        return next(new appError_1.AppError("not allowed", 405));
    yield user_model_1.User.deleteOne({ _id: user === null || user === void 0 ? void 0 : user._id });
    res.status(200).json({ message: "success", user });
}));
exports.deleteUser = deleteUser;
