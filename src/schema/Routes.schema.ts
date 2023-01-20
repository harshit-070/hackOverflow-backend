import { isValidObjectId } from "mongoose";
import { object, string } from "zod";

const resume_id = string({ required_error: "Resume Id is Required" }).refine(
  (data) => isValidObjectId(data),
  "Invalid Resume Id"
);

export const getResumeSchema = object({
  body: object({
    resume_id,
  }),
});
