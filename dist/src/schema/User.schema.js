"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.googleRedrectURLSchema = exports.loginUserSchema = exports.signupUserSchema = exports.sendOTPSchema = void 0;
const zod_1 = require("zod");
const validation_utils_1 = require("../utils/validation.utils");
exports.sendOTPSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        email: (0, zod_1.string)().email(),
    }),
});
exports.signupUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)().email(),
        password: (0, zod_1.string)(),
        confirmationPassword: (0, zod_1.string)(),
        name: (0, zod_1.string)(),
        otp: (0, zod_1.number)(),
        username: (0, zod_1.string)(),
    })
        .refine(({ password, confirmationPassword }) => confirmationPassword === password, "Password and confirm password do not match")
        .refine(({ password }) => (0, validation_utils_1.isStrongPassword)(password), "Password is weak"),
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)().email(),
        password: (0, zod_1.string)(),
    }),
});
exports.googleRedrectURLSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        code: (0, zod_1.string)(),
    }),
});
exports.updatePasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)().email(),
        password: (0, zod_1.string)(),
        confirmationPassword: (0, zod_1.string)(),
        otp: (0, zod_1.number)(),
    })
        .refine(({ password, confirmationPassword }) => confirmationPassword === password, "Password and confirm password do not match")
        .refine(({ password }) => (0, validation_utils_1.isStrongPassword)(password), "Password is weak"),
});
