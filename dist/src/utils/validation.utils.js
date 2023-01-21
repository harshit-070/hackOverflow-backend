"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStrongPassword = void 0;
const isStrongPassword = (password) => {
    return password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/);
};
exports.isStrongPassword = isStrongPassword;
