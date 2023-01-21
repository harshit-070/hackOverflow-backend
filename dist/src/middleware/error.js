"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_utils_1 = __importDefault(require("../utils/error.utils"));
exports.default = (err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    // mongodb id error
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new error_utils_1.default(message, 400);
    }
    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} already exists`;
        err = new error_utils_1.default(message, 400);
    }
    // wrong jwt error
    if (err.code === "JsonWebTokenError") {
        const message = "JWT Error";
        err = new error_utils_1.default(message, 400);
    }
    // jwt expire error
    if (err.code === "JsonWebTokenError") {
        const message = "JWT is Expired";
        err = new error_utils_1.default(message, 400);
    }
    if (err.name === "SequelizeUniqueConstraintError") {
        err = new error_utils_1.default(err.errors[0].message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
