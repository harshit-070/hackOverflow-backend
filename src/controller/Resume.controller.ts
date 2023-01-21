import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import ResumeModel from "../models/resume.model";
import { createResume } from "../services/Resume.service";
import { canUpdateResume, getLoggedInUserId } from "../services/User.service";
import ErrorHandler from "../utils/error.utils";
import html_to_pdf from "html-pdf-node";
import path from "path";
import fs from "fs";

export const createResumeHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userID = getLoggedInUserId(res);
    console.log(userID);
    const resume = await createResume({ name: "Name", user_id: userID });

    return res.json({
      message: "Resume Create",
      isSucess: true,
      data: resume,
    });
  }
);

export const getResumeHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { resume_id } = req.params;

    const resume = await ResumeModel.findById(resume_id);

    if (!resume) {
      next(new ErrorHandler("Invalid Resume ID", 400));
    }

    return res.json({
      data: resume,
      isSucess: true,
    });
  }
);

export const getPersonalInfoHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id } = req.params;

    await canUpdateResume(user_id, resume_id);

    const resume = await ResumeModel.findOne({ user_id, _id: resume_id })
      .select("name headline summary")
      .lean(true);

    console.log(resume);

    return res.json({
      data: resume,
      isSuccess: true,
    });
  }
);

export const updatePersonalInfoHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id, name, summary, headline } = req.body;

    await canUpdateResume(user_id, resume_id);

    await ResumeModel.findOneAndUpdate(
      { user_id, _id: resume_id },
      { name, summary, headline }
    );

    return res.json({ message: "Resume Updated" });
  }
);

export const getContactInfoHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id } = req.params;

    await canUpdateResume(user_id, resume_id);

    const resume = await ResumeModel.findOne({ user_id, _id: resume_id })
      .select("address contact socialMedia")
      .lean(true);

    console.log(resume);

    return res.json({
      data: resume,
      isSuccess: true,
    });
  }
);

export const updateContactInfoHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id, address, contact, socialMedia } = req.body;

    await canUpdateResume(user_id, resume_id);

    await ResumeModel.findOneAndUpdate(
      { user_id, _id: resume_id },
      { address, contact, socialMedia }
    );

    return res.json({ message: "Resume Updated" });
  }
);

export const updateExperienceHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id, experience } = req.body;

    await canUpdateResume(user_id, resume_id);

    await ResumeModel.findOneAndUpdate(
      { user_id, _id: resume_id },
      { experience }
    );

    return res.json({ message: "Resume Updated" });
  }
);
export const updateEducationHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id, education } = req.body;

    await canUpdateResume(user_id, resume_id);

    await ResumeModel.findOneAndUpdate(
      { user_id, _id: resume_id },
      { education }
    );

    return res.json({ message: "Resume Updated" });
  }
);

export const updateProjectsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id, projects } = req.body;

    await canUpdateResume(user_id, resume_id);

    await ResumeModel.findOneAndUpdate(
      { user_id, _id: resume_id },
      { projects }
    );

    return res.json({ message: "Resume Updated" });
  }
);

export const updateHobbiesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id, hobbies } = req.body;

    await canUpdateResume(user_id, resume_id);

    await ResumeModel.findOneAndUpdate(
      { user_id, _id: resume_id },
      { hobbies }
    );
    return res.json({ message: "Resume Updated" });
  }
);

export const updateLanguageHander = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id, languages } = req.body;

    await canUpdateResume(user_id, resume_id);

    await ResumeModel.findOneAndUpdate(
      { user_id, _id: resume_id },
      { languages }
    );
    return res.json({ message: "Resume Updated" });
  }
);

export const updateAchievementsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id, achievements } = req.body;

    await canUpdateResume(user_id, resume_id);

    await ResumeModel.findOneAndUpdate(
      { user_id, _id: resume_id },
      { achievements }
    );
    return res.json({ message: "Resume Updated" });
  }
);

export const updateCertificationHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id, certification } = req.body;

    await canUpdateResume(user_id, resume_id);

    await ResumeModel.findOneAndUpdate(
      { user_id, _id: resume_id },
      { certification }
    );
    return res.json({ message: "Resume Updated" });
  }
);
export const updateSkillsHandlers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const { resume_id, skills } = req.body;

    await canUpdateResume(user_id, resume_id);

    await ResumeModel.findOneAndUpdate({ user_id, _id: resume_id }, { skills });
    return res.json({ message: "Resume Updated" });
  }
);
export const getExperienceHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const resume_id = req.params.resume_id;

    await canUpdateResume(user_id, resume_id);

    const resume = await ResumeModel.findOne({
      user_id,
      _id: resume_id,
    })
      .select("experience")
      .lean(true);

    return res.json({
      data: resume,
      isSuccess: true,
    });
  }
);
export const getEducationHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const resume_id = req.params.resume_id;

    await canUpdateResume(user_id, resume_id);

    const resume = await ResumeModel.findOne({
      user_id,
      _id: resume_id,
    })
      .select("education")
      .lean(true);

    return res.json({
      data: resume,
      isSuccess: true,
    });
  }
);

