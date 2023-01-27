import { Schema, Document, model } from "mongoose";
import { UserDocument } from "./user.model";

export interface ResumeInput {
  user_id: UserDocument["_id"];
  personalDetails: {
    name: string;
    summary: string;
  };
  contactDetails: {
    email: string;
    number: string;
    city: string;
    country: string;
  };
  photo: string;
  video_resume: string;
  socialMedia: {
    linkedin: string;
    github: string;
    instagram: string;
    facebook: string;
    otherSocialMedia: string[];
  };
  skills: string[];
  experience: {
    title: string;
    name: string;
    location: string;
    start_month: string;
    end_month: string;
    start_year: number;
    end_year: number;
    is_present: boolean;
    description: string;
    category: string;
    otherCategory: string;
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
    category: string;
    otherCategory: string;
  }[];
  projects: {
    title: string;
    role: string;
    company: string;
    location: string;
    start_month: string;
    end_month: string;
    start_year: number;
    end_year: number;
    link: string;
    description: string;
  }[];
  customizedSections: [
    {
      title: string;
      type: string;
      data: [
        {
          title: string;
          name: string;
          location: string;
          start_month: string;
          end_month: string;
          start_year: number;
          end_year: number;
          is_present: boolean;
          description: string;
          category: string;
          otherCategory: string;
        }
      ];
    }
  ];
  hobbies: string[];
  languages: string[];
  achievements: string;
  certification: string;
}

export interface ResumeDocument extends Document, ResumeInput {}

const ResumeSchema = new Schema<ResumeDocument>({
  user_id: { type: Schema.Types.ObjectId, required: true },
  personalDetails: {
    name: { type: String, default: "Name" },
    summary: { type: String, default: "" },
  },
  contactDetails: {
    email: { type: String, default: "" },
    number: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    otherSocialMedia: [{ type: String }],
  },
  photo: { type: String },
  video_resume: { type: String },
  skills: [{ type: String }],
  experience: [
    {
      title: { type: String },
      name: { type: String },
      location: { type: String },
      category: { type: String },
      start_month: { type: String },
      end_month: { type: String },
      start_year: { type: Number },
      end_year: { type: Number },
      is_present: { type: Boolean },
      description: { type: String },
      otherCategory: { type: String },
    },
  ],
  education: [
    {
      specialization: { type: String },
      name: { type: String },
      percentage: { type: String },
      location: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      start_month: { type: String },
      end_month: { type: String },
      start_year: { type: Number },
      end_year: { type: Number },
      description: { type: String },
      category: { type: String },
      otherCategory: { type: String },
    },
  ],
  projects: [
    {
      title: { type: String },
      role: { type: String },
      company: { type: String },
      location: { type: String },
      start_month: { type: String },
      end_month: { type: String },
      start_year: { type: Number },
      end_year: { type: Number },
      description: { type: String },
      link: { type: String },
    },
  ],
  customizedSections: [
    {
      title: { type: String },
      type: { type: String },
      data: [
        {
          title: { type: String },
          name: { type: String },
          location: { type: String },
          category: { type: String },
          start_month: { type: String },
          end_month: { type: String },
          start_year: { type: Number },
          end_year: { type: Number },
          is_present: { type: Boolean },
          description: { type: String },
          otherCategory: { type: String },
        },
      ],
    },
  ],
  languages: [{ type: String }],
  hobbies: [{ type: String }],
  achievements: { type: String },
  certification: { type: String },
});

const ResumeModel = model<ResumeDocument>("Resume", ResumeSchema);

export default ResumeModel;
