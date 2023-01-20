import { sign } from "../utils/jwt.utils";
import { CookieOptions, Response } from "express";
import config from "config";

export const createAccessToken = async (value: any) => {
  return sign(value, { expiresIn: "1d" });
};

export const addAccessToken = (token: string, res: Response) => {
  const COKKIE_EXPIRE =
    parseInt(config.get("Cookie.ACCESS_TOKEN_TTL")) * 24 * 60 * 60 * 1000;
  const options: CookieOptions = {
    expires: new Date(Date.now() + COKKIE_EXPIRE),
    httpOnly: true,
    sameSite: true,
  };

  res.cookie("accessToken", token, options);
};
