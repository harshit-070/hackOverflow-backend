import { Router } from "express";
import {
  getAchievementsHandler,
  getCertificationHandler,
  getEducationHandler,
  getExperienceHandler,
  getHobbiesHandler,
  getLanguageHandler,
  getProjectsHandler,
  updateAchievementsHandler,
  updateCertificationHandler,
  updateEducationHandler,
  updateExperienceHandler,
  updateHobbiesHandler,
  updateLanguageHander,
  updateProjectsHandler,
} from "../controller/Resume.controller";
import deserializeUser from "../middleware/deserializeUser";
import { requireUser } from "../middleware/permission";
import validateRequest from "../middleware/validateRequest";
import { getResumeSchema } from "../schema/Routes.schema";
const router = Router();

router.get(
  "/experience",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getExperienceHandler
);
router.post(
  "/experience",
  [deserializeUser, requireUser],
  updateExperienceHandler
);
router.get(
  "/education",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getEducationHandler
);
router.post(
  "/education",
  [deserializeUser, requireUser],
  updateEducationHandler
);
router.get(
  "/project",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getProjectsHandler
);
router.post("/project", [deserializeUser, requireUser], updateProjectsHandler);
router.get(
  "/hobbies",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getHobbiesHandler
);
router.post("/hobbies", [deserializeUser, requireUser], updateHobbiesHandler);
router.get(
  "/languages",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getLanguageHandler
);
router.post("/languages", [deserializeUser, requireUser], updateLanguageHander);
router.get(
  "/achievements",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getAchievementsHandler
);
router.post(
  "/achievements",
  [deserializeUser, requireUser],
  updateAchievementsHandler
);
router.get(
  "/certification",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getCertificationHandler
);
router.post(
  "/certification",
  [deserializeUser, requireUser],
  updateCertificationHandler
);

export default router;
