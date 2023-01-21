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
exports.forgotPasswordHandler = exports.forgotPasswordOTPHandler = exports.githubUserLoginHandler = exports.githubRedirectURLHandler = exports.googleUserLoginHandler = exports.googleRedirectURLHandler = exports.loginUserHandler = exports.signupUserHandler = exports.sendOTPHandler = void 0;
const lodash_1 = require("lodash");
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const User_service_1 = require("../services/User.service");
const error_utils_1 = __importDefault(require("../utils/error.utils"));
const redis_utils_1 = require("../utils/redis.utils");
const tokens_utils_1 = require("../utils/tokens.utils");
const googleapis_1 = require("googleapis");
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const Email_service_1 = require("../services/Email.service");
const user_model_1 = __importDefault(require("../models/user.model"));
const OTP_TIME_LIMIT_IN_MS = 15 * 60 * 1000; // 15 minutes
const oAuth2Client = new googleapis_1.google.auth.OAuth2(config_1.default.get("GOOGLE.CLIENT_ID"), config_1.default.get("GOOGLE.CLIENT_SECRET"), process.env.GOOGLE_REDIRECT || "http://localhost:3000/google/auth");
exports.sendOTPHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { email } = req.query;
    email = email.toLowerCase();
    if (yield (0, User_service_1.isUserExist)({ email: email })) {
        return next(new error_utils_1.default("User Already Exist", 400));
    }
    let otp;
    otp = yield (0, redis_utils_1.getRedisKey)((0, User_service_1.userSignupRedisKey)(email));
    if (!otp) {
        otp = (0, User_service_1.generateOTP)();
        yield (0, redis_utils_1.setRedisKey)((0, User_service_1.userSignupRedisKey)(email), otp, OTP_TIME_LIMIT_IN_MS);
    }
    console.log(otp);
    // TODO: Send Email after otp Generation
    yield (0, Email_service_1.sendEmail)(email, otp);
    return res
        .status(200)
        .json({ message: "OTP sent to email", isSuccess: true });
}));
exports.signupUserHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    let { email, username } = req.body;
    email = email.toLowerCase();
    let isUserExist = yield (0, User_service_1.findUserByUsername)(username);
    if (isUserExist) {
        return next(new error_utils_1.default("Username Already Exist", 400));
    }
    isUserExist = yield (0, User_service_1.findUserByEmail)(email);
    if (isUserExist) {
        return next(new error_utils_1.default("Email Already Exist", 400));
    }
    yield (0, User_service_1.validateOTP)(email, otp);
    const user = yield (0, User_service_1.createUser)((0, lodash_1.omit)(req.body, ["otp", "confirmationPassword"]));
    return res.status(201).json({
        data: user,
        isSucess: true,
        message: "User Created",
    });
}));
exports.loginUserHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    email = email.toLowerCase();
    const user = yield (0, User_service_1.findUserByEmail)(email);
    if (!user) {
        return next(new error_utils_1.default("Invalid Email or Password", 400));
    }
    if (!(yield user.comparePassword(password))) {
        return next(new error_utils_1.default("Invalid Email or Password", 400));
    }
    const userSession = yield (0, User_service_1.createUserSession)(user["_id"], req.get("user-agent") || "");
    const accessToken = yield (0, tokens_utils_1.createAccessToken)(Object.assign(Object.assign({}, user.toJSON()), { session_id: userSession._id }));
    (0, tokens_utils_1.addAccessToken)(accessToken, res);
    return res.status(200).json({
        isSuccess: true,
        messsage: "LOGGED_IN",
        data: {
            user: user.toJSON(),
        },
    });
}));
exports.googleRedirectURLHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ];
    const redirectURL = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: scopes,
    });
    return res.json({
        isSuccess: true,
        message: "GOOGLE_AUTH_KEY",
        data: {
            redirectURL,
        },
    });
}));
exports.googleUserLoginHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    console.log(code);
    const data = yield getGoogleUser(code);
    const { email, name } = data;
    let user = yield (0, User_service_1.findUserByEmail)(email);
    if (user && user.type === "email") {
        return next(new error_utils_1.default("User Already Exist", 400));
    }
    if (user && user.type !== "google") {
        return next(new error_utils_1.default(`User have account with ${user.type}`, 400));
    }
    if (!user) {
        user = yield (0, User_service_1.createUser)({
            email,
            username: new mongoose_1.default.Types.ObjectId().toString(),
            type: "google",
            name,
        });
    }
    const userSession = yield (0, User_service_1.createUserSession)(user["_id"], req.get("user-agent") || "");
    const accessToken = yield (0, tokens_utils_1.createAccessToken)(Object.assign(Object.assign({}, user.toJSON()), { session_id: userSession._id }));
    (0, tokens_utils_1.addAccessToken)(accessToken, res);
    return res.status(200).json({
        isSuccess: true,
        messsage: "LOGGED_IN",
        data: {
            user: user.toJSON(),
        },
    });
}));
function getGoogleUser(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tokens } = yield oAuth2Client.getToken(code);
        // console.log(tokens);
        const googleUser = yield axios_1.default
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokens.id_token}`,
            },
        })
            .then((res) => res.data)
            .catch((error) => {
            throw new error_utils_1.default("Invalid Token", 400);
        });
        return googleUser;
    });
}
exports.githubRedirectURLHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.get(`https://github.com/login/oauth/authorize?client_id=${config_1.default.get("GITHUB.CLIENT_ID")}&redirect_url=${config_1.default.get("GITHUB.REDIRECT")}&scope=read:user,user:email`);
        return res.status(200).json({
            isSuccess: true,
            message: "GOOGLE_AUTH_KEY",
            data: {
                redirectURL: data.request.res.responseUrl,
            },
        });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({
            message: "Some Error Occurred While Login/Signup",
            code: "FAILED_LOG_IN",
            userLoggedIn: false,
        });
    }
}));
exports.githubUserLoginHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.query;
        const accessTokenResponse = yield axios_1.default.post(`https://github.com/login/oauth/access_token?client_id=${config_1.default.get("GITHUB.CLIENT_ID")}&client_secret=${config_1.default.get("GITHUB.CLIENT_SECRET")}&redirect_url=${config_1.default.get("GITHUB.REDIRECT")}&code=${code}`, {
            headers: {
                Accept: "application/json",
            },
        });
        let accessToken = accessTokenResponse.data;
        accessToken = accessToken.split("=")[1].split("&")[0];
        const userData = yield axios_1.default.get("https://api.github.com/user", {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });
        const userDataEmail = yield axios_1.default.get("https://api.github.com/user/emails", {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });
        let user = yield (0, User_service_1.findUserByEmail)(userDataEmail.data[0].email);
        if (user && user.type === "email") {
            return next(new error_utils_1.default("User Already Exist", 400));
        }
        if (user && user.type !== "github") {
            return next(new error_utils_1.default(`User have account with ${user.type}`, 400));
        }
        if (!user) {
            user = yield (0, User_service_1.createUser)({
                email: userDataEmail.data[0].email,
                username: new mongoose_1.default.Types.ObjectId().toString(),
                type: "github",
                name: userData.data.name,
            });
        }
        const userSession = yield (0, User_service_1.createUserSession)(user["_id"], req.get("user-agent") || "");
        accessToken = yield (0, tokens_utils_1.createAccessToken)(Object.assign(Object.assign({}, user.toJSON()), { session_id: userSession._id }));
        (0, tokens_utils_1.addAccessToken)(accessToken, res);
        return res.status(200).json({
            isSuccess: true,
            messsage: "LOGGED_IN",
            data: {
                user: user.toJSON(),
            },
        });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({
            message: "Some Error Occurred While Login/Signup",
            code: "FAILED_LOG_IN",
            userLoggedIn: false,
        });
    }
}));
exports.forgotPasswordOTPHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    const user = yield (0, User_service_1.findUserByEmail)(email);
    if (!user || user.type !== "email") {
        return next(new error_utils_1.default("Email not registered", 400));
    }
    let otp;
    otp = yield (0, redis_utils_1.getRedisKey)((0, User_service_1.userSignupRedisKey)(email));
    if (!otp) {
        otp = (0, User_service_1.generateOTP)();
        yield (0, redis_utils_1.setRedisKey)((0, User_service_1.userSignupRedisKey)(email), otp, OTP_TIME_LIMIT_IN_MS);
    }
    console.log(otp);
    // TODO: Send Email after otp Generation
    yield (0, Email_service_1.sendForgotPasswordEmail)(email, otp);
    return res
        .status(200)
        .json({ message: "OTP sent to email", isSuccess: true });
}));
exports.forgotPasswordHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, otp, password } = req.body;
    email = email.toLowerCase();
    const isUserExist = yield (0, User_service_1.findUserByEmail)(email);
    if (!isUserExist || isUserExist.type === "eamil") {
        return next(new error_utils_1.default("Invalid OTP", 400));
    }
    yield (0, User_service_1.validateOTP)(email, otp);
    const user = yield user_model_1.default.findOneAndUpdate({ email }, { password });
    return res.status(201).json({
        data: user,
        isSucess: true,
        message: "Password Reset",
    });
}));
