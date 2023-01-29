import { Application, Request, Response } from "express";
import errorMiddleware from "../middleware/error";

import userRoutes from "./User.routes";
import resumeRoutes from "./Resume.routes";
import dashboardRoutes from "./Dashboard.routes";

export default function routes(app: Application) {
  app.get("/", (req: Request, res: Response) => {
    return res.status(200);
  });
  app.get("/healthCheck", (req: Request, res: Response) => {
    return res.status(200);
  });
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/resume", resumeRoutes);
  app.use("/api/v1/dashboard", dashboardRoutes);

  app.use(errorMiddleware);
}
