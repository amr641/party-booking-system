"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("../Database/dbConnection");
const bootstrab_1 = require("./modules/bootstrab");
require("dotenv/config");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
(0, dbConnection_1.dbConn)();
(0, bootstrab_1.bootstrab)(app);
app.listen(port, () => console.log(` app listening on port ${port}!`));
