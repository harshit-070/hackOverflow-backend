import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import ResumeModel from "../models/resume.model";
import { getLoggedInUserId } from "../services/User.service";

export const fetchDashboardHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = getLoggedInUserId(res);
    console.log(user_id);
    const data = await ResumeModel.find({ user_id }).select("title").lean(true);
    return res.status(200).json({
      message: "Data Fetched",
      isSuccess: true,
      data,
    });
  }
);
