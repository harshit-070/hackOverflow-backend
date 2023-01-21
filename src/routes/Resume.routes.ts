import { Router } from "express";
import {
  createResumeHandler,
  downloadPDF,
  getAchievementsHandler,
  getCertificationHandler,
  getContactInfoHandler,
  getEducationHandler,
  getExperienceHandler,
  getHobbiesHandler,
  getLanguageHandler,
  getPersonalInfoHandler,
  getProjectsHandler,
  getResumeHandler,
  getSkillsHandler,
  updateAchievementsHandler,
  updateCertificationHandler,
  updateContactInfoHandler,
  updateEducationHandler,
  updateExperienceHandler,
  updateHobbiesHandler,
  updateLanguageHander,
  updatePersonalInfoHandler,
  updateProjectsHandler,
  updateSkillsHandlers,
} from "../controller/Resume.controller";
import deserializeUser from "../middleware/deserializeUser";
import { requireUser } from "../middleware/permission";
import validateRequest from "../middleware/validateRequest";
import { getResumeSchema } from "../schema/Routes.schema";
const router = Router();

router.post("/create", [deserializeUser, requireUser], createResumeHandler);

router.get("/fetch/:resume_id", getResumeHandler);

router.get(
  "/personal/:resume_id",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getPersonalInfoHandler
);

router.post(
  "/personal",
  [deserializeUser, requireUser],
  updatePersonalInfoHandler
);

router.get(
  "/contact/:resume_id",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getContactInfoHandler
);

router.post(
  "/contact",
  [deserializeUser, requireUser],
  updateContactInfoHandler
);

router.get(
  "/education/:resume_id",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getEducationHandler
);
router.post(
  "/education",
  [deserializeUser, requireUser],
  updateEducationHandler
);

router.get(
  "/experience/:resume_id",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getExperienceHandler
);
router.post(
  "/experience",
  [deserializeUser, requireUser],
  updateExperienceHandler
);

router.get(
  "/project/:resume_id",
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
  "/achievements/:resume_id",
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

router.get(
  "/skills/:resume_id",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getSkillsHandler
);
router.post("/skills", [deserializeUser, requireUser], updateSkillsHandlers);

router.get("/pdf/:resume_id/:template", downloadPDF);

export default router;
