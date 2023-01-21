"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkId = exports.compareMongooseIds = void 0;
const mongoose_1 = require("mongoose");
const error_utils_1 = __importDefault(require("./error.utils"));
const compareMongooseIds = (id1, id2) => {
    if (!id1 || !id2) {
        return false;
    }
    if (!(typeof id1 === "string")) {
        id1 = id1.toString();
    }
    if (!(typeof id2 === "string")) {
        id2 = id2.toString();
    }
    return id1 === id2;
};
exports.compareMongooseIds = compareMongooseIds;
const checkId = (id, label) => {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new error_utils_1.default(`Invalid ${label} id`, 400);
    }
    return true;
};
exports.checkId = checkId;
