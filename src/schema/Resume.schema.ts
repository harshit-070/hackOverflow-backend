import { isValidObjectId } from "mongoose";
import { number, object, string } from "zod";

const resume_id = string({ required_error: "Resume Id is Required" }).refine(
  (data) => isValidObjectId(data),
  "Invalid Resume Id"
);

export const getResumeSchema = object({
  params: object({
    resume_id,
  }),
});

export const updatePersonalDetailsSchema = object({
  body: object({
    resume_id,
    name: string({ required_error: "Name is Required" }),
    summary: string().optional(),
  }),
});

export const updateContactDetailsSchema = object({
  body: object({
    resume_id,
    number: number({
      invalid_type_error: "Contact Number is not in correct format",
      required_error: "Contact Number is Required",
    }),
    city: string({}),
    country: string({}),
    email: string({}).email(),
    linkedin: string({}).optional(),
    github: string().optional(),
    facebook: string().optional(),
    instagram: string().optional(),
    otherSocialMedia: string().array(),
  }),
});
