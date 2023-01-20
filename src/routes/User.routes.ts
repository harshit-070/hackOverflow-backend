import { Router } from "express";
import {
  githubRedirectURLHandler,
  githubUserLoginHandler,
  googleRedirectURLHandler,
  googleUserLoginHandler,
  loginUserHandler,
  sendOTPHandler,
  signupUserHandler,
} from "../controller/User.controller";
import validateRequest from "../middleware/validateRequest";
import {
  googleRedrectURLSchema,
  loginUserSchema,
  sendOTPSchema,
  signupUserSchema,
} from "../schema/User.schema";
const router = Router();

router.get("/sendOTP", [validateRequest(sendOTPSchema)], sendOTPHandler);

router.post("/signup", [validateRequest(signupUserSchema)], signupUserHandler);

router.post("/login", [validateRequest(loginUserSchema)], loginUserHandler);

router.get("/google", googleRedirectURLHandler);

router.get(
  "/google/auth",
  [validateRequest(googleRedrectURLSchema)],
  googleUserLoginHandler
);
router.get("/github", githubRedirectURLHandler);

router.get(
  "/github/auth",
  [validateRequest(googleRedrectURLSchema)],
  githubUserLoginHandler
);

export default router;
