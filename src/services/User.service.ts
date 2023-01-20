import { FilterQuery, Schema } from "mongoose";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { deleteRedisKey, getRedisKey } from "../utils/redis.utils";
import ErrorHandler from "../utils/error.utils";
import SessionModel from "../models/session.model";
import { Response } from "express";
import ResumeModel from "../models/resume.model";

export const isUserExist = async (input: FilterQuery<UserDocument>) => {
  const user = await UserModel.findOne(input).lean().select("_id");

  if (!user) {
    return false;
  }
  return true;
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const userSignupRedisKey = (email: string) => {
  return `signup_${email}`;
};

export const validateOTP = async (email: string, otp: number) => {
  const saved_otp = await getRedisKey(userSignupRedisKey(email));

  if (!saved_otp) {
    throw new ErrorHandler("OTP Expired", 400);
  }

  if (otp !== Number(saved_otp)) {
    throw new ErrorHandler("Invalid OTP", 400);
  }

  await deleteRedisKey(userSignupRedisKey(email));

  return true;
};

export const createUser = async (input: UserInput) => {
  return await UserModel.create(input);
};

export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export const createUserSession = async (
  user_id: UserDocument["_id"],
  userAgent: string
) => {
  return await SessionModel.create({ user_id, userAgent });
};

export const getLoggedInUserRole = (res: Response) => {
  return res.locals.user.role;
};

export const getLoggedInUserId = (res: Response) => {
  return res.locals.user._id;
};

export const findUserByUsername = async (username: string) => {
  return await UserModel.findOne({ username });
};

export const canUpdateResume = async (user_id: string, resume_id: string) => {
  const resume = await ResumeModel.findOne({ user_id, _id: resume_id })
    .select("_id")
    .lean();

  if (!resume) {
    throw new ErrorHandler("You can not update this resume", 400);
  }
  return true;
};
