import { isValidObjectId } from "mongoose";
import { number, object, string, enum as Zenum } from "zod";

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
    city: string({ required_error: "City is Required" }),
    country: string({ required_error: "Country is Required" }),
    email: string({ required_error: "Email is Required" }).email(
      "Email format is incorrect"
    ),
    linkedin: string({}).optional(),
    github: string().optional(),
    facebook: string().optional(),
    instagram: string().optional(),
    otherSocialMedia: string().array(),
  }),
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const updateEducationSchema = object({
  body: object({
    resume_id,
    education: object({
      _id: string().optional(),
      specialization: string({ required_error: "Specialization is Required" }),
      category: string({ required_error: "category is Required" }),
      otherCategory: string({
        required_error: "category is Required",
      }).optional(),
      name: string({ required_error: "Institute Name is Required" }),
      percentage: string({ required_error: "percentage is Required" }),
      location: string({ required_error: "location is Required" }),
      start_month: Zenum(months),
      end_month: Zenum(months),
      start_year: number().min(1972).max(2052),
      end_year: number().min(1972).max(2052),
    }).array(),
  })
    .refine((data) => {
      const isInvalidData = data.education.some(
        (edu) => edu.category === "Others" && !edu.otherCategory
      );
      return !isInvalidData;
    }, "Category is Required")
    .refine((data) => {
      const isInvalidYear = data.education.some(
        (edu) => edu.start_year > edu.end_year
      );
      return !isInvalidYear;
    }, "Start Year is Greater than End Year")
    .refine((data) => {
      const isInvalidYear = data.education.some(
        (edu) =>
          edu.start_year === edu.end_year &&
          months.indexOf(edu.start_month) > months.indexOf(edu.end_month)
      );
      return !isInvalidYear;
    }, "Start Month is Greater than End Month"),
});

export const updateExperienceSchema = object({
  body: object({
    resume_id,
    experience: object({
      _id: string().optional(),
      title: string({ required_error: "Job Title is Required is Required" }),
      name: string({ required_error: "Company Name is Required" }),
      category: string({ required_error: "category is Required" }),
      otherCategory: string({
        required_error: "category is Required",
      }).optional(),
      location: string({ required_error: "location is Required" }),
      start_month: Zenum(months),
      end_month: Zenum(months),
      start_year: number().min(1972).max(2052),
      end_year: number().min(1972).max(2052),
      description: string({ required_error: "Job Description is Required" }),
    }).array(),
  })
    .refine((data) => {
      const isInvalidData = data.experience.some(
        (exp) => exp.category === "Others" && !exp.otherCategory
      );
      return !isInvalidData;
    }, "Category is Required")
    .refine((data) => {
      const isInvalidYear = data.experience.some(
        (exp) => exp.start_year > exp.end_year
      );
      return !isInvalidYear;
    }, "Start Year is Greater than End Year")
    .refine((data) => {
      const isInvalidYear = data.experience.some(
        (exp) =>
          exp.start_year === exp.end_year &&
          months.indexOf(exp.start_month) > months.indexOf(exp.end_month)
      );
      return !isInvalidYear;
    }, "Start Month is Greater than End Month"),
});
