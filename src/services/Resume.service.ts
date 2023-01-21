import ResumeModel from "../models/resume.model";

export const createResume = async (input: any) => {
  return await ResumeModel.create(input);
};
