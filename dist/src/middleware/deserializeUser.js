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
const jwt_utils_1 = require("../utils/jwt.utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return next();
    }
    const { decoded } = (0, jwt_utils_1.decode)(accessToken);
    if (decoded) {
        const { _id } = decoded;
        const user = yield user_model_1.default.findOne({ _id });
        if (user) {
            res.locals.user = user;
        }
        return next();
    }
    return next();
});
exports.default = deserializeUser;
