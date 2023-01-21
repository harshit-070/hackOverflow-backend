"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResumeSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const resume_id = (0, zod_1.string)({ required_error: "Resume Id is Required" }).refine((data) => (0, mongoose_1.isValidObjectId)(data), "Invalid Resume Id");
exports.getResumeSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        resume_id,
    }),
});
