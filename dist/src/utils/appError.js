"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    status;
    constructor(messsage, status) {
        super(messsage);
        this.status = status;
        this.status = status;
    }
}
exports.AppError = AppError;
