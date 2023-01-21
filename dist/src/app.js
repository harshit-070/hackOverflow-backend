"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_utils_1 = require("./utils/server.utils");
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./database/database");
require("./utils/redis.utils");
const app = (0, server_utils_1.createServer)();
const port = config_1.default.get("PORT");
app.listen(port, () => {
    logger_1.default.info(`Listening on localhost ${port}...`);
    (0, database_1.connect)();
    (0, routes_1.default)(app);
});
