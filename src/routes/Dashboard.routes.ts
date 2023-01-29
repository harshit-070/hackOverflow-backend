import { Router } from "express";
import { fetchDashboardHandler } from "../controller/Dashboard.controller";
import deserializeUser from "../middleware/deserializeUser";
import { requireUser } from "../middleware/permission";
import validateRequest from "../middleware/validateRequest";

const router = Router();

router.get("/", [deserializeUser, requireUser], fetchDashboardHandler);

export default router;
