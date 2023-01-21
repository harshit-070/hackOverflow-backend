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
exports.canUpdateResume = exports.findUserByUsername = exports.getLoggedInUserId = exports.getLoggedInUserRole = exports.createUserSession = exports.findUserByEmail = exports.createUser = exports.validateOTP = exports.userSignupRedisKey = exports.generateOTP = exports.isUserExist = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const redis_utils_1 = require("../utils/redis.utils");
const error_utils_1 = __importDefault(require("../utils/error.utils"));
const session_model_1 = __importDefault(require("../models/session.model"));
const resume_model_1 = __importDefault(require("../models/resume.model"));
const isUserExist = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne(input).lean().select("_id");
    if (!user) {
        return false;
    }
    return true;
});
exports.isUserExist = isUserExist;
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
exports.generateOTP = generateOTP;
const userSignupRedisKey = (email) => {
    return `signup_${email}`;
};
exports.userSignupRedisKey = userSignupRedisKey;
const validateOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const saved_otp = yield (0, redis_utils_1.getRedisKey)((0, exports.userSignupRedisKey)(email));
    if (!saved_otp) {
        throw new error_utils_1.default("OTP Expired", 400);
    }
    if (otp !== Number(saved_otp)) {
        throw new error_utils_1.default("Invalid OTP", 400);
    }
    yield (0, redis_utils_1.deleteRedisKey)((0, exports.userSignupRedisKey)(email));
    return true;
});
exports.validateOTP = validateOTP;
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.create(input);
});
exports.createUser = createUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ email });
});
exports.findUserByEmail = findUserByEmail;
const createUserSession = (user_id, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    return yield session_model_1.default.create({ user_id, userAgent });
});
exports.createUserSession = createUserSession;
const getLoggedInUserRole = (res) => {
    return res.locals.user.role;
};
exports.getLoggedInUserRole = getLoggedInUserRole;
const getLoggedInUserId = (res) => {
    return res.locals.user._id;
};
exports.getLoggedInUserId = getLoggedInUserId;
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ username });
});
exports.findUserByUsername = findUserByUsername;
const canUpdateResume = (user_id, resume_id) => __awaiter(void 0, void 0, void 0, function* () {
    const resume = yield resume_model_1.default.findOne({ user_id, _id: resume_id })
        .select("_id")
        .lean();
    if (!resume) {
        throw new error_utils_1.default("You can not update this resume", 400);
    }
    return true;
});
exports.canUpdateResume = canUpdateResume;
