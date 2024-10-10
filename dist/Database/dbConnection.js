"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConn = () => {
    mongoose_1.default.connect("mongodb://localhost:27017/booking-party")
        .then(() => {
        console.log('DB connected');
    }).catch(() => {
        console.log('Err DB Connection');
    });
};
exports.dbConn = dbConn;
