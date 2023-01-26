import { isValidObjectId } from "mongoose";
import { number, object, string,date } from "zod";

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
    city: string({required_error: "City is Required"}),
    country: string({required_error: "Country is Required"}),
    email: string({required_error: "Email is Required"}).email("Email format is incorrect"),
    linkedin: string({}).optional(),
    github: string().optional(),
    facebook: string().optional(),
    instagram: string().optional(),
    otherSocialMedia: string().array(),
  }),
});

export const updateEducationSchema = object({
  body : object({
    resume_id,
    education : object({
      specialization: string({required_error: "Specialization is Required"}),
      percentage: string({required_error: "Specialization is Required"}),
    location: string({required_error: "Specialization is Required"}),
    startDate: date(),
    endDate: Date,
    start_month: number,
    end_month: number,
    start_year: number,
    end_year: number,
    description: string,
    category: string,
    otherCategory: string,
    }).array()
  })
})