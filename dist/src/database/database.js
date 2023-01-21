"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../logger"));
function connect() {
    const dbURI = config_1.default.get("dbURI");
    mongoose_1.default
        .connect(dbURI)
        .then(() => {
        logger_1.default.info("Connected to database");
    })
        .catch((e) => {
        logger_1.default.error(`Error in Connecting to database : ${e} `);
    });
}
exports.connect = connect;
