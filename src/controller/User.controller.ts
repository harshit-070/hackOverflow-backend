import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import asyncHandler from "../middleware/asyncHandler";
import {
  googleRedrectURLQuery,
  loginUserInput,
  sendOTPInput,
  signupUserInput,
  updatePasswordInput,
} from "../schema/User.schema";
import {
  createUser,
  createUserSession,
  findUserByEmail,
  findUserByUsername,
  generateOTP,
  isUserExist,
  userSignupRedisKey,
  validateOTP,
} from "../services/User.service";
import ErrorHandler from "../utils/error.utils";
import { getRedisKey, setRedisKey } from "../utils/redis.utils";
import { addAccessToken, createAccessToken } from "../utils/tokens.utils";
import { google } from "googleapis";
import axios from "axios";
import config from "config";
import mongoose from "mongoose";
import { sendEmail, sendForgotPasswordEmail } from "../services/Email.service";
import UserModel from "../models/user.model";
const OTP_TIME_LIMIT_IN_MS = 15 * 60 * 1000; // 15 minutes

const oAuth2Client = new google.auth.OAuth2(
  config.get("GOOGLE.CLIENT_ID"),
  config.get("GOOGLE.CLIENT_SECRET"),
  process.env.GOOGLE_REDIRECT || "http://localhost:3000/google/auth"
);

export const sendOTPHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, sendOTPInput>,
    res: Response,
    next: NextFunction
  ) => {
    let { email } = req.query;
    email = email.toLowerCase();
    if (await isUserExist({ email: email })) {
      return next(new ErrorHandler("User Already Exist", 400));
    }

    let otp;

    otp = await getRedisKey(userSignupRedisKey(email));
    if (!otp) {
      otp = generateOTP();
      await setRedisKey(userSignupRedisKey(email), otp, OTP_TIME_LIMIT_IN_MS);
    }

    console.log(otp);
    // TODO: Send Email after otp Generation
    await sendEmail(email, otp);

    return res
      .status(200)
      .json({ message: "OTP sent to email", isSuccess: true });
  }
);

export const signupUserHandler = asyncHandler(
  async (
    req: Request<{}, {}, signupUserInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { otp } = req.body;
    let { email, username } = req.body;
    email = email.toLowerCase();
    let isUserExist = await findUserByUsername(username);

    if (isUserExist) {
      return next(new ErrorHandler("Username Already Exist", 400));
    }

    isUserExist = await findUserByEmail(email);

    if (isUserExist) {
      return next(new ErrorHandler("Email Already Exist", 400));
    }

    await validateOTP(email, otp);

    const user = await createUser(
      omit(req.body, ["otp", "confirmationPassword"])
    );

    return res.status(201).json({
      data: user,
      isSucess: true,
      message: "User Created",
    });
  }
);

export const loginUserHandler = asyncHandler(
  async (
    req: Request<{}, {}, loginUserInput>,
    res: Response,
    next: NextFunction
  ) => {
    let { email, password } = req.body;
    email = email.toLowerCase();

    const user = await findUserByEmail(email);

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    if (!(await user.comparePassword(password))) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const userSession = await createUserSession(
      user["_id"],
      req.get("user-agent") || ""
    );

    const accessToken = await createAccessToken({
      ...user.toJSON(),
      session_id: userSession._id,
    });
    addAccessToken(accessToken, res);

    return res.status(200).json({
      isSuccess: true,
      messsage: "LOGGED_IN",
      data: {
        user: user.toJSON(),
      },
    });
  }
);

export const googleRedirectURLHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];

    const redirectURL = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: scopes,
    });

    return res.json({
      isSuccess: true,
      message: "GOOGLE_AUTH_KEY",
      data: {
        redirectURL,
      },
    });
  }
);

export const googleUserLoginHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, googleRedrectURLQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { code } = req.query;
    console.log(code);
    const data = await getGoogleUser(code);

    const { email, name } = data;

    let user = await findUserByEmail(email);

    if (user && user.type === "email") {
      return next(new ErrorHandler("User Already Exist", 400));
    }

    if (user && user.type !== "google") {
      return next(new ErrorHandler(`User have account with ${user.type}`, 400));
    }

    if (!user) {
      user = await createUser({
        email,
        username: new mongoose.Types.ObjectId().toString(),
        type: "google",
        name,
      });
    }

    const userSession = await createUserSession(
      user["_id"],
      req.get("user-agent") || ""
    );

    const accessToken = await createAccessToken({
      ...user.toJSON(),
      session_id: userSession._id,
    });
    addAccessToken(accessToken, res);

    return res.status(200).json({
      isSuccess: true,
      messsage: "LOGGED_IN",
      data: {
        user: user.toJSON(),
      },
    });
  }
);

