import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.query = response.query;
      req.body = response.body;
      req.params = response.params;
      next();
    } catch (error: any) {
      const errors = [];
      for (const e of error.errors) {
        console.log(e);
        errors.push(e.message);
      }
      return res
        .status(400)
        .json({ success: false, message: errors.join(". ") });
    }
  };

export default validateRequest;
