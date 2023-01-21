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
exports.addAccessToken = exports.createAccessToken = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const config_1 = __importDefault(require("config"));
const createAccessToken = (value) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, jwt_utils_1.sign)(value, { expiresIn: "1d" });
});
exports.createAccessToken = createAccessToken;
const addAccessToken = (token, res) => {
    const COKKIE_EXPIRE = parseInt(config_1.default.get("Cookie.ACCESS_TOKEN_TTL")) * 24 * 60 * 60 * 1000;
    const options = {
        expires: new Date(Date.now() + COKKIE_EXPIRE),
        httpOnly: true,
        sameSite: true,
    };
    res.cookie("accessToken", token, options);
};
exports.addAccessToken = addAccessToken;
