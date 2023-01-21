"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ResumeSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    name: { type: String },
    headline: { type: String },
    summary: { type: String },
    photo: { type: String },
    video_resume: { type: String },
    address: {
        city: { type: String },
        country: { type: String },
    },
    contact: {
        email: { type: String },
        number: { type: String },
    },
    socialMedia: {
        linkedin: { type: String },
        github: { type: String },
        instagram: { type: String },
        facebook: { type: String },
        other: { type: String },
    },
    otherSocialMedia: [{ type: String }],
    skills: [{ type: String }],
    experience: [
        {
            title: { type: String },
            name: { type: String },
            location: { type: String },
            category: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            start_month: { type: Number },
            end_month: { type: Number },
            start_year: { type: Number },
            end_year: { type: Number },
            is_present: { type: Boolean },
            description: { type: String },
        },
    ],
    education: [
        {
            specialization: { type: String },
            name: { type: String },
            percentage: { type: String },
            location: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            start_month: { type: Number },
            end_month: { type: Number },
            start_year: { type: Number },
            end_year: { type: Number },
            description: { type: String },
            category: { type: String },
            otherCategory: { type: String },
        },
    ],
    projects: [
        {
            title: { type: String },
            role: { type: String },
            company: { type: String },
            location: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            start_month: { type: Number },
            end_month: { type: Number },
            start_year: { type: Number },
            end_year: { type: Number },
            description: { type: String },
            link: { type: String },
        },
    ],
    languages: [{ type: String }],
    hobbies: [{ type: String }],
    achievements: { type: String },
    certification: { type: String },
});
const ResumeModel = (0, mongoose_1.model)("Resume", ResumeSchema);
exports.default = ResumeModel;
