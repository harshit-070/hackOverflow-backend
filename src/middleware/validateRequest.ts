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
    } catch (e: any) {
      return res.status(400).json({ success: false, error: e.errors });
    }
  };

export default validateRequest;
