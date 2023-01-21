import { Router } from "express";
import {
  forgotPasswordHandler,
  forgotPasswordOTPHandler,
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
  updatePasswordSchema,
} from "../schema/User.schema";
const router = Router();

router.get("/sendOTP", [validateRequest(sendOTPSchema)], sendOTPHandler);

router.post("/signup", [validateRequest(signupUserSchema)], signupUserHandler);

router.post("/login", [validateRequest(loginUserSchema)], loginUserHandler);

router.get("/google", googleRedirectURLHandler);

router.post(
  "/google/auth",
  [validateRequest(googleRedrectURLSchema)],
  googleUserLoginHandler
);
router.get("/github", githubRedirectURLHandler);

router.post(
  "/github/auth",
  [validateRequest(googleRedrectURLSchema)],
  githubUserLoginHandler
);

router.get(
  "/forgotOTP",
  [validateRequest(sendOTPSchema)],
  forgotPasswordOTPHandler
);

router.post(
  "/resetPassword",
  [validateRequest(updatePasswordSchema)],
  forgotPasswordHandler
);

export default router;
