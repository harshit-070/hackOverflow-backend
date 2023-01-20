import { NextFunction, Request, Response } from "express";
import { findOrganizationById } from "../services/Organization.service";
import {
  ADMIN,
  ORGANIZATION,
  UNAUTHORIZE,
  USER,
} from "../utils/constants.utils";
import { decode } from "../utils/jwt.utils";
import ErrorHandler from "../utils/error.utils";
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
    const { role, _id } = decoded as any;

    if (role === USER) {
    } else if (role === ORGANIZATION) {
      const organization = await findOrganizationById(_id);

      if (!organization) {
        throw new ErrorHandler(UNAUTHORIZE, 400);
      }
      res.locals.user = organization;
      res.locals.user.role = ORGANIZATION;
    } else if (role === ADMIN) {
      res.locals.admin = decoded;
    }
    return next();
  }

  return next();
};

export default deserializeUser;
