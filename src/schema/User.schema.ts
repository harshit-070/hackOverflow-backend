import { number, object, string, TypeOf } from "zod";
import { isStrongPassword } from "../utils/validation.utils";

export const sendOTPSchema = object({
  query: object({
    email: string().email(),
  }),
});

export const signupUserSchema = object({
  body: object({
    email: string().email(),
    password: string(),
    confirmationPassword: string(),
    name: string(),
    otp: number(),
    username: string(),
  })
    .refine(
      ({ password, confirmationPassword }) => confirmationPassword === password,
      "Password and confirm password do not match"
    )
    .refine(({ password }) => isStrongPassword(password), "Password is weak"),
});

export const loginUserSchema = object({
  body: object({
    email: string().email(),
    password: string(),
  }),
});

export const googleRedrectURLSchema = object({
  query: object({
    code: string(),
  }),
});

export const updatePasswordSchema = object({
  body: object({
    email: string().email(),
    password: string(),
    confirmationPassword: string(),
    otp: number(),
  })
    .refine(
      ({ password, confirmationPassword }) => confirmationPassword === password,
      "Password and confirm password do not match"
    )
    .refine(({ password }) => isStrongPassword(password), "Password is weak"),
});

export type sendOTPInput = TypeOf<typeof sendOTPSchema>["query"];
export type signupUserInput = TypeOf<typeof signupUserSchema>["body"];
export type loginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type googleRedrectURLQuery = TypeOf<
  typeof googleRedrectURLSchema
>["query"];
export type updatePasswordInput = TypeOf<typeof updatePasswordSchema>["body"];
