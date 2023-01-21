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
exports.deleteRedisKey = exports.getRedisKey = exports.setRedisKey = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("../logger"));
const redisClient = new ioredis_1.default(config_1.default.get("redisURL"));
redisClient.once("connect", (err) => {
    logger_1.default.info("Connected to redis");
});
const setRedisKey = (key, value, timeLimit) => __awaiter(void 0, void 0, void 0, function* () {
    if (!timeLimit) {
        return yield redisClient.set(key, value);
    }
    else {
        return yield redisClient.set(key, value, "EX", timeLimit);
    }
});
exports.setRedisKey = setRedisKey;
const getRedisKey = (key) => __awaiter(void 0, void 0, void 0, function* () {
    return yield redisClient.get(key);
});
exports.getRedisKey = getRedisKey;
const deleteRedisKey = (key) => __awaiter(void 0, void 0, void 0, function* () {
    return yield redisClient.del(key);
});
exports.deleteRedisKey = deleteRedisKey;
