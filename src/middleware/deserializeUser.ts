import { NextFunction, Request, Response } from "express";

import { decode } from "../utils/jwt.utils";
import ErrorHandler from "../utils/error.utils";
import UserModel from "../models/user.model";
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return next();
  }
  const { decoded } = decode(accessToken);
  if (decoded) {
    const { _id } = decoded as any;

    const user = await UserModel.findOne({ _id });

    if (user) {
      res.locals.user = user;
    }

    return next();
  }

  return next();
};

export default deserializeUser;
