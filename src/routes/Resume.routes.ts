import { Router } from "express";
import {
  addCustomizedSectionHandler,
  createResumeHandler,
  deleteCustmoizedSectionHandler,
  downloadPDF,
  getAchievementsHandler,
  getCertificationHandler,
  getContactInfoHandler,
  getCustomizedSectionHanlder,
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
  updateCustomizedSectionHandler,
  updateCustomizedSectionTitleHandler,
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
import {
  deleteCustomizedSectionSchema,
  getResumeSchema,
  updateAchievementSchema,
  updateContactDetailsSchema,
  updateCustmoziedSectionTitleSchema,
  updateEducationSchema,
  updateExperienceSchema,
  updatePersonalDetailsSchema,
  updateProjectSchema,
  updateSkillsSchema,
} from "../schema/Resume.schema";
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
  [validateRequest(updatePersonalDetailsSchema), deserializeUser, requireUser],
  updatePersonalInfoHandler
);

router.get(
  "/contact/:resume_id",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getContactInfoHandler
);

router.post(
  "/contact",
  [validateRequest(updateContactDetailsSchema), deserializeUser, requireUser],
  updateContactInfoHandler
);

router.get(
  "/education/:resume_id",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getEducationHandler
);
router.post(
  "/education",
  [validateRequest(updateEducationSchema), deserializeUser, requireUser],
  updateEducationHandler
);

router.get(
  "/experience/:resume_id",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getExperienceHandler
);
router.post(
  "/experience",
  [validateRequest(updateExperienceSchema), deserializeUser, requireUser],
  updateExperienceHandler
);

router.get(
  "/project/:resume_id",
  [validateRequest(getResumeSchema), deserializeUser, requireUser],
  getProjectsHandler
);
router.post(
  "/project",
  [validateRequest(updateProjectSchema), deserializeUser, requireUser],
  updateProjectsHandler
);
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
  [validateRequest(updateAchievementSchema), deserializeUser, requireUser],
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
router.post(
  "/skills",
  [validateRequest(updateSkillsSchema), deserializeUser, requireUser],
  updateSkillsHandlers
);

router.get(
  "/customized/:resume_id",
  [deserializeUser, requireUser],
  getCustomizedSectionHanlder
);

router.post(
  "/customized/add",
  [deserializeUser, requireUser],
  addCustomizedSectionHandler
);

router.post(
  "/customized",
  [deserializeUser, requireUser],
  updateCustomizedSectionHandler
);

router.post(
  "/customized/title",
  [
    validateRequest(updateCustmoziedSectionTitleSchema),
    deserializeUser,
    requireUser,
  ],
  updateCustomizedSectionTitleHandler
);

router.delete(
  "/customized",
  [
    validateRequest(deleteCustomizedSectionSchema),
    deserializeUser,
    requireUser,
  ],
  deleteCustmoizedSectionHandler
);

router.get("/pdf/:resume_id/:template", downloadPDF);

export default router;
