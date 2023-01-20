import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error.utils";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // mongodb id error
  if (err.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} already exists`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.code === "JsonWebTokenError") {
    const message = "JWT Error";
    err = new ErrorHandler(message, 400);
  }

  // jwt expire error
  if (err.code === "JsonWebTokenError") {
    const message = "JWT is Expired";
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    err = new ErrorHandler(err.errors[0].message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
