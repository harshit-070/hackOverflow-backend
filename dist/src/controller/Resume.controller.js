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
exports.sendEmail = exports.downloadPDF = exports.updateResumeHanlder = exports.getSkillsHandler = exports.getCertificationHandler = exports.getAchievementsHandler = exports.getLanguageHandler = exports.getHobbiesHandler = exports.getProjectsHandler = exports.getEducationHandler = exports.getExperienceHandler = exports.updateSkillsHandlers = exports.updateCertificationHandler = exports.updateAchievementsHandler = exports.updateLanguageHander = exports.updateHobbiesHandler = exports.updateProjectsHandler = exports.updateEducationHandler = exports.updateExperienceHandler = exports.updateContactInfoHandler = exports.getContactInfoHandler = exports.updatePersonalInfoHandler = exports.getPersonalInfoHandler = exports.getResumeHandler = exports.createResumeHandler = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const resume_model_1 = __importDefault(require("../models/resume.model"));
const Resume_service_1 = require("../services/Resume.service");
const User_service_1 = require("../services/User.service");
const error_utils_1 = __importDefault(require("../utils/error.utils"));
const html_pdf_node_1 = __importDefault(require("html-pdf-node"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.createResumeHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = (0, User_service_1.getLoggedInUserId)(res);
    console.log(userID);
    const resume = yield (0, Resume_service_1.createResume)({ name: "Name", user_id: userID });
    return res.json({
        message: "Resume Create",
        isSucess: true,
        data: resume,
    });
}));
exports.getResumeHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { resume_id } = req.params;
    const resume = yield resume_model_1.default.findById(resume_id);
    if (!resume) {
        next(new error_utils_1.default("Invalid Resume ID", 400));
    }
    return res.json({
        data: resume,
        isSucess: true,
    });
}));
exports.getPersonalInfoHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id } = req.params;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    const resume = yield resume_model_1.default.findOne({ user_id, _id: resume_id })
        .select("name headline summary")
        .lean(true);
    console.log(resume);
    return res.json({
        data: resume,
        isSuccess: true,
    });
}));
exports.updatePersonalInfoHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id, name, summary, headline } = req.body;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    yield resume_model_1.default.findOneAndUpdate({ user_id, _id: resume_id }, { name, summary, headline });
    return res.json({ message: "Resume Updated" });
}));
exports.getContactInfoHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id } = req.params;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    const resume = yield resume_model_1.default.findOne({ user_id, _id: resume_id })
        .select("address contact socialMedia")
        .lean(true);
    console.log(resume);
    return res.json({
        data: resume,
        isSuccess: true,
    });
}));
exports.updateContactInfoHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id, address, contact, socialMedia } = req.body;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    yield resume_model_1.default.findOneAndUpdate({ user_id, _id: resume_id }, { address, contact, socialMedia });
    return res.json({ message: "Resume Updated" });
}));
exports.updateExperienceHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id, experience } = req.body;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    yield resume_model_1.default.findOneAndUpdate({ user_id, _id: resume_id }, { experience });
    return res.json({ message: "Resume Updated" });
}));
exports.updateEducationHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id, education } = req.body;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    yield resume_model_1.default.findOneAndUpdate({ user_id, _id: resume_id }, { education });
    return res.json({ message: "Resume Updated" });
}));
exports.updateProjectsHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id, projects } = req.body;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    yield resume_model_1.default.findOneAndUpdate({ user_id, _id: resume_id }, { projects });
    return res.json({ message: "Resume Updated" });
}));
exports.updateHobbiesHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id, hobbies } = req.body;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    yield resume_model_1.default.findOneAndUpdate({ user_id, _id: resume_id }, { hobbies });
    return res.json({ message: "Resume Updated" });
}));
exports.updateLanguageHander = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id, languages } = req.body;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    yield resume_model_1.default.findOneAndUpdate({ user_id, _id: resume_id }, { languages });
    return res.json({ message: "Resume Updated" });
}));
exports.updateAchievementsHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id, achievements } = req.body;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    yield resume_model_1.default.findOneAndUpdate({ user_id, _id: resume_id }, { achievements });
    return res.json({ message: "Resume Updated" });
}));
exports.updateCertificationHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id, certification } = req.body;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    yield resume_model_1.default.findOneAndUpdate({ user_id, _id: resume_id }, { certification });
    return res.json({ message: "Resume Updated" });
}));
exports.updateSkillsHandlers = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const { resume_id, skills } = req.body;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    yield resume_model_1.default.findOneAndUpdate({ user_id, _id: resume_id }, { skills });
    return res.json({ message: "Resume Updated" });
}));
exports.getExperienceHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const resume_id = req.params.resume_id;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    const resume = yield resume_model_1.default.findOne({
        user_id,
        _id: resume_id,
    })
        .select("experience")
        .lean(true);
    return res.json({
        data: resume,
        isSuccess: true,
    });
}));
exports.getEducationHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const resume_id = req.params.resume_id;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    const resume = yield resume_model_1.default.findOne({
        user_id,
        _id: resume_id,
    })
        .select("education")
        .lean(true);
    return res.json({
        data: resume,
        isSuccess: true,
    });
}));
exports.getProjectsHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const resume_id = req.params.resume_id;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    const resume = yield resume_model_1.default.findOne({
        user_id,
        _id: resume_id,
    })
        .select("projects")
        .lean(true);
    return res.json({
        data: resume,
        isSuccess: true,
    });
}));
exports.getHobbiesHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const resume_id = req.body.resume_id;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    const resume = yield resume_model_1.default.findOne({
        user_id,
        _id: resume_id,
    })
        .select("hobbies")
        .lean(true);
    return res.json({
        data: resume,
        isSuccess: true,
    });
}));
exports.getLanguageHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const resume_id = req.body.resume_id;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    const resume = yield resume_model_1.default.findOne({
        user_id,
        _id: resume_id,
    })
        .select("languages")
        .lean(true);
    return res.json({
        data: resume,
        isSuccess: true,
    });
}));
exports.getAchievementsHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const resume_id = req.params.resume_id;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    const resume = yield resume_model_1.default.findOne({
        user_id,
        _id: resume_id,
    })
        .select("achievements")
        .lean(true);
    return res.json({
        data: resume,
        isSuccess: true,
    });
}));
exports.getCertificationHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const resume_id = req.body.resume_id;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    const resume = yield resume_model_1.default.findOne({
        user_id,
        _id: resume_id,
    })
        .select("certification")
        .lean(true);
    return res.json({
        data: resume,
        isSuccess: true,
    });
}));
exports.getSkillsHandler = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = (0, User_service_1.getLoggedInUserId)(res);
    const resume_id = req.params.resume_id;
    yield (0, User_service_1.canUpdateResume)(user_id, resume_id);
    const resume = yield resume_model_1.default.findOne({
        user_id,
        _id: resume_id,
    })
        .select("skills")
        .lean(true);
    return res.json({
        data: resume,
        isSuccess: true,
    });
}));
exports.updateResumeHanlder = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = (0, User_service_1.getLoggedInUserId)(res);
    const resume = yield (0, Resume_service_1.createResume)("Name");
    return res.json({
        message: "Resume Create",
        isSucess: true,
        data: resume,
    });
}));
exports.downloadPDF = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { resume_id, template } = req.params;
    const url = `http://localhost:3000/view/resume/${resume_id}/${template}`;
    const options = {
        format: "A4",
        path: path_1.default.join(__dirname, "../files", `${resume_id}_${template}.pdf`),
    };
    const file = { url };
    try {
        fs_1.default.exists(options.path, function (exists) {
            return __awaiter(this, void 0, void 0, function* () {
                if (exists) {
                    console.log("File exists. Deleting now ...");
                    fs_1.default.unlinkSync(options.path);
                    yield html_pdf_node_1.default.generatePdf(file, options);
                }
                else {
                    yield html_pdf_node_1.default.generatePdf(file, options);
                    console.log("File not found, so not deleting.");
                }
            });
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error ",
        });
    }
    return res.json({
        message: " Download Resume",
        isSucess: true,
        data: options.path,
    });
}));
exports.sendEmail = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { resume_id, template } = req.params;
    const resume = yield resume_model_1.default.findOne({ _id: resume_id })
        .lean(true)
        .select("user_id");
    if (!resume) {
        next(new error_utils_1.default("Invalid Resume Id", 400));
    }
    const user = resume_model_1.default.findOne({ _id: resume === null || resume === void 0 ? void 0 : resume.user_id })
        .select("email")
        .lean(true);
    const url = `http://localhost:3000/view/resume/${resume_id}/${template}`;
    const options = {
        format: "A4",
        path: path_1.default.join(__dirname, "../files", `${resume_id}_${template}.pdf`),
    };
    const file = { url };
    try {
        fs_1.default.exists(options.path, function (exists) {
            return __awaiter(this, void 0, void 0, function* () {
                if (exists) {
                    console.log("File exists. Deleting now ...");
                    fs_1.default.unlinkSync(options.path);
                    yield html_pdf_node_1.default.generatePdf(file, options);
                }
                else {
                    yield html_pdf_node_1.default.generatePdf(file, options);
                    console.log("File not found, so not deleting.");
                }
            });
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Error ",
        });
    }
    return res.json({
        message: " Download Resume",
        isSucess: true,
        data: options.path,
    });
}));