export const getProjectsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const resume_id = req.params.resume_id;

    await canUpdateResume(user_id, resume_id);

    const resume = await ResumeModel.findOne({
      user_id,
      _id: resume_id,
    })
      .select("projects")
      .lean(true);

    return res.json({
      data: resume,
      isSuccess: true,
    });
  }
);

export const getHobbiesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const resume_id = req.body.resume_id;

    await canUpdateResume(user_id, resume_id);

    const resume = await ResumeModel.findOne({
      user_id,
      _id: resume_id,
    })
      .select("hobbies")
      .lean(true);

    return res.json({
      data: resume,
      isSuccess: true,
    });
  }
);

export const getLanguageHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const resume_id = req.body.resume_id;

    await canUpdateResume(user_id, resume_id);

    const resume = await ResumeModel.findOne({
      user_id,
      _id: resume_id,
    })
      .select("languages")
      .lean(true);

    return res.json({
      data: resume,
      isSuccess: true,
    });
  }
);

export const getAchievementsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const resume_id = req.params.resume_id;

    await canUpdateResume(user_id, resume_id);

    const resume = await ResumeModel.findOne({
      user_id,
      _id: resume_id,
    })
      .select("achievements")
      .lean(true);

    return res.json({
      data: resume,
      isSuccess: true,
    });
  }
);

export const getCertificationHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const resume_id = req.body.resume_id;

    await canUpdateResume(user_id, resume_id);

    const resume = await ResumeModel.findOne({
      user_id,
      _id: resume_id,
    })
      .select("certification")
      .lean(true);

    return res.json({
      data: resume,
      isSuccess: true,
    });
  }
);

export const getSkillsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const resume_id = req.params.resume_id;

    await canUpdateResume(user_id, resume_id);

    const resume = await ResumeModel.findOne({
      user_id,
      _id: resume_id,
    })
      .select("skills")
      .lean(true);

    return res.json({
      data: resume,
      isSuccess: true,
    });
  }
);

export const updateResumeHanlder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userID = getLoggedInUserId(res);

    const resume = await createResume("Name");

    return res.json({
      message: "Resume Create",
      isSucess: true,
      data: resume,
    });
  }
);

export const downloadPDF = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { resume_id, template } = req.params;

    const url = `http://localhost:3000/view/resume/${resume_id}/${template}`;
    const options = {
      format: "A4",
      path: path.join(__dirname, "../files", `${resume_id}_${template}.pdf`),
    };
    const file = { url };
    try {
      fs.exists(options.path, async function (exists) {
        if (exists) {
          console.log("File exists. Deleting now ...");

          fs.unlinkSync(options.path);
          await html_to_pdf.generatePdf(file, options);
        } else {
          await html_to_pdf.generatePdf(file, options);

          console.log("File not found, so not deleting.");
        }
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error ",
      });
    }

    return res.json({
      message: " Download Resume",
      isSucess: true,
      data: options.path,
    });
  }
);

export const sendEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { resume_id, template } = req.params;

    const resume = await ResumeModel.findOne({ _id: resume_id })
      .lean(true)
      .select("user_id");

    if (!resume) {
      next(new ErrorHandler("Invalid Resume Id", 400));
    }

    const user = ResumeModel.findOne({ _id: resume?.user_id })
      .select("email")
      .lean(true);

    const url = `http://localhost:3000/view/resume/${resume_id}/${template}`;
    const options = {
      format: "A4",
      path: path.join(__dirname, "../files", `${resume_id}_${template}.pdf`),
    };
    const file = { url };
    try {
      fs.exists(options.path, async function (exists) {
        if (exists) {
          console.log("File exists. Deleting now ...");

          fs.unlinkSync(options.path);
          await html_to_pdf.generatePdf(file, options);
        } else {
          await html_to_pdf.generatePdf(file, options);

          console.log("File not found, so not deleting.");
        }
      });
    } catch (error) {
      return res.status(400).json({
        message: "Error ",
      });
    }

    return res.json({
      message: " Download Resume",
      isSucess: true,
      data: options.path,
    });
  }
);
