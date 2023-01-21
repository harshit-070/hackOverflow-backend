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
exports.sendResumeEmail = exports.sendForgotPasswordEmail = exports.sendEmail = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = __importDefault(require("config"));
const SES = new aws_sdk_1.default.SES({
    accessKeyId: config_1.default.get("AWS.EMAIL_ACCESS_KEY"),
    secretAccessKey: config_1.default.get("AWS.EMAIL_SECRET_KEY"),
    region: config_1.default.get("AWS.EMAIL_REGION"),
});
const sendEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const emailSent = yield SES.sendEmail({
        Source: config_1.default.get("AWS.FROM_EMAIL"),
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: "OTP Verification",
            },
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `Welcome to Resume Rise. Here is your verification code: ${otp}. Please do not share it with any one`,
                },
            },
        },
    }).promise();
});
exports.sendEmail = sendEmail;
const sendForgotPasswordEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const emailSent = yield SES.sendEmail({
        Source: config_1.default.get("AWS.FROM_EMAIL"),
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: "Forogt Password for OTP",
            },
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `Please use the following code to reset the password ${otp}. Please do not share it with any one`,
                },
            },
        },
    }).promise();
});
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
const sendResumeEmail = (email, path) => __awaiter(void 0, void 0, void 0, function* () {
    const emailSent = yield SES.sendEmail({
        Source: config_1.default.get("AWS.FROM_EMAIL"),
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: "OTP Verification",
            },
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `Welcome to Resume Rise. Here is your verification code: ${path}. Please do not share it with any one`,
                },
            },
        },
    }).promise();
});
exports.sendResumeEmail = sendResumeEmail;
