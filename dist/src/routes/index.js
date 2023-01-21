"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../middleware/error"));
const User_routes_1 = __importDefault(require("./User.routes"));
const Resume_routes_1 = __importDefault(require("./Resume.routes"));
function routes(app) {
    app.use("/api/v1/user", User_routes_1.default);
    app.use("/api/v1/resume", Resume_routes_1.default);
    app.use(error_1.default);
}
exports.default = routes;
