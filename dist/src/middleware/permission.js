"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
const error_utils_1 = __importDefault(require("../utils/error.utils"));
const requireUser = (req, res, next) => {
    if (res.locals.user) {
        return next();
    }
    return next(new error_utils_1.default("UnAuthorize", 400));
};
exports.requireUser = requireUser;
