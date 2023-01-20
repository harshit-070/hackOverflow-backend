import { Schema, Document, model } from "mongoose";
import { UserDocument } from "./user.model";

export interface ResumeInput {
  user_id: UserDocument["_id"];
  name: string;
  headline: string;
  summary: string;
  photo: string;
  video_resume: string;
  address: {
    city: string;
    country: string;
  };
  contact: {
    email: string;
    number: string;
  };
  socialMedia: {
    linkedin: string;
    github: string;
    instagram: string;
    facebook: string;
  };
  otherSocialMedia: string[];
  skills: string[];
  experience: {
    title: string;
    name: string;
    location: string;
    start_month: number;
    end_month: number;
    start_year: number;
    end_year: number;
    is_present: boolean;
    description: string;
  }[];
  education: {
    specialization: string;
    name: string;
    percentage: string;
    location: string;
    start_month: number;
    end_month: number;
    start_year: number;
    end_year: number;
    description: string;
  }[];
  projects: {
    title: string;
    role: string;
    company: string;
    location: string;
    start_month: number;
    end_month: number;
    start_year: number;
    end_year: number;
    link: string;
    description: string;
  }[];
  hobbies: string[];
  languages: string[];
  achievements: string;
  certification: string;
}

export interface ResumeDocument extends Document, ResumeInput {}

const ResumeSchema = new Schema<ResumeDocument>({
  user_id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String },
  headline: { type: String },
  summary: { type: String },
  photo: { type: String },
  video_resume: { type: String },
  address: {
    city: { type: String },
    country: { type: String },
  },
  contact: {
    email: { type: String },
    number: { type: String },
  },
  socialMedia: {
    linkedin: { type: String },
    github: { type: String },
    instagram: { type: String },
    facebook: { type: String },
  },
  otherSocialMedia: [{ type: String }],
  skills: [{ type: String }],
  experience: [
    {
      title: { type: String },
      name: { type: String },
      location: { type: String },
      start_month: { type: Number },
      end_month: { type: Number },
      start_year: { type: Number },
      end_year: { type: Number },
      is_present: { type: Boolean },
      description: { type: String },
    },
  ],
  education: [
    {
      specialization: { type: String },
      name: { type: String },
      percentage: { type: String },
      location: { type: String },
      start_month: { type: Number },
      end_month: { type: Number },
      start_year: { type: Number },
      end_year: { type: Number },
      description: { type: String },
    },
  ],
  projects: [
    {
      title: { type: String },
      role: { type: String },
      company: { type: String },
      location: { type: String },
      start_month: { type: Number },
      end_month: { type: Number },
      start_year: { type: Number },
      end_year: { type: Number },
      description: { type: String },
      link: { type: String },
    },
  ],
  languages: [{ type: String }],
  hobbies: [{ type: String }],
  achievements: { type: String },
  certification: { type: String },
});

const ResumeModel = model<ResumeDocument>("Resume", ResumeSchema);

export default ResumeModel;