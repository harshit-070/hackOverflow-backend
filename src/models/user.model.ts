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
