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