async function getGoogleUser(code: string) {
  const { tokens } = await oAuth2Client.getToken(code);
  // console.log(tokens);
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new ErrorHandler("Invalid Token", 400);
    });
  return googleUser;
}

export const githubRedirectURLHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await axios.get(
        `https://github.com/login/oauth/authorize?client_id=${config.get(
          "GITHUB.CLIENT_ID"
        )}&redirect_url=${config.get(
          "GITHUB.REDIRECT"
        )}&scope=read:user,user:email`
      );
      return res.status(200).json({
        isSuccess: true,
        message: "GOOGLE_AUTH_KEY",
        data: {
          redirectURL: data.request.res.responseUrl,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: "Some Error Occurred While Login/Signup",
        code: "FAILED_LOG_IN",
        userLoggedIn: false,
      });
    }
  }
);

export const githubUserLoginHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, googleRedrectURLQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { code } = req.query;

      const accessTokenResponse = await axios.post(
        `https://github.com/login/oauth/access_token?client_id=${config.get(
          "GITHUB.CLIENT_ID"
        )}&client_secret=${config.get(
          "GITHUB.CLIENT_SECRET"
        )}&redirect_url=${config.get("GITHUB.REDIRECT")}&code=${code}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      let accessToken = accessTokenResponse.data;
      accessToken = accessToken.split("=")[1].split("&")[0];
      const userData = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
      const userDataEmail = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );

      let user = await findUserByEmail(userDataEmail.data[0].email);

      if (user && user.type === "email") {
        return next(new ErrorHandler("User Already Exist", 400));
      }

      if (user && user.type !== "github") {
        return next(
          new ErrorHandler(`User have account with ${user.type}`, 400)
        );
      }

      if (!user) {
        user = await createUser({
          email: userDataEmail.data[0].email,
          username: new mongoose.Types.ObjectId().toString(),
          type: "github",
          name: userData.data.name,
        });
      }

      const userSession = await createUserSession(
        user["_id"],
        req.get("user-agent") || ""
      );

      accessToken = await createAccessToken({
        ...user.toJSON(),
        session_id: userSession._id,
      });
      addAccessToken(accessToken, res);

      return res.status(200).json({
        isSuccess: true,
        messsage: "LOGGED_IN",
        data: {
          user: user.toJSON(),
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: "Some Error Occurred While Login/Signup",
        code: "FAILED_LOG_IN",
        userLoggedIn: false,
      });
    }
  }
);

export const forgotPasswordOTPHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, sendOTPInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.query;

    const user = await findUserByEmail(email);
    if (!user || user.type !== "email") {
      return next(new ErrorHandler("Email not registered", 400));
    }

    let otp;

    otp = await getRedisKey(userSignupRedisKey(email));
    if (!otp) {
      otp = generateOTP();
      await setRedisKey(userSignupRedisKey(email), otp, OTP_TIME_LIMIT_IN_MS);
    }

    console.log(otp);
    // TODO: Send Email after otp Generation
    await sendForgotPasswordEmail(email, otp);

    return res
      .status(200)
      .json({ message: "OTP sent to email", isSuccess: true });
  }
);

export const forgotPasswordHandler = asyncHandler(
  async (
    req: Request<{}, {}, updatePasswordInput>,
    res: Response,
    next: NextFunction
  ) => {
    let { email, otp, password } = req.body;
    email = email.toLowerCase();

    const isUserExist = await findUserByEmail(email);

    if (!isUserExist || isUserExist.type === "eamil") {
      return next(new ErrorHandler("Invalid OTP", 400));
    }

    await validateOTP(email, otp);

    const user = await UserModel.findOneAndUpdate({ email }, { password });

    return res.status(201).json({
      data: user,
      isSucess: true,
      message: "Password Reset",
    });
  }
);
