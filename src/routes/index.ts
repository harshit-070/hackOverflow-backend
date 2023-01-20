import { Application } from "express";
import errorMiddleware from "../middleware/error";

import userRoutes from "./User.routes";
import resumeRoutes from "./Resume.routes";

export default function routes(app: Application) {
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/resume", resumeRoutes);
  app.use(errorMiddleware);
}
