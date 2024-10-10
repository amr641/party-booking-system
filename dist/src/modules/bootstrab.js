"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrab = void 0;
const globalHandeling_1 = require("../middlewares/globalHandeling");
const user_routes_1 = require("./user/user.routes");
const bootstrab = function (app) {
    app.use(user_routes_1.userRouter);
    app.use(globalHandeling_1.globalHandeling);
};
exports.bootstrab = bootstrab;
