import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import ResumeModel from "../models/resume.model";
import { createResume } from "../services/Resume.service";
import { canUpdateResume, getLoggedInUserId } from "../services/User.service";

export const createResumeHandler = asyncHandler(
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

export const getResumeHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
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
export const getExperienceHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    const resume_id = req.body.resume_id;

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
    const resume_id = req.body.resume_id;

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
    const resume_id = req.body.resume_id;

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
    const resume_id = req.body.resume_id;

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
