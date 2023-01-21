"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    is_valid: { type: Boolean, default: true },
    userAgent: { type: String },
});
const SessionModel = (0, mongoose_1.model)("Session", SessionSchema);
exports.default = SessionModel;
