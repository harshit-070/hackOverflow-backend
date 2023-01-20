import ResumeModel from "../models/resume.model";

export const createResume = async (input: string) => {
  return await ResumeModel.create({ name: input });
};
