import { NextFunction, Request, Response } from "express";
import { ADMIN, ORGANIZATION, USER } from "../utils/constants.utils";
import ErrorHandler from "../utils/error.utils";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user && res.locals.user.role === USER) {
    return next();
  }
  return next(new ErrorHandler("UnAuthorize", 400));
};

export const requireOrganization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user && res.locals.user.role === ORGANIZATION) {
    return next();
  }
  return next(new ErrorHandler("UnAuthorize", 400));
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.admin && res.locals.admin.role === ADMIN) {
    return next();
  }
  return next(new ErrorHandler("UnAuthorize", 400));
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.user) {
    return next();
  }
  return next(new ErrorHandler("UnAuthorize", 400));
};
