# ResumeRise Backend

## Getting Started

The fastest and easiest way to get started is to run MongoDB and Redis Server locally.

## Running Redis Server

Before you start make sure you have installed:

- [NodeJS](https://www.npmjs.com/) that includes `npm`
- [MongoDB](https://www.mongodb.com/) or [PostgreSQL](

### Compatibility

#### MongoDB

Parse Server is continuously tested with the most recent releases of MongoDB to ensure compatibility. We follow the [MongoDB support schedule](https://www.mongodb.com/support-policy) and [MongoDB lifecycle schedule](https://www.mongodb.com/support-policy/lifecycles) and only test against versions that are officially supported and have not reached their end-of-life date. We consider the end-of-life date of a MongoDB "rapid release" to be the same as its major version release.

| Version     | Latest Version | End-of-Life   | Compatible |
|-------------|----------------|---------------|------------|
| MongoDB 4.0 | 4.0.28         | April 2022    | ✅ Yes      |
| MongoDB 4.2 | 4.2.19         | April 2023    | ✅ Yes      |
| MongoDB 4.4 | 4.4.13         | February 2024 | ✅ Yes      |
| MongoDB 5   | 5.3.2          | October 2024  | ✅ Yes      |
| MongoDB 6   | 6.0.2          | July 2025     | ✅ Yes      |

## resume.model.ts
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

## session.model.ts
import { Schema, Document, model } from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionInput {
  user_id: UserDocument["_id"];
  is_valid: boolean;
  userAgent: string;
}

export interface SessionDocument extends Document, SessionInput {}

const SessionSchema = new Schema<SessionDocument>({
  user_id: { type: Schema.Types.ObjectId, required: true },
  is_valid: { type: Boolean, default: true },
  userAgent: { type: String },
});

const SessionModel = model<SessionDocument>("Session", SessionSchema);

export default SessionModel;

## user.model.ts
import { Schema, Document, model, Types } from "mongoose";
import config from "config";
import bcrypt from "bcryptjs";

export interface UserInput {
  name: string;
  email: string;
  password?: string;
  username: string;
  type?: string;
}

export interface UserDocument extends Document, UserInput {
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String },
    type: { type: String, default: "email", required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  if (user.password) {
    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;
  }

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  if (user.password) {
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
  }
  return false;
};

const UserModel = model("User", UserSchema);

export default UserModel;
