import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.utils";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user) {
    return next();
  }
  return next(new ErrorHandler("UnAuthorize", 400));
};
